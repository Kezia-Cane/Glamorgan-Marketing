"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Target, BarChart2, User } from "lucide-react"

const NAV_ITEMS = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
    },
    {
        name: "Ads",
        href: "/ads",
        icon: Target,
    },
    {
        name: "Reports",
        href: "/reports",
        icon: BarChart2,
    },
    {
        name: "Profile",
        href: "/profile",
        icon: User,
    },
]

export function BottomNav() {
    const pathname = usePathname()

    // Don't show on sub-pages like /ads/new if you want a cleaner experience, 
    // but for MVP it's often easier to show it everywhere in the authenticated layout
    const isMatch = (href: string) => {
        if (href === "/dashboard") return pathname === "/dashboard"
        return pathname.startsWith(href)
    }

    return (
        <nav className="fixed bottom-0 w-full left-0 z-50 bg-white border-t border-gray-100 px-2 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {NAV_ITEMS.map((item) => {
                    const active = isMatch(item.href)
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-200 ${active
                                    ? "bg-[#F5F8FF] text-[#1E3A8A]"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 mb-1 ${active ? "opacity-100" : "opacity-80"}`}
                                strokeWidth={active ? 2.5 : 2}
                            />
                            <span
                                className={`text-[10px] tracking-wide uppercase font-semibold ${active ? "opacity-100" : "opacity-80"
                                    }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
