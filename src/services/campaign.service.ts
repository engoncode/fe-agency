import api from "./api";
import type { Campaign, CampaignFormData, CampaignFilters, CampaignListResponse } from "../types/campaign";

export const campaignService = {
  // Get campaigns with pagination and filters
  getAll: async (params?: CampaignFilters & { page?: number; per_page?: number }) => {
    const response = await api.get<CampaignListResponse>("/admin/campaigns/filter", { params });
    return response.data;
  },

  // Get campaign by ID
  getById: async (id: number) => {
    const response = await api.get<Campaign>(`/admin/campaigns/${id}`);
    return response.data;
  },

  // Create new campaign
  create: async (data: CampaignFormData) => {
    const response = await api.post<{ message: string; campaign: Campaign }>("/admin/campaigns", data);
    return response.data;
  },

  // Update campaign
  update: async (id: number, data: CampaignFormData) => {
    const response = await api.put<{ message: string; campaign: Campaign }>(`/admin/campaigns/${id}`, data);
    return response.data;
  },

  // Delete campaign
  delete: async (id: number) => {
    const response = await api.delete<{ message: string }>(`/admin/campaigns/${id}`);
    return response.data;
  },
};
