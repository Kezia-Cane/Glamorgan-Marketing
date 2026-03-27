'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

const FAB_CONFIG: Record<string, { href: string; label: string }> = {
    '/ads': { href: '/ads/new', label: 'Add Ads Entry' },
    '/reports': { href: '/reports/new', label: 'Add Weekly Report' },
    '/dashboard': { href: '/ads/new', label: 'Add Ads Entry' },
}

export function SmartFAB() {
    const pathname = usePathname()

    // Find matching FAB config (exact match first, then prefix)
    const config =
        FAB_CONFIG[pathname] ??
        Object.entries(FAB_CONFIG).find(([key]) => pathname.startsWith(key) && key !== '/')?.[1]

    // Don't show FAB on sub-form pages or profile
    const isSubPage = pathname.endsWith('/new') || pathname === '/profile'
    if (!config || isSubPage) return null

    return (
        <Link href={config.href} className="fixed bottom-24 right-6 sm:right-12 z-40 group">
            <button
                className="w-16 h-16 bg-[#1E3A8A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white"
                aria-label={config.label}
            >
                <Plus className="w-8 h-8" />
            </button>
            {/* Tooltip label */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0B215E] text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {config.label}
            </span>
        </Link>
    )
}
