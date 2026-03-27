'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitWeeklyReport(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    // Compute week_start (Monday) and week_end (Sunday) from today
    const now = new Date()
    const dayOfWeek = now.getDay() // 0=Sun, 1=Mon...
    const monday = new Date(now)
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    const week_start = monday.toISOString().split('T')[0]
    const week_end = sunday.toISOString().split('T')[0]

    const tasks_completed = formData.get('tasks') as string
    const results = formData.get('results') as string
    const issues = formData.get('issues') as string
    const next_plan = formData.get('plan') as string

    const { error } = await supabase.from('weekly_reports').insert({
        user_id: user.id,
        week_start,
        week_end,
        tasks_completed,
        results,
        issues,
        next_plan,
    })

    if (error) {
        return redirect(`/reports/new?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/reports')
    redirect('/reports')
}

export async function getWeeklyReports() {
    const supabase = await createClient()

    // Get current user role
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    let query = supabase
        .from('weekly_reports')
        .select('*, users(name, email)')
        .order('created_at', { ascending: false })

    // VAs only see their own reports, admins see all
    if (profile?.role !== 'admin') {
        query = query.eq('user_id', user.id)
    }

    const { data, error } = await query
    if (error) return []
    return data
}
