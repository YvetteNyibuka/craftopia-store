"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Save, X, ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
    "Floral Arrangements",
    "Dried Flowers",
    "Home Décor",
    "Seasonal Specials",
    "Gift Sets",
    "Plants",
    "Wreaths & Garlands",
    "Candles & Accessories",
];

interface Variant {
    id: string;
    name: string;
    price: string;
    stock: string;
    sku: string;
}

export default function NewProductPage() {
    const router = useRouter();

    // ── Core fields ───────────────────────────────────────────────────────
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [slugManual, setSlugManual] = useState(false);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [collection, setCollection] = useState("");
    const [price, setPrice] = useState("");
    const [comparePrice, setComparePrice] = useState("");
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [stockCount, setStockCount] = useState("");
    const [weight, setWeight] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");

    // ── Toggles ──────────────────────────────────────────────────────────
    const [isActive, setIsActive] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [trackInventory, setTrackInventory] = useState(true);
    const [continueWhenOOS, setContinueWhenOOS] = useState(false);

    // ── Variants ─────────────────────────────────────────────────────────
    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState<Variant[]>([
        { id: "v1", name: "", price: "", stock: "", sku: "" },
    ]);

    const addVariant = () =>
        setVariants((v) => [...v, { id: `v${Date.now()}`, name: "", price: "", stock: "", sku: "" }]);

    const removeVariant = (id: string) =>
        setVariants((v) => v.filter((x) => x.id !== id));

    const updateVariant = (id: string, field: keyof Variant, value: string) =>
        setVariants((v) => v.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

    // ── Form state ───────────────────────────────────────────────────────
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ── Auto-slug ────────────────────────────────────────────────────────
    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!slugManual) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
        }
    };

    // ── Validation ───────────────────────────────────────────────────────
    const validate = () => {
        const e: Record<string, string> = {};
        if (!title.trim()) e.title = "Product title is required.";
        if (!price.trim()) e.price = "Price is required.";
        else if (isNaN(Number(price)) || Number(price) < 0) e.price = "Enter a valid price.";
        if (!category) e.category = "Please select a category.";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        // TODO: wire to API
        await new Promise((r) => setTimeout(r, 800));
        setSaving(false);
        router.push("/admin/products");
    };

    const inputCls = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[900px]">

            {/* ── Breadcrumb ─────────────────────────────────────────────── */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <Link href="/admin/products" className="hover:text-[#111] transition-colors">Products</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">New Product</span>
            </div>

            {/* ── Page header ────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[30px] font-bold text-[#111] tracking-tight">Add New Product</h1>
                    <p className="text-[14px] text-stone-500 mt-1">Fill in the details to list a new product in your store.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-stone-600 hover:bg-stone-50 transition-colors bg-white shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Discard
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : "Save Product"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ── LEFT COLUMN ──────────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Basic Info */}
                    <FormSection title="Product Details" description="Core information about the product.">
                        <FormField label="Product Title" required error={errors.title}>
                            <input
                                id="product-title"
                                type="text"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="e.g. Ethereal White Rose Bouquet"
                                className={inputCls}
                            />
                        </FormField>

                        <FormField label="Slug (URL)" hint="/products/your-product-slug">
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-stone-400 font-medium whitespace-nowrap">/products/</span>
                                <input
                                    id="product-slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                                    placeholder="ethereal-white-rose-bouquet"
                                    className={`${inputCls} font-mono`}
                                />
                            </div>
                        </FormField>

                        <FormField label="Description" hint="Markdown supported. Describe textures, care instructions, etc.">
                            <Textarea
                                id="product-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the product in detail — materials, dimensions, care instructions…"
                                rows={6}
                            />
                        </FormField>
                    </FormSection>

                    {/* Media */}
                    <FormSection title="Product Images" description="Add up to 8 images. First image is the cover.">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <ImageUploadBox label="Add Cover Photo" hint="1:1 or 4:3 recommended" />
                            <ImageUploadBox label="Add Image" hint="Up to 5 MB" />
                            <ImageUploadBox label="Add Image" hint="Up to 5 MB" />
                        </div>
                    </FormSection>

                    {/* Pricing */}
                    <FormSection title="Pricing">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Price (USD)" required error={errors.price}>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                    <input
                                        id="product-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        className={`${inputCls} pl-7`}
                                    />
                                </div>
                            </FormField>
                            <FormField label="Compare-at Price" hint="Original price shown with strikethrough.">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                    <input
                                        id="product-compare-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={comparePrice}
                                        onChange={(e) => setComparePrice(e.target.value)}
                                        placeholder="0.00"
                                        className={`${inputCls} pl-7`}
                                    />
                                </div>
                            </FormField>
                        </div>
                        {comparePrice && price && Number(comparePrice) > Number(price) && (
                            <div className="flex items-center gap-2 bg-[#FFF7ED] border border-orange-200 rounded-xl px-4 py-2.5">
                                <span className="text-orange-500 text-sm">🏷️</span>
                                <p className="text-[12px] text-orange-700 font-medium">
                                    Discount: {Math.round(((Number(comparePrice) - Number(price)) / Number(comparePrice)) * 100)}% off
                                </p>
                            </div>
                        )}
                    </FormSection>

                    {/* Inventory */}
                    <FormSection title="Inventory & Shipping">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="SKU">
                                <input
                                    id="product-sku"
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    placeholder="FLR-2025-001"
                                    className={`${inputCls} font-mono`}
                                />
                            </FormField>
                            <FormField label="Barcode / ISBN">
                                <input
                                    id="product-barcode"
                                    type="text"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    placeholder="0000000000000"
                                    className={`${inputCls} font-mono`}
                                />
                            </FormField>
                        </div>

                        <div className="space-y-3">
                            <Toggle
                                id="track-inventory"
                                checked={trackInventory}
                                onChange={setTrackInventory}
                                label="Track inventory for this product"
                            />
                            {trackInventory && (
                                <div className="pl-14">
                                    <FormField label="Stock Quantity">
                                        <input
                                            id="product-stock"
                                            type="number"
                                            min="0"
                                            value={stockCount}
                                            onChange={(e) => setStockCount(e.target.value)}
                                            placeholder="0"
                                            className={`${inputCls} max-w-[160px]`}
                                        />
                                    </FormField>
                                    <div className="mt-3">
                                        <Toggle
                                            id="continue-oos"
                                            checked={continueWhenOOS}
                                            onChange={setContinueWhenOOS}
                                            label="Allow purchase when out of stock"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <FormField label="Weight (grams)" hint="Used to calculate shipping rates.">
                            <input
                                id="product-weight"
                                type="number"
                                min="0"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="0"
                                className={`${inputCls} max-w-[200px]`}
                            />
                        </FormField>
                    </FormSection>

                    {/* Variants */}
                    <FormSection title="Variants" description="Add sizes, colours, or other options for this product.">
                        <Toggle
                            id="has-variants"
                            checked={hasVariants}
                            onChange={setHasVariants}
                            label="This product has multiple variants"
                        />

                        {hasVariants && (
                            <div className="space-y-3 pt-2">
                                <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] text-[11px] font-bold uppercase tracking-widest text-stone-400 px-2 gap-3">
                                    <span className="w-5" />
                                    <span>Option</span>
                                    <span>Price</span>
                                    <span>Stock</span>
                                    <span>SKU</span>
                                    <span className="w-7" />
                                </div>

                                {variants.map((v) => (
                                    <div key={v.id} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2.5 border border-stone-100">
                                        <GripVertical className="w-4 h-4 text-stone-300 flex-shrink-0 cursor-grab" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Small / Red"
                                            value={v.name}
                                            onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                                            className="flex-1 h-9 rounded-lg border border-stone-200 bg-white px-2.5 text-[13px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                        />
                                        <div className="relative w-24">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-300 text-[12px]">$</span>
                                            <input
                                                type="number" min="0" step="0.01"
                                                placeholder="0.00"
                                                value={v.price}
                                                onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                                                className="w-full h-9 rounded-lg border border-stone-200 bg-white pl-6 pr-2 text-[13px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                            />
                                        </div>
                                        <input
                                            type="number" min="0"
                                            placeholder="0"
                                            value={v.stock}
                                            onChange={(e) => updateVariant(v.id, "stock", e.target.value)}
                                            className="w-20 h-9 rounded-lg border border-stone-200 bg-white px-2.5 text-[13px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="SKU"
                                            value={v.sku}
                                            onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                            className="w-28 h-9 rounded-lg border border-stone-200 bg-white px-2.5 font-mono text-[12px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(v.id)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="flex items-center gap-2 w-full h-10 rounded-xl border border-dashed border-stone-300 text-[13px] font-semibold text-stone-500 hover:text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all justify-center"
                                >
                                    <Plus className="w-4 h-4" /> Add Variant
                                </button>
                            </div>
                        )}
                    </FormSection>

                    {/* SEO */}
                    <FormSection title="SEO & Metadata">
                        <FormField label="SEO Title" hint="Defaults to the product title if empty.">
                            <input
                                id="seo-title"
                                type="text"
                                value={seoTitle}
                                maxLength={70}
                                onChange={(e) => setSeoTitle(e.target.value)}
                                placeholder={title || "SEO title…"}
                                className={inputCls}
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoTitle.length}/70</p>
                        </FormField>

                        <FormField label="SEO Description">
                            <Textarea
                                id="seo-description"
                                value={seoDescription}
                                maxLength={160}
                                onChange={(e) => setSeoDescription(e.target.value)}
                                placeholder="A short description for search engines…"
                                rows={3}
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoDescription.length}/160</p>
                        </FormField>

                        <FormField label="Tags" hint="Press Enter or comma to add.">
                            <TagInput tags={tags} onChange={setTags} placeholder="floral, white, roses, gift…" />
                        </FormField>
                    </FormSection>
                </div>

                {/* ── RIGHT COLUMN ──────────────────────────────────────── */}
                <div className="space-y-5">

                    {/* Status */}
                    <FormSection title="Status & Visibility">
                        <div className="space-y-3">
                            <Toggle
                                id="toggle-active"
                                checked={isActive}
                                onChange={setIsActive}
                                label="Active (visible in store)"
                            />
                            <Toggle
                                id="toggle-new"
                                checked={isNew}
                                onChange={setIsNew}
                                label="Mark as New"
                            />
                            <Toggle
                                id="toggle-bestseller"
                                checked={isBestSeller}
                                onChange={setIsBestSeller}
                                label="Mark as Best Seller"
                            />
                        </div>
                    </FormSection>

                    {/* Organisation */}
                    <FormSection title="Organisation">
                        <FormField label="Category" required error={errors.category}>
                            <Select
                                id="product-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category…</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField label="Collection" hint="Parent collection this product belongs to.">
                            <Select
                                id="product-collection"
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
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

                    {/* Quick tips */}
                    <div className="bg-[#F0FBE8] rounded-[20px] p-5 border border-[#C9E9B0]">
                        <p className="text-[12px] font-bold text-[#3F6136] mb-2">💡 Tips</p>
                        <ul className="space-y-1.5 text-[11px] text-[#5A7E4A]">
                            <li>• Set a compare-at price to show a discount badge.</li>
                            <li>• Variants let you offer sizes, colours, etc.</li>
                            <li>• Good SEO descriptions improve discoverability.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Bottom action bar ───────────────────────────────────────── */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 -mx-8 px-8 py-4 flex justify-between items-center">
                <Link href="/admin/products" className="flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-[#111] transition-colors">
                    <X className="w-4 h-4" /> Cancel
                </Link>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving…" : "Save Product"}
                </button>
            </div>
        </form>
    );
}
