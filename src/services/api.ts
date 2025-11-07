import { API_CONFIG, CORS_CONFIG } from './config';

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
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();