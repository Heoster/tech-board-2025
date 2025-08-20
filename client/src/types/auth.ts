export interface User {
  id: number;
  role: 'student' | 'admin';
  name?: string;
  rollNumber?: number;
  grade?: number;
  section?: string;
  username?: string;
  email?: string;
}

export interface LoginCredentials {
  rollNumber: number;
  password: string;
  grade: number;
  section: string;
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  rollNumber: number;
  password: string;
  grade: number;
  section: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  error?: string;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}