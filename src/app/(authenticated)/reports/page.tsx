import { getWeeklyReports } from "@/app/actions/reports"
import { ReportsList } from "@/components/reports/ReportsList"
import { createClient } from "@/lib/supabase/server"

export default async function ReportsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const reports = await getWeeklyReports()

    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300 pb-8">

            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-widest text-[#6B7280] uppercase">
                    Performance Tracking
                </span>
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Weekly Reports
                </h1>
                <div className="w-12 h-1 bg-[#FBBF24] rounded-full mt-2"></div>
            </div>

            <ReportsList reports={reports} currentUserId={user?.id} />

        </div>
    )
}
