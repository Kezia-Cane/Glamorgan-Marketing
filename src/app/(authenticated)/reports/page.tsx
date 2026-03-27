import { Plus, Search, Filter, Mail, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const REPORTS = [
    {
        id: "1",
        user: {
            name: "Elena Rodriguez",
            avatar: "/avatar1.png" // placeholder
        },
        range: "Oct 23 - Oct 29, 2023",
        status: "submitted"
    },
    {
        id: "2",
        user: {
            name: "Marcus Chen",
            avatar: "/avatar2.png" // placeholder
        },
        range: "Oct 16 - Oct 22, 2023",
        status: "submitted"
    },
    {
        id: "3",
        user: {
            name: "Sarah Jenkins",
            avatar: "/avatar3.png" // placeholder
        },
        range: "Oct 09 - Oct 15, 2023",
        status: "submitted"
    },
    {
        id: "4",
        user: {
            name: "David Wilson",
            avatar: "/avatar4.png" // placeholder
        },
        range: "Oct 02 - Oct 08, 2023",
        status: "draft"
    }
]

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* Search and Filters */}
            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-widest text-[#6B7280] uppercase">
                    Performance Tracking
                </span>
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Weekly Reports
                </h1>
                <div className="w-12 h-1 bg-[#FBBF24] rounded-full mt-2"></div>
            </div>

            <div className="flex gap-3 mt-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white border-none shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-[#1E3A8A] transition-all outline-none text-sm placeholder:text-gray-400"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-2xl bg-[#F5F8FF] border-none shadow-sm font-semibold text-[#1E3A8A] gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
            </div>

            {/* Reports List */}
            <div className="flex flex-col gap-4 mt-2">
                {REPORTS.map((report) => (
                    <div key={report.id} className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-50 flex items-center justify-between group hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${report.status === 'submitted' ? 'bg-[#F5F8FF] text-[#1E3A8A]' : 'bg-[#FFFBEB] text-[#F59E0B]'}`}>
                                {report.status === 'submitted' ? (
                                    <BarChart2 className="w-6 h-6" />
                                ) : (
                                    <div className="relative">
                                        <Target className="w-6 h-6" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-0.5">{report.user.name}</h3>
                                <p className="text-sm text-gray-500 font-medium">{report.range}</p>
                            </div>
                        </div>

                        <Link href={`/reports/${report.id}`}>
                            <Button
                                variant={report.status === 'submitted' ? 'default' : 'outline'}
                                className={`rounded-2xl h-14 px-6 font-bold text-sm tracking-wide ${report.status === 'submitted' ? 'bg-[#0B215E]' : 'bg-[#EBF0FF] border-none text-[#1E3A8A] hover:bg-[#DEE7FF]'}`}
                            >
                                {report.status === 'submitted' ? 'View Report' : 'View Draft'}
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
                <button className="flex items-center gap-2 text-[#1E3A8A] font-bold text-sm uppercase tracking-wider group">
                    Load Archive Reports
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <div className="w-full h-0.5 bg-[#FBBF24] opacity-50 rounded-full max-w-[200px] mt-1"></div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <Link href="/reports/new" className="fixed bottom-24 right-6 sm:right-12 z-40">
                <button className="w-16 h-16 bg-[#1E3A8A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white">
                    <Plus className="w-8 h-8" />
                </button>
            </Link>

        </div>
    )
}

function ChevronDown(props: any) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
        </svg>
    )
}

function BarChart2(props: any) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    )
}

function Target(props: any) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
    )
}
