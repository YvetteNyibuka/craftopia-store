"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

// ─── FormField ───────────────────────────────────────────────────────────────
interface FormFieldProps {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function FormField({ label, hint, error, required, children, className }: FormFieldProps) {
    return (
        <div className={cn("space-y-1.5", className)}>
            <label className="block text-[13px] font-semibold text-[#111]">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {hint && !error && (
                <p className="text-[11px] text-stone-400">{hint}</p>
            )}
            {error && (
                <p className="text-[11px] text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────
interface ToggleProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    id?: string;
}

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none" htmlFor={id}>
            <div
                id={id}
                role="switch"
                aria-checked={checked}
                tabIndex={0}
                onClick={() => onChange(!checked)}
                onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onChange(!checked)}
                className={cn(
                    "w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5CE614] focus:ring-offset-2",
                    checked ? "bg-[#5CE614]" : "bg-stone-200"
                )}
            >
                <span
                    className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                        checked ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </div>
            {label && (
                <span className="text-[13px] font-semibold text-[#111]">{label}</span>
            )}
        </label>
    );
}

// ─── FormSection ─────────────────────────────────────────────────────────────
interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
    return (
        <div className={cn("bg-white rounded-[20px] border border-stone-200 shadow-sm p-6 space-y-5", className)}>
            <div className="border-b border-stone-100 pb-4">
                <h2 className="text-[15px] font-bold text-[#111]">{title}</h2>
                {description && <p className="text-[12px] text-stone-400 mt-0.5">{description}</p>}
            </div>
            {children}
        </div>
    );
}

// ─── ImageUploadBox ───────────────────────────────────────────────────────────
interface ImageUploadBoxProps {
    label?: string;
    hint?: string;
    className?: string;
    onUpload?: () => void;
}

export function ImageUploadBox({ label = "Upload Image", hint = "PNG, JPG, WEBP up to 5MB", className, onUpload }: ImageUploadBoxProps) {
    return (
        <button
            type="button"
            onClick={onUpload}
            className={cn(
                "w-full border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center hover:border-[#5CE614] hover:bg-[#F0FBE8]/30 transition-all group",
                className
            )}
        >
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center group-hover:bg-[#E9F4E5] transition-colors">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-[#5CE614] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div>
                <p className="text-[13px] font-bold text-[#111]">{label}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{hint}</p>
            </div>
        </button>
    );
}

// ─── TagInput ─────────────────────────────────────────────────────────────────
interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export function TagInput({ tags, onChange, placeholder = "Type and press Enter…" }: TagInputProps) {
    const [input, setInput] = React.useState("");

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
        }
        setInput("");
    };

    const removeTag = (tag: string) => {
        onChange(tags.filter((t) => t !== tag));
    };

    return (
        <div className="flex flex-wrap gap-2 min-h-[44px] w-full rounded-xl border border-stone-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-[#5CE614] focus-within:border-[#5CE614] transition-colors">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="flex items-center gap-1.5 bg-[#E9F4E5] text-[#3F6136] text-[12px] font-bold px-2.5 py-1 rounded-lg"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-[#3F6136]/60 hover:text-[#3F6136] transition-colors leading-none"
                    >
                        ×
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                    }
                    if (e.key === "Backspace" && !input && tags.length) {
                        onChange(tags.slice(0, -1));
                    }
                }}
                placeholder={tags.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] bg-transparent text-[13px] text-[#111] placeholder:text-stone-400 focus:outline-none"
            />
        </div>
    );
}
