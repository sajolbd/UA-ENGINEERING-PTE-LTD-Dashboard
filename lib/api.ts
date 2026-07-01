/**
 * Centralized API base URL.
 * - On Vercel: set NEXT_PUBLIC_API_URL in project environment variables
 * - Locally: set in .env.local or falls back to localhost:5000
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ua-engineering-pte-ltd-backend-production.up.railway.app";
