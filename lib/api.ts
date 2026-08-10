/**
 * Centralized API base URL.
 * - On Vercel: set NEXT_PUBLIC_API_URL in project environment variables
 * - Locally: set in .env.local or falls back to Railway backend
 */
const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ua-engineering-pte-ltd-backend-production.up.railway.app";

export const API_BASE = rawApiUrl.replace(/\/api\/?$/, "");

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
