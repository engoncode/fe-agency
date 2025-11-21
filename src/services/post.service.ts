import api from "./api";
import type { Post, PostMeta } from "../types/post";

interface PostFilters {
  campaign_id?: number;
  influencer_name?: string;
  status?: "pending" | "approved" | "rejected";
  platform?: "instagram" | "tiktok";
  page?: number;
  per_page?: number;
}

interface PostListResponse {
  data: Post[];
  meta: PostMeta;
}

export const postService = {
  // Get posts with pagination and filters
  getAll: async (params?: PostFilters) => {
    const response = await api.get<PostListResponse>("/admin/posts", { params });
    return response.data;
  },

  // Get post by ID
  getById: async (id: number) => {
    const response = await api.get<Post>(`/admin/posts/${id}`);
    return response.data;
  },

  // Approve post
  approve: async (id: number) => {
    const response = await api.patch<{ message: string; post: Post }>(`/admin/posts/${id}/approve`);
    return response.data;
  },

  // Reject post
  reject: async (id: number, reason: string) => {
    const response = await api.patch<{ message: string; post: Post }>(`/admin/posts/${id}/reject`, { reason });
    return response.data;
  },

  // Update post status
  updateStatus: async (id: number, status: "pending" | "approved" | "rejected") => {
    const response = await api.patch<{ message: string; post: Post }>(`/admin/posts/${id}`, { status });
    return response.data;
  },
};
