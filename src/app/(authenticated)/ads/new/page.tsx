import { getMyReportedDates } from "@/app/actions/ads"
import { AddAdsForm } from "@/components/ads/AddAdsForm"

export default async function AddAdsDataPage({
    searchParams,
}: {
    searchParams: { message?: string }
}) {
    const reportedDates = await getMyReportedDates()

    return (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-500 fill-mode-both">

            <div className="flex flex-col gap-1 relative pr-12">
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Add Ads Data
                </h1>
                <p className="text-sm font-medium text-gray-500 leading-relaxed mt-2">
                    Update your daily campaign performance metrics.
                </p>
            </div>

            <AddAdsForm
                searchMessage={searchParams.message}
                reportedDates={reportedDates}
            />

        </div>
    )
}
