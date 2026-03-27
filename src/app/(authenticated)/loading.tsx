import { LayoutGrid } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex flex-col gap-6 w-full animate-pulse">

            {/* Header Skeleton Block */}
            <div className="flex flex-col gap-2">
                <div className="w-1/3 h-4 bg-gray-200 rounded-full"></div>
                <div className="w-2/3 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-12 h-1 bg-[#FBBF24]/50 rounded-full mt-2"></div>
            </div>

            {/* Metric Cards Skeleton Grid (if Dashboard/Ads style) */}
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full"></div>
                    <div className="w-3/4 h-8 bg-gray-200 rounded-lg mt-auto"></div>
                </div>
                <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full"></div>
                    <div className="w-3/4 h-8 bg-gray-200 rounded-lg mt-auto"></div>
                </div>
            </div>

            {/* Full Width Card Skeleton */}
            <div className="bg-[#F5F8FF] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-center h-28 relative overflow-hidden">
                <div className="w-1/3 h-4 bg-gray-200 rounded-full mb-2"></div>
                <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
            </div>

            {/* List / Feed Skeleton */}
            <div className="flex flex-col gap-4 mt-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-50 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-1/4 h-3 bg-gray-200 rounded-full"></div>
                            <div className="w-1/2 h-5 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                            <div className="w-1/4 h-8 bg-gray-100 rounded-lg"></div>
                            <div className="w-1/4 h-8 bg-gray-100 rounded-lg"></div>
                            <div className="w-1/4 h-8 bg-gray-100 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
