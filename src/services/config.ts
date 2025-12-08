export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 30000,
};

export const CORS_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Accept': 'application/json',
  }
};