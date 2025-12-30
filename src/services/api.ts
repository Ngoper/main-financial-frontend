import { API_CONFIG, CORS_CONFIG, getAuthHeaders } from './config';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface AIQueryRequest {
  mode: 'company-analysis' | 'stock-recommendations' | 'document-analysis';
  level: 'newbie' | 'novice' | 'expert';
  query: string;
  tickers?: string[];
  ticker?: string;
  artifactId?: string;
  files?: File[];
}

export interface SourceRef {
  doc_id: string;
  title: string;
  ticker?: string;
  chunk_id: string;
  page?: number;
}

export interface AIQueryResponse {
  answer: string;
  sources?: SourceRef[];
  metadata?: {
    mode: string;
    level: number;
    inferred_tickers?: string[];
    retrieval?: {
      top_k_used: number;
      chunks_used: number;
    };
    timings_ms?: {
      retrieve: number;
      generate: number;
    };
  };
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...CORS_CONFIG,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_CONFIG.headers,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async createUser(user: User): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async queryAI(request: AIQueryRequest): Promise<AIQueryResponse> {
    const hasFiles = request.files && request.files.length > 0;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      if (hasFiles || request.mode === 'document-analysis') {
        // Use multipart/form-data for file uploads or document analysis
        const formData = new FormData();
        formData.append('mode', request.mode);
        formData.append('level', request.level);
        formData.append('query', request.query);
        
        if (request.tickers) {
          request.tickers.forEach(ticker => formData.append('tickers', ticker));
        }
        if (request.ticker) {
          formData.append('ticker', request.ticker);
        }
        if (request.artifactId) {
          formData.append('artifactId', request.artifactId);
        }
        if (request.files) {
          request.files.forEach(file => formData.append('files', file));
        }

        const response = await fetch(`${API_BASE_URL}/ai/query`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData,
          signal: controller.signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
          }
          const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
          throw new Error(error.detail || error.error || `Request failed: ${response.status}`);
        }

        return response.json();
      } else {
        // Use JSON for other modes
        const jsonRequest = {
          mode: request.mode,
          level: request.level,
          query: request.query,
          ...(request.tickers && { tickers: request.tickers }),
          ...(request.ticker && { ticker: request.ticker }),
          ...(request.artifactId && { artifactId: request.artifactId })
        };

        const response = await fetch(`${API_BASE_URL}/ai/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify(jsonRequest),
          signal: controller.signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
          }
          const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
          throw new Error(error.detail || error.error || `Request failed: ${response.status}`);
        }

        return response.json();
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 30 seconds. Please try again.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async register(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Registration failed' }));
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Invalid credentials' }));
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  }

  async verifyToken(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      throw new Error('Invalid or expired token');
    }

    return response.json();
  }
}



export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    return await apiService.verifyToken();
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/home';
};

export interface FeedbackRequest {
  phone: string;
  email?: string;
  feedback: string;
  wantContact: boolean;
}

class ApiServiceExtended extends ApiService {
  async submitFeedback(request: FeedbackRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to submit feedback' }));
      throw new Error(error.error || 'Failed to submit feedback');
    }
  }
}

export const apiService = new ApiServiceExtended();