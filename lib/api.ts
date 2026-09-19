/**
 * Centralized API base URL.
 * - If NEXT_PUBLIC_API_URL is configured in environment, use it.
 * - Otherwise default to http://localhost:5000 for local dev & backend server.
 */
const LIVE_API_FALLBACK = "https://api.uaengineering.com.sg";

export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim().length > 0) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }
  return LIVE_API_FALLBACK;
};

export const getApiBaseUrlClient = getApiBaseUrl;
export const API_BASE = getApiBaseUrl();

/**
 * Fetch wrapper with timeout protection to prevent hanging UI
 */
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 45000
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
  if (!imagePath || typeof imagePath !== "string") return "/images/home/hero/hero-bg.png";
  const trimmed = imagePath.trim();
  if (!trimmed) return "/images/home/hero/hero-bg.png";
  if (trimmed.startsWith("http") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  
  if (trimmed.startsWith("/images/uploads/")) {
    return `${getApiBaseUrl()}${trimmed}`;
  }

  if (trimmed.startsWith("images/uploads/")) {
    return `${getApiBaseUrl()}/${trimmed}`;
  }
  
  // Local static asset paths are served directly from public/images
  return trimmed;
};

