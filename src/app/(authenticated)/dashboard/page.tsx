import { Banknote, Link as LinkIcon, Activity, Target, FileText, AlertCircle, Eye } from "lucide-react"
import { getAdsSummary, getAdsReports } from "@/app/actions/ads"
import { getWeeklyReports } from "@/app/actions/reports"
import { createClient } from "@/lib/supabase/server"
import { USER_NAMES } from "@/lib/utils"
import Link from "next/link"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isAdmin = false
    let allVAs: any[] = []

    if (user) {
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
        isAdmin = profile?.role === 'admin'

        if (isAdmin) {
            const { data } = await supabase.from('users').select('id, name, email').eq('role', 'va')
            allVAs = data || []
        }
    }

    const { totalSpend, totalConversions, avgCpl, chartData } = await getAdsSummary()
    const chartBars = chartData.length > 0 ? chartData : [0, 0, 0, 0, 0, 0, 0]

    let recentAds: any[] = []
    let recentReports: any[] = []
    let missingReportVAs: string[] = []

    if (isAdmin) {
        const adsData = await getAdsReports()
        recentAds = adsData.slice(0, 3)

        const reportsData = await getWeeklyReports()
        recentReports = reportsData.slice(0, 3)

        const now = new Date()
        const dayOfWeek = now.getDay()
        const monday = new Date(now)
        monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
        const thisWeekStart = monday.toISOString().split('T')[0]

        const submittedUserIds = new Set(
            reportsData
                .filter((r: any) => r.week_start >= thisWeekStart)
                .map((r: any) => r.user_id)
        )
        missingReportVAs = allVAs
            .filter(va => !submittedUserIds.has(va.id))
            .map(va => USER_NAMES[va.email] || va.name || va.email)
    }

    return (
        <div className="flex flex-col gap-5 animate-in fade-in fill-mode-both duration-300 pb-8">

            {/* Metric Cards — stacked column, comfortable spacing */}
            <div className="flex flex-col gap-4">
                {/* Monthly Spend */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/60 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">Ad Spend (This Month)</span>
                        <span className="text-3xl sm:text-[2rem] font-bold text-[#FBBF24] tracking-tight leading-none">
                            ${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] flex items-center justify-center shrink-0">
                        <Banknote className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                </div>

                {/* 2-col row for conversions + CPL */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/60 flex flex-col gap-3 transition-all hover:shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-[#EBF0FF] flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-[#1E3A8A]" />
                        </div>
                        <div>
                            <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B7280] uppercase mb-1">Conversions</div>
                            <div className="text-xl sm:text-2xl font-bold text-[#1E3A8A] tracking-tight">{totalConversions.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-sm border border-white/60 flex flex-col gap-3 transition-all hover:shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-[#EBF0FF] flex items-center justify-center">
                            <Activity className="w-5 h-5 text-[#1E3A8A]" />
                        </div>
                        <div>
                            <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#6B7280] uppercase mb-1">Avg. CPL</div>
                            <div className="text-xl sm:text-2xl font-bold text-[#1E3A8A] tracking-tight">${avgCpl.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Dashboard Extensions */}
            {isAdmin ? (
                <div className="flex flex-col gap-5 mt-2">
                    {/* Missing Reports Alert */}
                    {missingReportVAs.length > 0 && (
                        <div className="bg-[#FFFBEB]/80 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-sm">
                            <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-[11px] uppercase tracking-widest mb-2">
                                <AlertCircle className="w-4 h-4" />
                                Missing Weekly Reports
                            </div>
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                No report yet this week from:{" "}
                                <span className="font-bold text-gray-900">{missingReportVAs.join(', ')}</span>
                            </p>
                        </div>
                    )}

                    {/* Recent VA Ads Logs */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#1E3A8A] font-bold text-base flex items-center gap-2">
                                <Target className="w-4 h-4" /> VA Ads Logs
                            </h3>
                            <Link href="/ads" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#1E3A8A] transition-colors">
                                View All →
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {recentAds.length === 0 ? (
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 text-center text-sm text-gray-400 border border-white/60">No ads submitted yet.</div>
                            ) : recentAds.map((ad: any) => {
                                const name = USER_NAMES[ad.users?.email || ''] || ad.users?.name || 'Unknown'
                                return (
                                    <div key={ad.id} className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-white/60 flex justify-between items-center transition-all hover:shadow-md">
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{name}</div>
                                            <div className="text-xs text-gray-400 font-medium mt-0.5">{ad.date}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-[#1E3A8A] text-sm">${Number(ad.ad_spend).toFixed(2)}</div>
                                            <div className="text-xs font-bold text-gray-400">{ad.conversions} conv.</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Recent Weekly Reports */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#1E3A8A] font-bold text-base flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Recent Reports
                            </h3>
                            <Link href="/reports" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#1E3A8A] transition-colors">
                                View All →
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {recentReports.length === 0 ? (
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 text-center text-sm text-gray-400 border border-white/60">No reports found.</div>
                            ) : recentReports.map((report: any) => {
                                const name = USER_NAMES[report.users?.email || ''] || report.users?.name || 'Unknown'
                                return (
                                    <Link key={report.id} href="/reports" className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-white/60 flex justify-between items-center hover:shadow-md transition-all cursor-pointer group">
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{name}</div>
                                            <div className="text-xs text-gray-400 font-medium mt-0.5">{report.week_start}</div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                /* VA VIEW — chart section */
                <div className="flex flex-col gap-3 mt-2">
                    <div className="text-[#1E3A8A] font-bold text-xl tracking-tight">Monthly Summary</div>
                    <div className="text-sm text-gray-500 font-medium">Performance breakdown for this month</div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 h-56 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                            Conversion Velocity
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#1E3A8A]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-28 gap-2 mt-4">
                            {chartBars.map((h, i) => (
                                <div key={i} className="flex-1 bg-[#F5F8FF] rounded-t-lg h-full relative flex items-end justify-center">
                                    <div
                                        className="w-full bg-[#1E3A8A] rounded-t-lg transition-all"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {totalSpend === 0 && (
                <div className="bg-[#EBF0FF] rounded-[2rem] p-6 text-center text-[#1E3A8A] font-semibold text-sm">
                    No data yet — submit your first Ads entry to see metrics here!
                </div>
            )}

            <div className="text-xs text-gray-400 font-medium pb-2 text-center">
                Live data · Glamorgan Marketing
            </div>

        </div>
    )
}
