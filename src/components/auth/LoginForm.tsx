'use client'

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/app/actions/auth"

export function LoginForm({ message, error }: { message?: string, error?: string }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="w-full max-w-[400px] mb-8 bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 relative">
            {message && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100 font-medium">
                    {message}
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100 font-medium">
                    There was an issue logging in: {error}
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
                            className="pl-12 bg-gray-50 border-gray-100 focus:bg-white h-12"
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
                            type={showPassword ? "text" : "password"}
                            placeholder={showPassword ? "password123" : "••••••••"}
                            required
                            className={`pl-12 pr-12 h-12 bg-gray-50 border-gray-100 focus:bg-white ${showPassword ? 'tracking-normal' : 'tracking-[0.2em]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-[#1E3A8A] cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

            </form>
        </div>
    )
}
