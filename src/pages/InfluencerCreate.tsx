import React, { useState } from "react";
import { useNavigate } from "react-router";
import { influencerService } from "../services/influencer.service";
import type { InfluencerFormData } from "../types/influencer";
import InfluencerForm from "../components/influencers/InfluencerForm";

const InfluencerCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (data: InfluencerFormData) => {
    try {
      setLoading(true);
      setErrors({});
      await influencerService.create(data);
      alert("Influencer invited successfully!");
      navigate("/influencers");
    } catch (error: any) {
      console.error("Failed to create influencer:", error);
      if (error.response?.status === 422 && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || "Failed to create influencer");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invite New Influencer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Send an invitation to add a new influencer</p>
        </div>
      </div>

      {/* Form */}
      <InfluencerForm onSubmit={handleSubmit} isLoading={loading} errors={errors} />
    </div>
  );
};

export default InfluencerCreate;
