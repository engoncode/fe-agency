import React, { useState, useEffect } from "react";
import type { Influencer, InfluencerFormData } from "../../types/influencer";
import type { Category } from "../../types/category";
import { categoryService } from "../../services/category.service";

interface InfluencerFormProps {
  influencer?: Influencer;
  onSubmit: (data: InfluencerFormData) => Promise<void>;
  isLoading?: boolean;
  errors?: Record<string, string[]>;
}

const FieldError: React.FC<{ messages?: string[] }> = ({ messages }) => {
  if (!messages || messages.length === 0) return null;
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{messages[0]}</p>;
};

const InfluencerForm: React.FC<InfluencerFormProps> = ({ influencer, onSubmit, isLoading = false, errors = {} }) => {
  const [formData, setFormData] = useState<InfluencerFormData>({
    name: influencer?.name || "",
    email: influencer?.email || "",
    password: "",
    kategori_influencer: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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

  useEffect(() => {
    if (influencer) {
      const selectedCategoryIds = influencer.influencer?.categories?.map((cat) => cat.id) || [];
      setFormData({
        name: influencer.name || "",
        email: influencer.email || "",
        password: "",
        kategori_influencer: selectedCategoryIds,
      });
    }
  }, [influencer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setFormData((prev) => ({ ...prev, kategori_influencer: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...formData };
    if (influencer && !payload.password) {
      delete payload.password;
    }

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Influencer Information</h3>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Enter influencer name"
            />
            <FieldError messages={errors.name} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="influencer@example.com"
            />
            <FieldError messages={errors.email} />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password {!influencer && <span className="text-red-500">*</span>}
              {influencer && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Leave blank to keep current)</span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!influencer}
              minLength={8}
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder={influencer ? "Enter new password (optional)" : "Minimum 8 characters"}
            />
            <FieldError messages={errors.password} />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categories <span className="text-red-500">*</span>
            </label>
            {loadingCategories ? (
              <div className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                Loading categories...
              </div>
            ) : (
              <select
                multiple
                value={formData.kategori_influencer.map(String)}
                onChange={handleCategoryChange}
                required
                size={Math.min(categories.length, 8)}
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="py-1">
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Hold Ctrl/Cmd to select multiple categories</p>
            <FieldError messages={errors.kategori_influencer} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors">
          {isLoading ? "Saving..." : influencer ? "Update Influencer" : "Create Influencer"}
        </button>
      </div>
    </form>
  );
};

export default InfluencerForm;
