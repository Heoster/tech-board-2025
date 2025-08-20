import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Results Summary
  getResultsSummary: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/results-summary`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Questions
  getQuestions: async (params?: { grade?: number; difficulty?: string; page?: number; limit?: number }) => {
    const response = await axios.get(`${API_BASE_URL}/admin/questions`, {
      headers: getAuthHeaders(),
      params
    });
    return response.data;
  },

  createQuestion: async (questionData: any) => {
    const response = await axios.post(`${API_BASE_URL}/admin/questions`, questionData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  updateQuestion: async (id: number, questionData: any) => {
    const response = await axios.put(`${API_BASE_URL}/admin/questions/${id}`, questionData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  deleteQuestion: async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/questions/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Students
  getStudents: async (grade?: number) => {
    const response = await axios.get(`${API_BASE_URL}/admin/students`, {
      headers: getAuthHeaders(),
      params: grade ? { grade } : {}
    });
    return response.data;
  },

  // Results
  getResults: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/results`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get detailed student results
  getStudentDetails: async (quizId: number) => {
    const response = await axios.get(`${API_BASE_URL}/admin/student-details/${quizId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  }
};