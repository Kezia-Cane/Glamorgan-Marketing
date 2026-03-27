import { Banknote, Link as LinkIcon, Activity } from "lucide-react"
import { MetricCard } from "@/components/ui/cards/MetricCard"
import { getAdsSummary } from "@/app/actions/ads"

export default async function DashboardPage() {
    const { totalSpend, totalConversions, avgCpl, chartData } = await getAdsSummary()

    const chartBars = chartData.length > 0
        ? chartData
        : [0, 0, 0, 0, 0, 0, 0]

    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* 3 Metric Cards */}
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

            {/* Weekly Summary */}
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

                {/* Dynamic Bar Chart from real data */}
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

            {totalSpend === 0 && (
                <div className="bg-[#EBF0FF] rounded-[2rem] p-6 text-center text-[#1E3A8A] font-semibold text-sm">
                    No data yet — submit your first Ads entry to see metrics here!
                </div>
            )}

            {/* Footer Info */}
            <div className="text-xs text-gray-500 font-medium pb-2 border-b border-gray-100">
                <span className="inline-flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Live data from Supabase
                </span>
            </div>

            {/* Extra bottom padding */}
            <div className="flex items-center gap-6 mt-4 pb-8 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Data Policy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            </div>

        </div>
    )
}
