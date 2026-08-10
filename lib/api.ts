/**
 * Centralized API base URL.
 * - On Vercel / Production: set NEXT_PUBLIC_API_URL in project environment variables
 * - Locally: auto-detects localhost:5000 or falls back to Railway backend
 */
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }
  }
  return "https://ua-engineering-pte-ltd-backend-production.up.railway.app";
};

export const API_BASE = getApiBaseUrl();

/**
 * Resolves image paths dynamically for the dashboard.
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/images/logo.png";
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  
  if (imagePath.startsWith("/images/uploads/")) {
    return `${API_BASE}${imagePath}`;
  }
  
  // Local static asset paths are served directly from public/images
  return imagePath;
};
