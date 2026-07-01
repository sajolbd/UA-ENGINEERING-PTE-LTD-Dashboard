/**
 * Centralized API base URL.
 * Set NEXT_PUBLIC_API_URL in Vercel / .env.local to point at your deployed Express backend.
 * Falls back to http://localhost:5000 for local development.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
