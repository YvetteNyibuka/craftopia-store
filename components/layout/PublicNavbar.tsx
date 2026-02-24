"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CircleUserRound, Search, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function PublicNavbar() {
    const totalItems = useCartStore((state) => state.totalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#EBEBEB] bg-white">
            <div className="mx-auto px-6 h-20 flex items-center justify-between">

                {/* ── LEFT: Logo + wordmark ── */}
                <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                    <div className="w-[52px] h-[52px] overflow-hidden flex-shrink-0">
                        <Image
                            src="/CraftopiaLogo/PrimaryLogo.png"
                            alt="Craftopia"
                            width={100}
                            height={50}
                            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            priority
                        />
                    </div>
                    <span className="font-serif text-[20px] font-semibold tracking-tight text-[#1E3A5F] group-hover:text-[#5CE614] transition-colors leading-none">
                        Craftopia
                    </span>
                </Link>

                {/* ── CENTRE: Nav links with left separator ── */}
                <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#111]  ml-8 pl-8">
                    <Link href="/" className="hover:text-[#5CE614] transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-[#5CE614] transition-colors">About</Link>
                    <Link href="/shop" className="hover:text-[#5CE614] transition-colors">Shop</Link>
                    <Link href="/collections" className="hover:text-[#5CE614] transition-colors">Collections</Link>
                    <Link href="/sustainability" className="hover:text-[#5CE614] transition-colors">Sustainability</Link>
                    <Link href="/contact" className="hover:text-[#5CE614] transition-colors">Contact</Link>
                </nav>

                {/* ── RIGHT: Search + Cart + Account ── */}
                <div className="flex items-center gap-5">
                    <div className="hidden sm:flex items-center relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-[220px] h-10 bg-[#F4F5F6] rounded-full pl-10 pr-4 text-[13px] outline-none placeholder:text-stone-400 text-stone-700 focus:ring-1 focus:ring-[#5CE614]"
                        />
                    </div>

                    {/* Cart */}
                    <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-stone-100 text-[#111] hover:text-[#5CE614] transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        {mounted && totalItems > 0 && (
                            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5CE614] text-[10px] font-bold text-[#111] leading-none">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Account */}
                    <Link
                        href="/account"
                        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-stone-100 text-[#111] hover:text-[#5CE614] transition-colors"
                        aria-label="My account"
                    >
                        <CircleUserRound className="h-6 w-6" />
                    </Link>

                    <button className="md:hidden text-[#111] hover:text-[#5CE614]">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
