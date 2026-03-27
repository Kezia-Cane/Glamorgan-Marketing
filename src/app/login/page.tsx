import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string, error?: string }>
}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F8FF] to-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">

            {/* Brand header */}
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-4 mb-4 mt-8 sm:mt-0 max-w-[400px]">
                <div className="w-28 h-28 relative bg-white rounded-2xl shadow-sm border border-white p-2">
                    <Image
                        src="/logo.png"
                        alt="Glamorgan Heating & Cooling"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
                        Glamorgan Marketing
                    </h1>
                    <p className="text-md text-gray-600">
                        Sign in to Marketing dashboard
                    </p>
                </div>
            </div>

            {/* Login form card via Client Component */}
            <LoginForm message={params.message} error={params.error} />

            {/* Footer text */}
            <div className="w-full max-w-[400px] flex flex-col items-center gap-6 mt-2 mb-8 animate-in fade-in fill-mode-both delay-300">
                <p className="text-[15px] text-gray-600">
                    Don't have an account? <Link href="#" className="font-semibold text-[#1E3A8A] hover:underline">Contact Operations</Link>
                </p>

                <div className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase">
                    <Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-gray-900 transition-colors">Security</Link>
                </div>
            </div>
        </div>
    )
}
