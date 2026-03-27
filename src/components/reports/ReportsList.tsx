'use client'

import { useState } from "react"
import { Eye, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportModal } from "@/components/reports/ReportModal"
import { USER_NAMES } from "@/lib/utils"

interface ReportsListProps {
    reports: any[]
    currentUserId?: string
}

export function ReportsList({ reports, currentUserId }: ReportsListProps) {
    const [selectedReport, setSelectedReport] = useState<any | null>(null)

    return (
        <>
            {/* Search + Filter bar */}
            <div className="flex gap-3 mt-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white border-none shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-[#1E3A8A] transition-all outline-none text-sm placeholder:text-gray-400"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-2xl bg-[#F5F8FF] border-none shadow-sm font-semibold text-[#1E3A8A] gap-2 cursor-pointer">
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
            </div>

            {/* Reports List */}
            <div className="flex flex-col gap-4 mt-2">
                {reports.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 text-center text-gray-400 border border-white/60">
                        <p className="font-semibold mb-1">No reports yet.</p>
                        <p className="text-sm">Tap <span className="font-bold text-[#1E3A8A]">+</span> to submit your first weekly report.</p>
                    </div>
                ) : reports.map((report: any) => {
                    const email = report.users?.email || ''
                    const submitterName = USER_NAMES[email] || report.users?.name || email || 'Unknown VA'
                    const initials = submitterName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

                    return (
                        <div
                            key={report.id}
                            className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex items-center justify-between group hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedReport(report)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center font-bold text-lg shrink-0">
                                    {initials}
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-gray-900 leading-tight mb-0.5">{submitterName}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{report.week_start} → {report.week_end}</p>
                                </div>
                            </div>

                            <div className="rounded-2xl h-11 px-4 font-bold text-sm flex items-center gap-2 bg-[#F5F8FF] text-[#1E3A8A] border border-blue-100 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors cursor-pointer shrink-0 ml-3">
                                <Eye className="w-4 h-4" />
                                View
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {selectedReport && (
                <ReportModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    currentUserId={currentUserId}
                />
            )}
        </>
    )
}
