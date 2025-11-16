import React, { useState } from "react";
import { useNavigate } from "react-router";
import CampaignForm from "../components/campaigns/CampaignForm";
import { campaignService } from "../services/campaign.service";
import type { CampaignFormData } from "../types/campaign";

const CampaignCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (data: CampaignFormData) => {
    try {
      setLoading(true);
      setErrors({});
      await campaignService.create(data);
      alert("Campaign created successfully!");
      navigate("/campaigns");
    } catch (error: any) {
      console.error("Failed to create campaign:", error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to create campaign. Please check the console for details.");
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
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Campaign</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Add a new marketing campaign</p>
        </div>
      </div>

      {/* Form */}
      <CampaignForm onSubmit={handleSubmit} isLoading={loading} errors={errors} />
    </div>
  );
};

export default CampaignCreate;
