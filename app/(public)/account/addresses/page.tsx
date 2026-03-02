"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus, Trash2, Star, Loader2, X } from "lucide-react";
import { addressesApi, ApiAddress } from "@/lib/api/orders";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/client";

const EMPTY_FORM: Omit<ApiAddress, "_id"> = {
    label: "Home", name: "", line1: "", line2: "", city: "", postcode: "", country: "Egypt", phone: "", isDefault: false,
};

export default function AddressesPage() {
    const { isAuthenticated } = useAuth();
    const [addresses, setAddresses] = useState<ApiAddress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Omit<ApiAddress, "_id">>(EMPTY_FORM);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) { setIsLoading(false); return; }
        addressesApi.list().then((r) => setAddresses(r.data)).finally(() => setIsLoading(false));
    }, [isAuthenticated]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!form.name || !form.line1 || !form.city || !form.postcode || !form.country) {
            setError("Please fill in all required fields."); return;
        }
        setIsSaving(true);
        try {
            const res = await addressesApi.add(form);
            setAddresses(res.data);
            setShowForm(false);
            setForm(EMPTY_FORM);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Failed to save address.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSetDefault = async (id: string) => {
        const res = await addressesApi.setDefault(id);
        setAddresses(res.data);
    };

    const handleDelete = async (id: string) => {
        const res = await addressesApi.delete(id);
        setAddresses(res.data);
    };

    if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-[#5CE614]" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-[#111]">Delivery Addresses</h1>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold rounded-xl h-10 px-5 shadow-none">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Address
                    </Button>
                )}
            </div>

            {/* Add address form */}
            {showForm && (
                <div className="bg-[#FAFAFA] rounded-2xl border border-stone-200 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-[16px] text-[#111]">New Address</h2>
                        <button onClick={() => { setShowForm(false); setError(""); setForm(EMPTY_FORM); }}
                            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Label</label>
                                <Input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Home / Work" className="h-11 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Full Name *</label>
                                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jane Doe" className="h-11 rounded-xl" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Street Address *</label>
                            <Input value={form.line1} onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))} placeholder="123 Blossom Lane" className="h-11 rounded-xl" />
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Apt / Suite (optional)</label>
                            <Input value={form.line2} onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))} placeholder="Apt 4B" className="h-11 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">City *</label>
                                <Input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder="Cairo" className="h-11 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Postcode *</label>
                                <Input value={form.postcode} onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))} placeholder="11743" className="h-11 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Country *</label>
                                <Input value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} placeholder="Egypt" className="h-11 rounded-xl" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[13px] font-semibold text-[#111] mb-1.5">Phone (optional)</label>
                            <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+20 100 000 0000" className="h-11 rounded-xl" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isDefault" checked={form.isDefault}
                                onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                                className="w-4 h-4 accent-[#5CE614] rounded" />
                            <label htmlFor="isDefault" className="text-[13px] font-semibold text-[#111]">Set as default address</label>
                        </div>
                        <Button type="submit" disabled={isSaving} className="w-full h-11 bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold rounded-xl shadow-none">
                            {isSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving…</> : "Save Address"}
                        </Button>
                    </form>
                </div>
            )}

            {/* Address cards */}
            {addresses.length === 0 && !showForm ? (
                <div className="text-center py-16">
                    <MapPin className="w-12 h-12 mx-auto text-stone-200 mb-3" />
                    <p className="text-stone-400 text-[14px]">No addresses saved yet. Add one to speed up checkout.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                        <div key={addr._id} className={`relative rounded-2xl border p-5 transition-all ${addr.isDefault ? "border-[#5CE614] bg-[#F6FBF4]" : "border-stone-100 bg-[#FAFAFA]"}`}>
                            {addr.isDefault && (
                                <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#5CE614]/20 text-[#3F6136] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="w-2.5 h-2.5 fill-current" /> Default
                                </span>
                            )}
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-2">{addr.label}</p>
                            <p className="font-bold text-[15px] text-[#111]">{addr.name}</p>
                            <p className="text-[13px] text-stone-500 mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                            <p className="text-[13px] text-stone-500">{addr.city}, {addr.postcode}, {addr.country}</p>
                            {addr.phone && <p className="text-[13px] text-stone-500 mt-0.5">{addr.phone}</p>}
                            <div className="flex gap-3 mt-4">
                                {!addr.isDefault && (
                                    <button onClick={() => handleSetDefault(addr._id!)}
                                        className="text-[12px] font-bold text-stone-500 hover:text-[#3F6136] transition-colors">
                                        Set Default
                                    </button>
                                )}
                                <button onClick={() => handleDelete(addr._id!)}
                                    className="text-[12px] font-bold text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto">
                                    <Trash2 className="w-3.5 h-3.5" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
