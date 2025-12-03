import { useEffect, useState } from "react";
import dashboardService, { DashboardStats } from "../../services/dashboard.service";

export default function DashboardMetrics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-5">
            <div className="animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                </div>
                <div className="h-14 w-14 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const metrics = [
    {
      title: "Total Influencers",
      value: stats.total_influencers,
      trend: `${stats.total_influencers_growth >= 0 ? "+" : ""}${stats.total_influencers_growth}%`,
      trendUp: stats.total_influencers_growth >= 0,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bgGradient: "from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20",
      iconColor: "text-sky-600 dark:text-sky-400",
      borderColor: "border-sky-200 dark:border-sky-800/50",
    },
    {
      title: "Active Campaigns",
      value: stats.active_campaigns,
      trend: `${stats.active_campaigns_growth >= 0 ? "+" : ""}${stats.active_campaigns_growth}%`,
      trendUp: stats.active_campaigns_growth >= 0,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800/50",
    },
    {
      title: "Pending Posts",
      value: stats.pending_posts,
      trend: `${stats.pending_posts_growth >= 0 ? "+" : ""}${stats.pending_posts_growth}%`,
      trendUp: stats.pending_posts_growth >= 0,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800/50",
    },
    {
      title: "Total Campaigns",
      value: stats.total_campaigns,
      trend: `${stats.total_campaigns_growth >= 0 ? "+" : ""}${stats.total_campaigns_growth}%`,
      trendUp: stats.total_campaigns_growth >= 0,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      bgGradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800/50",
    },
    {
      title: "Total Engagement",
      value: stats.total_engagement,
      trend: `${stats.total_engagement_growth >= 0 ? "+" : ""}${stats.total_engagement_growth}%`,
      trendUp: stats.total_engagement_growth >= 0,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      bgGradient: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
      iconColor: "text-pink-600 dark:text-pink-400",
      borderColor: "border-pink-200 dark:border-pink-800/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
          <div className="flex items-start justify-between">
            {/* Left side: Number and Title */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {metric.value.toLocaleString()}
              </h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{metric.title}</p>
              {/* Trend Indicator */}
              <div className="flex items-center gap-1">
                <svg
                  className={`w-3.5 h-3.5 ${metric.trendUp ? "text-green-500" : "text-red-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={metric.trendUp ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}
                  />
                </svg>
                <span
                  className={`text-xs font-semibold ${
                    metric.trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                  {metric.trend}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500">vs last month</span>
              </div>
            </div>

            {/* Right side: Icon with gradient background */}
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${metric.bgGradient} ${metric.iconColor} border ${metric.borderColor} group-hover:scale-110 transition-transform duration-300`}>
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
