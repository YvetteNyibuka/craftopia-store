"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CircleUserRound, Search, Menu, LogOut, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

export function PublicNavbar() {
    const { itemCount } = useCartStore();
    const { user, isAuthenticated, logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-[#EBEBEB] bg-white">
                <div className="mx-auto px-6 h-20 flex items-center justify-between">

                    {/* ── LEFT: Logo ── */}
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

                    {/* ── CENTRE: Nav links ── */}
                    <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#111] ml-8 pl-8">
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
                            {mounted && itemCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5CE614] text-[10px] font-bold text-[#111] leading-none">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Account — authenticated shows avatar + dropdown, guest shows modal trigger */}
                        {mounted && isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 h-9 px-3 rounded-full hover:bg-stone-100 transition-colors"
                                >
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E9F4E5] to-[#5CE614]/30 flex items-center justify-center text-[#3F6136] text-[11px] font-bold">
                                        {user!.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-[13px] font-semibold text-[#111] max-w-[80px] truncate">
                                        {user!.name.split(" ")[0]}
                                    </span>
                                </button>

                                {showUserMenu && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                        <div className="absolute right-0 top-12 z-50 bg-white rounded-2xl shadow-lg border border-stone-100 py-2 min-w-[180px]">
                                            <Link href="/account" onClick={() => setShowUserMenu(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors">
                                                <User className="w-4 h-4 text-stone-400" /> My Account
                                            </Link>
                                            <Link href="/account/orders" onClick={() => setShowUserMenu(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors">
                                                <ShoppingCart className="w-4 h-4 text-stone-400" /> Orders
                                            </Link>
                                            <div className="border-t border-stone-100 my-1" />
                                            <button onClick={() => { setShowUserMenu(false); logout(); }}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-red-500 hover:bg-red-50 w-full text-left transition-colors">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="flex items-center gap-2 h-9 px-4 rounded-full bg-[#111] hover:bg-[#5CE614] text-white hover:text-black font-bold text-[13px] transition-colors"
                            >
                                <CircleUserRound className="h-4 w-4" />
                                <span className="hidden sm:block">Log In</span>
                            </button>
                        )}

                        <button className="md:hidden text-[#111] hover:text-[#5CE614]">
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                defaultTab="login"
            />
        </>
    );
}
