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

export const categoryService = {
  // Get all categories
  getAll: async () => {
    const response = await api.get<CategoryResponse>("/categories");
    return response.data.data; // Extract data from wrapper
  },

  // Get category by ID
  getById: async (id: number) => {
    const response = await api.get<SingleCategoryResponse>(`/categories/${id}`);
    return response.data.data; // Extract data from wrapper
  },

  // Create new category
  create: async (data: { name: string; description?: string }) => {
    const response = await api.post<{ success: boolean; data: Category }>("/categories", data);
    return response.data.data; // Extract data from wrapper
  },

  // Update category
  update: async (id: number, data: { name: string; description?: string }) => {
    const response = await api.put<{ success: boolean; data: Category }>(`/categories/${id}`, data);
    return response.data.data; // Extract data from wrapper
  },

  // Delete category
  delete: async (id: number) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/categories/${id}`);
    return response.data;
  },
};
