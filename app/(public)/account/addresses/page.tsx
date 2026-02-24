"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Home, Building2, CheckCircle2 } from "lucide-react";

const initialAddresses = [
    {
        id: "a1",
        label: "Home",
        icon: Home,
        name: "Sarah Jenkins",
        line1: "14 Bluebell Lane",
        line2: "Maadi, Cairo",
        city: "Cairo",
        country: "Egypt",
        postcode: "11743",
        phone: "+20 100 000 0000",
        isDefault: true,
    },
    {
        id: "a2",
        label: "Office",
        icon: Building2,
        name: "Sarah Jenkins",
        line1: "Suite 4B, Garden City Tower",
        line2: "Garden City, Cairo",
        city: "Cairo",
        country: "Egypt",
        postcode: "11561",
        phone: "+20 110 000 0000",
        isDefault: false,
    },
];

export default function AddressesPage() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showForm, setShowForm] = useState(false);

    const remove = (id: string) => setAddresses((a) => a.filter((addr) => addr.id !== id));
    const setDefault = (id: string) =>
        setAddresses((a) => a.map((addr) => ({ ...addr, isDefault: addr.id === id })));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111] tracking-tight mb-1">Addresses</h1>
                    <p className="text-stone-400 text-[14px]">Manage your delivery addresses.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Address
                </button>
            </div>

            {/* Add form */}
            {showForm && (
                <div className="bg-[#F7F9F7] rounded-2xl p-7 border border-[#d4edc9]">
                    <h2 className="text-[15px] font-bold text-[#111] mb-5">New Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", placeholder: "Sarah Jenkins" },
                            { label: "Phone", placeholder: "+20 100 000 000" },
                            { label: "Address Line 1", placeholder: "Street address", span: true },
                            { label: "Address Line 2 (optional)", placeholder: "Apt, suite, etc.", span: true },
                            { label: "City", placeholder: "Cairo" },
                            { label: "Postcode", placeholder: "11743" },
                            { label: "Country", placeholder: "Egypt" },
                        ].map((f) => (
                            <div key={f.label} className={f.span ? "sm:col-span-2" : ""}>
                                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                                <input
                                    placeholder={f.placeholder}
                                    className="w-full h-11 px-4 bg-white rounded-xl border border-stone-200 text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-5">
                        <button className="px-6 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] transition-colors">
                            Save Address
                        </button>
                        <button onClick={() => setShowForm(false)} className="px-6 h-10 rounded-full border border-stone-200 text-stone-600 font-semibold text-[13px] hover:bg-stone-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Address Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className={`relative rounded-2xl p-6 border transition-all ${addr.isDefault
                                ? "border-[#5CE614] bg-[#F7FBF4] shadow-sm"
                                : "border-stone-200 bg-white hover:border-stone-300"
                            }`}
                    >
                        {addr.isDefault && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 text-[#3F6136] text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5CE614]" /> Default
                            </div>
                        )}

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-[#E9F4E5] rounded-full flex items-center justify-center text-[#3F6136]">
                                <addr.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[14px] font-bold text-[#111]">{addr.label}</span>
                        </div>

                        <p className="text-[14px] font-semibold text-[#111] mb-0.5">{addr.name}</p>
                        <p className="text-[13px] text-stone-500">{addr.line1}</p>
                        <p className="text-[13px] text-stone-500">{addr.line2}</p>
                        <p className="text-[13px] text-stone-500">{addr.city}, {addr.postcode}</p>
                        <p className="text-[13px] text-stone-500">{addr.country}</p>
                        <p className="text-[13px] text-stone-400 mt-1">{addr.phone}</p>

                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-100">
                            <button className="flex items-center gap-1.5 text-[12px] font-bold text-stone-500 hover:text-[#111] transition-colors">
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => remove(addr.id)}
                                className="flex items-center gap-1.5 text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                            {!addr.isDefault && (
                                <button
                                    onClick={() => setDefault(addr.id)}
                                    className="ml-auto text-[12px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors"
                                >
                                    Set as default
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {addresses.length === 0 && (
                <div className="flex flex-col items-center py-20 text-center">
                    <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-[15px] font-bold text-[#111] mb-1">No addresses saved</p>
                    <p className="text-stone-400 text-[13px]">Add an address to speed up checkout.</p>
                </div>
            )}
        </div>
    );
}
