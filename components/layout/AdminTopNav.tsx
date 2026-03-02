"use client";

import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";

interface AdminTopNavProps {
  onMenuClick?: () => void;
}

export function AdminTopNav({ onMenuClick }: AdminTopNavProps) {
  return (
    <header className="h-14 sm:h-16 flex items-center justify-between border-b border-[#EBEBEB] bg-white px-3 sm:px-6 md:px-8 shrink-0">
      {/* Mobile menu button + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-stone-600" />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 sm:h-10 bg-[#F4F5F6] rounded-full pl-9 sm:pl-11 pr-3 sm:pr-5 text-xs sm:text-[13px] outline-none placeholder:text-stone-400 text-stone-700 focus:ring-2 focus:ring-[#5CE614] transition-shadow"
          />
        </div>
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Bell */}
        <button className="relative text-stone-500 hover:text-[#111] transition-colors w-9 h-9 flex items-center justify-center">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#D0021B] border border-white" />
        </button>

        {/* Profile with Craftopia icon mark */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-[13px] sm:text-[14px] font-bold text-[#111] leading-none">
              Alex Rivera
            </p>
            <p className="text-[11px] sm:text-[12px] text-stone-400 mt-0.5">
              Store Admin
            </p>
          </div>
          {/* Avatar: styled initials */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1E3a5F] border-2 border-transparent group-hover:border-[#5CE614] transition-colors flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[11px] sm:text-[13px] font-bold text-white">
              AR
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
