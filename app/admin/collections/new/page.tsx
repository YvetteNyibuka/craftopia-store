"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Save, X, ArrowLeft } from "lucide-react";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewCollectionPage() {
    const router = useRouter();

    // ── Form state ──────────────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [slugManual, setSlugManual] = useState(false);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"active" | "inactive">("active");
    const [sortOrder, setSortOrder] = useState("manual");
    const [tags, setTags] = useState<string[]>([]);
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [showOnHomepage, setShowOnHomepage] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ── Auto-slug from name ─────────────────────────────────────────────────
    const handleNameChange = (val: string) => {
        setName(val);
        if (!slugManual) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
        }
    };

    // ── Validation ──────────────────────────────────────────────────────────
    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Collection name is required.";
        if (!slug.trim()) e.slug = "Slug is required.";
        else if (!/^[a-z0-9-]+$/.test(slug)) e.slug = "Slug can only contain lowercase letters, numbers, and hyphens.";
        return e;
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        // TODO: wire to API
        await new Promise((r) => setTimeout(r, 800));
        setSaving(false);
        router.push("/admin/collections");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[860px]">

            {/* ── Breadcrumb ─────────────────────────────────────────────── */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <Link href="/admin/collections" className="hover:text-[#111] transition-colors">Collections</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">New Collection</span>
            </div>

            {/* ── Page header ────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[30px] font-bold text-[#111] tracking-tight">Create Collection</h1>
                    <p className="text-[14px] text-stone-500 mt-1">Group products into a browseable collection.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/collections"
                        className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-stone-600 hover:bg-stone-50 transition-colors bg-white shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Discard
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving…" : "Save Collection"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ── LEFT COLUMN (main) ──────────────────────────────── */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Basic Info */}
                    <FormSection title="Basic Information" description="Name and describe the collection.">
                        <FormField label="Collection Name" required error={errors.name}>
                            <input
                                id="collection-name"
                                type="text"
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="e.g. Summer Bouquets"
                                className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]"
                            />
                        </FormField>

                        <FormField
                            label="Slug (URL)"
                            required
                            hint="Used in the URL: /collections/your-slug"
                            error={errors.slug}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-stone-400 font-medium whitespace-nowrap">/collections/</span>
                                <input
                                    id="collection-slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                                    placeholder="summer-bouquets"
                                    className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-mono shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]"
                                />
                            </div>
                        </FormField>

                        <FormField label="Description" hint="Displayed on the collection page. Markdown supported.">
                            <Textarea
                                id="collection-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what makes this collection special…"
                                rows={4}
                            />
                        </FormField>
                    </FormSection>

                    {/* Image */}
                    <FormSection title="Collection Image" description="Used as the cover photo on the collections page.">
                        <ImageUploadBox
                            label="Upload Cover Image"
                            hint="Recommended 1200 × 800px. PNG, JPG, WEBP up to 5 MB."
                        />
                    </FormSection>

                    {/* SEO */}
                    <FormSection title="SEO & Metadata" description="Optimise how this collection appears in search engines.">
                        <FormField label="SEO Title" hint="Defaults to the collection name if left empty.">
                            <input
                                id="seo-title"
                                type="text"
                                value={seoTitle}
                                onChange={(e) => setSeoTitle(e.target.value)}
                                maxLength={70}
                                placeholder={name || "SEO title…"}
                                className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]"
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoTitle.length}/70</p>
                        </FormField>

                        <FormField label="SEO Description" hint="Shown in search snippets. Aim for 150–160 characters.">
                            <Textarea
                                id="seo-description"
                                value={seoDescription}
                                onChange={(e) => setSeoDescription(e.target.value)}
                                maxLength={160}
                                placeholder="A short description for search engines…"
                                rows={3}
                            />
                            <p className="text-[10px] text-stone-400 mt-1 text-right">{seoDescription.length}/160</p>
                        </FormField>

                        <FormField label="Tags" hint="Press Enter or comma to add a tag.">
                            <TagInput tags={tags} onChange={setTags} placeholder="floral, bouquet, gifts…" />
                        </FormField>
                    </FormSection>
                </div>

                {/* ── RIGHT COLUMN (settings) ─────────────────────────── */}
                <div className="space-y-5">

                    {/* Status */}
                    <FormSection title="Visibility">
                        <FormField label="Status">
                            <Select
                                id="collection-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                            >
                                <option value="active">Active – visible to customers</option>
                                <option value="inactive">Inactive – hidden</option>
                            </Select>
                        </FormField>

                        <div className="space-y-3 pt-1">
                            <Toggle
                                id="toggle-featured"
                                checked={isFeatured}
                                onChange={setIsFeatured}
                                label="Mark as Featured"
                            />
                            <Toggle
                                id="toggle-homepage"
                                checked={showOnHomepage}
                                onChange={setShowOnHomepage}
                                label="Show on Homepage"
                            />
                        </div>
                    </FormSection>

                    {/* Sort Order */}
                    <FormSection title="Product Sorting" description="How products in this collection are ordered by default.">
                        <FormField label="Default Sort Order">
                            <Select
                                id="sort-order"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="manual">Manual</option>
                                <option value="best-selling">Best Selling</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="alpha-asc">A → Z</option>
                                <option value="alpha-desc">Z → A</option>
                            </Select>
                        </FormField>
                    </FormSection>

                    {/* Quick tips */}
                    <div className="bg-[#F0FBE8] rounded-[20px] p-5 border border-[#C9E9B0]">
                        <p className="text-[12px] font-bold text-[#3F6136] mb-2">💡 Tips</p>
                        <ul className="space-y-1.5 text-[11px] text-[#5A7E4A]">
                            <li>• Slugs are generated automatically from the name.</li>
                            <li>• Featured collections appear in the homepage grid.</li>
                            <li>• Add products after saving the collection.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Bottom action bar ───────────────────────────────────────── */}
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
                    {saving ? "Saving…" : "Save Collection"}
                </button>
            </div>
        </form>
    );
}
