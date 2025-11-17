import api from "./api";
import type { Category } from "../types/category";

interface CategoryResponse {
  success: boolean;
  data: Category[];
}

interface SingleCategoryResponse {
  success: boolean;
  data: Category;
}

interface CategoryStats {
  total_categories: number;
  categories_with_influencers: number;
  categories_with_campaigns: number;
  avg_influencers_per_category: number;
  top_categories: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    influencers_count: number;
  }>;
}

interface CategoryStatsResponse {
  success: boolean;
  data: CategoryStats;
}

export const categoryService = {
  // Public - Get all categories (for dropdown)
  getAllPublic: async () => {
    const response = await api.get<CategoryResponse>("/categories/all");
    return response.data.data;
  },

  // Admin - Get paginated categories
  // Normalize several possible response shapes into a consistent object:
  // { data: Category[], current_page, last_page, per_page, total }
  getAll: async (params?: { page?: number; per_page?: number; search?: string }) => {
    const response = await api.get("/admin/categories", { params });
    const payload = response.data;

    // Case A: wrapped as { success: true, data: { data: [...], current_page, last_page, per_page, total } }
    if (payload && payload.data && payload.data.data && Array.isArray(payload.data.data)) {
      return {
        data: payload.data.data,
        current_page: payload.data.current_page,
        last_page: payload.data.last_page,
        per_page: payload.data.per_page,
        total: payload.data.total,
      };
    }

    // Case B: shaped as { data: [...], current_page, last_page, per_page, total }
    if (
      payload &&
      payload.data &&
      Array.isArray(payload.data) &&
      (payload.current_page || payload.last_page || payload.total)
    ) {
      return {
        data: payload.data,
        current_page: payload.current_page || 1,
        last_page: payload.last_page || 1,
        per_page: payload.per_page || params?.per_page || payload.data.length,
        total: payload.total || payload.data.length,
      };
    }

    // Case C: shaped as { meta: {...}, data: [...] }
    if (payload && payload.data && Array.isArray(payload.data) && payload.meta) {
      return {
        data: payload.data,
        current_page: payload.meta.current_page || 1,
        last_page: payload.meta.last_page || 1,
        per_page: payload.meta.per_page || params?.per_page || payload.data.length,
        total: payload.meta.total || payload.data.length,
      };
    }

    // Case D: direct array
    if (Array.isArray(payload)) {
      return {
        data: payload,
        current_page: 1,
        last_page: 1,
        per_page: params?.per_page || payload.length,
        total: payload.length,
      };
    }

    // Fallback: empty
    return {
      data: [],
      current_page: 1,
      last_page: 1,
      per_page: params?.per_page || 10,
      total: 0,
    };
  },

  // Admin - Get category statistics
  getStats: async () => {
    const response = await api.get<CategoryStatsResponse>("/admin/categories/stats");
    console.log("📡 Raw API response:", response.data);
    // Check if response is wrapped or direct
    if (response.data.data) {
      return response.data.data;
    }
    // If API returns stats directly (not wrapped in { success, data })
    return response.data as any as CategoryStats;
  },

  // Admin - Get category by ID
  getById: async (id: number) => {
    const response = await api.get<SingleCategoryResponse>(`/admin/categories/${id}`);
    return response.data.data;
  },

  // Admin - Create new category
  create: async (data: { name: string; description?: string }) => {
    const response = await api.post<SingleCategoryResponse>("/admin/categories", data);
    return response.data.data;
  },

  // Admin - Update category
  update: async (id: number, data: { name: string; description?: string }) => {
    const response = await api.put<SingleCategoryResponse>(`/admin/categories/${id}`, data);
    return response.data.data;
  },

  // Admin - Delete category
  delete: async (id: number) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/admin/categories/${id}`);
    return response.data;
  },

  // Admin - Bulk delete categories
  bulkDelete: async (ids: number[]) => {
    const response = await api.post<{ success: boolean; message: string; deleted_count: number }>(
      "/admin/categories/bulk-delete",
      { ids }
    );
    return response.data;
  },
};
