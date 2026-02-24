"use client";

import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2, GripVertical } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ProductVariant {
    id: string;
    name: string;
    price: string;
    stock: string;
    sku: string;
}

export interface ProductFormData {
    id?: string | number;
    title: string;
    slug: string;
    description: string;
    category: string;
    collection: string;
    price: string;
    comparePrice: string;
    sku: string;
    barcode: string;
    stockCount: string;
    weight: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    isActive: boolean;
    isNew: boolean;
    isBestSeller: boolean;
    trackInventory: boolean;
    continueWhenOOS: boolean;
    hasVariants: boolean;
    variants: ProductVariant[];
}

interface ProductFormDrawerProps {
    open: boolean;
    onClose: () => void;
    initial?: Partial<ProductFormData> | null;
    onSave?: (data: ProductFormData) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
    "Floral Arrangements", "Dried Flowers", "Home Décor",
    "Seasonal Specials", "Gift Sets", "Plants", "Wreaths & Garlands", "Candles & Accessories",
];

const BLANK: ProductFormData = {
    title: "", slug: "", description: "",
    category: "", collection: "",
    price: "", comparePrice: "",
    sku: "", barcode: "", stockCount: "", weight: "",
    tags: [], seoTitle: "", seoDescription: "",
    isActive: true, isNew: false, isBestSeller: false,
    trackInventory: true, continueWhenOOS: false,
    hasVariants: false,
    variants: [{ id: "v1", name: "", price: "", stock: "", sku: "" }],
};

