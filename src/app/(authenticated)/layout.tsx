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
        <div className="min-h-screen bg-[#F5F8FF] flex flex-col pb-[4.5rem]">
            <Header />
            <main className="flex-1 max-w-lg w-full mx-auto px-4 py-6 sm:px-6 md:p-8">
                {children}
            </main>
            {!isAdmin && <SmartFAB />}
            <BottomNav />
        </div>
    )
}
