import { api } from "./client";

export interface CartItemApi {
    _id: string;
    product: {
        _id: string;
        title: string;
        slug: string;
        images: string[];
        price: number;
        comparePrice?: number;
        stockCount: number;
        isActive: boolean;
    } | string;
    title: string;
    image?: string;
    price: number;
    quantity: number;
    variant?: string;
}

export interface ApiCart {
    _id: string;
    user: string;
    items: CartItemApi[];
    couponCode?: string;
    discount: number;
    subtotal: number;
    total: number;
    itemCount: number;
}

type CartResponse = { status: string; data: ApiCart };

export const cartApi = {
    get: () => api.get<CartResponse>("/cart"),

    addItem: (productId: string, quantity = 1, variant?: string) =>
        api.post<CartResponse>("/cart/items", { productId, quantity, variant }),

    updateItem: (itemId: string, quantity: number) =>
        api.patch<CartResponse>(`/cart/items/${itemId}`, { quantity }),

    removeItem: (itemId: string) => api.delete<CartResponse>(`/cart/items/${itemId}`),

    clear: () => api.delete("/cart"),
};

// ── Wishlist API ──────────────────────────────────────────────────────────────

export interface WishlistProduct {
    _id: string;
    title: string;
    slug: string;
    images: string[];
    price: number;
    comparePrice?: number;
    rating: number;
    reviewsCount: number;
    isNewProduct?: boolean;
    isBestSeller?: boolean;
    category: string;
}

export const wishlistApi = {
    get: () =>
        api.get<{ status: string; data: WishlistProduct[]; total: number }>("/users/me/wishlist"),

    add: (productId: string) =>
        api.post<{ status: string; data: string[]; message: string }>(`/users/me/wishlist/${productId}`, {}),

    remove: (productId: string) =>
        api.delete<{ status: string; data: string[] }>(`/users/me/wishlist/${productId}`),

    clear: () => api.delete("/users/me/wishlist"),
};
