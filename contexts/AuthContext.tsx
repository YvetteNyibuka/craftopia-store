"use client";

import {
    createContext, useContext, useEffect, useState,
    useCallback, ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, AuthUser } from "@/lib/api/auth";
import { getToken, removeToken } from "@/lib/api/client";

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<AuthUser>) => void;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Try to restore session from stored token on mount
    const refresh = useCallback(async () => {
        const token = getToken();
        if (!token) { setIsLoading(false); return; }

        try {
            const me = await authApi.getMe();
            setUser(me);
        } catch {
            removeToken();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { refresh(); }, [refresh]);

    const login = async (email: string, password: string) => {
        const u = await authApi.login(email, password);
        setUser(u);
    };

    const signup = async (data: { name: string; email: string; password: string; phone?: string }) => {
        const u = await authApi.signup(data);
        setUser(u);
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
        router.push("/");
    };

    const updateUser = (data: Partial<AuthUser>) =>
        setUser((prev) => (prev ? { ...prev, ...data } : null));

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin" || user?.role === "staff",
                login,
                signup,
                logout,
                updateUser,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
