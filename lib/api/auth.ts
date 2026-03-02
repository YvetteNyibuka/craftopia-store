import { api, setToken, removeToken } from "./client";

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "staff" | "user";
    avatar?: string;
    phone?: string;
    isActive: boolean;
    ordersCount?: number;
    totalSpent?: number;
    wishlist?: string[];
    createdAt: string;
}

interface AuthResponse {
    status: string;
    token: string;
    data: { user: AuthUser };
}

export const authApi = {
    signup: async (data: { name: string; email: string; password: string; phone?: string }): Promise<AuthUser> => {
        const res = await api.post<AuthResponse>("/auth/signup", data, { auth: false });
        setToken(res.token);
        return res.data.user;
    },

    login: async (email: string, password: string): Promise<AuthUser> => {
        const res = await api.post<AuthResponse>("/auth/login", { email, password }, { auth: false });
        setToken(res.token);
        return res.data.user;
    },

    logout: async (): Promise<void> => {
        try { await api.post("/auth/logout", {}); } catch { /* ignore */ }
        removeToken();
    },

    getMe: async (): Promise<AuthUser> => {
        const res = await api.get<{ status: string; data: { user: AuthUser } }>("/auth/me");
        return res.data.user;
    },

    updateMe: async (data: Partial<Pick<AuthUser, "name" | "email" | "phone" | "avatar">>): Promise<AuthUser> => {
        const res = await api.patch<{ status: string; data: { user: AuthUser } }>("/auth/update-me", data);
        return res.data.user;
    },

    changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        const res = await api.patch<AuthResponse>("/auth/change-password", { currentPassword, newPassword });
        setToken(res.token);
    },

    forgotPassword: async (email: string): Promise<string> => {
        const res = await api.post<{ message: string }>("/auth/forgot-password", { email }, { auth: false });
        return res.message;
    },

    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        const res = await api.post<AuthResponse>("/auth/reset-password", { token, newPassword }, { auth: false });
        setToken(res.token);
    },
};
