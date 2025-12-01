import DashboardMetrics from "../../components/dashboard/DashboardMetrics";
import EngagementChart from "../../components/dashboard/EngagementChart";
import DashboardLeaderboard from "../../components/dashboard/DashboardLeaderboard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Agency Admin Dashboard"
        description="Admin dashboard for influencer agency management"
      />

      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 -m-6 p-6 space-y-6">
        {/* Metrics Cards */}
        <DashboardMetrics />

        {/* Engagement Chart & Leaderboard */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <EngagementChart />
          <DashboardLeaderboard />
        </div>
      </div>
    </>
  );
}
