import Image from "next/image"
import { updatePassword } from "../actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

export default async function UpdatePasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string }>
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
                        Create your password to access
                    </p>
                </div>
            </div>

            {/* Form card */}
            <div className="w-full max-w-[400px] mb-8 bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100">

                {params.message && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm border border-red-100">
                        {params.message}
                    </div>
                )}

                <form action={updatePassword} className="flex flex-col gap-5">

                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase" htmlFor="password">
                            New Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="pl-12 text-lg tracking-[0.2em]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                            <Input
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="pl-12 text-lg tracking-[0.2em]"
                            />
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full h-14 text-[15px] rounded-xl font-medium mt-1">
                        Save Password & Enter Dashboard
                    </Button>

                </form>

            </div>
        </div>
    )
}
