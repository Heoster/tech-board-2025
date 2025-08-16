import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../utils/apiClient';
import type { AuthResponse } from '../../types/auth';

// Type-safe Link wrapper
const SafeLink: React.FC<{ to: string; className?: string; children: React.ReactNode }> = ({ to, className, children }) => {
  const LinkComponent = Link as any;
  return (
    <LinkComponent to={to} className={className}>
      {children}
    </LinkComponent>
  );
};

interface LoginApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    }
  }
  message?: string
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    grade: '',
    section: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Convert form data to match server expectations
      const loginData = {
        rollNumber: parseInt(formData.rollNumber),
        grade: parseInt(formData.grade),
        section: formData.section,
        password: formData.password
      }
      
      const response = await apiClient.post('/auth/student/login', loginData)
      
      // Handle the actual server response format
      const responseData = response.data as AuthResponse
      
      if (responseData.success && responseData.data) {
        const { token, user } = responseData.data;
        
        // Map server response fields to AuthContext expected fields
        const userForAuth = {
          id: user.id,
          role: 'student' as const,
          name: user.name,
          rollNumber: user.rollNumber,
          grade: user.grade,
          section: user.section
        };
        
        login(token, userForAuth);
      } else {
        throw new Error(responseData.error || responseData.message || 'Login failed');
      }
      navigate('/dashboard')
    } catch (error: unknown) {
      const apiError = error as LoginApiError;
      const errorMessage = apiError.response?.data?.error || 
                         apiError.response?.data?.message || 
                         apiError.message || 
                         'Login failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <SafeLink to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              register for a new account
            </SafeLink>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="rollNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                name="grade"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">Select Grade</option>
                {[6, 7, 8, 9, 11].map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="section"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={formData.section}
                onChange={handleChange}
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <SafeLink to="/admin/login" className="text-sm text-gray-600 hover:text-gray-900">
              Admin Login
            </SafeLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm