"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, ChevronDown, Send } from "lucide-react";

const faqs = [
    {
        q: "How long does delivery take?",
        a: "Fresh floral arrangements are delivered within 24–48 hours of order. Dried and artificial pieces ship within 3–5 business days. Ceramics take 5–7 business days.",
    },
    {
        q: "Do you offer custom or bespoke arrangements?",
        a: "Yes — for orders over $200 we offer bespoke consultations. Reach out via the form above or email custom@craftopia.com and our creative team will get back to you within 24 hours.",
    },
    {
        q: "What is your return policy?",
        a: "Fresh florals are non-returnable due to their perishable nature. All other items can be returned within 14 days in original condition. See our full policy in the footer.",
    },
    {
        q: "Do you ship internationally?",
        a: "We currently ship to 14 countries across Africa, Europe, and the Middle East. Enter your postcode at checkout to confirm availability for your region.",
    },
    {
        q: "Can I track my order?",
        a: "Absolutely. Every order comes with a tracking link sent by email once dispatched. You can also view live status in your account under Order History.",
    },
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ── */}
            <section className="relative h-[55vh] flex items-end overflow-hidden">
                <Image
                    src="/images/decors/Image9.jpeg"
                    alt="Contact Craftopia"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative z-10 container mx-auto px-6 pb-14">
                    <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">Get in Touch</p>
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-white leading-tight mb-4">
                        We'd Love to <span className="italic font-light">Hear from You</span>
                    </h1>
                    <p className="text-white/80 text-[16px] max-w-md">
                        Questions, bespoke orders, trade enquiries, or just a kind word — our team reads every message.
                    </p>
                </div>
            </section>

            {/* ── Info Cards ── */}
            <section className="bg-[#111] py-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { icon: Mail, label: "Email Us", value: "hello@craftopia.com", sub: "We reply within 24 hours" },
                            { icon: Phone, label: "Call Us", value: "+20 100 000 0000", sub: "Mon – Sat, 9am – 6pm" },
                            { icon: MapPin, label: "Visit the Studio", value: "14 Garden City, Cairo", sub: "By appointment — DM to book" },
                        ].map((c) => (
                            <div key={c.label} className="flex items-start gap-4 bg-white/5 rounded-2xl px-6 py-5 border border-white/10">
                                <div className="w-10 h-10 bg-[#5CE614]/10 rounded-xl flex items-center justify-center text-[#5CE614] flex-shrink-0 mt-0.5">
                                    <c.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">{c.label}</p>
                                    <p className="text-[15px] font-semibold text-white">{c.value}</p>
                                    <p className="text-[12px] text-white/50 mt-0.5">{c.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Form + Map ── */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 lg:p-10">
                            {submitted ? (
                                <div className="flex flex-col items-center text-center py-10">
                                    <div className="w-16 h-16 bg-[#E9F8E5] rounded-full flex items-center justify-center mb-5">
                                        <Send className="w-7 h-7 text-[#5CE614]" />
                                    </div>
                                    <h2 className="text-[22px] font-bold text-[#111] mb-2">Message Sent!</h2>
                                    <p className="text-stone-500 text-[14px] mb-8 max-w-xs">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-[13px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors"
                                    >
                                        Send another message →
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-serif text-[28px] font-medium text-[#111] mb-2 italic">Send Us a Message</h2>
                                    <p className="text-stone-400 text-[14px] mb-8">Fill in the form and we'll be in touch shortly.</p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">First Name</label>
                                                <input required placeholder="Sarah" className="w-full h-11 px-4 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Last Name</label>
                                                <input required placeholder="Jenkins" className="w-full h-11 px-4 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                                            <input required type="email" placeholder="sarah@example.com" className="w-full h-11 px-4 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow placeholder:text-stone-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Subject</label>
                                            <div className="relative">
                                                <select required className="w-full h-11 px-4 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow appearance-none">
                                                    <option value="">Select a topic…</option>
                                                    <option>Order Enquiry</option>
                                                    <option>Bespoke / Custom Order</option>
                                                    <option>Trade Account</option>
                                                    <option>Wholesale</option>
                                                    <option>Press & Partnerships</option>
                                                    <option>General Question</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                placeholder="Tell us how we can help…"
                                                className="w-full px-4 py-3 bg-[#F7F7F7] rounded-xl text-[14px] text-[#111] outline-none focus:ring-2 focus:ring-[#5CE614] transition-shadow resize-none placeholder:text-stone-300"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full h-12 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] flex items-center justify-center gap-2 transition-colors shadow-sm"
                                        >
                                            <Send className="w-4 h-4" /> Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Map + Hours */}
                        <div className="space-y-6">
                            {/* Map image */}
                            <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                                <Image src="/images/decors/Image7.jpeg" alt="Our studio location" fill className="object-cover object-center" />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-12 h-12 bg-[#5CE614] rounded-full flex items-center justify-center mb-3 shadow-lg">
                                        <MapPin className="w-5 h-5 text-[#111]" />
                                    </div>
                                    <p className="text-white font-bold text-[16px]">Craftopia Studio</p>
                                    <p className="text-white/80 text-[13px] mt-1">14 Garden City, Cairo, Egypt</p>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 flex items-center gap-1.5 text-[#5CE614] text-[12px] font-bold hover:underline"
                                    >
                                        Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 bg-[#E9F8E5] rounded-xl flex items-center justify-center text-[#5CE614]">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-[#111]">Studio Hours</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { day: "Monday – Friday", hours: "9:00 am – 6:00 pm" },
                                        { day: "Saturday", hours: "10:00 am – 4:00 pm" },
                                        { day: "Sunday", hours: "Closed (online orders open)" },
                                    ].map((h) => (
                                        <div key={h.day} className="flex justify-between items-center py-2.5 border-b border-stone-50 last:border-0">
                                            <span className="text-[13px] font-medium text-stone-600">{h.day}</span>
                                            <span className={`text-[13px] font-bold ${h.hours.includes("Closed") ? "text-red-400" : "text-[#3F6136]"}`}>{h.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social quick links */}
                            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6">
                                <p className="text-[12px] font-bold text-stone-400 uppercase tracking-widest mb-4">Follow & DM Us</p>
                                <div className="flex gap-3">
                                    {[
                                        { name: "Instagram", handle: "@craftopia.store" },
                                        { name: "Pinterest", handle: "@craftopia" },
                                        { name: "TikTok", handle: "@craftopia.eg" },
                                    ].map((s) => (
                                        <a
                                            key={s.name}
                                            href="#"
                                            className="flex-1 text-center py-3 rounded-xl border border-stone-100 hover:border-[#5CE614] hover:bg-[#F7FBF4] transition-all"
                                        >
                                            <p className="text-[12px] font-bold text-[#111]">{s.name}</p>
                                            <p className="text-[10px] text-stone-400 mt-0.5">{s.handle}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-12">
                        <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">Quick Answers</p>
                        <h2 className="font-serif text-4xl font-medium text-[#111] italic">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl border transition-all overflow-hidden ${openFaq === i ? "border-[#5CE614] bg-[#F7FBF4]" : "border-stone-100 bg-white hover:border-stone-200"}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className={`text-[15px] font-semibold ${openFaq === i ? "text-[#3F6136]" : "text-[#111]"}`}>{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180 text-[#5CE614]" : "text-stone-400"}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-5">
                                        <p className="text-stone-500 text-[14px] leading-relaxed">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-stone-400 text-[14px] mt-10">
                        Still have questions?{" "}
                        <Link href="/contact" className="text-[#5CE614] font-bold hover:underline">
                            Drop us a message above ↑
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
