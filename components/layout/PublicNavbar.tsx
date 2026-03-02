"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  CircleUserRound,
  Search,
  Menu,
  LogOut,
  User,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

export function PublicNavbar() {
  const { itemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#EBEBEB] bg-white">
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-16 sm:h-18 md:h-20 flex items-center justify-between max-w-screen-2xl">
          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] overflow-hidden shrink-0">
              <Image
                src="/CraftopiaLogo/PrimaryLogo.png"
                alt="Craftopia"
                width={100}
                height={50}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />
            </div>
            <span className="font-serif text-base sm:text-lg md:text-[20px] font-semibold tracking-tight text-[#1E3A5F] group-hover:text-[#5CE614] transition-colors leading-none">
              Craftopia
            </span>
          </Link>

          {/* ── CENTRE: Nav links ── */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-sm xl:text-[14px] font-medium text-[#111] flex-1 justify-center">
            <Link
              href="/"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              About
            </Link>
            <Link
              href="/shop"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              Collections
            </Link>
            <Link
              href="/sustainability"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              Sustainability
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#5CE614] transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* ── RIGHT: Search + Cart + Account ── */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-40 lg:w-48 xl:w-55 h-9 md:h-10 bg-[#F4F5F6] rounded-full pl-10 pr-4 text-xs md:text-[13px] outline-none placeholder:text-stone-400 text-stone-700 focus:ring-1 focus:ring-[#5CE614]"
              />
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-stone-100 text-[#111] hover:text-[#5CE614] transition-colors"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-0.5 sm:right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5CE614] text-[9px] sm:text-[10px] font-bold text-[#111] leading-none">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Account — authenticated shows avatar + dropdown, guest shows modal trigger */}
            {mounted && isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 h-8 md:h-9 px-2 md:px-3 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#E9F4E5] to-[#5CE614]/30 flex items-center justify-center text-[#3F6136] text-[10px] md:text-[11px] font-bold">
                    {user!.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden lg:block text-xs md:text-[13px] font-semibold text-[#111] max-w-16 md:max-w-20 truncate">
                    {user!.name.split(" ")[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-12 z-50 bg-white rounded-2xl shadow-lg border border-stone-100 py-2 min-w-[180px]">
                      <Link
                        href="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-stone-400" /> My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 text-stone-400" />{" "}
                        Orders
                      </Link>
                      <div className="border-t border-stone-100 my-1" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-semibold text-red-500 hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 md:gap-2 h-8 md:h-9 px-3 md:px-4 rounded-full bg-[#111] hover:bg-[#5CE614] text-white hover:text-black font-bold text-xs md:text-[13px] transition-colors"
              >
                <CircleUserRound className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden lg:block">Log In</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-stone-100 text-[#111] hover:text-[#5CE614] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-80 md:w-96 bg-white z-50 lg:hidden shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-stone-100">
                <span className="font-serif text-lg font-semibold text-[#1E3A5F]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 md:p-5 border-b border-stone-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-10 md:h-11 bg-[#F4F5F6] rounded-full pl-10 pr-4 text-sm md:text-base outline-none placeholder:text-stone-400 text-stone-700 focus:ring-2 focus:ring-[#5CE614]"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col p-4 md:p-5 gap-1 overflow-y-auto">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/sustainability"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  Sustainability
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                >
                  Contact
                </Link>

                {/* User Section */}
                {mounted && isAuthenticated && (
                  <>
                    <div className="border-t border-stone-100 my-2" />
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4 md:w-5 md:h-5" /> My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 md:py-3.5 text-[15px] md:text-base font-medium text-[#111] hover:bg-stone-50 hover:text-[#5CE614] rounded-lg transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Orders
                    </Link>
                  </>
                )}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 md:p-5 border-t border-stone-100">
                {mounted && isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center justify-center gap-2 w-full h-11 md:h-12 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm md:text-base transition-colors"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" /> Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 w-full h-11 md:h-12 rounded-lg bg-[#111] hover:bg-[#5CE614] text-white hover:text-black font-semibold text-sm md:text-base transition-colors"
                  >
                    <CircleUserRound className="w-4 h-4 md:w-5 md:h-5" /> Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
      />
    </>
  );
}
