import Link from "next/link";
import { Package, Heart, MapPin, CreditCard, Settings, ArrowRight } from "lucide-react";

const quickLinks = [
    {
        icon: Settings,
        label: "Profile Settings",
        desc: "Update your name, email and password",
        href: "/account/settings",
        bg: "bg-[#E9F8E5]",
        color: "text-[#5CE614]",
    },
    {
        icon: Package,
        label: "Order History",
        desc: "Track and review past purchases",
        href: "/account/orders",
        bg: "bg-[#EDF4FF]",
        color: "text-blue-500",
    },
    {
        icon: Heart,
        label: "My Wishlist",
        desc: "Pieces you've saved for later",
        href: "/account/wishlist",
        bg: "bg-[#FDE8F0]",
        color: "text-pink-500",
    },
    {
        icon: MapPin,
        label: "Addresses",
        desc: "Manage your delivery addresses",
        href: "/account/addresses",
        bg: "bg-[#FFF3E0]",
        color: "text-amber-500",
    },
    {
        icon: CreditCard,
        label: "Payment Methods",
        desc: "View and manage saved cards",
        href: "/account/payments",
        bg: "bg-[#F3E8FF]",
        color: "text-purple-500",
    },
];

export default function AccountPage() {
    return (
        <div className="space-y-8">
            {/* Welcome header */}
            <div className="pb-6 border-b border-stone-100">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E9F4E5] to-[#5CE614]/30 flex items-center justify-center text-[#3F6136] text-[24px] font-bold flex-shrink-0">
                        SJ
                    </div>
                    <div>
                        <h1 className="text-[26px] font-bold text-[#111] tracking-tight leading-tight">
                            Welcome back, Sarah 👋
                        </h1>
                        <p className="text-stone-400 text-[14px] mt-0.5">sarah@example.com · Member since Jan 2024</p>
                    </div>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Orders", value: "12" },
                    { label: "Wishlist Items", value: "5" },
                    { label: "Loyalty Points", value: "840" },
                ].map((s) => (
                    <div key={s.label} className="bg-[#F7F7F7] rounded-2xl px-5 py-4 text-center">
                        <p className="text-[26px] font-bold text-[#111] leading-none">{s.value}</p>
                        <p className="text-stone-400 text-[12px] mt-1.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick navigation cards */}
            <div>
                <h2 className="text-[13px] font-bold text-stone-400 uppercase tracking-widest mb-4">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 p-5 bg-[#FAFAFA] rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all group"
                        >
                            <div className={`w-11 h-11 ${item.bg} ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-bold text-[#111]">{item.label}</p>
                                <p className="text-[12px] text-stone-400 mt-0.5">{item.desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#5CE614] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
