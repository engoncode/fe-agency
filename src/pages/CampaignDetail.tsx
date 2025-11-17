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
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors">
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
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
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
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {/* Campaign Goal & KPI */}
          {(campaign.campaign_goal || campaign.kpi_target) && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
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
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
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
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
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
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
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
