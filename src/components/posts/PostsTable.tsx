import React from "react";
import type { Post } from "../../types/post";
import { getImageUrl } from "../../services/api";

interface PostsTableProps {
  posts: Post[];
  onUpdateStatus: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, onUpdateStatus }) => {
  const getStatusColor = (status: Post["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik yang lalu`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} hari yang lalu`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} minggu yang lalu`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} bulan yang lalu`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} tahun yang lalu`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Campaign</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Image</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Influencer</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Platform</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Thumbnail</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Engagement</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Likes</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Comments</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Reach</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Created At</th>
            <th className="py-3 px-4 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!posts || posts.length === 0 ? (
            <tr>
              <td colSpan={12} className="py-10 text-center text-gray-500 dark:text-gray-400">
                No posts found
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{post.campaign.campaign_name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ID: {post.campaign_id}</div>
                </td>
                <td className="py-3 px-4">
                  {post.campaign.image ? (
                    <img
                      src={getImageUrl(post.campaign.image) || "/images/placeholder.png"}
                      alt={post.campaign.campaign_name}
                      className="w-19 h-9 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{post.influencer.user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {post.platform === "instagram"
                      ? post.influencer.user.instagram_username
                      : post.influencer.user.tiktok_username}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {post.platform === "instagram" ? (
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    )}
                    <span className="text-xs capitalize dark:text-white">{post.platform}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <img
                    src={post.thumbnail_url}
                    alt="Post thumbnail"
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{formatNumber(post.engagement)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">total</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{formatNumber(post.like_count)}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{formatNumber(post.comment_count)}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100">{formatNumber(post.reach)}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{formatRelativeTime(post.created_at)}</div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <select
                      value={post.status}
                      onChange={(e) => onUpdateStatus(post.id, e.target.value as "pending" | "approved" | "rejected")}
                      className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                      title="View post">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
