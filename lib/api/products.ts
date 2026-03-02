import { api } from "./client";

export interface ApiProduct {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  images: string[];
  category: string;
  collectionId?: { _id: string; name: string; slug: string } | string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stockCount: number;
  isActive: boolean;
  isNewProduct?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface ApiCollection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  status: "active" | "inactive";
  productCount: number;
  revenue?: number;
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ListResponse<T> {
  status: string;
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export const productsApi = {
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    collection?: string;
    sort?: string;
    order?: string;
    status?: string;
  }) =>
    api.get<ListResponse<ApiProduct>>("/products", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  get: (slug: string) =>
    api.get<{ status: string; data: ApiProduct }>(`/products/${slug}`),

  lowStock: (threshold?: number) =>
    api.get<{ status: string; data: ApiProduct[]; total: number }>(
      "/products/low-stock",
      {
        params: threshold ? { threshold } : undefined,
      },
    ),

  create: (data: Partial<ApiProduct>) =>
    api.post<{ status: string; data: ApiProduct }>("/products", data),

  update: (id: string, data: Partial<ApiProduct>) =>
    api.put<{ status: string; data: ApiProduct }>(`/products/${id}`, data),

  delete: (id: string) => api.delete(`/products/${id}`),
};

export const collectionsApi = {
  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) =>
    api.get<ListResponse<ApiCollection>>("/collections", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  get: (slug: string) =>
    api.get<{ status: string; data: ApiCollection }>(`/collections/${slug}`),

  create: (data: Partial<ApiCollection>) =>
    api.post<{ status: string; data: ApiCollection }>("/collections", data),

  update: (id: string, data: Partial<ApiCollection>) =>
    api.put<{ status: string; data: ApiCollection }>(
      `/collections/${id}`,
      data,
    ),

  delete: (id: string) => api.delete(`/collections/${id}`),
};
