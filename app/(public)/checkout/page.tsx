"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, ArrowRight, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/format";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, totalPrice } = useCartStore();
    const subtotal = totalPrice();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const [paymentMethod, setPaymentMethod] = useState("card");

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
            <Link href="/cart" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-[#111] mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
            </Link>

            <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#111] mb-2 tracking-tight">Secure Checkout</h1>
                <p className="text-stone-500 text-[15px]">Complete your order by providing your delivery and payment information below.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="w-full lg:w-[55%]">
                    {/* Section 1 */}
                    <div className="mb-10">
                        <h2 className="flex items-center text-xl font-bold text-[#111] mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9F4E5] text-[#3F6136] text-[15px] font-bold mr-3">1</span>
                            Delivery Details
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">First Name</label>
                                <Input placeholder="Jane" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Last Name</label>
                                <Input placeholder="Doe" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Street Address</label>
                            <Input placeholder="123 Blossom Lane" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">City</label>
                                <Input placeholder="Portland" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">ZIP Code</label>
                                <Input placeholder="97201" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-10">
                        <h2 className="flex items-center text-xl font-bold text-[#111] mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9F4E5] text-[#3F6136] text-[15px] font-bold mr-3">2</span>
                            Payment Method
                        </h2>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <button
                                className={`py-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-colors relative ${paymentMethod === 'card' ? 'border-[#5CE614] bg-[#5CE614]/5' : 'border-stone-200 hover:border-stone-300'}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                {paymentMethod === 'card' && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-[#5CE614] fill-white" />}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={paymentMethod === 'card' ? 'text-[#111]' : 'text-stone-400'}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                <span className={`text-xs font-bold tracking-widest uppercase ${paymentMethod === 'card' ? 'text-[#111]' : 'text-stone-500'}`}>CARD</span>
                            </button>
                            <button
                                className={`py-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-colors relative ${paymentMethod === 'paypal' ? 'border-[#5CE614] bg-[#5CE614]/5' : 'border-stone-200 hover:border-stone-300'}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                {paymentMethod === 'paypal' && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-[#5CE614] fill-white" />}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={paymentMethod === 'paypal' ? 'text-[#111]' : 'text-stone-400'}><path d="M7 11.5V14m0-2.5h2.5a2.5 2.5 0 1 0 0-5H6.5a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 1.5 1.5h1m5-4v2.5M15 14v-2.5m0-2.5h2.5a2.5 2.5 0 1 0 0-5H14a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 1.5 1.5h1m5-4v2.5" /></svg>
                                <span className={`text-xs font-bold tracking-widest uppercase ${paymentMethod === 'paypal' ? 'text-[#111]' : 'text-stone-500'}`}>PAYPAL</span>
                            </button>
                            <button
                                className={`py-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-colors relative ${paymentMethod === 'transfer' ? 'border-[#5CE614] bg-[#5CE614]/5' : 'border-stone-200 hover:border-stone-300'}`}
                                onClick={() => setPaymentMethod('transfer')}
                            >
                                {paymentMethod === 'transfer' && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-[#5CE614] fill-white" />}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={paymentMethod === 'transfer' ? 'text-[#111]' : 'text-stone-400'}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" /></svg>
                                <span className={`text-xs font-bold tracking-widest uppercase ${paymentMethod === 'transfer' ? 'text-[#111]' : 'text-stone-500'}`}>TRANSFER</span>
                            </button>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
                                <div>
                                    <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Card Number</label>
                                    <div className="relative">
                                        <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px] tracking-wide" />
                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Expiry Date</label>
                                        <Input placeholder="MM/YY" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">CVV</label>
                                        <Input placeholder="123" type="password" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F6FBF4] p-4 rounded-xl text-sm text-[#46693D] border border-[#D5EED0]">
                        <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                        <p>Your payment data is encrypted and secure. We never store your CVV.</p>
                    </div>
                </div>

                <div className="w-full lg:w-[45%]">
                    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm sticky top-24">
                        <h2 className="font-bold text-[#111] text-[22px] mb-6">Order Summary</h2>

                        <div className="space-y-6 mb-8">
                            {items.length === 0 ? (
                                <div className="py-8 text-center text-stone-500 border-b border-stone-100">
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 border-b border-stone-100 pb-6">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 items-center">
                                            <div className="relative w-[70px] h-[70px] bg-stone-100 rounded-xl flex-shrink-0">
                                                <div className="absolute inset-0 bg-stone-200 mix-blend-multiply opacity-50 rounded-xl" />
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#5CE614] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[14px] text-[#111] leading-tight">{item.product.title}</h4>
                                                <p className="text-[12px] text-stone-500 mt-0.5 max-w-[150px] truncate">{item.product.category}</p>
                                            </div>
                                            <div className="font-bold text-[15px] text-[#111]">
                                                {formatCurrency(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#5CE614] mb-2">DISCOUNT CODE</label>
                            <div className="flex gap-3">
                                <Input placeholder="FLORAL20" className="flex-1 h-12 rounded-xl focus:border-[#5CE614] text-[15px] tracking-widest uppercase font-medium bg-white" defaultValue="FLORAL20" />
                                <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-[#111]">
                                    Apply
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-stone-100 text-[14px] text-[#111] font-bold mb-6">
                            <div className="flex justify-between text-stone-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-[#111] font-bold">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-stone-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-[#5CE614] font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-stone-500 font-medium">
                                <span>Estimated Tax</span>
                                <span className="text-[#111] font-bold">{formatCurrency(tax)}</span>
                            </div>
                        </div>

                        <div className="border-t border-stone-100 pt-5 mb-8 flex items-end justify-between">
                            <span className="font-bold text-[18px] text-[#111]">Total</span>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-stone-400 block mb-0.5 tracking-wider uppercase">USD</span>
                                <span className="font-bold text-[32px] text-[#5CE614] leading-none">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold text-[16px] shadow-sm flex items-center justify-center">
                            Complete Purchase <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <p className="text-[11px] text-center text-stone-500 mt-4 px-4 leading-relaxed">
                            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> SSL Secure Payment
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" /> Tracked Delivery
                    </div>
                </div>
                <div className="flex gap-6">
                    <Link href="/" className="hover:text-stone-600 transition-colors">Privacy Policy</Link>
                    <Link href="/" className="hover:text-stone-600 transition-colors">Terms of Service</Link>
                    <Link href="/" className="hover:text-stone-600 transition-colors">Help Center</Link>
                </div>
            </div>
        </div>
    );
}
