"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, ArrowRight, Lock, Loader2, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/format";
import { useAuth } from "@/contexts/AuthContext";
import { ordersApi } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";

export default function CheckoutPage() {
    const { items, subtotal, total, clearCart } = useCartStore();
    const { user } = useAuth();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    // Delivery fields
    const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] ?? "");
    const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("Egypt");

    const tax = subtotal * 0.08;
    const orderTotal = total + tax;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) { setError("Your cart is empty."); return; }
        if (!firstName || !lastName || !email || !line1 || !city || !postcode) {
            setError("Please fill in all delivery fields.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            const payload = {
                customerName: `${firstName} ${lastName}`.trim(),
                customerEmail: email,
                ...(user ? { customer: user._id } : {}),
                items: items.map((i) => ({
                    product: i.productId,
                    title: i.title,
                    image: i.image,
                    price: i.price,
                    quantity: i.quantity,
                    variant: i.variant,
                })),
                shippingAddress: { label: "Delivery", name: `${firstName} ${lastName}`, line1, city, postcode, country, phone },
                subtotal,
                shippingCost: 0,
                discount: 0,
                total: orderTotal,
                paymentMethod,
            };

            const res = await ordersApi.create(payload);
            await clearCart();
            setOrderNumber(res.data.orderNumber);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Order submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Success state ─────────────────────────────────────────────────────────

    if (orderNumber) {
        return (
            <div className="container mx-auto px-4 py-24 max-w-lg text-center min-h-[70vh] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#E9F8E5] flex items-center justify-center mx-auto mb-6">
                    <CheckCheck className="w-10 h-10 text-[#5CE614]" />
                </div>
                <h1 className="text-[32px] font-bold text-[#111] mb-3">Order Placed! 🎉</h1>
                <p className="text-stone-500 mb-2">Thank you for your purchase. Your order number is:</p>
                <p className="text-[22px] font-bold text-[#5CE614] mb-8">{orderNumber}</p>
                <p className="text-stone-400 text-[13px] mb-8">We'll send a confirmation to <strong>{email}</strong>. You can track your order in your account.</p>
                <div className="flex gap-4">
                    <Link href="/account/orders">
                        <Button className="bg-[#111] hover:bg-[#5CE614] hover:text-black text-white font-bold rounded-full px-6 h-12 transition-colors">
                            View Orders
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-full px-6 h-12 font-bold border-stone-200">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
            <Link href="/cart" className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-[#111] mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
            </Link>

            <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#111] mb-2 tracking-tight">Secure Checkout</h1>
                <p className="text-stone-500 text-[15px]">Complete your order by providing your delivery and payment information.</p>
            </div>

            {error && (
                <div className="mb-6 px-5 py-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-600 font-medium">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Left — Delivery + Payment */}
                <div className="w-full lg:w-[55%] space-y-10">

                    {/* Delivery */}
                    <div>
                        <h2 className="flex items-center text-xl font-bold text-[#111] mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9F4E5] text-[#3F6136] text-[15px] font-bold mr-3">1</span>
                            Delivery Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">First Name</label>
                                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Last Name</label>
                                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Email</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Street Address</label>
                            <Input value={line1} onChange={(e) => setLine1(e.target.value)} placeholder="123 Blossom Lane" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">City</label>
                                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cairo" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Postcode</label>
                                <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="11743" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#111] mb-1.5 ml-1">Country</label>
                            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Egypt" className="h-12 rounded-xl border-stone-200 focus:border-[#5CE614] bg-white text-[15px]" />
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <h2 className="flex items-center text-xl font-bold text-[#111] mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9F4E5] text-[#3F6136] text-[15px] font-bold mr-3">2</span>
                            Payment Method
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { id: "card", label: "CARD" },
                                { id: "paypal", label: "PAYPAL" },
                                { id: "transfer", label: "TRANSFER" },
                            ].map((pm) => (
                                <button key={pm.id} type="button"
                                    className={`py-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-colors relative ${paymentMethod === pm.id ? "border-[#5CE614] bg-[#5CE614]/5" : "border-stone-200 hover:border-stone-300"}`}
                                    onClick={() => setPaymentMethod(pm.id)}
                                >
                                    {paymentMethod === pm.id && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-[#5CE614]" />}
                                    <span className={`text-xs font-bold tracking-widest uppercase ${paymentMethod === pm.id ? "text-[#111]" : "text-stone-500"}`}>{pm.label}</span>
                                </button>
                            ))}
                        </div>

                        {paymentMethod === "card" && (
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

                        <div className="flex items-center gap-3 bg-[#F6FBF4] p-4 rounded-xl text-sm text-[#46693D] border border-[#D5EED0] mt-4">
                            <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                            <p>Your payment data is encrypted and secure.</p>
                        </div>
                    </div>
                </div>

                {/* Right — Order summary */}
                <div className="w-full lg:w-[45%]">
                    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm sticky top-24">
                        <h2 className="font-bold text-[#111] text-[22px] mb-6">Order Summary</h2>

                        <div className="space-y-4 border-b border-stone-100 pb-6 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-[60px] h-[60px] bg-stone-100 rounded-xl flex-shrink-0 overflow-hidden relative">
                                        {item.image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        )}
                                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#5CE614] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[13px] text-[#111] line-clamp-1">{item.title}</p>
                                        {item.variant && <p className="text-[11px] text-stone-400">{item.variant}</p>}
                                    </div>
                                    <span className="font-bold text-[14px] text-[#111]">{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-[14px] text-stone-600 font-medium mb-6">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[#111]">{formatCurrency(subtotal)}</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span className="text-[#5CE614] font-bold">Free</span></div>
                            <div className="flex justify-between"><span>Estimated Tax (8%)</span><span className="font-bold text-[#111]">{formatCurrency(tax)}</span></div>
                        </div>

                        <div className="border-t border-stone-100 pt-5 mb-8 flex items-end justify-between">
                            <span className="font-bold text-[18px] text-[#111]">Total</span>
                            <span className="font-bold text-[32px] text-[#5CE614] leading-none">{formatCurrency(orderTotal)}</span>
                        </div>

                        <Button
                            type="submit" disabled={isSubmitting || items.length === 0}
                            className="w-full h-14 rounded-2xl bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold text-[16px] shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</> : <>Complete Purchase <ArrowRight className="ml-1 h-5 w-5" /></>}
                        </Button>

                        <p className="text-[11px] text-center text-stone-500 mt-4 px-4 leading-relaxed">
                            By completing your purchase you agree to our Terms of Service and Privacy Policy.
                        </p>

                        <div className="mt-6 pt-6 border-t border-stone-100 flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> SSL Secure</div>
                            <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Tracked Delivery</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
