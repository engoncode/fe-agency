export interface PlatformDeliverable {
  id?: number;
  campaign_id?: number;
  platform_name: string;
  content_format: string;
  quantity: number;
  min_duration_seconds?: number;
  max_duration_seconds?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Campaign {
  id: number;
  admin_id: number;
  campaign_name: string;
  product_name?: string;
  campaign_goal?: string;
  kpi_target?: string;
  key_messages?: string[];
  mandatory_hashtags?: string[];
  mandatory_cta?: string;
  compensation_type?: string;
  content_usage_rights?: boolean;
  description?: string;
  rules?: string;
  start_date: string;
  end_date: string;
  status: "draft" | "upcoming" | "active" | "expired";
  created_at: string;
  updated_at: string;
  platform_deliverables?: PlatformDeliverable[];
  categories?: Array<{ id: number; name: string }>;
}

export interface CampaignFormData {
  campaign_name: string;
  product_name?: string;
  campaign_goal?: string;
  kpi_target?: string;
  key_messages?: string[];
  mandatory_hashtags?: string[];
  mandatory_cta?: string;
  compensation_type?: string;
  content_usage_rights?: boolean;
  description?: string;
  rules?: string;
  start_date: string;
  end_date: string;
  status: "draft" | "upcoming" | "active" | "expired";
  platform_deliverables?: PlatformDeliverable[];
  kategori_campaign?: number[];
}

export interface CampaignFilters {
  status?: "draft" | "upcoming" | "active" | "expired";
  q?: string;
  sort?: "newest" | "oldest";
  start_date_from?: string;
  start_date_to?: string;
  live_post_date_from?: string;
  live_post_date_to?: string;
}

export interface CampaignMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  sort?: string;
  status_counts: {
    draft: number;
    upcoming: number;
    active: number;
    expired: number;
  };
}

export interface CampaignListResponse {
  meta: CampaignMeta;
  data: Campaign[];
  filters?: CampaignFilters;
}
