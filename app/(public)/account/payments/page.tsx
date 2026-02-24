"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2, Shield, CheckCircle2, Pencil } from "lucide-react";

const savedCards = [
    {
        id: "c1",
        brand: "Visa",
        last4: "4242",
        expiry: "08 / 26",
        holder: "Sarah Jenkins",
        isDefault: true,
    },
    {
        id: "c2",
        brand: "Mastercard",
        last4: "8814",
        expiry: "02 / 25",
        holder: "Sarah Jenkins",
        isDefault: false,
    },
];

const brandColor: Record<string, string> = {
    Visa: "bg-blue-600",
    Mastercard: "bg-red-500",
    Amex: "bg-blue-400",
};

function CardVisual({ card }: { card: typeof savedCards[0] }) {
    return (
        <div className={`relative w-full h-[140px] rounded-2xl ${brandColor[card.brand] ?? "bg-stone-700"} p-5 overflow-hidden`}>
            {/* background circles */}
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-2 w-28 h-28 rounded-full bg-white/10" />

            <div className="flex justify-between items-start mb-4">
                <span className="text-white/90 text-[12px] font-bold tracking-widest">{card.brand.toUpperCase()}</span>
                <CreditCard className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-white font-mono text-[15px] tracking-[4px] mb-3">
                •••• •••• •••• {card.last4}
            </p>
            <div className="flex justify-between text-white/80 text-[11px] font-medium">
                <span>{card.holder}</span>
                <span>Exp {card.expiry}</span>
            </div>
        </div>
    );
}

export default function PaymentsPage() {
    const [cards, setCards] = useState(savedCards);
    const [showForm, setShowForm] = useState(false);

    const remove = (id: string) => setCards((c) => c.filter((card) => card.id !== id));
    const setDefault = (id: string) =>
        setCards((c) => c.map((card) => ({ ...card, isDefault: card.id === id })));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111] tracking-tight mb-1">Payment Methods</h1>
                    <p className="text-stone-400 text-[14px]">Manage your saved cards and billing preferences.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Card
                </button>
            </div>

            {/* SSL badge */}
            <div className="flex items-center gap-2 bg-[#F7FBF4] border border-[#d4edc9] rounded-xl px-4 py-3">
                <Shield className="w-4 h-4 text-[#5CE614] flex-shrink-0" />
                <p className="text-[13px] text-[#3F6136] font-medium">
                    All payment information is encrypted and stored securely. We never store full card numbers.
                </p>
            </div>

            {/* Add Card Form */}
            {showForm && (
                <div className="bg-[#F7F9F7] rounded-2xl p-7 border border-[#d4edc9]">
                    <h2 className="text-[15px] font-bold text-[#111] mb-5">New Card</h2>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Cardholder Name</label>
                            <input placeholder="Sarah Jenkins" className="w-full h-11 px-4 bg-white rounded-xl border border-stone-200 text-[14px] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Card Number</label>
                            <input placeholder="1234 5678 9012 3456" className="w-full h-11 px-4 bg-white rounded-xl border border-stone-200 text-[14px] font-mono outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                                <input placeholder="MM / YY" className="w-full h-11 px-4 bg-white rounded-xl border border-stone-200 text-[14px] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">CVV</label>
                                <input placeholder="•••" className="w-full h-11 px-4 bg-white rounded-xl border border-stone-200 text-[14px] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                        <button className="px-6 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] transition-colors">
                            Save Card
                        </button>
                        <button onClick={() => setShowForm(false)} className="px-6 h-10 rounded-full border border-stone-200 text-stone-600 font-semibold text-[13px] hover:bg-stone-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Saved Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`rounded-2xl border p-5 transition-all ${card.isDefault ? "border-[#5CE614] bg-[#F7FBF4]" : "border-stone-200 bg-white hover:border-stone-300"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[13px] font-bold text-stone-500">Saved card</span>
                            {card.isDefault && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#3F6136]">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5CE614]" /> Default
                                </span>
                            )}
                        </div>

                        <CardVisual card={card} />

                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-100">
                            <button className="flex items-center gap-1.5 text-[12px] font-bold text-stone-500 hover:text-[#111] transition-colors">
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => remove(card.id)}
                                className="flex items-center gap-1.5 text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                            {!card.isDefault && (
                                <button
                                    onClick={() => setDefault(card.id)}
                                    className="ml-auto text-[12px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors"
                                >
                                    Set as default
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {cards.length === 0 && (
                <div className="flex flex-col items-center py-20 text-center">
                    <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-[15px] font-bold text-[#111] mb-1">No cards saved</p>
                    <p className="text-stone-400 text-[13px]">Add a card to speed up checkout.</p>
                </div>
            )}

            {/* Billing history quick link */}
            <div className="border-t border-stone-100 pt-6">
                <h2 className="text-[15px] font-bold text-[#111] mb-4">Recent Billing</h2>
                <div className="space-y-3">
                    {[
                        { date: "24 Mar 2024", desc: "Order #ORD-9021 — Midnight Rose Bouquet", amount: "$115.50", status: "Paid" },
                        { date: "25 Mar 2024", desc: "Order #ORD-9022 — Artisanal Luna Vase", amount: "$89.00", status: "Paid" },
                        { date: "26 Mar 2024", desc: "Order #ORD-9023 — 4-item order", amount: "$245.00", status: "Paid" },
                    ].map((tx) => (
                        <div key={tx.date} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                            <div>
                                <p className="text-[13px] font-semibold text-[#111]">{tx.desc}</p>
                                <p className="text-[11px] text-stone-400 mt-0.5">{tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[14px] font-bold text-[#111]">{tx.amount}</p>
                                <span className="text-[10px] font-bold text-[#3F6136] bg-[#E9F4E5] px-2 py-0.5 rounded-full">{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
