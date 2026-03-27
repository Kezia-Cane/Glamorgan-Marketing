import React from "react"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
    label: string
    value: string
    trend?: number
    trendLabel?: string
    icon: LucideIcon
}

export function MetricCard({ label, value, trend, trendLabel = "vs last month", icon: Icon }: MetricCardProps) {
    const isPositive = trend && trend > 0
    const isNegative = trend && trend < 0

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 flex flex-col mt-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xs font-semibold tracking-widest text-[#6B7280] uppercase">
                    {label}
                </h3>
                <div className="p-2 bg-[#F5F8FF] rounded-xl text-[#6B7280]">
                    <Icon className="w-5 h-5 text-[#8D96A6]" />
                </div>
            </div>

            <div className="mt-auto">
                <div className="text-[2.75rem] leading-none font-bold text-[#FBBF24] tracking-tight mb-2">
                    {value}
                </div>

                {trend !== undefined && (
                    <div className="flex items-center gap-1.5 text-sm">
                        <div className={`flex items-center font-medium ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-gray-500'}`}>
                            <svg
                                className={`w-3 h-3 mr-1 ${isNegative ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            {isPositive ? '+' : ''}{trend}%
                        </div>
                        <span className="text-[#6B7280] hidden sm:inline">{trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
