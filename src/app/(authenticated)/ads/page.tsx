import { getAdsReports, getAdsSummary } from "@/app/actions/ads"
import { Filter } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { AdsLogItem } from "@/components/ads/AdsLogItem"

export default async function AdsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isAdmin = false
    if (user) {
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
        isAdmin = profile?.role === 'admin'
    }

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
            <div className="flex flex-col gap-4 mt-2">
                {/* Monthly Spend Full Width */}
                <div className="bg-[#F5F8FF]/60 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/80 flex flex-col justify-center h-24 sm:h-28 relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B7280] uppercase mb-0.5 sm:mb-1">
                        Monthly Spend
                    </div>
                    <div className="text-3xl sm:text-[2.25rem] font-bold text-[#1E3A8A] tracking-tight">
                        ${summary.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>

                {/* 2-col grid for Conversions + CPL */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-[#F5F8FF]/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-white/80 flex flex-col justify-between h-32 sm:h-40 transition-all duration-300 hover:shadow-md">
                        <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">
                            Total Conv.
                        </div>
                        <div className="text-2xl sm:text-[2rem] font-bold text-[#1E3A8A] tracking-tight">
                            {summary.totalConversions.toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-[#F5F8FF]/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-white/80 flex flex-col justify-between h-32 sm:h-40 transition-all duration-300 hover:shadow-md relative overflow-hidden">
                        <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B7280] uppercase z-10">
                            Avg. CPL
                        </div>
                        <div className="text-2xl sm:text-[2rem] font-bold text-[#FBBF24] tracking-tight z-10">
                            ${summary.avgCpl.toFixed(2)}
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FBBF24] opacity-5 -translate-y-1/3 translate-x-1/3 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Daily Log Header */}
            <div className="flex items-center justify-between mt-4">
                <h2 className="text-xl font-bold text-[#1E3A8A] tracking-tight">Daily Log</h2>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                    <Filter className="w-5 h-5" />
                </button>
            </div>

            {/* Daily Log Cards */}
            <div className="flex flex-col gap-5 mt-1 pb-4">
                {reports.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-8 text-center text-gray-400 ring-1 ring-gray-100">
                        No entries yet. Tap <span className="font-bold text-[#1E3A8A]">+</span> to add your first daily report.
                    </div>
                ) : reports.map((item: any) => (
                    <AdsLogItem key={item.id} item={item} isAdmin={isAdmin} />
                ))}
            </div>

            <div className="w-full flex justify-center py-4">
                <div className="w-24 h-1.5 bg-[#DEE7FF] rounded-full"></div>
            </div>
        </div>
    )
}
