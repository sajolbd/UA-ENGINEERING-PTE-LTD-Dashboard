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
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }
    return "https://ua-engineering-pte-ltd-backend-production.up.railway.app";
  }
  return "https://ua-engineering-pte-ltd-backend-production.up.railway.app";
};

export const getApiBaseUrlClient = getApiBaseUrl;
export const API_BASE = getApiBaseUrl();

/**
 * Fetch wrapper with timeout protection to prevent hanging UI
 */
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 15000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(id);
  }
};

/**
 * Resolves image paths dynamically for the dashboard.
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/images/logo.webp";
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  
  if (imagePath.startsWith("/images/uploads/")) {
    return `${getApiBaseUrl()}${imagePath}`;
  }
  
  // Local static asset paths are served directly from public/images
  return imagePath;
};

