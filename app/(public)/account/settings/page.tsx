"use client";

import { useState } from "react";
import { User, Camera, Save, Eye, EyeOff } from "lucide-react";

export default function ProfileSettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-[28px] font-bold text-[#111] tracking-tight mb-1">Profile Settings</h1>
                <p className="text-stone-400 text-[14px]">Manage your personal information and account security.</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-6 pb-8 border-b border-stone-100">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E9F4E5] to-[#5CE614]/30 flex items-center justify-center text-[#3F6136] text-[28px] font-bold">
                        SJ
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#5CE614] rounded-full flex items-center justify-center shadow-md hover:bg-[#4BD600] transition-colors">
                        <Camera className="w-3.5 h-3.5 text-[#111]" />
                    </button>
                </div>
                <div>
                    <p className="text-[15px] font-bold text-[#111]">Sarah Jenkins</p>
                    <p className="text-[13px] text-stone-400 mt-0.5">sarah@example.com</p>
                    <button className="mt-2 text-[12px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors">
                        Change photo
                    </button>
                </div>
            </div>

            {/* Personal Info */}
            <section>
                <h2 className="text-[16px] font-bold text-[#111] mb-5">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { label: "First Name", value: "Sarah", type: "text" },
                        { label: "Last Name", value: "Jenkins", type: "text" },
                        { label: "Email Address", value: "sarah@example.com", type: "email", span: true },
                        { label: "Phone Number", value: "+20 100 000 0000", type: "tel" },
                        { label: "Date of Birth", value: "1994-06-12", type: "date" },
                    ].map((f) => (
                        <div key={f.label} className={f.span ? "sm:col-span-2" : ""}>
                            <label className="block text-[12px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                                {f.label}
                            </label>
                            <input
                                type={f.type}
                                defaultValue={f.value}
                                className="w-full h-11 px-4 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Preferences */}
            <section className="pt-6 border-t border-stone-100">
                <h2 className="text-[16px] font-bold text-[#111] mb-5">Preferences</h2>
                <div className="space-y-4">
                    {[
                        { label: "Email me about new arrivals and offers", on: true },
                        { label: "Send order updates via SMS", on: true },
                        { label: "Share my data to improve personalisation", on: false },
                    ].map((pref) => (
                        <div key={pref.label} className="flex items-center justify-between py-3 border-b border-stone-50">
                            <p className="text-[14px] text-stone-700 font-medium">{pref.label}</p>
                            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${pref.on ? "bg-[#5CE614]" : "bg-stone-200"}`}>
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${pref.on ? "right-0.5" : "left-0.5"}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Password */}
            <section className="pt-6 border-t border-stone-100">
                <h2 className="text-[16px] font-bold text-[#111] mb-5">Change Password</h2>
                <div className="space-y-4 max-w-sm">
                    <div>
                        <label className="block text-[12px] font-bold text-stone-500 uppercase tracking-wider mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-11 px-4 pr-11 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-bold text-stone-500 uppercase tracking-wider mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                className="w-full h-11 px-4 pr-11 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" onClick={() => setShowNew(!showNew)}>
                                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Save */}
            <div className="pt-4 flex gap-3">
                <button className="flex items-center gap-2 px-7 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] transition-colors shadow-sm">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
                <button className="px-7 h-11 rounded-full border border-stone-200 text-stone-600 font-semibold text-[14px] hover:bg-stone-50 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
}
