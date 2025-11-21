import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { influencerService } from "../services/influencer.service";
import type { Influencer, InfluencerFormData } from "../types/influencer";
import InfluencerForm from "../components/influencers/InfluencerForm";
import { useNotification } from "../components/notifications/NotificationProvider";

const InfluencerEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Toast notifications
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    if (id) {
      fetchInfluencer(parseInt(id));
    }
  }, [id]);

  const fetchInfluencer = async (influencerId: number) => {
    try {
      setLoading(true);
      const data = await influencerService.getById(influencerId);
      setInfluencer(data);
    } catch (error) {
      console.error("Failed to fetch influencer:", error);
      showError("Error", "Influencer not found");
      navigate("/influencers");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: InfluencerFormData) => {
    if (!id) return;

    try {
      setSubmitting(true);
      setErrors({});
      await influencerService.update(parseInt(id), data);
      showSuccess("Success", "Influencer updated successfully!");
      navigate("/influencers");
    } catch (error: any) {
      console.error("Failed to update influencer:", error);
      if (error.response?.status === 422 && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        const errorMessage = error.response?.data?.message || "Failed to update influencer";
        showError("Error", errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Loading influencer details...</div>
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 dark:text-gray-400">Influencer not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Influencer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update influencer information</p>
        </div>
      </div>

      {/* Form */}
      <InfluencerForm influencer={influencer} onSubmit={handleSubmit} isLoading={submitting} errors={errors} />
    </div>
  );
};

export default InfluencerEdit;
