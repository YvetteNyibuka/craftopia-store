"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    Layers,
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Collections", href: "/admin/collections", icon: Layers },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Homepage Manager", href: "/admin/homepage-manager", icon: FileText },
    { name: "Customers", href: "/admin/customers", icon: Users },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-[240px] flex-shrink-0 flex-col border-r border-[#EBEBEB] bg-white">

            {/* Logo area */}
            <div className="flex h-16 items-center gap-2.5 px-4 border-b border-[#EBEBEB]">
                {/* Icon mark — cropped square logo, looks clean at small size */}
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100 shadow-sm">
                    <Image
                        src="/CraftopiaLogo/IconLogo.png"
                        alt="Craftopia"
                        width={36}
                        height={36}
                        className="object-cover object-center w-full h-full"
                        priority
                    />
                </div>
                <div className="leading-none">
                    <p className="font-serif text-[17px] font-semibold text-[#1E3a5F] tracking-tight leading-none">Craftopia</p>
                    <p className="text-[10px] text-[#5CE614] font-bold uppercase tracking-widest mt-1">Admin Panel</p>
                </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 pt-5 space-y-1">
                {navigation.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-[11px] rounded-xl text-[14px] font-semibold transition-colors ${isActive
                                    ? "bg-[#5CE614] text-white shadow-sm"
                                    : "text-[#6B7280] hover:bg-stone-100 hover:text-[#111]"
                                }`}
                        >
                            <item.icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? "text-white" : "text-[#9CA3AF]"}`} />
                            {item.name}
                        </Link>
                    );
                })}

                {/* Settings group */}
                <div className="pt-6">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
                        Settings
                    </p>
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-4 py-[11px] rounded-xl text-[14px] font-semibold transition-colors ${pathname === "/admin/settings"
                                ? "bg-[#5CE614] text-white shadow-sm"
                                : "text-[#6B7280] hover:bg-stone-100 hover:text-[#111]"
                            }`}
                    >
                        <Settings className={`h-[18px] w-[18px] flex-shrink-0 ${pathname === "/admin/settings" ? "text-white" : "text-[#9CA3AF]"}`} />
                        System Settings
                    </Link>
                </div>
            </nav>

            {/* Stock status hint */}
            <div className="p-4 border-t border-[#EBEBEB]">
                <div className="bg-[#F0FBE8] rounded-2xl px-4 py-4">
                    <p className="text-[12px] font-bold text-[#3F6136] mb-2">Stock Status</p>
                    <div className="h-1.5 w-full rounded-full bg-[#C9E9B0] overflow-hidden mb-2">
                        <div className="h-full bg-[#5CE614] rounded-full" style={{ width: "80%" }} />
                    </div>
                    <p className="text-[11px] text-[#5A7E4A]">80% of items in healthy stock</p>
                </div>
            </div>
        </aside>
    );
}
