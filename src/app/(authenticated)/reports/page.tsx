import { getWeeklyReports } from "@/app/actions/reports"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ReportsPage() {
    const reports = await getWeeklyReports()

    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

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
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                {reports.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-10 text-center text-gray-400 ring-1 ring-gray-100">
                        <p className="font-semibold mb-1">No reports yet.</p>
                        <p className="text-sm">Tap <span className="font-bold text-[#1E3A8A]">+</span> to submit your first weekly report.</p>
                    </div>
                ) : reports.map((report: any) => {
                    const submitterName = report.users?.name || report.users?.email || 'Unknown VA'
                    const initials = submitterName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

                    return (
                        <div key={report.id} className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-50 flex items-center justify-between group hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center font-bold text-lg">
                                    {initials}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-0.5">{submitterName}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{report.period}</p>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 inline-block ${report.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>

                            <div className={`rounded-2xl h-12 px-5 font-bold text-sm tracking-wide flex items-center ${report.status === 'submitted' ? 'bg-[#0B215E] text-white' : 'bg-[#EBF0FF] text-[#1E3A8A]'}`}>
                                {report.status === 'submitted' ? 'Submitted' : 'Draft'}
                            </div>
                        </div>
                    )
                })}
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
