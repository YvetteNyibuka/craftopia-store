"use client";

import Link from "next/link";
import { ChevronRight, Save, Bell, Shield, CreditCard, Globe, Palette, Users } from "lucide-react";

const settingSections = [
    {
        icon: Globe,
        title: "Store Information",
        desc: "Business name, address, currency and timezone.",
        fields: [
            { label: "Store Name", value: "Floral & Home", type: "text" },
            { label: "Store Email", value: "hello@floralandhome.com", type: "email" },
            { label: "Currency", value: "USD ($)", type: "select" },
            { label: "Timezone", value: "GMT+2 — Cairo", type: "select" },
        ],
    },
    {
        icon: Bell,
        title: "Notifications",
        desc: "Configure email and push notification preferences.",
        toggles: [
            { label: "New order notifications", on: true },
            { label: "Low stock alerts", on: true },
            { label: "Customer reviews", on: false },
            { label: "Weekly sales report", on: true },
        ],
    },
    {
        icon: Shield,
        title: "Security",
        desc: "Two-factor authentication and session management.",
        toggles: [
            { label: "Two-factor authentication", on: true },
            { label: "Login alerts", on: true },
            { label: "API access enabled", on: false },
        ],
    },
    {
        icon: Palette,
        title: "Appearance",
        desc: "Theme, logo and storefront branding settings.",
        toggles: [
            { label: "Dark mode for admin panel", on: false },
            { label: "Show stock count on product pages", on: true },
        ],
    },
];

function Toggle({ on }: { on: boolean }) {
    return (
        <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${on ? "bg-[#5CE614]" : "bg-stone-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${on ? "right-0.5" : "left-0.5"}`} />
        </div>
    );
}

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 max-w-[860px]">
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">System Settings</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">System Settings</h1>
                    <p className="text-[15px] text-stone-500">Manage your store preferences and configurations.</p>
                </div>
                <button className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Users, label: "Admin Users", value: "3" },
                    { icon: Shield, label: "Security Score", value: "94%" },
                    { icon: CreditCard, label: "Plan", value: "Pro" },
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#E9F4E5] flex items-center justify-center text-[#5CE614] flex-shrink-0">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-stone-400">{label}</p>
                            <p className="text-[20px] font-bold text-[#111] leading-tight">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Settings Sections */}
            <div className="space-y-5 pb-10">
                {settingSections.map((section) => (
                    <div key={section.title} className="bg-white rounded-[24px] border border-stone-200 shadow-sm overflow-hidden">
                        {/* Section header */}
                        <div className="flex items-center gap-4 px-7 py-5 border-b border-stone-100">
                            <div className="w-9 h-9 rounded-xl bg-[#E9F4E5] flex items-center justify-center text-[#5CE614] flex-shrink-0">
                                <section.icon className="w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <h2 className="text-[16px] font-bold text-[#111]">{section.title}</h2>
                                <p className="text-[13px] text-stone-400 mt-0.5">{section.desc}</p>
                            </div>
                        </div>

                        {/* Fields */}
                        {"fields" in section && section.fields && (
                            <div className="divide-y divide-stone-50">
                                {section.fields.map((field) => (
                                    <div key={field.label} className="flex items-center justify-between px-7 py-4 gap-6">
                                        <label className="text-[14px] font-semibold text-stone-600 min-w-[160px]">{field.label}</label>
                                        <input
                                            type={field.type}
                                            defaultValue={field.value}
                                            className="flex-1 max-w-sm h-10 px-4 bg-[#F4F5F6] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Toggles */}
                        {"toggles" in section && section.toggles && (
                            <div className="divide-y divide-stone-50">
                                {section.toggles.map((toggle) => (
                                    <div key={toggle.label} className="flex items-center justify-between px-7 py-4 gap-6">
                                        <p className="text-[14px] font-semibold text-stone-700">{toggle.label}</p>
                                        <Toggle on={toggle.on} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Danger Zone */}
                <div className="bg-white rounded-[24px] border border-red-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 px-7 py-5 border-b border-red-50">
                        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                            <Shield className="w-[18px] h-[18px]" />
                        </div>
                        <div>
                            <h2 className="text-[16px] font-bold text-red-600">Danger Zone</h2>
                            <p className="text-[13px] text-stone-400 mt-0.5">Irreversible actions. Proceed with caution.</p>
                        </div>
                    </div>
                    <div className="px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-[14px] font-bold text-[#111]">Clear All Cache</p>
                            <p className="text-[13px] text-stone-400 mt-0.5">Force-refresh all cached data on the storefront.</p>
                        </div>
                        <button className="px-6 h-10 rounded-full border border-stone-200 text-[13px] font-bold text-stone-600 hover:bg-stone-50 transition-colors whitespace-nowrap">
                            Clear Cache
                        </button>
                    </div>
                    <div className="px-7 py-5 border-t border-red-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-[14px] font-bold text-red-600">Delete Store Data</p>
                            <p className="text-[13px] text-stone-400 mt-0.5">Permanently removes all products, orders and customers.</p>
                        </div>
                        <button className="px-6 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-[13px] font-bold transition-colors whitespace-nowrap shadow-sm">
                            Delete All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
