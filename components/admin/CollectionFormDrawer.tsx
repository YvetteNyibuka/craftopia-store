"use client";

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { FormField, FormSection, Toggle, TagInput, ImageUploadBox } from "@/components/ui/form-primitives";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CollectionFormData {
    id?: string | number;
    name: string;
    slug: string;
    description: string;
    status: "active" | "inactive";
    sortOrder: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    isFeatured: boolean;
    showOnHomepage: boolean;
}

interface CollectionFormDrawerProps {
    open: boolean;
    onClose: () => void;
    /** Pass an existing collection to switch to "edit" mode */
    initial?: Partial<CollectionFormData> | null;
    onSave?: (data: CollectionFormData) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const toSlug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const BLANK: CollectionFormData = {
    name: "", slug: "", description: "",
    status: "active", sortOrder: "manual",
    tags: [], seoTitle: "", seoDescription: "",
    isFeatured: false, showOnHomepage: false,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function CollectionFormDrawer({ open, onClose, initial, onSave }: CollectionFormDrawerProps) {
    const isEdit = Boolean(initial?.id);

    // ── State ────────────────────────────────────────────────────────────
    const [form, setForm] = useState<CollectionFormData>(BLANK);
    const [slugManual, setSlugManual] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    /* Seed form when drawer opens or initial changes */
    useEffect(() => {
        if (open) {
            setForm(initial ? { ...BLANK, ...initial } : BLANK);
            setSlugManual(Boolean(initial?.slug));
            setErrors({});
        }
    }, [open, initial]);

    // ── Field helpers ────────────────────────────────────────────────────
    const set = <K extends keyof CollectionFormData>(key: K, value: CollectionFormData[K]) =>
        setForm((f) => ({ ...f, [key]: value }));

    const handleNameChange = (val: string) => {
        set("name", val);
        if (!slugManual) set("slug", toSlug(val));
    };

    // ── Validation ───────────────────────────────────────────────────────
    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Collection name is required.";
        if (!form.slug.trim()) e.slug = "Slug is required.";
        else if (!/^[a-z0-9-]+$/.test(form.slug)) e.slug = "Only lowercase letters, numbers, and hyphens.";
        return e;
    };

    // ── Submit ───────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        await new Promise((r) => setTimeout(r, 700)); // TODO: replace with API call
        setSaving(false);
        onSave?.(form);
        onClose();
    };

    const inputCls = "flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:border-[#5CE614]";

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
                {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Collection"}
            </button>
        </form>
    );

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title={isEdit ? `Edit: ${initial?.name || "Collection"}` : "New Collection"}
            subtitle={isEdit ? "Update collection details and settings." : "Organise products into a browseable group."}
            footer={footer}
            width="max-w-xl"
        >
            <form id="collection-form" onSubmit={handleSubmit} className="space-y-5">

                {/* ── Basic Info ──────────────────────────────────────── */}
                <FormSection title="Basic Information">
                    <FormField label="Collection Name" required error={errors.name}>
                        <input
                            id="col-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="e.g. Summer Bouquets"
                            className={inputCls}
                            autoFocus
                        />
                    </FormField>

                    <FormField label="Slug (URL)" hint="/collections/your-slug" error={errors.slug}>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] text-stone-400 font-medium whitespace-nowrap shrink-0">/collections/</span>
                            <input
                                id="col-slug"
                                type="text"
                                value={form.slug}
                                onChange={(e) => { set("slug", e.target.value); setSlugManual(true); }}
                                placeholder="summer-bouquets"
                                className={`${inputCls} font-mono`}
                            />
                        </div>
                    </FormField>

                    <FormField label="Description" hint="Displayed on the collection page.">
                        <Textarea
                            id="col-description"
                            value={form.description}
                            onChange={(e) => set("description", e.target.value)}
                            placeholder="Describe what makes this collection special…"
                            rows={3}
                        />
                    </FormField>
                </FormSection>

                {/* ── Image ───────────────────────────────────────────── */}
                <FormSection title="Cover Image">
                    <ImageUploadBox
                        label={isEdit ? "Replace Cover Image" : "Upload Cover Image"}
                        hint="Recommended 1200 × 800px. PNG, JPG, WEBP up to 5 MB."
                    />
                </FormSection>

                {/* ── Visibility ──────────────────────────────────────── */}
                <FormSection title="Visibility & Sorting">
                    <FormField label="Status">
                        <Select
                            id="col-status"
                            value={form.status}
                            onChange={(e) => set("status", e.target.value as "active" | "inactive")}
                        >
                            <option value="active">Active – visible to customers</option>
                            <option value="inactive">Inactive – hidden</option>
                        </Select>
                    </FormField>

                    <FormField label="Default Sort Order">
                        <Select
                            id="col-sort"
                            value={form.sortOrder}
                            onChange={(e) => set("sortOrder", e.target.value)}
                        >
                            <option value="manual">Manual</option>
                            <option value="best-selling">Best Selling</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="newest">Newest First</option>
                            <option value="alpha-asc">A → Z</option>
                        </Select>
                    </FormField>

                    <div className="space-y-3 pt-1">
                        <Toggle
                            id="col-featured"
                            checked={form.isFeatured}
                            onChange={(v) => set("isFeatured", v)}
                            label="Mark as Featured"
                        />
                        <Toggle
                            id="col-homepage"
                            checked={form.showOnHomepage}
                            onChange={(v) => set("showOnHomepage", v)}
                            label="Show on Homepage"
                        />
                    </div>
                </FormSection>

                {/* ── SEO ─────────────────────────────────────────────── */}
                <FormSection title="SEO & Metadata">
                    <FormField label="SEO Title" hint="Defaults to the collection name if empty.">
                        <input
                            id="col-seo-title"
                            type="text"
                            value={form.seoTitle}
                            maxLength={70}
                            onChange={(e) => set("seoTitle", e.target.value)}
                            placeholder={form.name || "SEO title…"}
                            className={inputCls}
                        />
                        <p className="text-[10px] text-stone-400 mt-1 text-right">{form.seoTitle.length}/70</p>
                    </FormField>

                    <FormField label="SEO Description">
                        <Textarea
                            id="col-seo-desc"
                            value={form.seoDescription}
                            maxLength={160}
                            onChange={(e) => set("seoDescription", e.target.value)}
                            placeholder="A short description for search engines…"
                            rows={2}
                        />
                        <p className="text-[10px] text-stone-400 mt-1 text-right">{form.seoDescription.length}/160</p>
                    </FormField>

                    <FormField label="Tags" hint="Press Enter or comma to add.">
                        <TagInput tags={form.tags} onChange={(t) => set("tags", t)} placeholder="floral, gifting…" />
                    </FormField>
                </FormSection>
            </form>
        </Drawer>
    );
}
