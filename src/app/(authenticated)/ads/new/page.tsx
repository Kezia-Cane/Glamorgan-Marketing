'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitAdsReport } from "@/app/actions/ads"

export default function AddAdsDataPage({
    searchParams,
}: {
    searchParams: { message?: string }
}) {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        spend: "",
        conversions: "",
        clicks: "",
        notes: "",
    })

    const [cpl, setCpl] = useState(0)

    useEffect(() => {
        const spend = parseFloat(formData.spend)
        const conv = parseInt(formData.conversions)
        if (!isNaN(spend) && !isNaN(conv) && conv > 0) {
            setCpl(spend / conv)
        } else {
            setCpl(0)
        }
    }, [formData.spend, formData.conversions])

    return (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-500 fill-mode-both">

            <div className="flex flex-col gap-1 relative pr-12">
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Add Ads Data
                </h1>
                <p className="text-sm font-medium text-gray-500 leading-relaxed mt-2">
                    Update your daily campaign performance metrics.
                </p>
            </div>

            {searchParams.message && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {searchParams.message}
                </div>
            )}

            <form action={submitAdsReport} className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] ring-1 ring-gray-100 flex flex-col gap-6 mt-2">

                {/* Hidden CPL field */}
                <input type="hidden" name="cpl" value={cpl.toFixed(4)} />

                {/* Date */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Report Date</label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="pl-12 bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium"
                        />
                    </div>
                </div>

                {/* Ad Spend */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Ad Spend (USD)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-[#1E3A8A] transition-colors">$</div>
                        <Input
                            type="number"
                            name="spend"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.spend}
                            onChange={(e) => setFormData({ ...formData, spend: e.target.value })}
                            className="pl-10 bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Conversions */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Conversions</label>
                    <Input
                        type="number"
                        name="conversions"
                        placeholder="0"
                        value={formData.conversions}
                        onChange={(e) => setFormData({ ...formData, conversions: e.target.value })}
                        className="bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium pl-6"
                        required
                    />
                </div>

                {/* Clicks */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Clicks (optional)</label>
                    <Input
                        type="number"
                        name="clicks"
                        placeholder="0"
                        value={formData.clicks}
                        onChange={(e) => setFormData({ ...formData, clicks: e.target.value })}
                        className="bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium pl-6"
                    />
                </div>

                {/* CPL (auto-calculated, read-only display) */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Cost Per Lead (CPL)</label>
                    <div className="relative bg-[#F5F8FF]/40 h-14 rounded-2xl flex items-center px-4">
                        <div className="mr-2 text-gray-400 font-bold">$</div>
                        <div className="text-gray-900 font-bold">{cpl.toFixed(2)}</div>
                    </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Notes (optional)</label>
                    <textarea
                        name="notes"
                        placeholder="Any campaign notes..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full min-h-[100px] p-4 rounded-2xl bg-[#F5F8FF]/60 border-none focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 font-medium"
                    />
                </div>

                <Button type="submit" size="lg" className="w-full h-16 rounded-[1.25rem] bg-[#1E3A8A] hover:bg-[#0B215E] text-base font-bold tracking-tight shadow-xl shadow-blue-500/10 mt-2">
                    Submit Daily Report
                </Button>

                <p className="text-[10px] font-bold tracking-widest text-center text-gray-400 uppercase mt-2 opacity-60">
                    Authorized Editorial Submission Only
                </p>

            </form>

            {/* Live preview */}
            <h2 className="text-xl font-bold text-[#1E3A8A] tracking-tight mt-4 flex items-center justify-between">
                Live Metric Preview
                <span className="bg-[#FFFBEB] text-[#F59E0B] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border border-[#FEF3C7]">
                    Real-time
                </span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F5F8FF]/50 p-6 rounded-[2rem] h-36 flex flex-col justify-between border border-gray-100">
                    <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">Efficiency</div>
                    <div className="text-2xl font-bold text-[#1E3A8A]">
                        {cpl > 0 ? (cpl < 15 ? "High" : "Optimal") : "—"}
                    </div>
                </div>
                <div className="bg-[#F5F8FF]/50 p-6 rounded-[2rem] h-36 flex flex-col justify-between border border-gray-100 relative overflow-hidden">
                    <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">Target ROI</div>
                    <div className="text-[2.25rem] font-bold text-[#FBBF24] tracking-tight leading-none">
                        {cpl > 0 ? (200 / cpl).toFixed(1) + "x" : "—"}
                    </div>
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-[#FBBF24] opacity-50"></div>
                </div>
            </div>

        </div>
    )
}
