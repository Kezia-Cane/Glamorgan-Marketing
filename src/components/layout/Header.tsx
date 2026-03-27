import Image from "next/image"
import { Bell } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full bg-[#F5F8FF]/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 py-3">
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
                <button className="relative p-2 text-[#1E3A8A] hover:bg-[#1E3A8A]/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20">
                    <Bell className="w-5 h-5" />
                    {/* Unread indicator */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

            </div>
        </header>
    )
}
