import { getAdsReports, getAdsSummary } from "@/app/actions/ads"
import { Filter, Plus } from "lucide-react"
import Link from "next/link"

export default async function AdsPage() {
    const [reports, summary] = await Promise.all([getAdsReports(), getAdsSummary()])

    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* Title */}
            <div className="flex flex-col gap-1 pr-12">
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Ad Performance
                </h1>
                <p className="text-sm font-medium text-gray-500 leading-relaxed mt-2">
                    Daily tracking of active campaigns and conversion health across all primary channels.
                </p>
            </div>

            {/* Summary Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                    <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">
                        Monthly Spend
                    </div>
                    <div className="text-[1.75rem] font-bold text-[#1E3A8A] tracking-tight truncate">
                        ${summary.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                    <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">
                        Total Conv.
                    </div>
                    <div className="text-[1.75rem] font-bold text-[#1E3A8A] tracking-tight">
                        {summary.totalConversions.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Avg CPL Full Width Card */}
            <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-center h-28 relative overflow-hidden">
                <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase mb-1">
                    Avg. CPL
                </div>
                <div className="text-[2.25rem] font-bold text-[#FBBF24] tracking-tight">
                    ${summary.avgCpl.toFixed(2)}
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBF24] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
            </div>

            {/* Daily Log Header */}
            <div className="flex items-center justify-between mt-4">
                <h2 className="text-xl font-bold text-[#1E3A8A] tracking-tight">Daily Log</h2>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                    <Filter className="w-5 h-5" />
                </button>
            </div>

            {/* Daily Log Cards */}
            <div className="flex flex-col gap-5 mt-1 pb-4">
                {reports.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-8 text-center text-gray-400 ring-1 ring-gray-100">
                        No entries yet. Tap <span className="font-bold text-[#1E3A8A]">+</span> to add your first daily report.
                    </div>
                ) : reports.map((item) => {
                    const date = new Date(item.date)
                    const today = new Date()
                    const yesterday = new Date(today)
                    yesterday.setDate(today.getDate() - 1)

                    const label = date.toDateString() === today.toDateString()
                        ? 'TODAY'
                        : date.toDateString() === yesterday.toDateString()
                            ? 'YESTERDAY'
                            : 'PAST'

                    return (
                        <div key={item.id} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-100/60 flex flex-col gap-4 relative">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold tracking-widest text-[#1E3A8A] uppercase">{label}</span>
                                <span className="text-lg font-bold text-gray-900">
                                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Spend</span>
                                    <span className="text-[15px] font-bold text-gray-900">${Number(item.ad_spend).toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conversions</span>
                                    <span className="text-[15px] font-bold text-gray-900">{item.conversions}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CPL</span>
                                    <span className="text-[15px] font-bold text-[#1E3A8A]">${Number(item.cost_per_conversion).toFixed(2)}</span>
                                </div>
                            </div>
                            {item.notes && (
                                <p className="text-xs text-gray-400 italic border-t border-gray-50 pt-3">{item.notes}</p>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="w-full flex justify-center py-4">
                <div className="w-24 h-1.5 bg-[#DEE7FF] rounded-full"></div>
            </div>
        </div>
    )
}
