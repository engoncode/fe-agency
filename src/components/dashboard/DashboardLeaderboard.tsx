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
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-gray-900 sm:px-7.5 xl:col-span-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-meta-4 rounded w-1/3 mb-6"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-stroke dark:border-strokedark">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-meta-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-meta-4 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-meta-4 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-600 text-white";
    return "bg-gray-200 text-gray-700 dark:bg-meta-4 dark:text-white";
  };

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-gray-900 sm:px-7.5 xl:col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">Top Influencers</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded border border-stroke bg-transparent px-3 py-1 text-sm outline-none focus:border-primary dark:border-strokedark">
          <option value="total_points">By Points</option>
          <option value="total_engagement">By Engagement</option>
          <option value="total_posts">By Posts</option>
        </select>
      </div>

      <div className="space-y-3">
        {leaderboard.map((influencer) => (
          <div
            key={influencer.influencer_id}
            className="flex items-center gap-3 rounded-sm border border-stroke bg-gray-2 p-3 dark:border-strokedark dark:bg-meta-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${getRankBadgeColor(
                influencer.rank
              )}`}>
              {influencer.rank}
            </div>

            <div className="flex-1 overflow-hidden">
              <h5 className="truncate font-medium text-black dark:text-white">{influencer.name}</h5>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                {influencer.instagram_username && <span className="truncate">@{influencer.instagram_username}</span>}
                {influencer.categories.length > 0 && <span className="truncate">• {influencer.categories[0]}</span>}
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-black dark:text-white">
                {sortBy === "total_points" && influencer.total_points.toLocaleString()}
                {sortBy === "total_engagement" && influencer.total_engagement.toLocaleString()}
                {sortBy === "total_posts" && influencer.total_posts.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {sortBy === "total_points" && "Points"}
                {sortBy === "total_engagement" && "Engagement"}
                {sortBy === "total_posts" && "Posts"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <div className="py-10 text-center text-gray-500 dark:text-gray-400">No data available</div>
      )}
    </div>
  );
}
