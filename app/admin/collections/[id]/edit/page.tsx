"use client";

// Edit Collection page — reuses the same form as New, but pre-populated.
// When the API is ready, fetch collection data using `params.id`.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Save, X, ArrowLeft, Trash2 } from "lucide-react";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data — replace with API call: `GET /api/collections/:id`
const MOCK_COLLECTION = {
    name: "Floral Arrangements",
    slug: "floral-arrangements",
    description: "Our signature handcrafted floral arrangements, made fresh to order.",
    status: "active" as "active" | "inactive",
    sortOrder: "best-selling",
    tags: ["floral", "fresh", "handcrafted"],
    seoTitle: "Floral Arrangements | Craftopia",
    seoDescription: "Browse our stunning collection of handcrafted fresh floral arrangements.",
    isFeatured: true,
    showOnHomepage: true,
};

export default function EditCollectionPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [name, setName] = useState(MOCK_COLLECTION.name);
    const [slug, setSlug] = useState(MOCK_COLLECTION.slug);
    const [slugManual] = useState(true);
    const [description, setDescription] = useState(MOCK_COLLECTION.description);
    const [status, setStatus] = useState(MOCK_COLLECTION.status);
    const [sortOrder, setSortOrder] = useState(MOCK_COLLECTION.sortOrder);
    const [tags, setTags] = useState(MOCK_COLLECTION.tags);
    const [seoTitle, setSeoTitle] = useState(MOCK_COLLECTION.seoTitle);
    const [seoDescription, setSeoDescription] = useState(MOCK_COLLECTION.seoDescription);
    const [isFeatured, setIsFeatured] = useState(MOCK_COLLECTION.isFeatured);
    const [showOnHomepage, setShowOnHomepage] = useState(MOCK_COLLECTION.showOnHomepage);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Collection name is required.";
        if (!slug.trim()) e.slug = "Slug is required.";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        // TODO: PUT /api/collections/:id
        await new Promise((r) => setTimeout(r, 800));
        setSaving(false);
        router.push("/admin/collections");
    };

    const inputCls = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[860px]">

            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <Link href="/admin/collections" className="hover:text-[#111] transition-colors">Collections</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">Edit #{params.id}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[30px] font-bold text-[#111] tracking-tight">Edit Collection</h1>
                    <p className="text-[14px] text-stone-500 mt-1">Update collection details and settings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 h-11 rounded-full border border-red-200 text-[14px] font-semibold text-red-500 hover:bg-red-50 transition-colors bg-white shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <Link
                        href="/admin/collections"
                        className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-stone-600 hover:bg-stone-50 transition-colors bg-white shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                    <FormSection title="Basic Information">
                        <FormField label="Collection Name" required error={errors.name}>
                            <input id="collection-name" type="text" value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputCls} />
                        </FormField>
                        <FormField label="Slug (URL)" hint="/collections/your-slug" error={errors.slug}>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-stone-400 font-medium whitespace-nowrap">/collections/</span>
                                <input id="collection-slug" type="text" value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className={`${inputCls} font-mono`} />
                            </div>
                        </FormField>
                        <FormField label="Description" hint="Markdown supported.">
                            <Textarea id="collection-description" value={description}
                                onChange={(e) => setDescription(e.target.value)} rows={4} />
                        </FormField>
                    </FormSection>

                    <FormSection title="Collection Image">
                        <ImageUploadBox label="Replace Cover Image" hint="Recommended 1200 × 800px." />
                    </FormSection>

                    <FormSection title="SEO & Metadata">
                        <FormField label="SEO Title">
                            <input id="seo-title" type="text" value={seoTitle} maxLength={70}
                                onChange={(e) => setSeoTitle(e.target.value)} className={inputCls} />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoTitle.length}/70</p>
                        </FormField>
                        <FormField label="SEO Description">
                            <Textarea id="seo-description" value={seoDescription} maxLength={160}
                                onChange={(e) => setSeoDescription(e.target.value)} rows={3} />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoDescription.length}/160</p>
                        </FormField>
                        <FormField label="Tags">
                            <TagInput tags={tags} onChange={setTags} />
                        </FormField>
                    </FormSection>
                </div>

                <div className="space-y-5">
                    <FormSection title="Visibility">
                        <FormField label="Status">
                            <Select id="collection-status" value={status}
                                onChange={(e) => setStatus(e.target.value as "active" | "inactive")}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Select>
                        </FormField>
                        <div className="space-y-3 pt-1">
                            <Toggle id="toggle-featured" checked={isFeatured} onChange={setIsFeatured} label="Mark as Featured" />
                            <Toggle id="toggle-homepage" checked={showOnHomepage} onChange={setShowOnHomepage} label="Show on Homepage" />
                        </div>
                    </FormSection>

                    <FormSection title="Product Sorting">
                        <FormField label="Default Sort Order">
                            <Select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="manual">Manual</option>
                                <option value="best-selling">Best Selling</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                                <option value="newest">Newest First</option>
                                <option value="alpha-asc">A → Z</option>
                            </Select>
                        </FormField>
                    </FormSection>

                    {/* Danger zone */}
                    <div className="bg-red-50 rounded-[20px] p-5 border border-red-100">
                        <p className="text-[12px] font-bold text-red-700 mb-2">⚠️ Danger Zone</p>
                        <p className="text-[11px] text-red-500 mb-3">Deleting a collection cannot be undone. Products will not be deleted.</p>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white border border-red-200 text-[13px] font-bold text-red-600 hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Delete Collection
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom action bar */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 -mx-8 px-8 py-4 flex justify-between items-center">
                <Link href="/admin/collections" className="flex items-center gap-2 text-[13px] font-semibold text-stone-500 hover:text-[#111] transition-colors">
                    <X className="w-4 h-4" /> Cancel
                </Link>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving…" : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
