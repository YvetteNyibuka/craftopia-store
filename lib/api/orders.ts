import { api } from "./client";

export interface ApiAddress {
    _id?: string;
    label: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
    phone?: string;
    isDefault: boolean;
}

export interface ApiOrderItem {
    product: string;
    title: string;
    image?: string;
    price: number;
    quantity: number;
    variant?: string;
}

export interface ApiOrder {
    _id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: ApiOrderItem[];
    shippingAddress: ApiAddress;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    paymentStatus: "Pending" | "Paid" | "Refunded" | "Failed";
    paymentMethod?: string;
    notes?: string;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

interface ListResponse<T> {
    status: string;
    data: T[];
    total: number;
    page: number;
    pages: number;
}

export interface CreateOrderPayload {
    customer?: string;
    customerName: string;
    customerEmail: string;
    items: ApiOrderItem[];
    shippingAddress: Omit<ApiAddress, "_id" | "isDefault">;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    paymentMethod?: string;
    notes?: string;
}

export const ordersApi = {
    list: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
        api.get<ListResponse<ApiOrder>>("/orders", {
            params: params as Record<string, string | number | boolean | undefined>,
        }),

    get: (id: string) =>
        api.get<{ status: string; data: ApiOrder }>(`/orders/${id}`),

    create: (payload: CreateOrderPayload) =>
        api.post<{ status: string; data: ApiOrder }>("/orders", payload),

    updateStatus: (id: string, status: ApiOrder["status"]) =>
        api.patch<{ status: string; data: ApiOrder }>(`/orders/${id}/status`, { status }),

    update: (id: string, data: Partial<ApiOrder>) =>
        api.patch<{ status: string; data: ApiOrder }>(`/orders/${id}`, data),

    delete: (id: string) => api.delete(`/orders/${id}`),

    stats: () =>
        api.get<{ status: string; data: { total: number; byStatus: Record<string, number>; revenue: number } }>("/orders/stats"),
};

// ── Addresses API ─────────────────────────────────────────────────────────────

export const addressesApi = {
    list: () =>
        api.get<{ status: string; data: ApiAddress[] }>("/users/me/addresses"),

    add: (address: Omit<ApiAddress, "_id">) =>
        api.post<{ status: string; data: ApiAddress[] }>("/users/me/addresses", address),

    update: (id: string, data: Partial<ApiAddress>) =>
        api.patch<{ status: string; data: ApiAddress[] }>(`/users/me/addresses/${id}`, data),

    setDefault: (id: string) =>
        api.patch<{ status: string; data: ApiAddress[] }>(`/users/me/addresses/${id}/default`, {}),

    delete: (id: string) =>
        api.delete<{ status: string; data: ApiAddress[] }>(`/users/me/addresses/${id}`),
};

// ── Admin: Customers API ──────────────────────────────────────────────────────

export interface ApiCustomer {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    status: "Active" | "Inactive";
    ordersCount: number;
    totalSpent: number;
    createdAt: string;
}

export const customersApi = {
    list: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
        api.get<ListResponse<ApiCustomer>>("/customers", {
            params: params as Record<string, string | number | boolean | undefined>,
        }),

    get: (id: string) =>
        api.get<{ status: string; data: ApiCustomer & { recentOrders: ApiOrder[] } }>(`/customers/${id}`),

    create: (data: Partial<ApiCustomer>) =>
        api.post<{ status: string; data: ApiCustomer }>("/customers", data),

    update: (id: string, data: Partial<ApiCustomer>) =>
        api.patch<{ status: string; data: ApiCustomer }>(`/customers/${id}`, data),

    delete: (id: string) => api.delete(`/customers/${id}`),

    stats: () =>
        api.get<{ status: string; data: { total: number; active: number; inactive: number; avgOrderValue: number } }>("/customers/stats"),
};
