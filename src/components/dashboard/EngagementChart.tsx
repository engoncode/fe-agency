import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dashboardService, { EngagementChartResponse } from "../../services/dashboard.service";
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function EngagementChart() {
  const [chartData, setChartData] = useState<EngagementChartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("day");
  const { theme } = useTheme();

  useEffect(() => {
    fetchChartData();
  }, [groupBy]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getEngagementChart({ group_by: groupBy });
      setChartData(data);
    } catch (error) {
      console.error("Error fetching engagement chart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-gray-900 sm:px-7.5 xl:col-span-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (!chartData) return null;

  const isDark = theme === "dark";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        titleColor: isDark ? "#e5e7eb" : "#111827",
        bodyColor: isDark ? "#e5e7eb" : "#374151",
        borderColor: isDark ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "#374151" : "#f3f4f6",
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? "#374151" : "#f3f4f6",
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
          callback: function (value: any) {
            return new Intl.NumberFormat().format(value);
          },
        },
      },
    },
  };

  const data = {
    labels: chartData.data.map((item) => item.label),
    datasets: [
      {
        label: "Total Engagement",
        data: chartData.data.map((item) => item.total_engagement),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "Total Likes",
        data: chartData.data.map((item) => item.total_likes),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
      {
        label: "Total Comments",
        data: chartData.data.map((item) => item.total_comments),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-2xl border border-stroke bg-white px-6 pb-6 pt-7.5 shadow-sm hover:shadow-lg transition-shadow duration-300 dark:border-strokedark dark:bg-gray-900 sm:px-7.5 xl:col-span-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-2xl font-bold text-black dark:text-white">Engagement Overview</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {chartData.date_range.start_date} - {chartData.date_range.end_date}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setGroupBy("day")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              groupBy === "day"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-opacity-80"
            }`}>
            Day
          </button>
          <button
            onClick={() => setGroupBy("week")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              groupBy === "week"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-opacity-80"
            }`}>
            Week
          </button>
          <button
            onClick={() => setGroupBy("month")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              groupBy === "month"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-opacity-80"
            }`}>
            Month
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        <div className="rounded-xl border border-stroke  p-3 dark:border-strokedark dark:from-meta-4 dark:to-meta-4">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total Posts</span>
          <p className="text-xl font-bold text-black dark:text-white">
            {chartData.summary.total_posts.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-stroke  p-3 dark:border-strokedark dark:from-meta-4 dark:to-meta-4">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total Engagement</span>
          <p className="text-xl font-bold text-black dark:text-white">
            {chartData.summary.total_engagement.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-stroke  p-3 dark:border-strokedark dark:from-meta-4 dark:to-meta-4">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total Likes</span>
          <p className="text-xl font-bold text-black dark:text-white">
            {chartData.summary.total_likes.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-stroke p-3 dark:border-strokedark dark:from-meta-4 dark:to-meta-4">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total Comments</span>
          <p className="text-xl font-bold text-black dark:text-white">
            {chartData.summary.total_comments.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-stroke p-3 dark:border-strokedark dark:from-meta-4 dark:to-meta-4">
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Avg. Engagement</span>
          <p className="text-xl font-bold text-black dark:text-white">
            {chartData.summary.average_engagement_per_post.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ height: "350px" }}>
        <Line key={theme} options={options} data={data} />
      </div>
    </div>
  );
}
