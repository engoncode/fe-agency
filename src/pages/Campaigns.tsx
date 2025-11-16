import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CampaignList from "../components/campaigns/CampaignList";
import StatusCards from "../components/campaigns/StatusCards";
import { campaignService } from "../services/campaign.service";
import type { Campaign, CampaignMeta } from "../types/campaign";

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [meta, setMeta] = useState<CampaignMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "draft" | "upcoming" | "active" | "expired">("");
  const [sortFilter, setSortFilter] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCampaigns = async (page = 1) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: 10,
        sort: sortFilter,
      };
      if (search) params.q = search;
      if (statusFilter) params.status = statusFilter;

      const response = await campaignService.getAll(params);
      setCampaigns(response.data);
      setMeta(response.meta);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(1);
  }, [statusFilter, sortFilter, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleStatusClick = (status: "draft" | "upcoming" | "active" | "expired") => {
    setStatusFilter(statusFilter === status ? "" : status);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    try {
      await campaignService.delete(id);
      fetchCampaigns(currentPage);
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      alert("Failed to delete campaign");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && meta && newPage <= meta.last_page) {
      fetchCampaigns(newPage);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your marketing campaigns</p>
        </div>
        <button
          onClick={() => navigate("/campaigns/create")}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Campaign
        </button>
      </div>

      {/* Status Cards */}
      {meta?.status_counts && (
        <StatusCards statusCounts={meta.status_counts} onStatusClick={handleStatusClick} currentStatus={statusFilter} />
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search campaigns by name, product, goal..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
          </form>

          {/* Sort Filter */}
          <div className="flex items-center gap-2">
            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value as "newest" | "oldest")}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading campaigns...</div>
        ) : (
          <>
            <CampaignList campaigns={campaigns} onDelete={handleDelete} />

            {/* Pagination */}
            {meta && meta.last_page > 1 && (
              <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {(meta.current_page - 1) * meta.per_page + 1} to{" "}
                  {Math.min(meta.current_page * meta.per_page, meta.total)} of {meta.total} campaigns
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(meta.last_page, 5) }, (_, i) => {
                      let pageNum;
                      if (meta.last_page <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= meta.last_page - 2) {
                        pageNum = meta.last_page - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            currentPage === pageNum
                              ? "bg-brand-500 text-white"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}>
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === meta.last_page}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
