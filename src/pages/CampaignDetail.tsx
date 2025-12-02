import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { campaignService } from "../services/campaign.service";
import { getImageUrl } from "../services/api";
import type { Campaign } from "../types/campaign";

const CampaignDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCaptions, setExpandedCaptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (id) {
      fetchCampaign(parseInt(id));
    }
  }, [id]);

  const fetchCampaign = async (campaignId: number) => {
    try {
      setLoading(true);
      const response = await campaignService.getById(campaignId);
      setCampaign(response);
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
      alert("Campaign not found");
      navigate("/campaigns");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "upcoming":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800";
      case "draft":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-900";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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

  const getPostStatusColor = (status: "pending" | "approved" | "rejected") => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading campaign details...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Campaign not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-900 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{campaign.campaign_name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{campaign.product_name}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Campaign
        </button>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            campaign.status
          )}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>

      {/* Campaign Image */}
      {campaign.image && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Image</h2>
          <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={getImageUrl(campaign.image) || campaign.image}
              alt={campaign.campaign_name}
              className="w-full h-auto max-h-96 object-contain bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {/* Campaign Goal & KPI */}
          {(campaign.campaign_goal || campaign.kpi_target) && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Goals & KPI</h2>
              </div>
              <div className="space-y-4">
                {campaign.campaign_goal && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Campaign Goal</p>
                    <p className="text-gray-900 dark:text-white">{campaign.campaign_goal}</p>
                  </div>
                )}
                {campaign.kpi_target && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">KPI Target</p>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">{campaign.kpi_target}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key Messages */}
          {campaign.key_messages && campaign.key_messages.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Key Messages</h2>
              </div>
              <ul className="space-y-2">
                {campaign.key_messages.map((message, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="inline-flex w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 flex-shrink-0 items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="flex-1">{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mandatory Content */}
          {((campaign.mandatory_hashtags && campaign.mandatory_hashtags.length > 0) || campaign.mandatory_cta) && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mandatory Content</h2>
              </div>
              <div className="space-y-4">
                {campaign.mandatory_hashtags && campaign.mandatory_hashtags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.mandatory_hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {campaign.mandatory_cta && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Call-to-Action</p>
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <svg
                        className="w-4 h-4 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <p className="text-purple-900 dark:text-purple-100 font-medium">{campaign.mandatory_cta}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Platform Deliverables */}
          {campaign.platform_deliverables && campaign.platform_deliverables.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Deliverables</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                      <th className="px-4 py-3 text-left font-medium">Platform</th>
                      <th className="px-4 py-3 text-left font-medium">Format</th>
                      <th className="px-4 py-3 text-center font-medium">Quantity</th>
                      <th className="px-4 py-3 text-left font-medium">Duration</th>
                      <th className="px-4 py-3 text-left font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {campaign.platform_deliverables.map((deliverable, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                          {deliverable.platform_name}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{deliverable.content_format}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                          {deliverable.quantity}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {deliverable.min_duration_seconds && deliverable.max_duration_seconds
                            ? `${deliverable.min_duration_seconds}-${deliverable.max_duration_seconds}s`
                            : deliverable.min_duration_seconds
                            ? `Min ${deliverable.min_duration_seconds}s`
                            : deliverable.max_duration_seconds
                            ? `Max ${deliverable.max_duration_seconds}s`
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{deliverable.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rules */}
          {campaign.rules && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rules</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{campaign.rules}</p>
            </div>
          )}

          {/* Posts */}
          {campaign.posts && campaign.posts.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Posts ({campaign.posts.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                        Influencer
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                        Post
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                        Performance
                      </th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {campaign.posts.map((post) => {
                      const isExpanded = expandedCaptions.has(post.id);
                      const caption = post.caption || "";
                      const shouldTruncate = caption.length > 60;
                      const displayCaption = shouldTruncate && !isExpanded ? caption.substring(0, 60) + "..." : caption;

                      return (
                        <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          {/* Influencer */}
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                {post.platform === "instagram" ? (
                                  <svg className="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3.5 h-3.5 text-black dark:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                  </svg>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                                  {post.platform === "instagram"
                                    ? post.user.instagram_username
                                    : post.user.tiktok_username || post.user.tiktok_display_name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{post.user.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Post */}
                          <td className="py-2 px-3">
                            <div className="flex items-start gap-2">
                              <a
                                href={post.post_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0">
                                <img
                                  src={post.thumbnail_url}
                                  alt="Thumbnail"
                                  className="w-12 h-12 object-cover rounded hover:opacity-80 transition-opacity"
                                />
                              </a>
                              <div className="min-w-0 flex-1">
                                {caption && (
                                  <div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                      {displayCaption}
                                    </p>
                                    {shouldTruncate && (
                                      <button
                                        onClick={() => toggleCaption(post.id)}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                        {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                                      </button>
                                    )}
                                  </div>
                                )}
                                {post.posted_at && (
                                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                    {formatRelativeTime(post.posted_at)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Performance */}
                          <td className="py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                  <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                  <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {formatNumber(post.like_count)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  <svg
                                    className="w-3 h-3 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {formatNumber(post.comment_count)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  <svg
                                    className="w-3 h-3 text-slate-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
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
                                  <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {formatNumber(post.reach)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                  <svg
                                    className="w-3 h-3 text-purple-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {formatNumber(post.play_count)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                  <svg
                                    className="w-3 h-3 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {post.engagement_rate.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getPostStatusColor(
                                post.status
                              )}`}>
                              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-white">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Campaign Start</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(campaign.start_date)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Campaign End</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(campaign.end_date)}</p>
              </div>
            </div>
          </div>

          {/* Compensation & Rights */}
          {(campaign.compensation_type || campaign.content_usage_rights !== undefined) && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-white">Compensation</h3>
              </div>
              <div className="space-y-3">
                {campaign.compensation_type && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Type</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.compensation_type}</p>
                  </div>
                )}
                {campaign.content_usage_rights !== undefined && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <svg
                        className={`w-4 h-4 ${campaign.content_usage_rights ? "text-green-500" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Content Usage Rights:
                        <span
                          className={`ml-1 font-medium ${
                            campaign.content_usage_rights
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-500 dark:text-gray-500"
                          }`}>
                          {campaign.content_usage_rights ? "Requested" : "Not Requested"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Metadata</h3>
            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>ID</span>
                <span className="text-gray-700 dark:text-gray-200">#{campaign.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Created</span>
                <span className="text-gray-700 dark:text-gray-200">{formatDate(campaign.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated</span>
                <span className="text-gray-700 dark:text-gray-200">{formatDate(campaign.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
