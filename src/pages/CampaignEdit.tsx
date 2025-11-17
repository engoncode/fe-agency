import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CampaignForm from "../components/campaigns/CampaignForm";
import { campaignService } from "../services/campaign.service";
import type { Campaign, CampaignFormData } from "../types/campaign";

const CampaignEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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

  const handleSubmit = async (data: CampaignFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      setErrors({});
      await campaignService.update(parseInt(id), data);
      alert("Campaign updated successfully!");
      navigate("/campaigns");
    } catch (error: any) {
      console.error("Failed to update campaign:", error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to update campaign. Please check the console for details.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">Loading campaign...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">Campaign not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/campaigns/${id}`)}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Campaign</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update campaign information</p>
        </div>
      </div>

      {/* Form */}
      <CampaignForm campaign={campaign} onSubmit={handleSubmit} isLoading={saving} errors={errors} />
    </div>
  );
};

export default CampaignEdit;
