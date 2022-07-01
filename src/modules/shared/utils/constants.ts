export const BASE_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const BASE_WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

export const APP_NAME = "Budget Manager";
export const enum TOAST_DURATION {
  MIN = 5000,
}

export const FAILED_TO_FETCH = "Failed to fetch";
