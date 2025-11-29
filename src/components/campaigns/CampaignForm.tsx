import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { Campaign, CampaignFormData } from "../../types/campaign";
import type { Category } from "../../types/category";
import { categoryService } from "../../services/category.service";
import { getImageUrl } from "../../services/api";
import api from "../../services/api";

type Errors = Record<string, string[]>;

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (data: CampaignFormData) => Promise<void>;
  isLoading?: boolean;
  errors?: Errors;
}

const FieldError: React.FC<{ messages?: string[] }> = ({ messages }) => {
  if (!messages || messages.length === 0) return null;
  return <p className="mt-1 text-sm text-red-600 dark:text-red-400">{messages[0]}</p>;
};

const CampaignForm: React.FC<CampaignFormProps> = ({ campaign, onSubmit, isLoading = false, errors = {} }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CampaignFormData>({
    campaign_name: campaign?.campaign_name || "",
    product_name: campaign?.product_name || "",
    campaign_goal: campaign?.campaign_goal || "",
    kpi_target: campaign?.kpi_target || "",
    key_messages: campaign?.key_messages || [],
    mandatory_hashtags: campaign?.mandatory_hashtags || [],
    mandatory_cta: campaign?.mandatory_cta || "",
    compensation_type: campaign?.compensation_type || "",
    content_usage_rights: campaign?.content_usage_rights || false,
    description: campaign?.description || "",
    rules: campaign?.rules || "",
    start_date: campaign?.start_date ? campaign.start_date.slice(0, 16) : "",
    end_date: campaign?.end_date ? campaign.end_date.slice(0, 16) : "",
    status: campaign?.status || "draft",
    platform_deliverables: campaign?.platform_deliverables || [],
    kategori_campaign: [],
  });

  // Temporary input states
  const [keyMessageInput, setKeyMessageInput] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllPublic();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Load existing image when editing
  useEffect(() => {
    if (campaign?.image) {
      const imageUrl = getImageUrl(campaign.image);
      if (imageUrl) {
        setImagePreview(imageUrl);
      }
    }
  }, [campaign?.image]);

  // Auto-populate categories when editing campaign
  useEffect(() => {
    if (campaign?.categories) {
      const selectedCategoryIds = campaign.categories.map((cat) => cat.id);
      setFormData((prev) => ({
        ...prev,
        kategori_campaign: selectedCategoryIds,
        start_date: campaign.start_date ? campaign.start_date.slice(0, 16) : prev.start_date,
        end_date: campaign.end_date ? campaign.end_date.slice(0, 16) : prev.end_date,
      }));
    }
  }, [campaign]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setFormData((prev) => ({ ...prev, kategori_campaign: selectedOptions }));
  };

  // Key Messages
  const addKeyMessage = () => {
    if (keyMessageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        key_messages: [...(prev.key_messages || []), keyMessageInput.trim()],
      }));
      setKeyMessageInput("");
    }
  };

  const removeKeyMessage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      key_messages: (prev.key_messages || []).filter((_, i) => i !== index),
    }));
  };

  // Hashtags
  const addHashtag = () => {
    if (hashtagInput.trim()) {
      const tag = hashtagInput.trim().startsWith("#") ? hashtagInput.trim() : `#${hashtagInput.trim()}`;
      setFormData((prev) => ({
        ...prev,
        mandatory_hashtags: [...(prev.mandatory_hashtags || []), tag],
      }));
      setHashtagInput("");
    }
  };

  const removeHashtag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mandatory_hashtags: (prev.mandatory_hashtags || []).filter((_, i) => i !== index),
    }));
  };

  // Platform Deliverables
  const addDeliverable = () => {
    setFormData((prev) => ({
      ...prev,
      platform_deliverables: [
        ...(prev.platform_deliverables || []),
        {
          platform_name: "",
          content_format: "",
          quantity: 1,
          min_duration_seconds: undefined,
          max_duration_seconds: undefined,
          notes: "",
        },
      ],
    }));
  };

  // AI generation
  const handleGenerateAI = async () => {
    // basic client-side validation
    if (!formData.product_name || !formData.campaign_name || !formData.campaign_goal) {
      setAiError("Please fill Product Name, Campaign Name and Campaign Goal before generating.");
      return;
    }

    setAiError(null);
    setIsGeneratingAI(true);

    try {
      const payload = {
        product_name: formData.product_name,
        campaign_name: formData.campaign_name,
        campaign_goal: formData.campaign_goal,
      };

      const resp = await api.post("ai/campaign/brief", payload);
      const data = resp.data || {};

      setFormData((prev) => ({
        ...prev,
        // Prefer AI-refined campaign goal mapped into description for editing
        description: data.campaign_goal_refined ?? data.description ?? prev.description,
        campaign_goal: data.campaign_goal ?? prev.campaign_goal,
        kpi_target: data.kpi_target ?? prev.kpi_target,
        mandatory_cta: data.mandatory_cta ?? prev.mandatory_cta,
        rules: data.rules ?? prev.rules,
        key_messages: Array.isArray(data.key_messages)
          ? data.key_messages
          : data.key_messages
          ? String(data.key_messages)
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : prev.key_messages,
        mandatory_hashtags: Array.isArray(data.mandatory_hashtags)
          ? data.mandatory_hashtags
          : data.mandatory_hashtags
          ? String(data.mandatory_hashtags)
              .split(/[,\n]+/)
              .map((s: string) => s.trim())
              .filter(Boolean)
          : prev.mandatory_hashtags,
        platform_deliverables: Array.isArray(data.platform_deliverables)
          ? data.platform_deliverables.map((d: any) => ({
              platform_name: d.platform_name || "",
              content_format: d.content_format || "",
              quantity: d.quantity ?? 1,
              min_duration_seconds: d.min_duration_seconds ?? undefined,
              max_duration_seconds: d.max_duration_seconds ?? undefined,
              notes: d.notes ?? "",
            }))
          : prev.platform_deliverables,
      }));
    } catch (error) {
      console.error("AI generation error:", error);
      setAiError("AI generation failed. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      platform_deliverables: (prev.platform_deliverables || []).filter((_, i) => i !== index),
    }));
  };

  const updateDeliverable = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      platform_deliverables: (prev.platform_deliverables || []).map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      ),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="campaign_name"
                value={formData.campaign_name}
                onChange={handleChange}
                disabled={isGeneratingAI}
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
              />
              <FieldError messages={errors.campaign_name} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                disabled={isGeneratingAI}
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
              />
              <FieldError messages={errors.product_name} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Campaign Goal <span className="text-red-500">*</span>
            </label>
            <textarea
              name="campaign_goal"
              value={formData.campaign_goal}
              onChange={handleChange}
              disabled={isGeneratingAI}
              required
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.campaign_goal} />
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md text-sm">
                {isGeneratingAI ? <span>Generating...</span> : <span>✨ Auto-Fill with AI</span>}
              </button>
              {aiError && <p className="text-sm text-red-600">{aiError}</p>}
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                disabled={isGeneratingAI}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Campaign Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Image</label>
            {imagePreview ? (
              <div className="relative">
                <div className="relative w-full h-48 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <img src={imagePreview} alt="Campaign Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Click the × button to remove and upload a different image
                </p>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="campaign-image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (MAX. 2MB)</p>
                  </div>
                  <input
                    id="campaign-image-upload"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
            <FieldError messages={errors.image} />
          </div>
        </div>
      </div>

      {/* Campaign Categories */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Categories</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categories <span className="text-red-500">*</span>
          </label>
          {loadingCategories ? (
            <div className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              Loading categories...
            </div>
          ) : (
            <select
              multiple
              value={formData.kategori_campaign?.map(String) || []}
              onChange={handleCategoryChange}
              required
              size={Math.min(categories.length, 6)}
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="py-1">
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Hold Ctrl/Cmd to select multiple categories</p>
          <FieldError messages={errors.kategori_campaign} />
        </div>
      </div>

      {/* Campaign Goals & KPI */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals & KPI</h3>
        <div className="space-y-4">
          {/* KPI Target remains in this section; Campaign Goal moved to Basic Information */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              KPI Target <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="kpi_target"
              value={formData.kpi_target}
              onChange={handleChange}
              disabled={isGeneratingAI}
              required
              placeholder="e.g., 100K impressions, 5K engagements"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.kpi_target} />
          </div>
        </div>
      </div>

      {/* Key Messages */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Messages</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={keyMessageInput}
              onChange={(e) => setKeyMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyMessage())}
              disabled={isGeneratingAI}
              placeholder="Add key message"
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button
              type="button"
              onClick={addKeyMessage}
              disabled={isGeneratingAI}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm flex items-center gap-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
          {formData.key_messages && formData.key_messages.length > 0 && (
            <div className="space-y-2">
              {formData.key_messages.map((message, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="flex-1 text-gray-900 dark:text-gray-100">{message}</span>
                  <button
                    type="button"
                    onClick={() => removeKeyMessage(index)}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mandatory Content</h3>
        <div className="space-y-4">
          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mandatory Hashtags
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHashtag())}
                  placeholder="Add hashtag (e.g., #YourBrand)"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addHashtag}
                  disabled={isGeneratingAI}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
              {formData.mandatory_hashtags && formData.mandatory_hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.mandatory_hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                      {tag}
                      <button type="button" onClick={() => removeHashtag(index)} className="hover:text-red-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mandatory Call-to-Action
            </label>
            <input
              type="text"
              name="mandatory_cta"
              value={formData.mandatory_cta}
              onChange={handleChange}
              placeholder="e.g., Visit our website, Shop now"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.mandatory_cta} />
          </div>
        </div>
      </div>

      {/* Platform Deliverables */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Deliverables</h3>
          <button
            type="button"
            onClick={addDeliverable}
            disabled={isGeneratingAI}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Platform
          </button>
        </div>

        {!formData.platform_deliverables || formData.platform_deliverables.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
            No platform deliverables added yet
          </p>
        ) : (
          <div className="space-y-4">
            {formData.platform_deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeDeliverable(index)}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-700">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Platform <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliverable.platform_name}
                      onChange={(e) => updateDeliverable(index, "platform_name", e.target.value)}
                      required
                      disabled={isGeneratingAI}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none">
                      <option value="">Select platform</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Format <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliverable.content_format}
                      onChange={(e) => updateDeliverable(index, "content_format", e.target.value)}
                      required
                      disabled={isGeneratingAI}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none">
                      <option value="">Select format</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={deliverable.quantity}
                      onChange={(e) => updateDeliverable(index, "quantity", Number(e.target.value))}
                      min="1"
                      required
                      disabled={isGeneratingAI}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Duration (seconds)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={deliverable.min_duration_seconds || ""}
                        onChange={(e) =>
                          updateDeliverable(
                            index,
                            "min_duration_seconds",
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        placeholder="Min"
                        className="w-1/2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
                        disabled={isGeneratingAI}
                      />
                      <input
                        type="number"
                        value={deliverable.max_duration_seconds || ""}
                        onChange={(e) =>
                          updateDeliverable(
                            index,
                            "max_duration_seconds",
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        placeholder="Max"
                        className="w-1/2 px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
                        disabled={isGeneratingAI}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Notes</label>
                    <textarea
                      value={deliverable.notes}
                      onChange={(e) => updateDeliverable(index, "notes", e.target.value)}
                      rows={2}
                      placeholder="Additional requirements or notes..."
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
                      disabled={isGeneratingAI}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Campaign Start Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.start_date} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Campaign End Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.end_date} />
          </div>
        </div>
      </div>

      {/* Compensation & Rights */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compensation & Rights</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compensation Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="compensation_type"
              value={formData.compensation_type}
              onChange={handleChange}
              required
              placeholder="e.g., Paid, Barter, Product Seeding"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.compensation_type} />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="content_usage_rights"
              name="content_usage_rights"
              checked={formData.content_usage_rights}
              onChange={handleChange}
              className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="content_usage_rights" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Request Content Usage Rights
            </label>
          </div>
        </div>
      </div>

      {/* Rules & Status */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Campaign Rules <span className="text-red-500">*</span>
            </label>
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleChange}
              required
              rows={3}
              placeholder="List all campaign rules and requirements..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <FieldError messages={errors.rules} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              disabled={campaign?.status !== "draft"}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed">
              {!campaign || campaign.status === "draft" ? (
                <>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                </>
              ) : (
                <>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </>
              )}
            </select>
            {campaign && campaign.status !== "draft" && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Status is automatically managed by the system
              </p>
            )}
            <FieldError messages={errors.status} />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/campaigns")}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-200 dark:border-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors disabled:opacity-50">
          {isLoading ? "Saving..." : campaign ? "Update Campaign" : "Create Campaign"}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
