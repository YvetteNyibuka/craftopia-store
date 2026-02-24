"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    /** Footer content — typically Save / Cancel buttons */
    footer?: React.ReactNode;
    /** Tailwind max-w-* class. Defaults to max-w-2xl */
    width?: string;
}

export function Drawer({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer,
    width = "max-w-2xl",
}: DrawerProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    /* ── Keyboard close ──────────────────────────────────────────────── */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    /* ── Scroll lock ─────────────────────────────────────────────────── */
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    /* ── Focus trap on open ──────────────────────────────────────────── */
    useEffect(() => {
        if (open) panelRef.current?.focus();
    }, [open]);

    return (
        <>
            {/* ── Backdrop ───────────────────────────────────────────── */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={cn(
                    "fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            {/* ── Panel ──────────────────────────────────────────────── */}
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cn(
                    "fixed inset-y-0 right-0 z-50 flex flex-col bg-[#FAFAFA] shadow-2xl transition-transform duration-300 ease-out focus:outline-none",
                    "w-full",
                    width,
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-stone-100 flex-shrink-0">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#111] leading-tight">{title}</h2>
                        {subtitle && (
                            <p className="text-[12px] text-stone-400 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close drawer"
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors ml-4 flex-shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex-shrink-0 bg-white border-t border-stone-100 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </>
    );
}
