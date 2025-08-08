import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const ModernLoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    grade: '',
    section: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ensure rollNumber and grade are sent as integers
      const loginData = {
        rollNumber: parseInt(formData.rollNumber),
        grade: parseInt(formData.grade),
        section: formData.section,
        password: formData.password
      };

      console.log('Sending login data:', loginData); // Debug log

      const response = await axios.post('/auth/login', loginData);
      const { token, student } = response.data.data;
      
      login(token, { ...student, role: 'student' });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error); // Debug log
      setError(error.response?.data?.error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 transition-all duration-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transform transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                <path d="M3 17L12 22L21 17" />
                <path d="M3 12L12 17L21 12" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">TECH BOARD</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Student Portal 2025</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/register"
              className="px-4 py-2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-dark-800 transition-all duration-300 font-medium"
            >
              Register
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="card animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold gradient-text font-space mb-2">
                Student Login
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access the TECHNO BOARD test
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-6 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Roll Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Roll Number
                </label>
                <div className="relative">
                  <input
                    name="rollNumber"
                    type="number"
                    min="1"
                    max="80"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your roll number (1-80)"
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Grade
                </label>
                <select
                  name="grade"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  <option value="">Select your grade</option>
                  {[6, 7, 8, 9, 11].map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Section
                </label>
                <select
                  name="section"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                  value={formData.section}
                  onChange={handleChange}
                >
                  <option value="">Select your section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-glow text-lg py-4 font-space flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login to TECHNO BOARD</span>
                  </>
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  Register here
                </Link>
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Link 
                  to="/" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Home</span>
                </Link>
                
                <span className="text-gray-300 dark:text-gray-600">|</span>
                
                <Link 
                  to="/admin/login" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>



          {/* Info Card */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Test Information</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  After login, you'll have <strong>30 minutes</strong> to complete <strong>25 questions</strong>. 
                  Score 72% or higher to join TECHNO BOARD!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default ModernLoginForm;