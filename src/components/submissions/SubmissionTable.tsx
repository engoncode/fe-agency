import React, { useState } from "react";
import { ExternalLink, Instagram } from "lucide-react";
import { getImageUrl } from "../../services/api";
import SubmissionDetailModal from "./SubmissionDetailModal";
import type { Post } from "../../types/post";

interface SubmissionTableProps {
  submissions: Post[];
  onUpdateStatus?: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions, onUpdateStatus }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case "S":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "A":
        return "bg-green-100 text-green-700 border-green-300";
      case "B":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "C":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "D":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "F":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusColor = (status: Post["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleViewDetails = (submission: Post) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const TikTokIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Campaign
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Content
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Performance
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {!submissions || submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-slate-300 dark:text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-sm font-medium">No submissions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-150">
                  {/* Campaign Column */}
                  <td className="py-3 px-4">
                    <div className="relative bg-slate-800 dark:bg-slate-900 rounded-xl overflow-hidden w-60 group">
                      {/* Campaign Image with Overlay Text */}
                      <div className="relative h-24">
                        <img
                          src={getImageUrl(submission.campaign.image) || "/images/placeholder.png"}
                          alt={submission.campaign.campaign_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/images/placeholder.png";
                          }}
                        />

                        {/* Gradient Overlay at Bottom */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-2 px-3">
                          <p className="text-sm font-bold text-white truncate leading-tight">
                            {submission.campaign.campaign_name}
                          </p>
                          <p className="text-xs text-white/90 truncate leading-tight">
                            {submission.campaign.product_name || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Platform Icon - Outside Image, Bottom Right of Card */}
                      <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-lg border-2 border-slate-200 dark:border-slate-700">
                        {submission.platform === "instagram" ? (
                          <Instagram className="w-4 h-4 text-pink-500" />
                        ) : (
                          <div className="text-black dark:text-white">
                            <TikTokIcon />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Content Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={submission.thumbnail_url}
                        alt="thumbnail"
                        className="w-20 h-28 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/90x190";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        {/* Influencer Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={
                              submission.platform === "instagram"
                                ? getImageUrl(submission.influencer.user.instagram_avatar_url) ||
                                  "https://placehold.co/90x190"
                                : getImageUrl(submission.influencer.user.tiktok_avatar_url) ||
                                  "https://placehold.co/90x190"
                            }
                            alt="avatar"
                            className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/90x190";
                            }}
                          />
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            @
                            {submission.platform === "instagram"
                              ? submission.influencer.user.instagram_username
                              : submission.influencer.user.tiktok_username}
                          </p>
                        </div>
                        {/* Caption */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-1.5">
                          {submission.caption}
                        </p>
                        <a
                          href={submission.post_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                          <ExternalLink className="w-3 h-3" />
                          View Post
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Performance Column with Tooltip */}
                  <td className="py-3 px-4">
                    <div className="relative group">
                      <div className="flex flex-col gap-2">
                        {submission.performance_grade && (
                          <span
                            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold border ${getGradeColor(
                              submission.performance_grade
                            )}`}>
                            Grade {submission.performance_grade}
                          </span>
                        )}
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {(submission.engagement_rate ?? 0).toFixed(2)}%
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">ER</span>
                        </p>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Performance Details
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-300">Likes:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatNumber(submission.like_count)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-300">Comments:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatNumber(submission.comment_count)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-300">Views:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatNumber(submission.play_count)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-300">Reach:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatNumber(submission.reach)}
                            </span>
                          </div>
                          {submission.performance_score !== undefined && (
                            <div className="flex justify-between text-xs border-t border-gray-200 dark:border-gray-700 pt-1.5 mt-1.5">
                              <span className="text-gray-600 dark:text-gray-300">Score:</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                {submission.performance_score}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Triangle pointer */}
                        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 transform rotate-45"></div>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(
                        submission.status
                      )}`}>
                      {submission.status}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleViewDetails(submission)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <SubmissionDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          submission={selectedSubmission}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
};

export default SubmissionTable;
