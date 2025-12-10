import React, { useState } from "react";
import type { Post } from "../../types/post";
import { getImageUrl } from "../../services/api";

interface PostsTableProps {
  posts: Post[];
  onUpdateStatus: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, onUpdateStatus }) => {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: "",
  });
  const [expandedCaptions, setExpandedCaptions] = useState<Set<number>>(new Set());

  const getStatusColor = (status: Post["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20";
      case "rejected":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num == null) return "0";
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
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

  const toggleCaption = (postId: number) => {
    setExpandedCaptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // const openVideoModal = (url: string) => {
  //   setVideoModal({ isOpen: true, url });
  // };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, url: "" });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Campaign Info
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Influencer</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Post</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Performance
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Status</th>
              <th className="py-3 px-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {!posts || posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500 dark:text-slate-400">
                  No posts found
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  {/* Campaign Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {post.campaign.image ? (
                        <img
                          src={getImageUrl(post.campaign.image) || "https://placehold.co/90x190"}
                          alt={post.campaign.campaign_name}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/90x190";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-slate-900 dark:text-slate-100">{post.campaign.campaign_name}</div>
                        {/* <div className="text-xs text-slate-500 dark:text-slate-400">ID: {post.campaign_id}</div> */}
                      </div>
                    </div>
                  </td>

                  {/* Influencer */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      {post.platform === "instagram" && post.influencer.user.instagram_avatar_url && (
                        <img
                          src={getImageUrl(post.influencer.user.instagram_avatar_url) ?? undefined}
                          alt="Instagram avatar"
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      {post.platform === "tiktok" && post.influencer.user.tiktok_avatar_url && (
                        <img
                          src={getImageUrl(post.influencer.user.tiktok_avatar_url) ?? undefined}
                          alt="TikTok avatar"
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      {/* Platform Icon */}
                      {post.platform === "instagram" ? (
                        <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      )}

                      {/* Username and Name */}
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {post.platform === "instagram"
                            ? post.influencer.user.instagram_username
                            : post.influencer.user.tiktok_username}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{post.influencer.user.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Post Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <a
                        href={post.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-16 h-16 rounded cursor-pointer group block">
                        <img
                          src={post.thumbnail_url}
                          alt="Post thumbnail"
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/90x190";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </a>
                      {post.caption && (
                        <div className="max-w-[200px]">
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {expandedCaptions.has(post.id)
                              ? post.caption
                              : post.caption.length > 30
                              ? post.caption.substring(0, 30) + "..."
                              : post.caption}
                          </p>
                          {post.caption.length > 30 && (
                            <button
                              onClick={() => toggleCaption(post.id)}
                              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-1">
                              {expandedCaptions.has(post.id) ? "Sembunyikan" : "Selengkapnya"}
                            </button>
                          )}
                        </div>
                      )}
                      {post.posted_at && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {formatRelativeTime(post.posted_at)}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Performance */}
                  <td className="py-3 px-4">
                    <div className="space-y-1.5">
                      {/* Row 1: Like, Comment, View */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-slate-900 dark:text-slate-100">
                            {formatNumber(post.like_count)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-slate-900 dark:text-slate-100">
                            {formatNumber(post.comment_count)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-slate-900 dark:text-slate-100">{formatNumber(post.reach)}</span>
                        </div>
                      </div>
                      {/* Row 2: Play, Engagement Rate */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-slate-900 dark:text-slate-100">
                            {formatNumber(post.play_count)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-slate-900 dark:text-slate-100">
                            {post.engagement_rate != null ? post.engagement_rate.toFixed(2) : "0.00"}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(post.status)}`}>{post.status}</span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <select
                      value={post.status}
                      onChange={(e) => onUpdateStatus(post.id, e.target.value as "pending" | "approved" | "rejected")}
                      className="rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-900 dark:text-slate-100 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none">
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeVideoModal}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <iframe
                src={videoModal.url}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsTable;
