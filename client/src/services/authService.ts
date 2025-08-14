import apiClient from '../utils/apiClient';

interface RegisterData {
  name: string;
  rollNumber: number;
  password: string;
  grade: number;
  section: string;
}

interface LoginData {
  rollNumber: number;
  password: string;
  grade: number;
  section: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', {
      name: data.name,
      roll_number: data.rollNumber,
      password: data.password,
      grade: data.grade,
      section: data.section
    });
    return response.data;
  },

  async login(data: LoginData) {
    const response = await apiClient.post('/auth/student/login', {
      roll_number: data.rollNumber,
      password: data.password,
      grade: data.grade,
      section: data.section
    });
    return response.data;
  },

  async adminLogin(username: string, password: string) {
    const response = await apiClient.post('/auth/admin/login', { username, password });
    return response.data;
  }
};