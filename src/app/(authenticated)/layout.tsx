import { Header } from "@/components/layout/Header"
import { BottomNav } from "@/components/layout/BottomNav"
import { SmartFAB } from "@/components/layout/SmartFAB"

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#F5F8FF] flex flex-col pb-[4.5rem]">
            <Header />
            <main className="flex-1 max-w-lg w-full mx-auto px-4 py-6 sm:px-6 md:p-8">
                {children}
            </main>
            <SmartFAB />
            <BottomNav />
        </div>
    )
}
