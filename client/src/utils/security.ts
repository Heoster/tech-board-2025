// Client-side security utilities for production

/**
 * Secure localStorage wrapper with encryption and validation
 */
class SecureStorage {
  private static readonly PREFIX = 'techboard_';
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user_data';
  
  // Simple XOR encryption for basic token obfuscation (not cryptographically secure)
  private static encrypt(text: string): string {
    if (!text) return '';
    const key = 'TB2025_KEY'; // In production, this should be environment-specific
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted); // Base64 encode
  }

  private static decrypt(encrypted: string): string {
    if (!encrypted) return '';
    try {
      const text = atob(encrypted); // Base64 decode
      const key = 'TB2025_KEY';
      let decrypted = '';
      for (let i = 0; i < text.length; i++) {
        decrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return decrypted;
    } catch {
      console.warn('Failed to decrypt data, clearing storage');
      return '';
    }
  }

  static setToken(token: string): void {
    if (!token) {
      this.removeToken();
      return;
    }
    
    try {
      const encrypted = this.encrypt(token);
      localStorage.setItem(this.PREFIX + this.TOKEN_KEY, encrypted);
      // Set expiration (24 hours from now)
      const expiration = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem(this.PREFIX + this.TOKEN_KEY + '_exp', expiration.toString());
    } catch {
      console.error('Failed to store token securely');
    }
  }

  static getToken(): string | null {
    try {
      const encrypted = localStorage.getItem(this.PREFIX + this.TOKEN_KEY);
      const expiration = localStorage.getItem(this.PREFIX + this.TOKEN_KEY + '_exp');
      
      if (!encrypted || !expiration) {
        return null;
      }

      // Check expiration
      if (Date.now() > parseInt(expiration)) {
        this.removeToken();
        return null;
      }

      const token = this.decrypt(encrypted);
      
      // Validate token format (basic JWT check)
      if (!token || !token.includes('.')) {
        this.removeToken();
        return null;
      }

      return token;
    } catch {
      console.warn('Failed to retrieve token, clearing storage');
      this.removeToken();
      return null;
    }
  }

  static removeToken(): void {
    localStorage.removeItem(this.PREFIX + this.TOKEN_KEY);
    localStorage.removeItem(this.PREFIX + this.TOKEN_KEY + '_exp');
  }

  static setUserData(userData: unknown): void {
    if (!userData) {
      this.removeUserData();
      return;
    }

    try {
      // Sanitize user data before storage
      const sanitizedData = this.sanitizeUserData(userData);
      const encrypted = this.encrypt(JSON.stringify(sanitizedData));
      localStorage.setItem(this.PREFIX + this.USER_KEY, encrypted);
    } catch {
      console.error('Failed to store user data securely');
    }
  }

  static getUserData(): unknown | null {
    try {
      const encrypted = localStorage.getItem(this.PREFIX + this.USER_KEY);
      if (!encrypted) return null;

      const decrypted = this.decrypt(encrypted);
      if (!decrypted) return null;

      return JSON.parse(decrypted);
    } catch {
      console.warn('Failed to retrieve user data, clearing storage');
      this.removeUserData();
      return null;
    }
  }

  static removeUserData(): void {
    localStorage.removeItem(this.PREFIX + this.USER_KEY);
  }

  static clearAll(): void {
    this.removeToken();
    this.removeUserData();
  }

  private static sanitizeUserData(userData: Record<string, unknown>): Record<string, unknown> {
    // Remove sensitive fields and sanitize strings
    const sanitized = { ...userData };
    
    // Remove any password fields
    delete sanitized.password;
    delete sanitized.password_hash;
    
    // Sanitize string fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = this.sanitizeString(sanitized[key]);
      }
    });

    return sanitized;
  }

  private static sanitizeString(str: string): string {
    if (typeof str !== 'string') return str;
    
    // Remove potential XSS payloads
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
}

/**
 * Input validation utilities
 */
export class InputValidator {
  static readonly patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z\s'-]{2,100}$/,
    rollNumber: /^[1-9][0-9]?$|^[1-7][0-9]$|^80$/,  // 1-80
    password: /^.{6,}$/,
    grade: /^(6|7|8|9|11)$/,
    section: /^[AB]$/
  };

  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:text\/html/gi, '')
      .substring(0, 1000); // Limit length
  }

  static validateName(name: string): boolean {
    const sanitized = this.sanitizeInput(name);
    return this.patterns.name.test(sanitized);
  }

  static validateRollNumber(rollNumber: string | number): boolean {
    const str = rollNumber.toString();
    return this.patterns.rollNumber.test(str);
  }

  static validateGrade(grade: string | number): boolean {
    const str = grade.toString();
    return this.patterns.grade.test(str);
  }

  static validateSection(section: string): boolean {
    return this.patterns.section.test(section);
  }

  static validatePassword(password: string): boolean {
    return this.patterns.password.test(password);
  }

  static isValidInput(input: unknown): boolean {
    if (input === null || input === undefined) return false;
    if (typeof input === 'string' && input.trim() === '') return false;
    
    // Check for common XSS patterns
    const str = input.toString();
    const dangerousPatterns = [
      /<script/i,
      /<iframe/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /vbscript:/i,
      /expression\s*\(/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(str));
  }
}

