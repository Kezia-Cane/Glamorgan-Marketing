import {
    User,
    Settings,
    Bell,
    ShieldCheck,
    HelpCircle,
    LogOut,
    ChevronRight,
    Mail,
    Smartphone
} from "lucide-react"
import { logout } from "../../actions/auth"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-300">

            {/* Page Title */}
            <div className="flex flex-col gap-1 pr-12">
                <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#1E3A8A] tracking-tight">
                    Profile & Settings
                </h1>
                <p className="text-sm font-medium text-gray-500 leading-relaxed mt-2">
                    Manage your account details and secure your access to the operations dashboard.
                </p>
            </div>

            {/* User Info Header Card */}
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] ring-1 ring-gray-100 flex flex-col items-center gap-6 mt-2 relative overflow-hidden">

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5F8FF] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#0B215E] border-4 border-[#F5F8FF] shadow-md flex items-center justify-center relative z-10 transition-transform hover:scale-105 duration-300">
                    <User className="w-10 h-10 text-white" />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#FBBF24] rounded-full border-2 border-white flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    </div>
                </div>

                <div className="text-center z-10">
                    <h2 className="text-2xl font-bold text-[#1E3A8A] tracking-tight">Elena Rodriguez</h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">Marketing Analyst - VA</p>
                </div>

                <div className="w-full flex flex-col gap-3 mt-4 z-10">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F8FF]/80 border border-transparent hover:border-[#1E3A8A]/10 transition-colors">
                        <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</span>
                            <span className="text-sm font-bold text-gray-900 truncate">elena.rod@glamorgan.com</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F8FF]/80 border border-transparent hover:border-[#1E3A8A]/10 transition-colors">
                        <Smartphone className="w-5 h-5 text-gray-400 shrink-0" />
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                            <span className="text-sm font-bold text-gray-900">+1 (415) 555-0198</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Account Control Settings Header */}
            <h3 className="text-xl font-bold text-[#1E3A8A] tracking-tight mt-4 flex items-center justify-between">
                Account Controls
                <div className="w-12 h-1 bg-[#FBBF24] rounded-full"></div>
            </h3>

            {/* Settings Options List */}
            <div className="flex flex-col gap-3">
                {[
                    { icon: Settings, label: "Account Settings", desc: "Manage password and security details" },
                    { icon: Bell, label: "Notifications", desc: "Set alert preferences for your reports" },
                    { icon: ShieldCheck, label: "Privacy & Data", desc: "Review how your data is handled" },
                    { icon: HelpCircle, label: "Dashboard Help", desc: "Get support for any operational issues" }
                ].map((item, idx) => (
                    <button key={idx} className="group flex items-center gap-5 p-5 bg-white rounded-[2rem] shadow-sm ring-1 ring-gray-100 hover:bg-[#F5F8FF] hover:ring-transparent transition-all duration-300">
                        <div className="p-3 bg-[#F5F8FF] rounded-2xl text-[#1E3A8A] group-hover:bg-white transition-colors shadow-sm">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left flex-grow">
                            <span className="text-md font-bold text-gray-900 leading-tight mb-0.5">{item.label}</span>
                            <span className="text-[11px] font-medium text-gray-500 opacity-80">{item.desc}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1E3A8A] group-hover:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>

            {/* Logout Action */}
            <form action={logout} className="mt-8 mb-4">
                <Button
                    type="submit"
                    variant="outline"
                    className="w-full h-18 rounded-[2rem] border-2 border-red-50/50 bg-white hover:bg-red-50 text-red-600 font-bold text-base tracking-tight gap-3 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.02)] group"
                >
                    <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    Sign Out of Dashboard
                </Button>
            </form>

            {/* Footer Branding */}
            <div className="flex flex-col items-center gap-4 text-center mt-4">
                <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                    Glamorgan V1.4.2 Production
                </p>
            </div>

        </div>
    )
}
