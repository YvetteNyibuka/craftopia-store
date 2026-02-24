"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, Eye, Save, ImageIcon, GripVertical,
    Settings, Plus, Trash2, Star, Bell, Instagram, BadgeCheck, ChevronDown,
} from "lucide-react";
import { FormField, FormSection, Toggle } from "@/components/ui/form-primitives";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ──────────────────────────────────────────────────────────────────
interface HeroBanner {
    id: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaLink: string;
    visible: boolean;
}

interface FeaturedCollection {
    id: string;
    name: string;
    productCount: number;
    visible: boolean;
}

// ─── Sub-component: ToggleSwitch ─────────────────────────────────────────────
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:ring-offset-2 ${checked ? "bg-[#5CE614]" : "bg-stone-200"}`}
        >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
        </button>
    );
}

export default function ContentManagerPage() {
    // ── Hero banners ─────────────────────────────────────────────────────
    const [banners, setBanners] = useState<HeroBanner[]>([
        {
            id: "b1",
            heading: "Spring Renewal Collection",
            subheading: "Fresh flowers, timeless arrangements.",
            ctaLabel: "Shop Now",
            ctaLink: "/collections/spring-24",
            visible: true,
        },
    ]);

    const updateBanner = (id: string, field: keyof HeroBanner, value: string | boolean) =>
        setBanners((bs) => bs.map((b) => (b.id === id ? { ...b, [field]: value } : b)));

    const addBanner = () =>
        setBanners((bs) => [
            ...bs,
            { id: `b${Date.now()}`, heading: "", subheading: "", ctaLabel: "Shop Now", ctaLink: "", visible: true },
        ]);

    const removeBanner = (id: string) => setBanners((bs) => bs.filter((b) => b.id !== id));

    // ── Featured collections ──────────────────────────────────────────────
    const [featuredCols, setFeaturedCols] = useState<FeaturedCollection[]>([
        { id: "c1", name: "Handcrafted Vases", productCount: 12, visible: true },
        { id: "c2", name: "Summer Bouquets", productCount: 24, visible: true },
        { id: "c3", name: "Minimalist Wall Art", productCount: 8, visible: false },
    ]);

    const toggleColVisibility = (id: string) =>
        setFeaturedCols((cs) => cs.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)));

    const removeFeaturedCol = (id: string) =>
        setFeaturedCols((cs) => cs.filter((c) => c.id !== id));

    // ── Announcement bar ─────────────────────────────────────────────────
    const [announcementEnabled, setAnnouncementEnabled] = useState(true);
    const [announcementText, setAnnouncementText] = useState("🌸 Free shipping on orders over $60 — limited time only!");

    // ── Section visibility ────────────────────────────────────────────────
    const [sections, setSections] = useState({
        heroEnabled: true,
        featuredEnabled: true,
        bestSellersEnabled: true,
        reviewsEnabled: false,
        newsletterEnabled: true,
        instagramEnabled: true,
        sustainabilityEnabled: true,
    });

    const toggleSection = (key: keyof typeof sections) =>
        setSections((s) => ({ ...s, [key]: !s[key] }));

    // ── Save ─────────────────────────────────────────────────────────────
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // TODO: wire to API
        await new Promise((r) => setTimeout(r, 900));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const inputCls = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

    return (
        <main className="max-w-[900px] space-y-6">

            {/* ── Breadcrumb ─────────────────────────────────────────────── */}
            <div className="flex items-center text-[11px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3 h-3 mx-1.5 text-stone-300" />
                <span className="text-[#111] font-semibold">Homepage Manager</span>
            </div>

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[30px] font-bold text-[#111] tracking-tight">Content Manager</h1>
                    <p className="text-[14px] text-stone-500 mt-1">Edit your homepage layout, banners, and section visibility.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-stone-600 hover:bg-stone-50 transition-colors bg-white shadow-sm"
                    >
                        <Eye className="w-4 h-4" /> Preview
                    </Link>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* ── Announcement Bar ────────────────────────────────────────── */}
            <FormSection
                title="Announcement Bar"
                description="A slim bar shown at the very top of the storefront."
            >
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#111]">Enable Announcement Bar</span>
                    <ToggleSwitch checked={announcementEnabled} onChange={setAnnouncementEnabled} />
                </div>
                {announcementEnabled && (
                    <FormField label="Announcement Text" hint="Keep it short — ~80 characters works best.">
                        <input
                            id="announcement-text"
                            type="text"
                            value={announcementText}
                            onChange={(e) => setAnnouncementText(e.target.value)}
                            maxLength={120}
                            className={inputCls}
                        />
                        <p className="text-[10px] text-stone-400 mt-1 text-right">{announcementText.length}/120</p>
                        {announcementEnabled && announcementText && (
                            <div className="mt-2 bg-[#111] text-white text-[12px] font-medium text-center px-4 py-2 rounded-lg">
                                {announcementText}
                            </div>
                        )}
                    </FormField>
                )}
            </FormSection>

            {/* ── Hero Banners ─────────────────────────────────────────────── */}
            <FormSection
                title="Hero Banners"
                description="Full-width slide(s) shown at the top of the homepage."
            >
                <div className="flex justify-between items-center">
                    <span className="text-[11px] text-stone-400">
                        {banners.length} banner{banners.length !== 1 ? "s" : ""} configured
                    </span>
                    <button
                        type="button"
                        onClick={addBanner}
                        className="flex items-center gap-1.5 text-[12px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Banner
                    </button>
                </div>

                <div className="space-y-4">
                    {banners.map((banner, idx) => (
                        <div key={banner.id} className="bg-stone-50 rounded-2xl border border-stone-100 p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[13px] font-bold text-[#111] flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-[#5CE614]" />
                                    Banner {idx + 1}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <ToggleSwitch
                                        checked={banner.visible}
                                        onChange={(v) => updateBanner(banner.id, "visible", v)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeBanner(banner.id)}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Upload area */}
                            <div className="h-28 border-2 border-dashed border-stone-200 rounded-xl flex items-center justify-center text-stone-400 hover:border-[#5CE614] hover:bg-[#F0FBE8]/30 transition-all cursor-pointer group">
                                <div className="text-center">
                                    <ImageIcon className="w-6 h-6 mx-auto mb-1 group-hover:text-[#5CE614] transition-colors" />
                                    <p className="text-[11px] font-medium group-hover:text-[#5CE614] transition-colors">Upload banner image</p>
                                    <p className="text-[10px] text-stone-300">Recommended 1920 × 600px</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FormField label="Heading">
                                    <input
                                        type="text"
                                        value={banner.heading}
                                        onChange={(e) => updateBanner(banner.id, "heading", e.target.value)}
                                        placeholder="e.g. Spring Renewal Collection"
                                        className={inputCls}
                                    />
                                </FormField>
                                <FormField label="Subheading">
                                    <input
                                        type="text"
                                        value={banner.subheading}
                                        onChange={(e) => updateBanner(banner.id, "subheading", e.target.value)}
                                        placeholder="A short tagline…"
                                        className={inputCls}
                                    />
                                </FormField>
                                <FormField label="CTA Button Label">
                                    <input
                                        type="text"
                                        value={banner.ctaLabel}
                                        onChange={(e) => updateBanner(banner.id, "ctaLabel", e.target.value)}
                                        placeholder="Shop Now"
                                        className={inputCls}
                                    />
                                </FormField>
                                <FormField label="CTA Link">
                                    <input
                                        type="text"
                                        value={banner.ctaLink}
                                        onChange={(e) => updateBanner(banner.id, "ctaLink", e.target.value)}
                                        placeholder="/collections/spring-24"
                                        className={inputCls}
                                    />
                                </FormField>
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>

            {/* ── Featured Collections ─────────────────────────────────────── */}
            <FormSection
                title="Featured Collections"
                description="Choose which collections appear in the homepage grid. Drag to reorder."
            >
                <div className="space-y-3">
                    {featuredCols.map((col) => (
                        <div
                            key={col.id}
                            className={`flex items-center gap-4 bg-white rounded-[18px] p-4 border border-stone-200 shadow-sm transition-opacity ${col.visible ? "" : "opacity-50"}`}
                        >
                            <GripVertical className="w-5 h-5 text-stone-300 cursor-grab flex-shrink-0" />
                            <div className="w-10 h-10 bg-stone-100 rounded-xl flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-[#111] truncate">{col.name}</p>
                                <p className="text-[11px] text-stone-400">{col.productCount} products</p>
                            </div>
                            <ToggleSwitch checked={col.visible} onChange={() => toggleColVisibility(col.id)} />
                            <button
                                type="button"
                                onClick={() => removeFeaturedCol(col.id)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="flex items-center gap-2 w-full h-11 rounded-[18px] border border-dashed border-stone-300 text-[13px] font-semibold text-stone-500 hover:text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all justify-center"
                    >
                        <Plus className="w-4 h-4" /> Add Featured Collection
                    </button>
                </div>
            </FormSection>

            {/* ── Section Visibility ────────────────────────────────────────── */}
            <FormSection
                title="Section Visibility"
                description="Toggle which sections appear on the homepage."
            >
                <div className="space-y-1">
                    {[
                        { key: "heroEnabled", icon: ImageIcon, label: "Hero Banner", desc: "Full-width top banner" },
                        { key: "featuredEnabled", icon: Star, label: "Featured Collections", desc: "Collection grid tiles" },
                        { key: "bestSellersEnabled", icon: BadgeCheck, label: "Best Sellers Strip", desc: "Most-purchased products" },
                        { key: "reviewsEnabled", icon: Star, label: "Customer Reviews", desc: "Star ratings & testimonials" },
                        { key: "newsletterEnabled", icon: Bell, label: "Newsletter Popup", desc: "Email capture modal" },
                        { key: "instagramEnabled", icon: Instagram, label: "Instagram Feed", desc: "Social media grid" },
                        { key: "sustainabilityEnabled", icon: ChevronDown, label: "Sustainability Banner", desc: "Eco-credentials section" },
                    ].map(({ key, icon: Icon, label, desc }) => {
                        const isOn = sections[key as keyof typeof sections];
                        return (
                            <div key={key} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isOn ? "bg-[#E9F4E5]" : "bg-stone-100"} transition-colors`}>
                                        <Icon className={`w-4 h-4 ${isOn ? "text-[#5CE614]" : "text-stone-400"} transition-colors`} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#111]">{label}</p>
                                        <p className="text-[11px] text-stone-400">{desc}</p>
                                    </div>
                                </div>
                                <ToggleSwitch checked={isOn} onChange={() => toggleSection(key as keyof typeof sections)} />
                            </div>
                        );
                    })}
                </div>
            </FormSection>

            {/* ── Bottom save ──────────────────────────────────────────────── */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 -mx-8 px-8 py-4 flex justify-between items-center">
                <p className="text-[12px] text-stone-400">Changes are saved to a draft until you publish.</p>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}
                </button>
            </div>

            <div className="h-8" />
        </main>
    );
}
