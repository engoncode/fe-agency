import api from "./api";
import type { Influencer, InfluencerFormData, InfluencerFilters, InfluencerListResponse } from "../types/influencer";

export const influencerService = {
  async getAll(params: InfluencerFilters & { page?: number; per_page?: number }): Promise<InfluencerListResponse> {
    const response = await api.get("/admin/influencers", { params });
    return response.data;
  },

  async getById(id: number): Promise<Influencer> {
    const response = await api.get(`/admin/influencers/${id}`);
    return response.data.data || response.data;
  },

  async create(data: InfluencerFormData): Promise<{ message: string; influencer: Influencer }> {
    const response = await api.post("/admin/influencers/invite", data);
    return response.data;
  },

  async update(id: number, data: InfluencerFormData): Promise<{ message: string; influencer: Influencer }> {
    const response = await api.put(`/admin/influencers/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await api.delete(`/admin/influencers/${id}`);
    return response.data;
  },
};
