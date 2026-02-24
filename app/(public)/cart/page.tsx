"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="font-serif text-3xl font-medium mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added any botanical pieces yet.</p>
                <Link href="/shop">
                    <Button className="bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold rounded-full px-8 h-12 shadow-none border-0">
                        EXPLORE COLLECTIONS
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen max-w-6xl">
            <h1 className="font-serif text-3xl font-medium mb-8 text-[#111]">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm">
                        <div className="grid grid-cols-12 gap-4 text-[11px] font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 p-6 bg-[#FAF9F6]">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-3 text-right">Total</div>
                        </div>

                        <ul className="divide-y divide-stone-100">
                            {items.map((item) => (
                                <li key={item.product.id} className="grid grid-cols-12 gap-4 items-center p-6 bg-white">
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                            <div className="absolute inset-0 bg-stone-200 mix-blend-multiply opacity-30" />
                                        </div>
                                        <div>
                                            <Link href={`/shop/${item.product.slug}`} className="font-semibold text-sm text-[#111] hover:text-primary transition-colors line-clamp-2">
                                                {item.product.title}
                                            </Link>
                                            <p className="text-stone-500 text-xs mt-1">{formatCurrency(item.product.price)}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex justify-center">
                                        <div className="flex items-center border border-stone-200 rounded-lg p-0.5">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-[#111] transition-colors rounded-md hover:bg-stone-50"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-8 text-center text-[13px] font-semibold text-[#111]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-[#111] transition-colors rounded-md hover:bg-stone-50"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex justify-end items-center gap-4">
                                        <span className="font-bold text-[15px] text-[#111]">{formatCurrency(item.product.price * item.quantity)}</span>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-stone-100 shadow-sm sticky top-24">
                        <h2 className="font-serif text-xl font-medium mb-6 text-[#111]">Order Summary</h2>

                        <div className="space-y-4 mb-6 text-sm text-stone-600 font-medium">
                            <div className="flex justify-between">
                                <span>Subtotal ({totalItems()} items)</span>
                                <span className="font-semibold text-[#111]">{formatCurrency(totalPrice())}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-[#5CE614] font-semibold">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Tax</span>
                                <span className="font-semibold text-[#111]">{formatCurrency(totalPrice() * 0.08)}</span>
                            </div>
                        </div>

                        <div className="border-t border-stone-200 pt-5 mb-8 flex justify-between items-end">
                            <span className="font-bold text-[#111] text-lg">Total</span>
                            <div className="text-right">
                                <span className="text-[10px] text-stone-500 font-bold tracking-widest block mb-0.5 uppercase">USD</span>
                                <span className="font-bold text-3xl text-[#5CE614] leading-none">{formatCurrency(totalPrice() * 1.08)}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="block w-full">
                            <Button className="w-full h-14 rounded-2xl bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[16px] shadow-sm flex items-center justify-center">
                                Secure Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
