export interface CategoryInInfluencer {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    influencer_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface InfluencerData {
  id: number;
  user_id: number;
  type: string | null;
  total_followers: number;
  total_points: number;
  instagram_access_token: string | null;
  created_at: string;
  updated_at: string;
  categories: CategoryInInfluencer[];
}

export interface Influencer {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  instagram_id?: string | null;
  instagram_username?: string | null;
  instagram_avatar_url?: string | null;
  instagram_access_token?: string | null;
  instagram_token_expires_at?: string | null;
  tiktok_open_id?: string | null;
  tiktok_username?: string | null;
  tiktok_display_name?: string | null;
  tiktok_avatar_url?: string | null;
  tiktok_access_token?: string | null;
  tiktok_refresh_token?: string | null;
  tiktok_token_expires_at?: string | null;
  created_at: string;
  updated_at: string;
  influencer: InfluencerData | null;
}

export interface InfluencerFormData {
  name: string;
  email: string;
  password?: string;
  kategori_influencer: number[];
}

export interface InfluencerFilters {
  q?: string;
  platform?: string;
  status?: "active" | "inactive" | "blacklisted";
  category?: string;
  min_followers?: number;
  max_followers?: number;
}

export interface InfluencerMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface InfluencerListResponse {
  meta: InfluencerMeta;
  data: Influencer[];
}
