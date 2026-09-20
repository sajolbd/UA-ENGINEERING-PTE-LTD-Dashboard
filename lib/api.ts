/**
 * Centralized API base URL.
 * - If running on localhost or 127.0.0.1 in browser, prioritize http://localhost:5000.
 * - Otherwise use NEXT_PUBLIC_API_URL or fallback to https://api.uaengineering.com.sg.
 */
const LIVE_API_FALLBACK = "https://api.uaengineering.com.sg";
const LOCAL_API_FALLBACK = "http://localhost:5000";

export const getApiBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.") || host.startsWith("10.")) {
      return LOCAL_API_FALLBACK;
    }
  }

  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim().length > 0) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }

  return LIVE_API_FALLBACK;
};

export const getApiBaseUrlClient = getApiBaseUrl;

/**
 * Dynamic API_BASE string object that re-evaluates getApiBaseUrl() when stringified in template literals.
 */
export const API_BASE = {
  toString: () => getApiBaseUrl(),
  toJSON: () => getApiBaseUrl(),
  valueOf: () => getApiBaseUrl(),
  [Symbol.toPrimitive]() {
    return getApiBaseUrl();
  }
} as unknown as string;

/**
 * Fetch wrapper with timeout & fallback protection
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
  } catch (primaryErr) {
    // If request failed and URL was pointing to live API while running on local browser, try localhost fallback
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
      url.includes(LIVE_API_FALLBACK)
    ) {
      const localUrl = url.replace(LIVE_API_FALLBACK, LOCAL_API_FALLBACK);
      try {
        const localResponse = await fetch(localUrl, {
          ...options,
          signal: controller.signal
        });
        return localResponse;
      } catch (localErr) {
        throw primaryErr;
      }
    }
    throw primaryErr;
  } finally {
    clearTimeout(id);
  }
};

export const getImageUrl = (imagePath?: string, fallback: string = "/images/home/hero/hero-bg.png"): string => {
  if (!imagePath || typeof imagePath !== "string") return fallback;
  const trimmed = imagePath.trim();
  if (!trimmed) return fallback;
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
