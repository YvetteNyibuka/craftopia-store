/**
 * Craftopia API client
 * Centralised fetch wrapper — handles auth headers, JSON parsing, and errors.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// ── Token helpers (localStorage — client-only) ────────────────────────────────

export const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("craftopia_token");
};

export const setToken = (token: string): void => {
    if (typeof window !== "undefined") localStorage.setItem("craftopia_token", token);
};

export const removeToken = (): void => {
    if (typeof window !== "undefined") localStorage.removeItem("craftopia_token");
};

// ── API error class ───────────────────────────────────────────────────────────

export class ApiError extends Error {
    constructor(public message: string, public status: number) {
        super(message);
        this.name = "ApiError";
    }
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
    auth?: boolean;         // attach Authorization header (default: true if token exists)
    params?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T = unknown>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { auth = true, params, ...fetchOptions } = options;

    // Build URL with query params
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined) url.searchParams.set(k, String(v));
        });
    }

    // Build headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(fetchOptions.headers as Record<string, string>),
    };

    if (auth) {
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers,
        credentials: "include",    // send cookies too
    });

    // 204 No Content
    if (response.status === 204) return undefined as T;

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            data?.message ?? `Request failed with status ${response.status}`,
            response.status
        );
    }

    return data as T;
}

// ── Convenience methods ───────────────────────────────────────────────────────

export const api = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        apiFetch<T>(endpoint, { method: "GET", ...options }),

    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
        apiFetch<T>(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),

    patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
        apiFetch<T>(endpoint, { method: "PATCH", body: JSON.stringify(body), ...options }),

    delete: <T>(endpoint: string, options?: FetchOptions) =>
        apiFetch<T>(endpoint, { method: "DELETE", ...options }),
};
