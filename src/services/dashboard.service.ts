import api from "./api";

export interface DashboardStats {
  total_influencers: number;
  total_influencers_growth: number;
  active_campaigns: number;
  active_campaigns_growth: number;
  pending_posts: number;
  pending_posts_growth: number;
  total_campaigns: number;
  total_campaigns_growth: number;
  total_engagement: number;
  total_engagement_growth: number;
  date_range: {
    start_date: string;
    end_date: string;
  };
  previous_period: {
    start_date: string;
    end_date: string;
  };
}

export interface EngagementChartData {
  date: string;
  label: string;
  total_engagement: number;
  total_likes: number;
  total_comments: number;
  total_reach: number;
  total_posts: number;
}

export interface EngagementChartResponse {
  success: boolean;
  data: EngagementChartData[];
  summary: {
    total_engagement: number;
    total_likes: number;
    total_comments: number;
    total_reach: number;
    total_posts: number;
    average_engagement_per_post: number;
  };
  date_range: {
    start_date: string;
    end_date: string;
    group_by: string;
  };
}

export interface LeaderboardInfluencer {
  rank: number;
  influencer_id: number;
  user_id: number;
  name: string;
  email: string | null;
  instagram_username: string | null;
  type: string;
  total_followers: number;
  total_points: number;
  total_posts: number;
  total_engagement: number;
  total_likes: number;
  total_comments: number;
  total_reach: number;
  avg_engagement: number;
  categories: string[];
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardInfluencer[];
  meta: {
    total: number;
    limit: number;
    sort_by: string;
  };
  date_range: {
    start_date: string;
    end_date: string;
  };
}

export interface DashboardFilters {
  start_date?: string;
  end_date?: string;
  group_by?: "day" | "week" | "month";
  limit?: number;
  sort_by?: "total_points" | "total_engagement" | "total_posts" | "avg_engagement" | "total_followers";
}

const dashboardService = {
  // Get dashboard statistics
  getStats: async (filters?: DashboardFilters): Promise<DashboardStats> => {
    const response = await api.get("/admin/dashboard/stats", {
      params: filters,
    });
    return response.data;
  },

  // Get engagement chart data
  getEngagementChart: async (filters?: DashboardFilters): Promise<EngagementChartResponse> => {
    const response = await api.get("/admin/dashboard/engagement-chart", {
      params: filters,
    });
    return response.data;
  },

  // Get leaderboard data
  getLeaderboard: async (filters?: DashboardFilters): Promise<LeaderboardResponse> => {
    const response = await api.get("/admin/dashboard/leaderboard", {
      params: filters,
    });
    return response.data;
  },
};

export default dashboardService;
