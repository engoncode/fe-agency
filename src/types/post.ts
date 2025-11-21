export interface Post {
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
  influencer: {
    id: number;
    user_id: number;
    type?: string | null;
    total_followers: number;
    total_points: number;
    instagram_access_token?: string | null;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at?: string | null;
      role: string;
      instagram_id?: string;
      created_at: string;
      updated_at: string;
      instagram_username?: string;
      instagram_access_token?: string;
      instagram_token_expires_at?: string;
      tiktok_open_id?: string;
      tiktok_username?: string;
      tiktok_display_name?: string;
      tiktok_avatar_url?: string;
      tiktok_access_token?: string;
      tiktok_refresh_token?: string;
      tiktok_token_expires_at?: string;
    };
  };
  campaign: {
    id: number;
    admin_id: number;
    campaign_name: string;
    product_name?: string;
    campaign_goal?: string;
    kpi_target?: string;
    key_messages?: string[];
    mandatory_hashtags?: string[];
    mandatory_cta?: string;
    draft_deadline?: string | null;
    live_post_date?: string | null;
    compensation_type?: string;
    content_usage_rights: boolean;
    description?: string;
    image?: string;
    rules?: string;
    start_date: string;
    end_date: string;
    status: "draft" | "upcoming" | "active" | "expired";
    created_at: string;
    updated_at: string;
  };
}

export interface PostMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