const toSlug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ── Section tab type ──────────────────────────────────────────────────────────
type Tab = "details" | "pricing" | "inventory" | "seo";
const TABS: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "pricing", label: "Pricing" },
    { key: "inventory", label: "Inventory" },
    { key: "seo", label: "SEO" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ProductFormDrawer({ open, onClose, initial, onSave }: ProductFormDrawerProps) {
    const isEdit = Boolean(initial?.id);

    const [form, setForm] = useState<ProductFormData>(BLANK);
    const [slugManual, setSlugManual] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState<Tab>("details");

    /* Seed form on open */
    useEffect(() => {
        if (open) {
            setForm(initial ? { ...BLANK, ...initial } : BLANK);
            setSlugManual(Boolean(initial?.slug));
            setErrors({});
            setActiveTab("details");
        }
    }, [open, initial]);

    const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
        setForm((f) => ({ ...f, [key]: value }));

    const handleTitleChange = (val: string) => {
        set("title", val);
        if (!slugManual) set("slug", toSlug(val));
    };

    // ── Variant helpers ───────────────────────────────────────────────────
    const addVariant = () =>
        setForm((f) => ({
            ...f,
            variants: [...f.variants, { id: `v${Date.now()}`, name: "", price: "", stock: "", sku: "" }],
        }));

    const removeVariant = (id: string) =>
        setForm((f) => ({ ...f, variants: f.variants.filter((v) => v.id !== id) }));

    const updateVariant = (id: string, field: keyof ProductVariant, value: string) =>
        setForm((f) => ({
            ...f,
            variants: f.variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
        }));

    // ── Validation ────────────────────────────────────────────────────────
    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.title.trim()) e.title = "Product title is required.";
        if (!form.price.trim() || isNaN(Number(form.price))) e.price = "Enter a valid price.";
        if (!form.category) e.category = "Please select a category.";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            // Jump to the tab that has the first error
            if (errs.title || errs.category) setActiveTab("details");
            else if (errs.price) setActiveTab("pricing");
            return;
        }
        setSaving(true);
        await new Promise((r) => setTimeout(r, 700)); // TODO: replace with API call
        setSaving(false);
        onSave?.(form);
        onClose();
    };

    const inp = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

    /* Discount badge */
    const discount = form.comparePrice && form.price
        && Number(form.comparePrice) > Number(form.price)
        ? Math.round(((Number(form.comparePrice) - Number(form.price)) / Number(form.comparePrice)) * 100)
        : null;

    const footer = (
        <form onSubmit={handleSubmit} className="flex items-center justify-between">
            <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-[#111] transition-colors"
            >
                <X className="w-4 h-4" /> Discard
            </button>
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-7 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] shadow-sm transition-colors disabled:opacity-60"
            >
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}
            </button>
        </form>
    );

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title={isEdit ? `Edit: ${initial?.title || "Product"}` : "New Product"}
            subtitle={isEdit ? "Update product details, pricing, and inventory." : "Fill in the details to list a new product."}
            footer={footer}
            width="max-w-2xl"
        >
            {/* ── Tab bar ───────────────────────────────────────────── */}
            <div className="flex items-center bg-stone-100 rounded-xl p-1 gap-1 -mt-1 mb-1">
                {TABS.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={`flex-1 h-8 rounded-lg text-[13px] font-semibold transition-colors ${activeTab === key
                                ? "bg-white text-[#111] shadow-sm"
                                : "text-stone-500 hover:text-[#111]"
                            }`}
                    >
                        {label}
                        {/* Error dot */}
                        {key === "details" && (errors.title || errors.category) && (
                            <span className="ml-1 inline-block w-1.5 h-1.5 bg-red-500 rounded-full align-top mt-0.5" />
                        )}
                        {key === "pricing" && errors.price && (
                            <span className="ml-1 inline-block w-1.5 h-1.5 bg-red-500 rounded-full align-top mt-0.5" />
                        )}
                    </button>
                ))}
            </div>

            <form id="product-form" onSubmit={handleSubmit} className="space-y-5">

                {/* ══ DETAILS TAB ════════════════════════════════════════ */}
                {activeTab === "details" && (
                    <>
                        <FormSection title="Product Details">
                            <FormField label="Product Title" required error={errors.title}>
                                <input
                                    id="prod-title"
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="e.g. Ethereal White Rose Bouquet"
                                    className={inp}
                                    autoFocus
                                />
                            </FormField>

                            <FormField label="Slug (URL)" hint="/products/your-slug">
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] text-stone-400 font-medium whitespace-nowrap shrink-0">/products/</span>
                                    <input
                                        id="prod-slug"
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) => { set("slug", e.target.value); setSlugManual(true); }}
                                        placeholder="ethereal-white-rose-bouquet"
                                        className={`${inp} font-mono`}
                                    />
                                </div>
                            </FormField>

                            <FormField label="Description" hint="Markdown supported.">
                                <Textarea
                                    id="prod-description"
                                    value={form.description}
                                    onChange={(e) => set("description", e.target.value)}
                                    placeholder="Describe textures, care instructions, dimensions…"
                                    rows={4}
                                />
                            </FormField>
                        </FormSection>

                        <FormSection title="Images" description="First image is the cover.">
                            <div className="grid grid-cols-3 gap-3">
                                <ImageUploadBox label="Cover Photo" hint="4:3 recommended" className="col-span-1" />
                                <ImageUploadBox label="Image 2" hint="Up to 5 MB" className="col-span-1" />
                                <ImageUploadBox label="Image 3" hint="Up to 5 MB" className="col-span-1" />
                            </div>
                        </FormSection>

                        <FormSection title="Organisation">
                            <FormField label="Category" required error={errors.category}>
                                <Select
                                    id="prod-category"
                                    value={form.category}
                                    onChange={(e) => set("category", e.target.value)}
                                >
                                    <option value="">Select a category…</option>
                                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                </Select>
                            </FormField>

                            <FormField label="Collection" hint="Parent collection this product belongs to.">
                                <Select
                                    id="prod-collection"
                                    value={form.collection}
                                    onChange={(e) => set("collection", e.target.value)}
                                >
                                    <option value="">None</option>
                                    <option value="floral-arrangements">Floral Arrangements</option>
                                    <option value="dried-flowers">Dried Flowers</option>
                                    <option value="home-decor">Home Décor</option>
                                    <option value="seasonal-specials">Seasonal Specials</option>
                                    <option value="gift-sets">Gift Sets</option>
                                </Select>
                            </FormField>
                        </FormSection>

                        <FormSection title="Status">
                            <div className="space-y-3">
                                <Toggle id="prod-active" checked={form.isActive} onChange={(v) => set("isActive", v)} label="Active (visible in store)" />
                                <Toggle id="prod-new" checked={form.isNew} onChange={(v) => set("isNew", v)} label="Mark as New" />
                                <Toggle id="prod-bestseller" checked={form.isBestSeller} onChange={(v) => set("isBestSeller", v)} label="Mark as Best Seller" />
                            </div>
                        </FormSection>
                    </>
                )}

                {/* ══ PRICING TAB ════════════════════════════════════════ */}
                {activeTab === "pricing" && (
                    <>
                        <FormSection title="Pricing">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Price (USD)" required error={errors.price}>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                        <input id="prod-price" type="number" min="0" step="0.01"
                                            value={form.price}
                                            onChange={(e) => set("price", e.target.value)}
                                            placeholder="0.00"
                                            className={`${inp} pl-7`}
                                        />
                                    </div>
                                </FormField>
                                <FormField label="Compare-at Price" hint="Strikethrough price.">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                        <input id="prod-compare" type="number" min="0" step="0.01"
                                            value={form.comparePrice}
                                            onChange={(e) => set("comparePrice", e.target.value)}
                                            placeholder="0.00"
                                            className={`${inp} pl-7`}
                                        />
                                    </div>
                                </FormField>
                            </div>
                            {discount !== null && (
                                <div className="flex items-center gap-2 bg-[#FFF7ED] border border-orange-200 rounded-xl px-4 py-2.5">
                                    <span className="text-orange-400">🏷️</span>
                                    <p className="text-[12px] text-orange-700 font-medium">
                                        Customer sees <strong>{discount}% off</strong> — compare-at ${form.comparePrice} vs ${form.price}
                                    </p>
                                </div>
                            )}
                        </FormSection>

                        <FormSection title="Variants" description="Offer sizes, colours, or other options.">
                            <Toggle
                                id="prod-variants"
                                checked={form.hasVariants}
                                onChange={(v) => set("hasVariants", v)}
                                label="This product has multiple variants"
                            />

                            {form.hasVariants && (
                                <div className="space-y-3 pt-1">
                                    <div className="hidden sm:grid grid-cols-[auto_1fr_80px_72px_90px_28px] text-[10px] font-bold uppercase tracking-widest text-stone-400 px-1 gap-2">
                                        <span className="w-5" />
                                        <span>Option</span>
                                        <span>Price</span>
                                        <span>Stock</span>
                                        <span>SKU</span>
                                        <span />
                                    </div>
                                    {form.variants.map((v) => (
                                        <div key={v.id} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2.5 border border-stone-100">
                                            <GripVertical className="w-4 h-4 text-stone-300 flex-shrink-0 cursor-grab" />
                                            <input type="text" placeholder="e.g. Small / Red"
                                                value={v.name}
                                                onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                                                className="flex-1 h-9 rounded-lg border border-stone-200 bg-white px-2.5 text-[13px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614] min-w-0"
                                            />
                                            <div className="relative w-20 flex-shrink-0">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-300 text-[12px]">$</span>
                                                <input type="number" min="0" step="0.01" placeholder="0.00"
                                                    value={v.price}
                                                    onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                                                    className="w-full h-9 rounded-lg border border-stone-200 bg-white pl-5 pr-1 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                                />
                                            </div>
                                            <input type="number" min="0" placeholder="0"
                                                value={v.stock}
                                                onChange={(e) => updateVariant(v.id, "stock", e.target.value)}
                                                className="w-16 flex-shrink-0 h-9 rounded-lg border border-stone-200 bg-white px-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                            />
                                            <input type="text" placeholder="SKU"
                                                value={v.sku}
                                                onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                                className="w-24 flex-shrink-0 h-9 rounded-lg border border-stone-200 bg-white px-2 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                            />
                                            <button type="button" onClick={() => removeVariant(v.id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addVariant}
                                        className="flex items-center gap-2 w-full h-10 rounded-xl border border-dashed border-stone-300 text-[13px] font-semibold text-stone-500 hover:text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all justify-center"
                                    >
                                        <Plus className="w-4 h-4" /> Add Variant
                                    </button>
                                </div>
                            )}
                        </FormSection>
                    </>
                )}

                {/* ══ INVENTORY TAB ══════════════════════════════════════ */}
                {activeTab === "inventory" && (
                    <FormSection title="Inventory & Shipping">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="SKU">
                                <input id="prod-sku" type="text"
                                    value={form.sku}
                                    onChange={(e) => set("sku", e.target.value)}
                                    placeholder="FLR-2025-001"
                                    className={`${inp} font-mono`}
                                />
                            </FormField>
                            <FormField label="Barcode">
                                <input id="prod-barcode" type="text"
                                    value={form.barcode}
                                    onChange={(e) => set("barcode", e.target.value)}
                                    placeholder="0000000000000"
                                    className={`${inp} font-mono`}
                                />
                            </FormField>
                        </div>

                        <Toggle id="track-inv" checked={form.trackInventory} onChange={(v) => set("trackInventory", v)} label="Track inventory for this product" />

                        {form.trackInventory && (
                            <div className="pl-[60px] space-y-3">
                                <FormField label="Stock Quantity">
                                    <input id="prod-stock" type="number" min="0"
                                        value={form.stockCount}
                                        onChange={(e) => set("stockCount", e.target.value)}
                                        placeholder="0"
                                        className={`${inp} max-w-[140px]`}
                                    />
                                </FormField>
                                <Toggle id="continue-oos" checked={form.continueWhenOOS} onChange={(v) => set("continueWhenOOS", v)} label="Allow purchase when out of stock" />
                            </div>
                        )}

                        <FormField label="Weight (grams)" hint="Used to calculate shipping rates.">
                            <input id="prod-weight" type="number" min="0"
                                value={form.weight}
                                onChange={(e) => set("weight", e.target.value)}
                                placeholder="0"
                                className={`${inp} max-w-[180px]`}
                            />
                        </FormField>
                    </FormSection>
                )}

                {/* ══ SEO TAB ════════════════════════════════════════════ */}
                {activeTab === "seo" && (
                    <FormSection title="SEO & Metadata">
                        <FormField label="SEO Title" hint="Defaults to the product title if empty.">
                            <input id="prod-seo-title" type="text"
                                value={form.seoTitle}
                                maxLength={70}
                                onChange={(e) => set("seoTitle", e.target.value)}
                                placeholder={form.title || "SEO title…"}
                                className={inp}
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{form.seoTitle.length}/70</p>
                        </FormField>

                        <FormField label="SEO Description">
                            <Textarea id="prod-seo-desc"
                                value={form.seoDescription}
                                maxLength={160}
                                onChange={(e) => set("seoDescription", e.target.value)}
                                placeholder="A short description for search engines…"
                                rows={3}
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{form.seoDescription.length}/160</p>
                        </FormField>

                        <FormField label="Tags" hint="Press Enter or comma to add.">
                            <TagInput tags={form.tags} onChange={(t) => set("tags", t)} placeholder="floral, white, roses…" />
                        </FormField>

                        {/* SEO preview */}
                        {(form.seoTitle || form.title) && (
                            <div className="rounded-xl border border-stone-200 p-4 bg-white space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Search Preview</p>
                                <p className="text-[#1a0dab] text-[15px] font-medium truncate">
                                    {form.seoTitle || form.title} | Craftopia
                                </p>
                                <p className="text-[#006621] text-[12px]">https://craftopia.com/products/{form.slug || "your-product"}</p>
                                <p className="text-[#545454] text-[12px] line-clamp-2">
                                    {form.seoDescription || form.description || "No description set."}
                                </p>
                            </div>
                        )}
                    </FormSection>
                )}
            </form>
        </Drawer>
    );
}
