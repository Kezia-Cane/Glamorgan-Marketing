import Image from "next/image"
import Link from "next/link"
import { login } from "../actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye } from "lucide-react"

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string, error: string }
}) {
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

            {/* Login form card */}
            <div className="w-full max-w-[400px] mb-8 bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100">

                {searchParams.message && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100">
                        {searchParams.message}
                    </div>
                )}
                {searchParams.error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100">
                        There was an issue logging in: {searchParams.error}
                    </div>
                )}

                <form action={login} className="flex flex-col gap-5">
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                            <Input
                                name="email"
                                id="email"
                                placeholder="name@company.com"
                                type="email"
                                autoComplete="email"
                                required
                                className="pl-12"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase" htmlFor="password">
                                Password
                            </label>
                            <Link href="#" className="text-xs font-semibold tracking-wide text-[#1E3A8A] hover:underline uppercase">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="pl-12 pr-12 text-lg tracking-[0.2em]"
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                                <Eye className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="pt-1 pb-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" className="peer w-5 h-5 appearance-none rounded border border-gray-300 bg-white checked:bg-[#1E3A8A] checked:border-[#1E3A8A] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:ring-offset-1" />
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-[15px] text-gray-700 group-hover:text-gray-900 select-none">Keep me signed in</span>
                        </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full h-14 text-[15px] rounded-xl font-medium mt-1">
                        Access Dashboard
                    </Button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="mx-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">OR</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>


                </form>

            </div>

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
