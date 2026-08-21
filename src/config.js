// Determine the API base URL:
// 1. Use VITE_API_BASE_URL env var if explicitly set
// 2. In production (no dev server), use relative "/api" path
// 3. In local dev, fallback to localhost
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  || (isProduction ? '/api' : 'http://127.0.0.1:5000/api');
