"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-8">
            <div className="flex w-full max-w-xl items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders, products or customers..."
                        className="w-full bg-muted/50 border-transparent pl-10 focus-visible:ring-1 focus-visible:bg-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </button>

                <div className="h-8 w-[1px] bg-border mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none">Alex Rivera</p>
                        <p className="text-xs text-green-600 mt-1 cursor-pointer hover:underline">Store Admin</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
                        <span className="text-xs font-semibold text-muted-foreground">AR</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
