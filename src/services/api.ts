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
  file?: File;
}

export interface AIQueryResponse {
  response: string;
  mode: string;
  level: string;
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
    const formData = new FormData();
    formData.append('mode', request.mode);
    formData.append('level', request.level);
    formData.append('query', request.query);
    
    if (request.file) {
      formData.append('files[0]', request.file);
    }

    const response = await fetch(`${API_BASE_URL}/ai/query`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
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