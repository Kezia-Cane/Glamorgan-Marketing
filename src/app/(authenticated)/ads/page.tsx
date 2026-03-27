import { MetricCard } from "@/components/ui/cards/MetricCard"
import { Banknote, Link as LinkIcon, Activity, Filter, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const DAILY_LOG = [
    {
        id: "today",
        label: "TODAY",
        date: "Oct 24, 2023",
        spend: "$482.10",
        conversions: "42",
        cpl: "$11.47"
    },
    {
        id: "yesterday",
        label: "YESTERDAY",
        date: "Oct 23, 2023",
        spend: "$512.45",
        conversions: "38",
        cpl: "$13.48"
    },
    {
        id: "past-1",
        label: "PAST",
        date: "Oct 22, 2023",
        spend: "$450.00",
        conversions: "31",
        cpl: "$14.51"
    },
    {
        id: "past-2",
        label: "PAST",
        date: "Oct 21, 2023",
        spend: "$610.20",
        conversions: "54",
        cpl: "$11.30"
    }
]

export default function AdsPage() {
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
                        $14,290
                    </div>
                </div>
                <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                    <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase">
                        Total Conv.
                    </div>
                    <div className="text-[1.75rem] font-bold text-[#1E3A8A] tracking-tight">
                        1,104
                    </div>
                </div>
            </div>

            {/* Avg CPL Full Width Card */}
            <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-center h-28 relative overflow-hidden">
                <div className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase mb-1">
                    Avg. CPL
                </div>
                <div className="text-[2.25rem] font-bold text-[#FBBF24] tracking-tight">
                    $12.94
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
                {DAILY_LOG.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-100/60 flex flex-col gap-4 relative">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-bold tracking-widest text-[#1E3A8A] uppercase">{item.label}</span>
                            <span className="text-lg font-bold text-gray-900">{item.date}</span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Spend</span>
                                <span className="text-[15px] font-bold text-gray-900">{item.spend}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conversions</span>
                                <span className="text-[15px] font-bold text-gray-900">{item.conversions}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CPL</span>
                                <span className="text-[15px] font-bold text-[#1E3A8A]">{item.cpl}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center py-4">
                <div className="w-24 h-1.5 bg-[#DEE7FF] rounded-full"></div>
            </div>

            {/* FAB for new entry */}
            <Link href="/ads/new" className="fixed bottom-24 right-6 sm:right-12 z-40">
                <button className="w-16 h-16 bg-[#1E3A8A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white">
                    <Plus className="w-8 h-8" />
                </button>
            </Link>

        </div>
    )
}
