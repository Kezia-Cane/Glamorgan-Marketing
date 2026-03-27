import { Header } from "@/components/layout/Header"
import { BottomNav } from "@/components/layout/BottomNav"
import { SmartFAB } from "@/components/layout/SmartFAB"
import { createClient } from "@/lib/supabase/server"

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isAdmin = false
    if (user) {
        const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()
        isAdmin = profile?.role === 'admin'
    }

    return (
        <div className="min-h-screen flex flex-col pb-[4.5rem] relative isolate bg-[#F8FAFC]">
            {/* Modern Mesh Gradient Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-[#E0E7FF] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-in fade-in duration-1000"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/3 w-[600px] h-[600px] bg-[#FEF3C7] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-in fade-in duration-1000 delay-300"></div>
            </div>

            <Header />
            <main className="flex-1 max-w-lg w-full mx-auto px-4 py-6 sm:px-6 md:p-8">
                {children}
            </main>
            {!isAdmin && <SmartFAB />}
            <BottomNav />
        </div>
    )
}
