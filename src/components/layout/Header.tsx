'use client'

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Bell, Sparkles } from "lucide-react"

export function Header() {
    const [showNotifications, setShowNotifications] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    return (
        <header className="sticky top-0 z-40 w-full bg-white/40 backdrop-blur-2xl border-b border-white/60 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between max-w-4xl mx-auto">

                {/* Logo and Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-white rounded-full shadow-sm border border-gray-100 p-1 flex items-center justify-center shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Glamorgan Logo"
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-[#1E3A8A]">
                        Glamorgan Marketing
                    </h1>
                </div>

                {/* Notifications */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 cursor-pointer ${showNotifications ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]' : 'text-[#1E3A8A] hover:bg-[#1E3A8A]/5'}`}
                    >
                        <Bell className="w-5 h-5" />
                        {/* Unread indicator */}
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white/90 backdrop-blur-3xl rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/60 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden z-50">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <span className="text-[10px] font-bold text-[#1E3A8A] bg-[#EBF0FF] px-2 py-0.5 rounded-full uppercase tracking-widest">1 New</span>
                            </div>
                            <div className="p-2">
                                <button className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-2xl transition-colors text-left group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center shrink-0 border border-[#FEF3C7] group-hover:scale-105 transition-transform">
                                        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 mt-0.5">
                                        <div className="text-sm font-bold text-gray-900 leading-tight">
                                            Official Launch of the Glamorgan Marketing! v.1
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium mt-1">
                                            Just now
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}
