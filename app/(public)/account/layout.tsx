"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, Package, Heart, MapPin, CreditCard, LogOut, LayoutDashboard } from "lucide-react";

const navItems = [
    { name: "Overview", shortName: "Home", href: "/account", icon: LayoutDashboard },
    { name: "Profile Settings", shortName: "Profile", href: "/account/settings", icon: User },
    { name: "Order History", shortName: "Orders", href: "/account/orders", icon: Package },
    { name: "My Wishlist", shortName: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Addresses", shortName: "Address", href: "/account/addresses", icon: MapPin },
    { name: "Payments", shortName: "Pay", href: "/account/payments", icon: CreditCard },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/account" ? pathname === "/account" : pathname.startsWith(href);

    return (
        <div className="bg-[#FAFAFA] min-h-screen">

            <div className="hidden md:flex max-w-[1200px] mx-auto px-6 py-12 gap-10 items-start">

                {/* Desktop sidebar */}
                <aside className="w-[240px] flex-shrink-0 sticky top-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mb-7">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                            <Image
                                src="/CraftopiaLogo/IconLogo.png"
                                alt="Craftopia"
                                width={32}
                                height={32}
                                className="object-cover object-center w-full h-full"
                            />
                        </div>
                        <span className="font-serif text-[17px] font-semibold text-[#1E3A5F] tracking-tight">
                            Craftopia
                        </span>
                    </Link>

                    <p className="text-[#8B9C9B] text-[11px] font-bold tracking-widest uppercase mb-3 ml-1">
                        My Account
                    </p>

                    <nav className="flex flex-col gap-1 mb-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${isActive(item.href)
                                        ? "bg-[#E9F4E5] text-[#3F6136]"
                                        : "text-[#444] hover:bg-stone-100 hover:text-[#111]"
                                    }`}
                            >
                                <item.icon className={`h-4.5 w-4.5 h-[18px] w-[18px] flex-shrink-0 ${isActive(item.href) ? "text-[#5CE614]" : "text-stone-400"}`} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="border-t border-stone-200 pt-4">
                        <button className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-semibold text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors w-full">
                            <LogOut className="h-[18px] w-[18px]" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Desktop content */}
                <main className="flex-1 bg-white rounded-3xl p-10 shadow-sm border border-stone-100 min-h-[600px]">
                    {children}
                </main>
            </div>

            {/* ─── MOBILE layout: content first, bottom tab bar ─── */}
            <div className="md:hidden flex flex-col min-h-screen">

                {/* Mobile top bar */}
                <div className="bg-white border-b border-stone-100 px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg overflow-hidden border border-stone-100">
                            <Image src="/CraftopiaLogo/IconLogo.png" alt="Craftopia" width={28} height={28} className="object-cover w-full h-full" />
                        </div>
                        <span className="font-serif text-[16px] font-semibold text-[#1E3A5F]">Craftopia</span>
                    </Link>
                    <button className="flex items-center gap-1.5 text-[13px] font-semibold text-red-400">
                        <LogOut className="h-4 w-4" /> Sign out
                    </button>
                </div>

                {/* Mobile content — takes all available space above the tab bar */}
                <main className="flex-1 bg-white mx-3 my-3 rounded-2xl p-5 shadow-sm border border-stone-100 pb-6">
                    {children}
                </main>

                {/* ─── Bottom tab bar ─── */}
                <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-100 z-50 flex items-stretch shadow-[0_-1px_12px_rgba(0,0,0,0.06)]">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${active ? "text-[#5CE614]" : "text-stone-400 hover:text-[#111]"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
                                <span className={`text-[9px] font-bold tracking-wide leading-none ${active ? "text-[#3F6136]" : ""}`}>
                                    {item.shortName}
                                </span>
                                {active && <div className="absolute bottom-0 w-6 h-0.5 bg-[#5CE614] rounded-full" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Spacer so content isn't hidden behind fixed tab bar */}
                <div className="h-16" />
            </div>
        </div>
    );
}
