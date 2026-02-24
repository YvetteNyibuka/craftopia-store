"use client";

import Image from "next/image";
import { Search, Bell } from "lucide-react";

export function AdminTopNav() {
    return (
        <header className="h-16 flex items-center justify-between border-b border-[#EBEBEB] bg-white px-8 flex-shrink-0">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search orders, products or customers..."
                    className="w-[340px] h-10 bg-[#F4F5F6] rounded-full pl-11 pr-5 text-[13px] outline-none placeholder:text-stone-400 text-stone-700 focus:ring-2 focus:ring-[#5CE614] transition-shadow"
                />
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-6">
                {/* Bell */}
                <button className="relative text-stone-500 hover:text-[#111] transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#D0021B] border-2 border-white" />
                </button>

                {/* Profile with Craftopia icon mark */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-[14px] font-bold text-[#111] leading-none">Alex Rivera</p>
                        <p className="text-[12px] text-stone-400 mt-0.5">Store Admin</p>
                    </div>
                    {/* Avatar: styled initials */}
                    <div className="w-9 h-9 rounded-full bg-[#1E3a5F] border-2 border-transparent group-hover:border-[#5CE614] transition-colors flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-[13px] font-bold text-white">AR</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
