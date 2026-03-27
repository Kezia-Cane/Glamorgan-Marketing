'use client'

import { useEffect } from "react"
import { X, CheckCircle2, BarChart3, AlertTriangle, Rocket, Calendar } from "lucide-react"
import { USER_NAMES } from "@/lib/utils"

interface ReportModalProps {
    report: any
    onClose: () => void
}

export function ReportModal({ report, onClose }: ReportModalProps) {
    const email = report.users?.email || ''
    const name = USER_NAMES[email] || report.users?.name || 'Unknown VA'
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
            aria-modal="true" role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Panel */}
            <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-7 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center font-black text-xl">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-tight">{name}</h2>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-0.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {report.week_start} → {report.week_end}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Sections */}
                <div className="flex flex-col gap-6 p-7">

                    {/* Tasks Completed */}
                    {report.tasks_completed && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-[#EBF0FF] flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A]" />
                                </div>
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Tasks Completed</span>
                            </div>
                            <div className="bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {report.tasks_completed}
                            </div>
                        </div>
                    )}

                    {/* Results & KPIs */}
                    {report.results && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Results & KPIs</span>
                            </div>
                            <div className="bg-[#FFFBEB]/60 border border-[#FEF3C7] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {report.results}
                            </div>
                        </div>
                    )}

                    {/* Issues & Blockers */}
                    {report.issues && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Issues & Blockers</span>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {report.issues}
                            </div>
                        </div>
                    )}

                    {/* Next Plan */}
                    {report.next_plan && (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-[#EBF0FF] flex items-center justify-center">
                                    <Rocket className="w-4 h-4 text-[#1E3A8A]" />
                                </div>
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Next Plan</span>
                            </div>
                            <div className="bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                {report.next_plan}
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-7 pt-0">
                    <button
                        onClick={onClose}
                        className="w-full h-14 rounded-2xl bg-[#1E3A8A] hover:bg-[#0B215E] text-white font-bold text-sm tracking-wide transition-colors cursor-pointer"
                    >
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    )
}
