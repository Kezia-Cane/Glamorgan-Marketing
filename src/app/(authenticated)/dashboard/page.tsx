import { Banknote, Link as LinkIcon, Activity } from "lucide-react"
import { MetricCard } from "@/components/ui/cards/MetricCard"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* 3 Metric Cards */}
            <MetricCard
                label="Ad Spend"
                value="$12,480"
                trend={12.5}
                icon={Banknote}
            />

            <MetricCard
                label="Conversions"
                value="842"
                trend={8.2}
                icon={LinkIcon}
            />

            <MetricCard
                label="Cost Per Conversion (CPL)"
                value="$14.82"
                trend={-3.1}
                icon={Activity}
            />

            {/* Weekly Summary */}
            <div className="mt-2 text-[#1E3A8A] font-bold text-2xl tracking-tight">
                Weekly Summary
            </div>
            <div className="flex items-center justify-between text-gray-500 text-sm mt-1 mb-4">
                <span>Performance breakdown for Oct 21 - Oct 27</span>
                <button className="text-[#1E3A8A] font-bold text-xs uppercase hover:underline underline-offset-4 decoration-2">
                    Full Report
                </button>
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

                {/* Simple CSS Bar Chart Representation */}
                <div className="flex items-end justify-between h-32 gap-3 mt-4">
                    {[40, 25, 60, 45, 80, 50, 70].map((h, i) => (
                        <div key={i} className="w-8 md:w-10 bg-[#F5F8FF] rounded-t-lg h-full relative group flex items-end justify-center">
                            <div
                                className="w-full bg-[#1E3A8A] rounded-t-lg transition-all"
                                style={{ height: `${h}%` }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Performer Card */}
            <div className="bg-[#0B215E] text-white rounded-[2rem] p-6 shadow-md mb-4 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="text-xs tracking-widest text-[#93A5D4] font-semibold uppercase">
                    Top Performer
                </div>
                <div className="mt-2 flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Search_Q4_Leads</h3>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <span className="text-[2.5rem] font-bold leading-none tracking-tight text-white">248</span>
                    <span className="bg-[#1E3A8A]/50 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 border border-blue-400/20 backdrop-blur-sm">
                        32% Share
                    </span>
                </div>
            </div>

            {/* Active Experiments Card */}
            <div className="bg-[#EBF0FF] rounded-[2rem] p-6 shadow-sm border border-blue-100 flex flex-col mb-8 h-36">
                <div className="text-xs tracking-widest text-[#5B75B3] font-semibold uppercase">
                    Active Experiments
                </div>
                <div className="mt-2 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A8A]">Creative A/B Test</h3>
                </div>
                <div className="flex -space-x-3 mt-auto">
                    {/* Mock avatars */}
                    <div className="w-8 h-8 rounded-full border-2 border-[#EBF0FF] bg-gray-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#FBBF24] opacity-50"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#EBF0FF] bg-gray-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#0B215E] opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="text-xs text-gray-500 font-medium pb-2 border-b border-gray-100">
                <span className="inline-flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Last updated: <span className="text-gray-900 mx-1">Oct 28, 2023 at 09:42 AM</span>
                </span>
            </div>

            {/* Extra bottom padding to ensure scrollable past nav */}
            <div className="flex items-center gap-6 mt-4 pb-8 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Data Policy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            </div>

        </div>
    )
}