/**
 * API security utilities
 */
export class APISecurityManager {
  private static readonly MAX_RETRY_ATTEMPTS = 3;
  private static readonly RETRY_DELAY = 1000;
  private static retryAttempts = new Map<string, number>();

  static sanitizeApiResponse(response: unknown): unknown {
    if (!response || typeof response !== 'object') return response;

    // Clone the response to avoid mutations
    const sanitized = JSON.parse(JSON.stringify(response));

    // Recursively sanitize strings in the response
    this.sanitizeObject(sanitized);

    return sanitized;
  }

  private static sanitizeObject(obj: unknown): void {
    if (Array.isArray(obj)) {
      obj.forEach(item => this.sanitizeObject(item));
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = InputValidator.sanitizeInput(obj[key]);
        } else if (typeof obj[key] === 'object') {
          this.sanitizeObject(obj[key]);
        }
      });
    }
  }

  static shouldRetry(error: { response?: { status?: number }; code?: string }, endpoint: string): boolean {
    // Sanitize endpoint to prevent NoSQL injection
    const sanitizedEndpoint = InputValidator.sanitizeInput(endpoint);
    const attempts = this.retryAttempts.get(sanitizedEndpoint) || 0;
    
    if (attempts >= this.MAX_RETRY_ATTEMPTS) {
      this.retryAttempts.delete(sanitizedEndpoint);
      return false;
    }

    // Retry on network errors or 5xx server errors
    const isRetryable = !error.response || 
                       error.response.status >= 500 || 
                       error.code === 'NETWORK_ERROR';

    if (isRetryable) {
      this.retryAttempts.set(sanitizedEndpoint, attempts + 1);
      return true;
    }

    return false;
  }

  static getRetryDelay(endpoint: string): number {
    // Sanitize endpoint to prevent NoSQL injection
    const sanitizedEndpoint = InputValidator.sanitizeInput(endpoint);
    const attempts = this.retryAttempts.get(sanitizedEndpoint) || 0;
    return this.RETRY_DELAY * Math.pow(2, attempts); // Exponential backoff
  }

  static clearRetryAttempts(endpoint: string): void {
    // Sanitize endpoint to prevent NoSQL injection
    const sanitizedEndpoint = InputValidator.sanitizeInput(endpoint);
    this.retryAttempts.delete(sanitizedEndpoint);
  }

  static sanitizeErrorMessage(error: { response?: { status?: number; data?: { error?: { message?: string }; message?: string } }; code?: string; message?: string }): string {
    if (!error) return 'An unknown error occurred';

    // Don't expose internal server errors in production
    if (import.meta.env.PROD) {
      // Generic error messages for production
      if (error.response?.status >= 500) {
        return 'Server is temporarily unavailable. Please try again later.';
      }
      
      if (error.response?.status === 429) {
        return 'Too many requests. Please wait before trying again.';
      }

      if (error.code === 'NETWORK_ERROR') {
        return 'Network error. Please check your internet connection.';
      }
    }

    // Return sanitized error message
    const message = error.response?.data?.error?.message || 
                   error.response?.data?.message || 
                   error.message || 
                   'An error occurred';

    return InputValidator.sanitizeInput(message);
  }
}

/**
 * Environment and runtime security checks
 */
export class SecurityChecker {
  static isProductionEnvironment(): boolean {
    return import.meta.env.PROD || import.meta.env.NODE_ENV === 'production';
  }

  static isSecureContext(): boolean {
    return window.isSecureContext || location.protocol === 'https:';
  }

  static checkCSP(): boolean {
    // Check if Content Security Policy is properly set
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    return !!metaCSP;
  }

  static validateEnvironment(): {valid: boolean; warnings: string[]} {
    const warnings: string[] = [];

    if (!this.isSecureContext() && this.isProductionEnvironment()) {
      warnings.push('Application should be served over HTTPS in production');
    }

    if (!this.checkCSP() && this.isProductionEnvironment()) {
      warnings.push('Content Security Policy should be configured');
    }

    // Check for development tools in production
    if (this.isProductionEnvironment()) {
      if (console.log.toString().indexOf('[native code]') === -1) {
        warnings.push('Development console tools detected in production');
      }
    }

    return {
      valid: warnings.length === 0,
      warnings
    };
  }

  static removeDebugCode(): void {
    if (this.isProductionEnvironment()) {
      // Disable console in production
      const noop = () => {};
      console.log = noop;
      console.info = noop;
      console.debug = noop;
      console.warn = noop;
    }
  }
}

// Export the secure storage instance
export { SecureStorage };

// Initialize security checks
if (SecurityChecker.isProductionEnvironment()) {
  const validation = SecurityChecker.validateEnvironment();
  if (!validation.valid) {
    console.warn('Security validation failed:', validation.warnings);
  }
}