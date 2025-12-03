import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { influencerService } from "../services/influencer.service";
import { categoryService } from "../services/category.service";
import type { Influencer, InfluencerMeta } from "../types/influencer";
import type { Category } from "../types/category";
import { useNotification } from "../components/notifications/NotificationProvider";
import ConfirmationDialog from "../components/notifications/ConfirmationDialog";
// import Tooltip from "../components/common/Tooltip";

const Influencers: React.FC = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [meta, setMeta] = useState<InfluencerMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Confirmation dialog for delete
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

  // Toast notifications
  const { showSuccess, showError } = useNotification();

  const fetchInfluencers = async (page = 1) => {
    try {
      setLoading(true);
      const params: any = { page, per_page: 10 };
      if (search) params.q = search;
      if (status) params.status = status;
      if (category) params.category = category;
      const response = await influencerService.getAll(params);
      setInfluencers(response.data);
      setMeta(response.meta);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
      setInfluencers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getAllPublic();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchInfluencers(1);
  }, [search, status, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleDelete = async (id: number) => {
    const performDelete = async () => {
      // Set loading state
      setConfirmationDialog((prev) => ({ ...prev, isLoading: true }));

      try {
        await influencerService.delete(id);
        showSuccess("Success", "Influencer deleted successfully!");
        fetchInfluencers(currentPage);
        // Close modal after successful response
        setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
      } catch (error: any) {
        console.error("Failed to delete influencer:", error);
        // Extract error message from response if available
        let errorMessage = "Failed to delete influencer";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        showError("Error", errorMessage);
        // Close modal on error too, but keep loading false
        setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
      }
    };

    setConfirmationDialog({
      isOpen: true,
      title: "Delete Influencer",
      message: "Are you sure you want to delete this influencer? This action cannot be undone.",
      onConfirm: performDelete,
      type: "error",
      isLoading: false,
    });
  };

  const handleCloseConfirmation = () => {
    setConfirmationDialog((prev) => ({ ...prev, isOpen: false, isLoading: false }));
  };

  const handlePageChange = (newPage: number) => {
    if (meta && newPage >= 1 && newPage <= meta.last_page) fetchInfluencers(newPage);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Influencers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your influencer database</p>
        </div>
        <button
          onClick={() => navigate("/influencers/create")}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Influencer
        </button>
      </div>

      {/* Filters */}
      <div className="minimal-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              {/* <svg
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
              </svg> */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, username..."
                className="minimal-input w-full pl-10 pr-4"
              />
            </div>
          </form>
          <div className="flex gap-2">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="minimal-input">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="minimal-input">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="minimal-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading influencers...</div>
        ) : influencers.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">No influencers found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Influencer
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Instagram
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      TikTok
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                      Categories
                    </th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {influencers.map((influencer) => {
                    // const hasInstagram = !!(influencer as any).instagram_avatar_url || !!influencer.instagram_username;
                    // const hasTikTok = !!(influencer as any).tiktok_avatar_url || !!(influencer as any).tiktok_username;

                    return (
                      <tr
                        key={influencer.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {/* Stacked Avatar Group */}
                            <div className="flex -space-x-2">
                              {(influencer as any).instagram_avatar_url && (
                                <img
                                  src={(influencer as any).instagram_avatar_url}
                                  alt="Instagram"
                                  className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700"
                                />
                              )}
                              {(influencer as any).tiktok_avatar_url && (
                                <img
                                  src={(influencer as any).tiktok_avatar_url}
                                  alt="TikTok"
                                  className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-900 ring-1 ring-slate-200 dark:ring-slate-700"
                                />
                              )}
                              {!(influencer as any).instagram_avatar_url && !(influencer as any).tiktok_avatar_url && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold text-xs border-2 border-white dark:border-slate-900">
                                  {influencer.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                                {influencer.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{influencer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {influencer.instagram_username ? (
                            <div className="flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5 text-pink-500 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                @{influencer.instagram_username}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {(influencer as any).tiktok_username ? (
                            <div className="flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5 text-black dark:text-white flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                              </svg>
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                @{(influencer as any).tiktok_username}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex flex-wrap gap-1">
                            {influencer.influencer?.categories && influencer.influencer.categories.length > 0 ? (
                              influencer.influencer.categories.slice(0, 2).map((cat) => (
                                <span
                                  key={cat.id}
                                  className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs">
                                  {cat.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400 dark:text-slate-500">-</span>
                            )}
                            {influencer.influencer?.categories && influencer.influencer.categories.length > 2 && (
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-xs">
                                +{influencer.influencer.categories.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => navigate(`/influencers/${influencer.id}`)}
                              className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                              title="View Details">
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
                            </button>
                            <button
                              onClick={() => navigate(`/influencers/${influencer.id}/edit`)}
                              className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                              title="Edit">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(influencer.id)}
                              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              title="Delete">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {meta && meta.last_page > 1 && (
              <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-3 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {(meta.current_page - 1) * meta.per_page + 1} to{" "}
                  {Math.min(meta.current_page * meta.per_page, meta.total)} of {meta.total} influencers
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="minimal-input-sm rounded-sm border border-gray-200 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 ||
                        page === meta.last_page ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`min-w-[2.5rem] minimal-input-sm rounded-sm text-sm font-medium transition-colors ${
                              page === currentPage
                                ? "bg-sky-500 text-white"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-900"
                            }`}>
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-gray-400 dark:text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={meta && currentPage === meta.last_page}
                    className="minimal-input-sm rounded-sm border border-gray-200 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
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

export default Influencers;
