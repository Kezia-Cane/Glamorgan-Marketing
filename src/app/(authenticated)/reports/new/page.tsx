"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    ChevronLeft,
    Calendar,
    CheckCircle2,
    BarChart3,
    AlertTriangle,
    Rocket,
    ShieldCheck,
    History,
    Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SubmitReportPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        period: "Week 42: Oct 16 - Oct 22",
        lead: "Alex Morgan",
        tasks: "",
        results: "",
        issues: "",
        plan: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, call server action
        router.push("/dashboard?success=report-submitted")
    }

    return (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-500 fill-mode-both pb-12">

            {/* Page Title */}
            <div className="flex flex-col gap-1 pr-12">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#6B7280] uppercase">
                    Weekly Operations
                </span>
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Submit Weekly Report
                </h1>
                <div className="w-16 h-1 bg-[#FBBF24] rounded-full mt-3"></div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-7 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] ring-1 ring-gray-100 flex flex-col gap-8 mt-4">

                {/* Report Period Selector */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">
                        Report Period
                    </label>
                    <div className="relative group">
                        <select
                            value={formData.period}
                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                            className="w-full h-14 pl-6 pr-12 rounded-2xl bg-[#F5F8FF]/80 border-none font-semibold text-gray-900 focus:ring-2 focus:ring-[#1E3A8A] outline-none appearance-none"
                        >
                            <option>Week 42: Oct 16 - Oct 22</option>
                            <option>Week 43: Oct 23 - Oct 29</option>
                        </select>
                        <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-[-90deg]" />
                    </div>
                </div>

                {/* Campaign Lead */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">
                        Campaign Lead
                    </label>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F8FF]/80 font-semibold text-gray-900">
                        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200"></div>
                        {formData.lead}
                    </div>
                </div>

                {/* Tasks Completed Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-5 h-5 text-[#1E3A8A]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">
                            Tasks Completed
                        </label>
                    </div>
                    <textarea
                        placeholder="List the core milestones achieved this cycle..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        value={formData.tasks}
                        onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
                    />
                </div>

                {/* Results & KPIs Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-5 h-5 text-[#F5B10B]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">
                            Results & KPIs
                        </label>
                    </div>
                    <textarea
                        placeholder="Quantifiable metrics and qualitative outcomes..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        value={formData.results}
                        onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    />
                </div>

                {/* Issues & Blockers Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">
                            Issues & Blockers
                        </label>
                    </div>
                    <textarea
                        placeholder="Any friction points or dependencies requiring attention..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        value={formData.issues}
                        onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                    />
                </div>

                {/* Next Plan Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Rocket className="w-5 h-5 text-[#1E3A8A]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">
                            Next Plan
                        </label>
                    </div>
                    <textarea
                        placeholder="Strategic priorities for the upcoming cycle..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        value={formData.plan}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    />
                </div>

                <Button type="submit" size="lg" className="w-full h-18 py-6 rounded-2xl bg-[#0B215E] text-lg font-bold tracking-tight mt-4">
                    Submit Final Report
                </Button>

                <p className="text-[10px] font-bold tracking-[0.1em] text-center text-gray-500 uppercase mt-1">
                    Report will be shared with the Executive Dashboard
                </p>

            </form>

            {/* FOOTER INFO FEATURES */}
            <div className="flex flex-col gap-4 mt-8">
                <div className="flex gap-4 p-6 bg-[#F5F8FF]/60 rounded-[2rem] border border-gray-100">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <ShieldCheck className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Precision Quality</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">
                            Drafts are automatically saved as you type to prevent data loss.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-[#F5F8FF]/60 rounded-[2rem] border border-gray-100">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <History className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Audit Trail</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">
                            All reports are timestamped and versioned for historical review.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-[#FFFBEB]/60 rounded-[2rem] border border-[#FEF3C7]">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <Lock className="w-5 h-5 text-[#F5B10B]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Approval Flow</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">
                            Managers will receive a notification to review and sign-off.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
