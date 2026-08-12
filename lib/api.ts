/**
 * Centralized API base URL.
 * - If NEXT_PUBLIC_API_URL is configured in environment, use it.
 * - Otherwise default to http://localhost:5000 for local dev & backend server.
 */
export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.endsWith(".vercel.app") || hostname.includes("ua-engineering") || hostname.includes("vercel")) {
      return "https://ua-engineering-pte-ltd-backend.vercel.app";
    }
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `${window.location.protocol}//${hostname}:5000`;
    }
  }
  return "http://localhost:5000";
};

export const getApiBaseUrlClient = getApiBaseUrl;
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
    return `${getApiBaseUrl()}${imagePath}`;
  }
  
  // Local static asset paths are served directly from public/images
  return imagePath;
};
