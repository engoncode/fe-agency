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
  target_reach?: number;
  target_engagement?: number;
  target_engagement_rate?: number;
  target_impressions?: number;
  bonus_multiplier?: number;
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
  image?: string | null;
  invited_influencers_count?: number;
  approved_posts_count?: number;
  posts?: Array<{
    id: number;
    user_id: number;
    instagram_media_id?: string | null;
    influencer_id: number;
    campaign_id: number;
    platform: "instagram" | "tiktok";
    platform_post_id: string;
    platform_post_url: string;
    post_url: string;
    caption?: string | null;
    thumbnail_url: string;
    engagement: number;
    play_count: number;
    like_count: number;
    comment_count: number;
    reach: number;
    status: "pending" | "approved" | "rejected";
    posted_at?: string | null;
    scheduled_at?: string | null;
    created_at: string;
    updated_at: string;
    engagement_rate: number;
    duration?: number;
    user: {
      id: number;
      name: string;
      email: string;
      instagram_username?: string;
      tiktok_username?: string;
      tiktok_display_name?: string;
    };
    influencer: {
      id: number;
      user_id: number;
    };
  }>;
}

export interface CampaignFormData {
  campaign_name: string;
  product_name?: string;
  campaign_goal?: string;
  campaign_goal_refined?: string;
  kpi_target?: string;
  target_reach?: number;
  target_engagement?: number;
  target_engagement_rate?: number;
  target_impressions?: number;
  bonus_multiplier?: number;
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
  image?: string | null; // base64 string
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
