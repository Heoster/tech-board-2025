import apiClient from '../utils/apiClient';

interface RegisterData {
  name: string;
  roll_number: number;
  password: string;
  grade: number;
  section: string;
}

interface LoginData {
  roll_number: number;
  password: string;
  grade: number;
  section: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginData) {
    const response = await apiClient.post('/auth/student/login', data);
    return response.data;
  },

  async adminLogin(username: string, password: string) {
    const response = await apiClient.post('/auth/admin/login', { username, password });
    return response.data;
  }
};