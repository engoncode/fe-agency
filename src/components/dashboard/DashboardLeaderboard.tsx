import { useEffect, useState } from "react";
import dashboardService, { LeaderboardInfluencer } from "../../services/dashboard.service";

export default function DashboardLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardInfluencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"total_points" | "total_engagement" | "total_posts">("total_points");

  useEffect(() => {
    fetchLeaderboard();
  }, [sortBy]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getLeaderboard({
        limit: 10,
        sort_by: sortBy,
      });
      setLeaderboard(data.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="col-span-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 xl:col-span-4">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    if (rank === 2) return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    if (rank === 3) return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400";
  };

  return (
    <div className="col-span-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 xl:col-span-4">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-slate-800 dark:text-white">Top Influencers</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <option value="total_points">By Points</option>
          <option value="total_engagement">By Engagement</option>
          <option value="total_posts">By Posts</option>
        </select>
      </div>

      <div className="space-y-2">
        {leaderboard.map((influencer) => (
          <div
            key={influencer.influencer_id}
            className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-semibold text-sm ${getRankBadgeColor(
                influencer.rank
              )}`}>
              {influencer.rank}
            </div>

            <div className="flex-1 overflow-hidden">
              <h5 className="truncate font-medium text-slate-800 dark:text-white">{influencer.name}</h5>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {influencer.instagram_username && <span className="truncate">@{influencer.instagram_username}</span>}
                {influencer.categories.length > 0 && <span className="truncate">• {influencer.categories[0]}</span>}
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-slate-800 dark:text-white">
                {sortBy === "total_points" && influencer.total_points.toLocaleString()}
                {sortBy === "total_engagement" && influencer.total_engagement.toLocaleString()}
                {sortBy === "total_posts" && influencer.total_posts.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {sortBy === "total_points" && "Points"}
                {sortBy === "total_engagement" && "Engagement"}
                {sortBy === "total_posts" && "Posts"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">No data available</div>
      )}
    </div>
  );
}
