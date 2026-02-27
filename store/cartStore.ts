"use client";

/**
 * Hybrid cart store:
 * - Logged-in users: syncs with backend API (server cart persists across devices)
 * - Guests: persists in localStorage via Zustand persist
 *
 * On login the guest cart is merged into the server cart.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartApi, ApiCart, CartItemApi } from "@/lib/api/cart";
import { getToken } from "@/lib/api/client";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
    id: string;          // _id from server OR temp- for guests
    productId: string;
    title: string;
    image?: string;
    price: number;
    quantity: number;
    variant?: string;
    slug?: string;
}

interface CartState {
    items: CartItem[];
    subtotal: number;
    total: number;
    itemCount: number;
    isLoading: boolean;
    isSynced: boolean;   // true when cart came from API

    // Actions
    fetchCart: () => Promise<void>;
    addItem: (payload: { productId: string; title: string; image?: string; price: number; quantity?: number; variant?: string; slug?: string }) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    clearCart: () => Promise<void>;
    mergeGuestCart: () => Promise<void>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const computeTotals = (items: CartItem[]) => ({
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    total: items.reduce((s, i) => s + i.price * i.quantity, 0),
    itemCount: items.reduce((s, i) => s + i.quantity, 0),
});

const fromApiCart = (cart: ApiCart): CartItem[] =>
    cart.items.map((item: CartItemApi) => {
        const prod = typeof item.product === "object" ? item.product : null;
        return {
            id: item._id,
            productId: prod?._id ?? item.product as string,
            title: item.title,
            image: item.image ?? prod?.images?.[0],
            price: item.price,
            quantity: item.quantity,
            variant: item.variant,
            slug: prod?.slug,
        };
    });

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            subtotal: 0,
            total: 0,
            itemCount: 0,
            isLoading: false,
            isSynced: false,

            fetchCart: async () => {
                if (!getToken()) return;
                set({ isLoading: true });
                try {
                    const res = await cartApi.get();
                    const items = fromApiCart(res.data);
                    set({ items, ...computeTotals(items), isSynced: true });
                } catch {
                    // ignore network errors — use local state
                } finally {
                    set({ isLoading: false });
                }
            },

            addItem: async ({ productId, title, image, price, quantity = 1, variant, slug }) => {
                if (getToken()) {
                    // API cart
                    set({ isLoading: true });
                    try {
                        const res = await cartApi.addItem(productId, quantity, variant);
                        const items = fromApiCart(res.data);
                        set({ items, ...computeTotals(items), isSynced: true });
                    } finally {
                        set({ isLoading: false });
                    }
                } else {
                    // Guest cart (localStorage)
                    set((state) => {
                        const existing = state.items.find(
                            (i) => i.productId === productId && i.variant === (variant ?? "")
                        );
                        let items: CartItem[];
                        if (existing) {
                            items = state.items.map((i) =>
                                i.productId === productId && i.variant === (variant ?? "")
                                    ? { ...i, quantity: Math.min(i.quantity + quantity, 99) }
                                    : i
                            );
                        } else {
                            items = [
                                ...state.items,
                                { id: `temp-${Date.now()}`, productId, title, image, price, quantity, variant, slug },
                            ];
                        }
                        return { items, ...computeTotals(items) };
                    });
                }
            },

            updateQuantity: async (id, quantity) => {
                if (getToken() && get().isSynced) {
                    set({ isLoading: true });
                    try {
                        const res = await cartApi.updateItem(id, quantity);
                        const items = fromApiCart(res.data);
                        set({ items, ...computeTotals(items) });
                    } finally {
                        set({ isLoading: false });
                    }
                } else {
                    set((state) => {
                        const items = state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
                        return { items, ...computeTotals(items) };
                    });
                }
            },

            removeItem: async (id) => {
                if (getToken() && get().isSynced) {
                    set({ isLoading: true });
                    try {
                        const res = await cartApi.removeItem(id);
                        const items = fromApiCart(res.data);
                        set({ items, ...computeTotals(items) });
                    } finally {
                        set({ isLoading: false });
                    }
                } else {
                    set((state) => {
                        const items = state.items.filter((i) => i.id !== id);
                        return { items, ...computeTotals(items) };
                    });
                }
            },

            clearCart: async () => {
                if (getToken()) {
                    try { await cartApi.clear(); } catch { /* ignore */ }
                }
                set({ items: [], subtotal: 0, total: 0, itemCount: 0, isSynced: false });
            },

            /** Merge localStorage guest cart into server cart after login */
            mergeGuestCart: async () => {
                const guestItems = get().items.filter((i) => i.id.startsWith("temp-"));
                if (!guestItems.length) {
                    await get().fetchCart();
                    return;
                }
                set({ isLoading: true });
                try {
                    // Add each guest item to server
                    for (const item of guestItems) {
                        await cartApi.addItem(item.productId, item.quantity, item.variant);
                    }
                    await get().fetchCart();
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        { name: "craftopia-cart" }
    )
);
