"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Heart, MapPin, CreditCard, Settings, ArrowRight, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ordersApi } from "@/lib/api/orders";
import { wishlistApi } from "@/lib/api/cart";

const quickLinks = [
    { icon: Settings, label: "Profile Settings", desc: "Update your name, email and password", href: "/account/settings", bg: "bg-[#E9F8E5]", color: "text-[#5CE614]" },
    { icon: Package, label: "Order History", desc: "Track and review past purchases", href: "/account/orders", bg: "bg-[#EDF4FF]", color: "text-blue-500" },
    { icon: Heart, label: "My Wishlist", desc: "Pieces you've saved for later", href: "/account/wishlist", bg: "bg-[#FDE8F0]", color: "text-pink-500" },
    { icon: MapPin, label: "Addresses", desc: "Manage your delivery addresses", href: "/account/addresses", bg: "bg-[#FFF3E0]", color: "text-amber-500" },
    { icon: CreditCard, label: "Payment Methods", desc: "View and manage saved cards", href: "/account/payments", bg: "bg-[#F3E8FF]", color: "text-purple-500" },
];

export default function AccountPage() {
    const { user, isLoading, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [ordersCount, setOrdersCount] = useState<number | null>(null);
    const [wishlistCount, setWishlistCount] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (!isAuthenticated) return;
        ordersApi.list({ limit: 1 }).then((r) => setOrdersCount(r.total)).catch(() => { });
        wishlistApi.get().then((r) => setWishlistCount(r.total)).catch(() => { });
    }, [isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-[#5CE614]" />
            </div>
        );
    }

    if (!user) return null;

    const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });

    return (
        <div className="space-y-8">
            {/* Welcome header */}
            <div className="pb-6 border-b border-stone-100 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E9F4E5] to-[#5CE614]/30 flex items-center justify-center text-[#3F6136] text-[24px] font-bold flex-shrink-0">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-[26px] font-bold text-[#111] tracking-tight leading-tight">
                            Welcome back, {user.name.split(" ")[0]} 👋
                        </h1>
                        <p className="text-stone-400 text-[14px] mt-0.5">
                            {user.email} · Member since {memberSince}
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-red-500 transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
                >
                    <LogOut className="w-4 h-4" /> Sign out
                </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Orders", value: ordersCount === null ? "…" : String(ordersCount) },
                    { label: "Wishlist Items", value: wishlistCount === null ? "…" : String(wishlistCount) },
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
