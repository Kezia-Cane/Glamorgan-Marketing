'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitAdsReport(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const spend = parseFloat(formData.get('spend') as string)
    const conversions = parseInt(formData.get('conversions') as string)
    const clicks = parseInt(formData.get('clicks') as string) || 0
    const date = formData.get('date') as string
    const notes = formData.get('notes') as string || ''
    const cpl = conversions > 0 ? spend / conversions : 0
    const ctr = clicks > 0 ? (conversions / clicks) * 100 : 0

    // 1-entry-per-day validation
    const { data: existing } = await supabase
        .from('ads_reports')
        .select('id')
        .eq('created_by', user.id)
        .eq('date', date)
        .maybeSingle()

    if (existing) {
        return redirect(`/ads/new?message=${encodeURIComponent(`A report for ${date} already exists. Please edit the existing entry instead.`)}`)
    }

    const { error } = await supabase.from('ads_reports').insert({
        created_by: user.id,
        date,
        ad_spend: spend,
        conversions,
        clicks,
        ctr,
        cost_per_conversion: cpl,
        notes,
    })

    if (error) {
        return redirect(`/ads/new?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/ads')
    revalidatePath('/dashboard')
    redirect('/ads')
}

export async function updateAdsReport(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const spend = parseFloat(formData.get('spend') as string)
    const conversions = parseInt(formData.get('conversions') as string)
    const clicks = parseInt(formData.get('clicks') as string) || 0
    const notes = formData.get('notes') as string || ''
    const cpl = conversions > 0 ? spend / conversions : 0
    const ctr = clicks > 0 ? (conversions / clicks) * 100 : 0

    const { error } = await supabase
        .from('ads_reports')
        .update({ ad_spend: spend, conversions, clicks, ctr, cost_per_conversion: cpl, notes })
        .eq('id', id)
        .or(`created_by.eq.${user.id},created_by.is.null`) // handle old records with null created_by

    if (error) return { error: error.message }

    revalidatePath('/ads')
    revalidatePath('/dashboard')
    return { success: true }
}

export async function deleteAdsReport(id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('ads_reports')
        .delete()
        .eq('id', id)
        .or(`created_by.eq.${user.id},created_by.is.null`) // handle old records with null created_by

    if (error) return { error: error.message }

    revalidatePath('/ads')
    revalidatePath('/dashboard')
    return { success: true }
}

export async function getAdsReports() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('ads_reports')
        .select('*, users(name, email)')
        .order('date', { ascending: false })
        .limit(30)

    if (error) return []
    return data
}

export async function getMyReportedDates() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
        .from('ads_reports')
        .select('date')
        .or(`created_by.eq.${user.id},created_by.is.null`)

    return data?.map(d => d.date) || []
}

export async function getAdsSummary() {
    const supabase = await createClient()
    const now = new Date()
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]

    const { data, error } = await supabase
        .from('ads_reports')
        .select('ad_spend, conversions, cost_per_conversion, date')
        .gte('date', firstOfMonth)

    if (error || !data || data.length === 0) {
        return { totalSpend: 0, totalConversions: 0, avgCpl: 0, chartData: [] }
    }

    const totalSpend = data.reduce((sum, r) => sum + Number(r.ad_spend), 0)
    const totalConversions = data.reduce((sum, r) => sum + Number(r.conversions), 0)
    const avgCpl = totalConversions > 0 ? totalSpend / totalConversions : 0

    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date)).slice(-7)
    const maxConv = Math.max(...sorted.map(r => Number(r.conversions)), 1)
    const chartData = sorted.map(r => Math.round((Number(r.conversions) / maxConv) * 100))

    return { totalSpend, totalConversions, avgCpl, chartData }
}
