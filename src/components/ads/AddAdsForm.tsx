'use client'

import { useState, useEffect } from "react"
import { Calendar, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { submitAdsReport } from "@/app/actions/ads"

interface AddAdsFormProps {
    searchMessage?: string
    reportedDates: string[]
}

export function AddAdsForm({ searchMessage, reportedDates }: AddAdsFormProps) {
    const todayStr = new Date().toISOString().split('T')[0]

    const [formData, setFormData] = useState({
        date: todayStr,
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

    const isDateTaken = reportedDates.includes(formData.date)

    return (
        <form action={submitAdsReport} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col gap-6 mt-2 relative overflow-hidden">

            {searchMessage && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {searchMessage}
                </div>
            )}

            {/* Hidden CPL field */}
            <input type="hidden" name="cpl" value={cpl.toFixed(4)} />

            {/* Date */}
            <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Report Date</label>
                <div className="relative group">
                    <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDateTaken ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#1E3A8A]'}`} />
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`pl-12 bg-[#F5F8FF]/60 h-14 rounded-2xl font-medium ${isDateTaken ? 'ring-2 ring-red-400 border-none text-red-600' : 'border-none focus:ring-2 focus:ring-[#1E3A8A]'}`}
                    />
                </div>
                {isDateTaken && (
                    <div className="flex items-start gap-1.5 text-red-500 text-xs font-bold leading-tight ml-1 animate-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        You have already submitted a report for {new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}. Please edit the existing entry in the Ads log.
                    </div>
                )}
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
                        disabled={isDateTaken}
                        className="pl-10 bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
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
                    disabled={isDateTaken}
                    className="bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium pl-6 focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
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
                    disabled={isDateTaken}
                    className="bg-[#F5F8FF]/60 border-none h-14 rounded-2xl font-medium pl-6 focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
                />
            </div>

            {/* CPL (auto-calculated, read-only display) */}
            <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Cost Per Lead (CPL)</label>
                <div className={`relative bg-[#F5F8FF]/40 h-14 rounded-2xl flex items-center px-4 ${isDateTaken ? 'opacity-50' : ''}`}>
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
                    disabled={isDateTaken}
                    className="w-full min-h-[100px] p-4 rounded-2xl bg-[#F5F8FF]/60 border-none focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 font-medium disabled:opacity-50 resize-none"
                />
            </div>

            {/* Prevent submission completely if date is taken */}
            {isDateTaken ? (
                <div className="w-full h-16 rounded-[1.25rem] bg-gray-200 text-gray-400 text-base font-bold flex items-center justify-center tracking-tight mt-2 cursor-not-allowed border border-gray-300">
                    Date Unavailable
                </div>
            ) : (
                <SubmitButton
                    defaultText="Submit Daily Report"
                    className="w-full h-16 rounded-[1.25rem] bg-[#1E3A8A] hover:bg-[#0B215E] text-base font-bold tracking-tight shadow-xl shadow-[#1E3A8A]/20 mt-2"
                />
            )}

            <p className="text-[10px] font-bold tracking-widest text-center text-gray-400 uppercase mt-2 opacity-60">
                Authorized Editorial Submission Only
            </p>

            {/* Live preview */}
            <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center justify-between">
                    Live Metric Preview
                    <span className="bg-[#FFFBEB] text-[#F59E0B] px-3 py-1 rounded-full text-[10px] font-extrabold border border-[#FEF3C7]">
                        REAL-TIME
                    </span>
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <div className={`bg-[#F5F8FF]/80 p-5 rounded-3xl h-32 flex flex-col justify-between border border-white transition-opacity ${isDateTaken ? 'opacity-50' : ''}`}>
                        <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Efficiency</div>
                        <div className="text-xl font-bold text-[#1E3A8A]">
                            {cpl > 0 ? (cpl < 15 ? "High" : "Optimal") : "—"}
                        </div>
                    </div>
                    <div className={`bg-[#F5F8FF]/80 p-5 rounded-3xl h-32 flex flex-col justify-between border border-white relative overflow-hidden transition-opacity ${isDateTaken ? 'opacity-50' : ''}`}>
                        <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Target ROI</div>
                        <div className="text-2xl font-bold text-[#FBBF24] tracking-tight leading-none z-10">
                            {cpl > 0 ? (200 / cpl).toFixed(1) + "x" : "—"}
                        </div>
                        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#FBBF24] opacity-20 -translate-y-1/3 translate-x-1/3 blur-xl"></div>
                    </div>
                </div>
            </div>

        </form>
    )
}
