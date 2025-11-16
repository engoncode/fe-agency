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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-gray-900">
            <div className="animate-pulse">
              <div className="h-11 w-11 rounded-full bg-gray-200 dark:bg-meta-4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-meta-4 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 dark:bg-meta-4 rounded w-1/2"></div>
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
      icon: (
        <svg
          className="fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Campaigns",
      value: stats.active_campaigns,
      icon: (
        <svg
          className="fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Posts",
      value: stats.pending_posts,
      icon: (
        <svg
          className="fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" />
        </svg>
      ),
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Total Campaigns",
      value: stats.total_campaigns,
      icon: (
        <svg
          className="fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" />
        </svg>
      ),
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-stroke bg-white px-6 py-6 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-strokedark dark:bg-gray-900">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {metric.icon}
          </div>

          <div className="mt-5">
            <h4 className="text-3xl font-bold text-black dark:text-white mb-1">{metric.value.toLocaleString()}</h4>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
