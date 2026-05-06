import axios from "axios";

// Production: default to same-origin `/api/...` so Vercel rewrites can proxy to the API
// (avoids broken deploys when VITE_API_URL is unset). Dev: Vite proxies `/api` → backend.
const SERVER_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_SERVER_URL ||
  "";

export const http = axios.create({
  baseURL: SERVER_URL,
});

