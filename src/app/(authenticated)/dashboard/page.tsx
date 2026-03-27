import { Banknote, Link as LinkIcon, Activity, Target, FileText, AlertCircle, Eye } from "lucide-react"
import { MetricCard } from "@/components/ui/cards/MetricCard"
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

    // Admin Specific Data
    let recentAds: any[] = []
    let recentReports: any[] = []
    let missingReportVAs: string[] = []

    if (isAdmin) {
        const adsData = await getAdsReports()
        recentAds = adsData.slice(0, 3)

        const reportsData = await getWeeklyReports()
        recentReports = reportsData.slice(0, 3)

        // Find VAs who haven't submitted a report this week
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
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard
                    label="Ad Spend"
                    value={`$${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={Banknote}
                />
                <MetricCard
                    label="Conversions"
                    value={totalConversions.toLocaleString()}
                    icon={LinkIcon}
                />
                <MetricCard
                    label="Cost Per Conversion (CPL)"
                    value={`$${avgCpl.toFixed(2)}`}
                    icon={Activity}
                />
            </div>

            {/* Admin Dashboard Extensions */}
            {isAdmin ? (
                <>
                    {/* VA Pending Reports Alert */}
                    {missingReportVAs.length > 0 && (
                        <div className="bg-[#FFFBEB] rounded-[2rem] p-6 border border-[#FEF3C7] flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-sm uppercase tracking-widest">
                                <AlertCircle className="w-5 h-5" />
                                Missing Weekly Reports
                            </div>
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                The following VAs have not submitted their report for this week: <span className="font-bold text-gray-900">{missingReportVAs.join(', ')}</span>
                            </p>
                        </div>
                    )}

                    {/* VA Team Samples */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Recent Ads Sample */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[#1E3A8A] font-bold text-lg flex items-center gap-2"><Target className="w-5 h-5" /> Recent VA Ads Logs</h3>
                                <Link href="/ads" className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#1E3A8A]">View All</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {recentAds.map(ad => {
                                    const email = ad.users?.email || ''
                                    const name = USER_NAMES[email] || ad.users?.name || 'Unknown'
                                    return (
                                        <div key={ad.id} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100 flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-sm text-gray-900">{name}</div>
                                                <div className="text-xs text-gray-500 font-medium">{ad.date}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-[#1E3A8A]">${Number(ad.ad_spend).toFixed(2)}</div>
                                                <div className="text-xs font-bold text-gray-400">{ad.conversions} conv</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Recent Weekly Reports Sample */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[#1E3A8A] font-bold text-lg flex items-center gap-2"><FileText className="w-5 h-5" /> Recent Reports</h3>
                                <Link href="/reports" className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#1E3A8A]">View All</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {recentReports.map(report => {
                                    const email = report.users?.email || ''
                                    const name = USER_NAMES[email] || report.users?.name || 'Unknown'
                                    return (
                                        <div key={report.id} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100 flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-sm text-gray-900">{name}</div>
                                                <div className="text-xs text-gray-500 font-medium">{report.week_start}</div>
                                            </div>
                                            <Link href="/reports" className="w-8 h-8 rounded-full bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Weekly Summary (Original VA View remains unchanged) */}
                    <div className="mt-2 text-[#1E3A8A] font-bold text-2xl tracking-tight">
                        Monthly Summary
                    </div>
                    <div className="flex items-center justify-between text-gray-500 text-sm mt-1 mb-4">
                        <span>Performance breakdown for this month</span>
                    </div>

                    {/* Chart Card */}
                    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-4 h-64 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                            Conversion Velocity
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#1E3A8A]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
                            </div>
                        </div>

                        <div className="flex items-end justify-between h-32 gap-3 mt-4">
                            {chartBars.map((h, i) => (
                                <div key={i} className="w-8 md:w-10 bg-[#F5F8FF] rounded-t-lg h-full relative group flex items-end justify-center">
                                    <div
                                        className="w-full bg-[#1E3A8A] rounded-t-lg transition-all"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {totalSpend === 0 && (
                <div className="bg-[#EBF0FF] rounded-[2rem] p-6 text-center text-[#1E3A8A] font-semibold text-sm mt-4">
                    No data yet — submit your first Ads entry to see metrics here!
                </div>
            )}

            {/* Footer Info */}
            <div className="text-xs text-gray-500 font-medium pb-2 border-b border-gray-100 mt-6">
                <span className="inline-flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Live data from Supabase
                </span>
            </div>

            <div className="flex items-center gap-6 mt-4 pb-8 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Data Policy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            </div>

        </div>
    )
}
