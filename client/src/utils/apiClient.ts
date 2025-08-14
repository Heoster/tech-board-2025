import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { APISecurityManager, InputValidator } from './security';

// Simple environment variable access
const getEnvVar = (key: string, defaultValue: string = '') => {
  try {
    return (import.meta as any).env[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Secure API client with built-in security features
 */
class SecureAPIClient {
  private client: AxiosInstance;
  private baseURL: string;
  private requestQueue: Map<string, Promise<AxiosResponse<unknown>>> = new Map();

  constructor() {
    const isDev = getEnvVar('DEV') === 'true' || getEnvVar('MODE') === 'development';
    this.baseURL = getEnvVar('VITE_API_URL') || (isDev ? 'http://localhost:8000' : '/api');
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add unique request ID to prevent caching issues
        config.headers['X-Request-ID'] = crypto.randomUUID();
        
        // Validate and sanitize request data
        if (config.data) {
          config.data = this.sanitizeRequestData(config.data);
        }
        
        // Add CSRF protection for state-changing requests
        if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Clear retry attempts on successful response
        if (response.config.url) {
          APISecurityManager.clearRetryAttempts(response.config.url);
        }
        
        // Sanitize response data
        if (response.data) {
          response.data = APISecurityManager.sanitizeApiResponse(response.data);
        }

        return response;
      },
      async (error: AxiosError) => {
        return this.handleResponseError(error);
      }
    );
  }

  private async handleResponseError(error: AxiosError): Promise<never> {
    const endpoint = error.config?.url || '';
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      console.warn('Request timeout for endpoint');
    }
    
    if (error.response?.status === 429) {
      // Rate limiting - wait before retrying
      const retryAfter = error.response.headers['retry-after'] || '60';
      console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
    }

    // Auto-retry logic for certain errors
    if (APISecurityManager.shouldRetry(error, endpoint)) {
      const delay = APISecurityManager.getRetryDelay(endpoint);
      console.info(`Retrying request in ${delay}ms`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      try {
        return await this.client.request(error.config!);
      } catch (retryError) {
        console.error('Retry failed for request');
      }
    }

    // Sanitize error response
    if (error.response?.data) {
      error.response.data = APISecurityManager.sanitizeApiResponse(error.response.data);
    }

    return Promise.reject(error);
  }

  private sanitizeRequestData(data: unknown): unknown {
    if (!data || typeof data !== 'object') return data;

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeRequestData(item));
    }

    const sanitized = { ...(data as Record<string, unknown>) };

    // Recursively sanitize object properties
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = InputValidator.sanitizeInput(sanitized[key] as string);
        
        // Validate input based on field name
        if (!InputValidator.isValidInput(sanitized[key] as string)) {
          console.warn('Potentially dangerous input detected');
          sanitized[key] = ''; // Clear dangerous input
        }
      } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeRequestData(sanitized[key]);
      }
    });

    return sanitized;
  }

  // Prevent duplicate requests
  private async makeUniqueRequest<T>(
    key: string, 
    requestFn: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> {
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key)! as Promise<AxiosResponse<T>>;
    }

    const promise = requestFn().finally(() => {
      this.requestQueue.delete(key);
    });

    this.requestQueue.set(key, promise as Promise<AxiosResponse<unknown>>);
    return promise;
  }

  // Secure GET request
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const requestKey = `GET:${url}:${JSON.stringify(config?.params || {})}`;
      return await this.makeUniqueRequest(requestKey, () => 
        this.client.get<T>(url, config)
      );
    } catch (error) {
      const sanitizedError = new Error(APISecurityManager.sanitizeErrorMessage(error));
      throw sanitizedError;
    }
  }

  // Secure POST request
  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      // Validate critical endpoints
      if (url.includes('auth/login') || url.includes('auth/register')) {
        this.validateAuthData(data);
      }

      return await this.client.post<T>(url, data, config);
    } catch (error) {
      const sanitizedError = new Error(APISecurityManager.sanitizeErrorMessage(error));
      throw sanitizedError;
    }
  }

  // Secure PUT request
  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.put<T>(url, data, config);
    } catch (error) {
      const sanitizedError = new Error(APISecurityManager.sanitizeErrorMessage(error));
      throw sanitizedError;
    }
  }

  // Secure DELETE request
  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete<T>(url, config);
    } catch (error) {
      const sanitizedError = new Error(APISecurityManager.sanitizeErrorMessage(error));
      throw sanitizedError;
    }
  }

  private validateAuthData(data: unknown): void {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid authentication data');
    }

    const authData = data as Record<string, unknown>;

    // Validate login data with type checking
    if (authData.rollNumber !== undefined) {
      if (typeof authData.rollNumber !== 'string' || !InputValidator.validateRollNumber(authData.rollNumber)) {
        throw new Error('Invalid roll number format');
      }
    }

    if (authData.grade !== undefined) {
      if (typeof authData.grade !== 'number' || !InputValidator.validateGrade(authData.grade)) {
        throw new Error('Invalid grade');
      }
    }

    if (authData.section !== undefined) {
      if (typeof authData.section !== 'string' || !InputValidator.validateSection(authData.section)) {
        throw new Error('Invalid section');
      }
    }

    if (authData.password !== undefined) {
      if (typeof authData.password !== 'string' || !InputValidator.validatePassword(authData.password)) {
        throw new Error('Password does not meet requirements');
      }
    }

    if (authData.name !== undefined) {
      if (typeof authData.name !== 'string' || !InputValidator.validateName(authData.name)) {
        throw new Error('Invalid name format');
      }
    }
  }

  // Health check endpoint
  async healthCheck(): Promise<{healthy: boolean; responseTime: number}> {
    const start = Date.now();
    try {
      await this.get('/health');
      return {
        healthy: true,
        responseTime: Date.now() - start
      };
    } catch {
      return {
        healthy: false,
        responseTime: Date.now() - start
      };
    }
  }

  // Set authorization header
  setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const isDev = getEnvVar('DEV') === 'true' || getEnvVar('MODE') === 'development';
      if (isDev) {
        console.log('Auth token set in apiClient');
      }
    } else {
      delete this.client.defaults.headers.common['Authorization'];
      const isDev = getEnvVar('DEV') === 'true' || getEnvVar('MODE') === 'development';
      if (isDev) {
        console.log('Auth token removed from apiClient');
      }
    }
  }

  // Get current auth token status
  getAuthStatus(): { hasToken: boolean; token?: string } {
    const token = this.client.defaults.headers.common['Authorization'];
    return {
      hasToken: !!token,
      token: token ? String(token).replace('Bearer ', '') : undefined
    };
  }

  // Cancel all pending requests
  cancelAllRequests(): void {
    this.requestQueue.clear();
  }
}

// Create and export singleton instance
const apiClient = new SecureAPIClient();

export { SecureAPIClient };
export default apiClient;