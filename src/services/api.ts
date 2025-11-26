import axios from "axios";

const api = axios.create({
  baseURL: "https://relay-agency.stpi.co.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      const token = state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing auth storage:", error);
    }
  }
  return config;
});

// Helper function to get full image URL
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;

  // If already a full URL (base64 or http/https), return as is
  if (imagePath.startsWith("data:") || imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Construct full URL from backend storage
  const baseURL = "https://relay-agency.stpi.co.id";
  return `${baseURL}/storage/${imagePath}`;
};

export default api;
