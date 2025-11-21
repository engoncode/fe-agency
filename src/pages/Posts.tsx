import React, { useEffect, useState } from "react";
import PostsTable from "../components/posts/PostsTable";
import { postService } from "../services/post.service";
import type { Post, PostMeta } from "../types/post";
import { useNotification } from "../components/notifications/NotificationProvider";
import ConfirmationDialog from "../components/notifications/ConfirmationDialog";

const Posts: React.FC = () => {
  const { showSuccess, showError } = useNotification();
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PostMeta | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [campaignId, setCampaignId] = useState("");
  const [influencerName, setInfluencerName] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "approved" | "rejected">("");
  const [platformFilter, setPlatformFilter] = useState<"" | "instagram" | "tiktok">("");
  const [currentPage, setCurrentPage] = useState(1);

  // Confirmation dialog
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: "success" | "warning" | "error" | "info";
    isLoading?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "warning",
    isLoading: false,
  });

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        per_page: 10,
      };
      if (campaignId) params.campaign_id = parseInt(campaignId);
      if (influencerName) params.influencer_name = influencerName;
      if (statusFilter) params.status = statusFilter;
      if (platformFilter) params.platform = platformFilter;

      const response = await postService.getAll(params);
      setPosts(response.data);
      setMeta(response.meta);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [campaignId, influencerName, statusFilter, platformFilter]);

  const handleUpdateStatus = async (id: number, status: "pending" | "approved" | "rejected") => {
    const performUpdate = async () => {
      // Set loading state
      setConfirmationDialog((prev) => ({ ...prev, isLoading: true }));

      try {
        await postService.updateStatus(id, status);
        showSuccess("Status Updated", `Post status has been changed to ${status}`);
        fetchPosts(currentPage);
        // Close modal after successful response
        setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
      } catch (error: any) {
        console.error("Failed to update post status:", error);

        // Extract error message from response if available
        let errorMessage = "Failed to update post status. Please try again.";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        showError("Update Failed", errorMessage);
        // Close modal on error too, but keep loading false
        setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
      }
    };

    setConfirmationDialog({
      isOpen: true,
      title: "Confirm Status Change",
      message: `Are you sure you want to change the post status to "${status}"?`,
      onConfirm: performUpdate,
      type: "warning",
      isLoading: false,
    });
  };

  const handleCloseConfirmation = () => {
    setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
  };

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage submitted posts from influencers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign ID</label>
            <input
              type="number"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              placeholder="Enter campaign ID"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Influencer Name</label>
            <input
              type="text"
              value={influencerName}
              onChange={(e) => setInfluencerName(e.target.value)}
              placeholder="Enter influencer name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "" | "pending" | "approved" | "rejected")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value as "" | "instagram" | "tiktok")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setCampaignId("");
                setInfluencerName("");
                setStatusFilter("");
                setPlatformFilter("");
                setCurrentPage(1);
              }}
              className="w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          ) : (
            <>
              <PostsTable posts={posts} onUpdateStatus={handleUpdateStatus} />

              {/* Pagination */}
              {meta && meta.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {meta.from} to {meta.to} of {meta.total} posts
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                      Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {meta.last_page}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === meta.last_page}
                      className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        onConfirm={confirmationDialog.onConfirm}
        onCancel={handleCloseConfirmation}
        type={confirmationDialog.type}
        isLoading={confirmationDialog.isLoading}
      />
    </div>
  );
};

export default Posts;
