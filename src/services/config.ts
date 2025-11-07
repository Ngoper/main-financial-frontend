export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api/v1'
    : 'http://localhost:8080/api/v1',
  TIMEOUT: 30000,
};

export const CORS_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Accept': 'application/json',
  }
};