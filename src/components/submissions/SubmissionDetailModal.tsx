import React from "react";
import { X, ExternalLink, TrendingUp, TrendingDown, Target, Award } from "lucide-react";
import { getImageUrl } from "../../services/api";
import type { Post } from "../../types/post";

interface SubmissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Post;
  onUpdateStatus?: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  isOpen,
  onClose,
  submission,
  onUpdateStatus,
}) => {
  if (!isOpen) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const calculatePerformance = (actual: number, target?: number) => {
    if (!target || target === 0) return { percentage: "0", isAbove: false };
    const percentage = ((actual / target) * 100).toFixed(1);
    return { percentage, isAbove: actual >= target };
  };

  const reachPerf = calculatePerformance(submission.reach, submission.campaign.target_reach);
  const impressionsPerf = calculatePerformance(submission.impressions || 0, submission.campaign.target_impressions);
  const engagementPerf = calculatePerformance(submission.engagement, submission.campaign.target_engagement);

  const handleApprove = () => {
    if (onUpdateStatus) {
      onUpdateStatus(submission.id, "approved");
      onClose();
    }
  };

  const handleReject = () => {
    if (onUpdateStatus) {
      onUpdateStatus(submission.id, "rejected");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Submission Details</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {submission.posted_at ? `Posted on ${formatDate(submission.posted_at)}` : "Not posted yet"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Content Preview */}
            <div className="space-y-6">
              {/* Post Preview */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
                  Post Preview
                </h3>
                <div className="relative group">
                  <img
                    src={submission.thumbnail_url}
                    alt="Post thumbnail"
                    className="w-full rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                  <a
                    href={submission.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-white bg-black/60 px-4 py-2 rounded-lg">
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">Open Post</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Caption */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">
                  Caption
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {submission.caption || "No caption provided"}
                </p>
              </div>

              {/* Influencer Info */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
                  Influencer
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      submission.platform === "instagram"
                        ? getImageUrl(submission.influencer.user.instagram_avatar_url) || "/images/placeholder.png"
                        : getImageUrl(submission.influencer.user.tiktok_avatar_url) || "/images/placeholder.png"
                    }
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-800 ring-2 ring-slate-200 dark:ring-slate-700"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {submission.influencer.user.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      @
                      {submission.platform === "instagram"
                        ? submission.influencer.user.instagram_username
                        : submission.influencer.user.tiktok_username}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {submission.influencer.user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
                  Campaign
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(submission.campaign.image) || "/images/placeholder.png"}
                    alt={submission.campaign.campaign_name}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {submission.campaign.campaign_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {submission.campaign.product_name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Statistics & Actions */}
            <div className="space-y-6">
              {/* Performance Grade */}
              {submission.performance_grade && submission.performance_score !== undefined && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Performance Grade
                    </h3>
                    <Award className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-5xl font-black px-6 py-3 rounded-xl border-2 ${getGradeColor(
                        submission.performance_grade
                      )}`}>
                      {submission.performance_grade}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {submission.performance_score}
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-normal ml-1">points</span>
                      </p>
                      {submission.performance_status && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {submission.performance_status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Engagement Metrics Grid */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
                  Engagement Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Likes</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {formatNumber(submission.like_count)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Comments</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {formatNumber(submission.comment_count)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Saves</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {formatNumber(submission.save_count || 0)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Views</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {formatNumber(submission.play_count)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Target vs Actual */}
              {(submission.campaign.target_reach ||
                submission.campaign.target_impressions ||
                submission.campaign.target_engagement) && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Target vs Actual
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {/* Reach */}
                    {submission.campaign.target_reach && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reach</span>
                          <div className="flex items-center gap-2">
                            {reachPerf.isAbove ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                reachPerf.isAbove
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}>
                              {reachPerf.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            Target:{" "}
                            <span className="font-medium">{formatNumber(submission.campaign.target_reach)}</span>
                          </span>
                          <span>•</span>
                          <span>
                            Actual: <span className="font-medium">{formatNumber(submission.reach)}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Impressions */}
                    {submission.campaign.target_impressions && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Impressions</span>
                          <div className="flex items-center gap-2">
                            {impressionsPerf.isAbove ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                impressionsPerf.isAbove
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}>
                              {impressionsPerf.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            Target:{" "}
                            <span className="font-medium">{formatNumber(submission.campaign.target_impressions)}</span>
                          </span>
                          <span>•</span>
                          <span>
                            Actual: <span className="font-medium">{formatNumber(submission.impressions || 0)}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Engagement */}
                    {submission.campaign.target_engagement && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement</span>
                          <div className="flex items-center gap-2">
                            {engagementPerf.isAbove ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                engagementPerf.isAbove
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}>
                              {engagementPerf.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            Target:{" "}
                            <span className="font-medium">{formatNumber(submission.campaign.target_engagement)}</span>
                          </span>
                          <span>•</span>
                          <span>
                            Actual: <span className="font-medium">{formatNumber(submission.engagement)}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Engagement Rate */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement Rate</span>
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {(submission.engagement_rate ?? 0).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {submission.status === "pending" && onUpdateStatus && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
                    Actions
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={handleApprove}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-150 shadow-sm hover:shadow">
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-150 shadow-sm hover:shadow">
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
