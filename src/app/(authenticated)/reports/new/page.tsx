import { createClient } from "@/lib/supabase/server"
import { submitWeeklyReport } from "@/app/actions/reports"
import { Button } from "@/components/ui/button"
import {
    CheckCircle2, BarChart3, AlertTriangle, Rocket, ShieldCheck, History, Lock
} from "lucide-react"

function getCurrentWeekLabel() {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay() + 1) // Monday
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Sunday

    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const weekNum = Math.ceil(now.getDate() / 7)
    return `Week ${weekNum}: ${fmt(startOfWeek)} - ${fmt(endOfWeek)}`
}

export default async function SubmitReportPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string }>
}) {
    const params = await searchParams
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let userName = ''
    if (user) {
        const { data: profile } = await supabase
            .from('users')
            .select('name')
            .eq('id', user.id)
            .single()
        userName = profile?.name || user.email || ''
    }

    const currentPeriod = getCurrentWeekLabel()

    return (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-500 fill-mode-both pb-12">

            <div className="flex flex-col gap-1 pr-12">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#6B7280] uppercase">Weekly Operations</span>
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">Submit Weekly Report</h1>
                <div className="w-16 h-1 bg-[#FBBF24] rounded-full mt-3"></div>
            </div>

            {params.message && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {params.message}
                </div>
            )}

            <form action={submitWeeklyReport} className="bg-white rounded-[2.5rem] p-7 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] ring-1 ring-gray-100 flex flex-col gap-8 mt-4">

                {/* Report Period */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Report Period</label>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F8FF]/80 font-semibold text-gray-900">
                        {currentPeriod}
                        <input type="hidden" name="period" value={currentPeriod} />
                    </div>
                </div>

                {/* Campaign Lead (pre-filled from logged-in user) */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest text-[#6B7280] uppercase ml-1">Submitted By</label>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5F8FF]/80 font-semibold text-gray-900">
                        <div className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-sm font-bold">
                            {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        {userName}
                    </div>
                </div>

                {/* Tasks Completed */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-5 h-5 text-[#1E3A8A]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">Tasks Completed</label>
                    </div>
                    <textarea
                        name="tasks"
                        placeholder="List the core milestones achieved this cycle..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        required
                    />
                </div>

                {/* Results & KPIs */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-5 h-5 text-[#F5B10B]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">Results & KPIs</label>
                    </div>
                    <textarea
                        name="results"
                        placeholder="Quantifiable metrics and qualitative outcomes..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                        required
                    />
                </div>

                {/* Issues & Blockers */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">Issues & Blockers</label>
                    </div>
                    <textarea
                        name="issues"
                        placeholder="Any friction points or dependencies requiring attention..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                    />
                </div>

                {/* Next Plan */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Rocket className="w-5 h-5 text-[#1E3A8A]" />
                        <label className="text-[13px] font-bold tracking-tight text-gray-900 leading-none">Next Plan</label>
                    </div>
                    <textarea
                        name="plan"
                        placeholder="Strategic priorities for the upcoming cycle..."
                        className="w-full min-h-[140px] p-6 rounded-[2rem] bg-[#F5F8FF]/60 border-none shadow-inner focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm placeholder:text-gray-400 leading-relaxed font-medium"
                    />
                </div>

                <Button type="submit" size="lg" className="w-full h-18 py-6 rounded-2xl bg-[#0B215E] text-lg font-bold tracking-tight mt-4">
                    Submit Final Report
                </Button>

                <p className="text-[10px] font-bold tracking-[0.1em] text-center text-gray-500 uppercase mt-1">
                    Report will be shared with the Executive Dashboard
                </p>

            </form>

            <div className="flex flex-col gap-4 mt-8">
                <div className="flex gap-4 p-6 bg-[#F5F8FF]/60 rounded-[2rem] border border-gray-100">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <ShieldCheck className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Precision Quality</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">All submissions are saved securely to Supabase.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-6 bg-[#F5F8FF]/60 rounded-[2rem] border border-gray-100">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <History className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Audit Trail</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">All reports are timestamped for historical review.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-6 bg-[#FFFBEB]/60 rounded-[2rem] border border-[#FEF3C7]">
                    <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                        <Lock className="w-5 h-5 text-[#F5B10B]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">Approval Flow</span>
                        <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">Managers will receive a notification to review and sign-off.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
