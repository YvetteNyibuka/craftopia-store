"use client";

// Edit Product page — reuses the same form as New, pre-populated from mock data.
// When the API is ready, fetch product data using `params.id`.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Save, X, ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
    "Floral Arrangements", "Dried Flowers", "Home Décor",
    "Seasonal Specials", "Gift Sets", "Plants", "Wreaths & Garlands", "Candles & Accessories",
];

// Mock — replace with GET /api/products/:id
const MOCK = {
    title: "Ethereal White Roses",
    slug: "ethereal-white-roses",
    description: "A beautifully handcrafted bouquet of 12 premium white roses, wrapped in our signature kraft paper.",
    category: "Floral Arrangements",
    collection: "floral-arrangements",
    price: "85.00",
    comparePrice: "",
    sku: "FLR-2024-001",
    barcode: "",
    stockCount: "42",
    weight: "350",
    tags: ["roses", "white", "bouquet", "fresh"],
    seoTitle: "Ethereal White Roses | Craftopia",
    seoDescription: "Handcrafted bouquet of 12 premium white roses. Perfect for weddings, anniversaries, and gifts.",
    isActive: true,
    isNew: true,
    isBestSeller: false,
    trackInventory: true,
    continueWhenOOS: false,
    hasVariants: false,
};

interface Variant { id: string; name: string; price: string; stock: string; sku: string; }

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [title, setTitle] = useState(MOCK.title);
    const [slug, setSlug] = useState(MOCK.slug);
    const [description, setDescription] = useState(MOCK.description);
    const [category, setCategory] = useState(MOCK.category);
    const [collection, setCollection] = useState(MOCK.collection);
    const [price, setPrice] = useState(MOCK.price);
    const [comparePrice, setComparePrice] = useState(MOCK.comparePrice);
    const [sku, setSku] = useState(MOCK.sku);
    const [barcode, setBarcode] = useState(MOCK.barcode);
    const [stockCount, setStockCount] = useState(MOCK.stockCount);
    const [weight, setWeight] = useState(MOCK.weight);
    const [tags, setTags] = useState(MOCK.tags);
    const [seoTitle, setSeoTitle] = useState(MOCK.seoTitle);
    const [seoDesc, setSeoDesc] = useState(MOCK.seoDescription);
    const [isActive, setIsActive] = useState(MOCK.isActive);
    const [isNew, setIsNew] = useState(MOCK.isNew);
    const [isBestSeller, setIsBestSeller] = useState(MOCK.isBestSeller);
    const [trackInventory, setTrackInventory] = useState(MOCK.trackInventory);
    const [continueWhenOOS, setContinueWhenOOS] = useState(MOCK.continueWhenOOS);
    const [hasVariants, setHasVariants] = useState(MOCK.hasVariants);
    const [variants, setVariants] = useState<Variant[]>([{ id: "v1", name: "", price: "", stock: "", sku: "" }]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const addVariant = () => setVariants((v) => [...v, { id: `v${Date.now()}`, name: "", price: "", stock: "", sku: "" }]);
    const removeVariant = (id: string) => setVariants((v) => v.filter((x) => x.id !== id));
    const updateVariant = (id: string, field: keyof Variant, value: string) =>
        setVariants((v) => v.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

    const validate = () => {
        const e: Record<string, string> = {};
        if (!title.trim()) e.title = "Product title is required.";
        if (!price.trim() || isNaN(Number(price))) e.price = "Enter a valid price.";
        if (!category) e.category = "Please select a category.";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        // TODO: PUT /api/products/:id
        await new Promise((r) => setTimeout(r, 800));
        setSaving(false);
        router.push("/admin/products");
    };

    const inp = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[900px]">

            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <Link href="/admin/products" className="hover:text-[#111] transition-colors">Products</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">Edit #{params.id}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[30px] font-bold text-[#111] tracking-tight">Edit Product</h1>
                    <p className="text-[14px] text-stone-500 mt-1">Update product details, pricing, and inventory.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" className="flex items-center gap-2 px-5 h-11 rounded-full border border-red-200 text-[14px] font-semibold text-red-500 hover:bg-red-50 transition-colors bg-white shadow-sm">
                        <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <Link href="/admin/products" className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-stone-600 hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60">
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">

                    <FormSection title="Product Details">
                        <FormField label="Product Title" required error={errors.title}>
                            <input id="product-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inp} />
                        </FormField>
                        <FormField label="Slug (URL)" hint="/products/your-slug">
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-stone-400 font-medium whitespace-nowrap">/products/</span>
                                <input id="product-slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={`${inp} font-mono`} />
                            </div>
                        </FormField>
                        <FormField label="Description" hint="Markdown supported.">
                            <Textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
                        </FormField>
                    </FormSection>

                    <FormSection title="Product Images" description="First image is the cover.">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <ImageUploadBox label="Replace Cover" hint="1:1 or 4:3 recommended" />
                            <ImageUploadBox label="Add Image" hint="Up to 5 MB" />
                            <ImageUploadBox label="Add Image" hint="Up to 5 MB" />
                        </div>
                    </FormSection>

                    <FormSection title="Pricing">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="Price (USD)" required error={errors.price}>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                    <input id="product-price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={`${inp} pl-7`} />
                                </div>
                            </FormField>
                            <FormField label="Compare-at Price" hint="Shown with strikethrough.">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                                    <input id="compare-price" type="number" min="0" step="0.01" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} className={`${inp} pl-7`} />
                                </div>
                            </FormField>
                        </div>
                    </FormSection>

                    <FormSection title="Inventory & Shipping">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="SKU">
                                <input id="product-sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)} className={`${inp} font-mono`} />
                            </FormField>
                            <FormField label="Barcode">
                                <input id="product-barcode" type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} className={`${inp} font-mono`} />
                            </FormField>
                        </div>
                        <Toggle id="track-inventory" checked={trackInventory} onChange={setTrackInventory} label="Track inventory" />
                        {trackInventory && (
                            <div className="pl-14 space-y-3">
                                <FormField label="Stock Quantity">
                                    <input id="product-stock" type="number" min="0" value={stockCount} onChange={(e) => setStockCount(e.target.value)} className={`${inp} max-w-[160px]`} />
                                </FormField>
                                <Toggle id="continue-oos" checked={continueWhenOOS} onChange={setContinueWhenOOS} label="Allow purchase when out of stock" />
                            </div>
                        )}
                        <FormField label="Weight (grams)">
                            <input id="product-weight" type="number" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} className={`${inp} max-w-[200px]`} />
                        </FormField>
                    </FormSection>

                    <FormSection title="Variants">
                        <Toggle id="has-variants" checked={hasVariants} onChange={setHasVariants} label="This product has multiple variants" />
                        {hasVariants && (
                            <div className="space-y-3 pt-2">
                                {variants.map((v) => (
                                    <div key={v.id} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2.5 border border-stone-100">
                                        <GripVertical className="w-4 h-4 text-stone-300 flex-shrink-0 cursor-grab" />
                                        <input type="text" placeholder="e.g. Small / Red" value={v.name} onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                                            className="flex-1 h-9 rounded-lg border border-stone-200 bg-white px-2.5 text-[13px] placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5CE614]" />
                                        <div className="relative w-24">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-300 text-[12px]">$</span>
                                            <input type="number" placeholder="0.00" value={v.price} onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                                                className="w-full h-9 rounded-lg border border-stone-200 bg-white pl-6 pr-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]" />
                                        </div>
                                        <input type="number" placeholder="0" value={v.stock} onChange={(e) => updateVariant(v.id, "stock", e.target.value)}
                                            className="w-20 h-9 rounded-lg border border-stone-200 bg-white px-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]" />
                                        <input type="text" placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                            className="w-28 h-9 rounded-lg border border-stone-200 bg-white px-2.5 font-mono text-[12px] focus:outline-none focus:ring-2 focus:ring-[#5CE614]" />
                                        <button type="button" onClick={() => removeVariant(v.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addVariant} className="flex items-center gap-2 w-full h-10 rounded-xl border border-dashed border-stone-300 text-[13px] font-semibold text-stone-500 hover:text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all justify-center">
                                    <Plus className="w-4 h-4" /> Add Variant
                                </button>
                            </div>
                        )}
                    </FormSection>

                    <FormSection title="SEO & Metadata">
                        <FormField label="SEO Title">
                            <input id="seo-title" type="text" value={seoTitle} maxLength={70} onChange={(e) => setSeoTitle(e.target.value)} className={inp} />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoTitle.length}/70</p>
                        </FormField>
                        <FormField label="SEO Description">
                            <Textarea id="seo-description" value={seoDesc} maxLength={160} onChange={(e) => setSeoDesc(e.target.value)} rows={3} />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoDesc.length}/160</p>
                        </FormField>
                        <FormField label="Tags">
                            <TagInput tags={tags} onChange={setTags} />
                        </FormField>
                    </FormSection>
                </div>

                <div className="space-y-5">
                    <FormSection title="Status & Visibility">
                        <div className="space-y-3">
                            <Toggle id="toggle-active" checked={isActive} onChange={setIsActive} label="Active (visible in store)" />
                            <Toggle id="toggle-new" checked={isNew} onChange={setIsNew} label="Mark as New" />
                            <Toggle id="toggle-bestseller" checked={isBestSeller} onChange={setIsBestSeller} label="Mark as Best Seller" />
                        </div>
                    </FormSection>

                    <FormSection title="Organisation">
                        <FormField label="Category" required error={errors.category}>
                            <Select id="product-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select a category…</option>
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </Select>
                        </FormField>
                        <FormField label="Collection">
                            <Select id="product-collection" value={collection} onChange={(e) => setCollection(e.target.value)}>
                                <option value="">None</option>
                                <option value="floral-arrangements">Floral Arrangements</option>
                                <option value="dried-flowers">Dried Flowers</option>
                                <option value="home-decor">Home Décor</option>
                                <option value="seasonal-specials">Seasonal Specials</option>
                                <option value="gift-sets">Gift Sets</option>
                            </Select>
                        </FormField>
                    </FormSection>

                    <div className="bg-red-50 rounded-[20px] p-5 border border-red-100">
                        <p className="text-[12px] font-bold text-red-700 mb-2">⚠️ Danger Zone</p>
                        <p className="text-[11px] text-red-500 mb-3">Deleting a product permanently removes it from all collections and orders.</p>
                        <button type="button" className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white border border-red-200 text-[13px] font-bold text-red-600 hover:bg-red-100 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" /> Delete Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom action bar */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 -mx-8 px-8 py-4 flex justify-between items-center">
                <Link href="/admin/products" className="flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-[#111] transition-colors">
                    <X className="w-4 h-4" /> Cancel
                </Link>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60">
                    <Save className="w-4 h-4" />
                    {saving ? "Saving…" : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
