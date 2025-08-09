import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div 
    className="animate-float" 
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const TechnoBoardLanding: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
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

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 transition-all duration-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-128 h-128 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                  <path d="M3 17L12 22L21 17" />
                  <path d="M3 12L12 17L21 12" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">TECH BOARD</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-semibold">Selection System 2025</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Maples Academy Official</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 dark:text-green-300 font-medium text-sm">System Online</span>
            </div>
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
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <FloatingElement>
            <div className="mb-8">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full text-white font-bold text-xl shadow-2xl animate-bounce-soft border-4 border-white/20">
                <span className="text-2xl mr-3">🚀</span>
                TECH BOARD Selection 2025
                <span className="text-2xl ml-3">⭐</span>
              </div>
            </div>
          </FloatingElement>
          
          <FloatingElement delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-bold font-space mb-6 gradient-text text-shadow-lg">
              Join the Future
            </h1>
          </FloatingElement>
          
          <FloatingElement delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              Prove your <span className="font-semibold gradient-text">Computer Skills</span> and become part of the elite 
              <span className="font-bold text-primary-600 dark:text-primary-400"> TECHNO BOARD</span> community
            </p>
            
            {/* Test Conductor Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">Test Conductor</h3>
              </div>
              <p className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                <span className="text-blue-900 dark:text-blue-100">Pankaj Sir</span>
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                On behalf of <span className="font-semibold">Maples Academy</span>
              </p>
            </div>
          </FloatingElement>

          {/* Login Required Notice */}
          <FloatingElement delay={0.6}>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Authentication Required</h3>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                You must <strong>login with your student credentials</strong> before taking the TECHNO BOARD selection test
              </p>
            </div>
          </FloatingElement>
        </div>

        {/* Test Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FloatingElement delay={0.8}>
            <div className="card text-center hover:scale-105 transform transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                  <path d="M3 17L12 22L21 17" />
                  <path d="M3 12L12 17L21 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-space">50 Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive computer skills assessment covering all essential topics</p>
            </div>
          </FloatingElement>

          <FloatingElement delay={1.0}>
            <div className="card text-center hover:scale-105 transform transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-space">30 Minutes</h3>
              <p className="text-gray-600 dark:text-gray-300">Timed assessment to evaluate your problem-solving speed and accuracy</p>
            </div>
          </FloatingElement>

          <FloatingElement delay={1.2}>
            <div className="card text-center hover:scale-105 transform transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-space">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional assessment with secure result processing</p>
            </div>
          </FloatingElement>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleLoginClick}
              className="btn-glow text-xl px-12 py-4 font-space flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Student Login</span>
            </button>
            
            <button
              onClick={handleRegisterClick}
              className="btn-secondary text-xl px-12 py-4 font-space flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>New Registration</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account? Register first, then login to take the test
          </p>
        </div>

        {/* Selection Criteria */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-space gradient-text">
            TECHNO BOARD Selection Criteria
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">Test Topics</h3>
              <div className="space-y-3">
                {[
                  'Computer Fundamentals',
                  'Programming Concepts',
                  'Digital Literacy',
                  'Problem Solving',
                  'Technology Trends',
                  'Logical Reasoning'
                ].map((topic, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Selection Benefits</h3>
              <div className="space-y-3">
                {[
                  'TECHNO BOARD Membership',
                  'Advanced Tech Workshops',
                  'Coding Competitions',
                  'Industry Mentorship',
                  'Project Opportunities',
                  'Recognition Status'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
            <div className="flex items-center space-x-3 mb-3">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className="text-lg font-semibold text-primary-800 dark:text-primary-200">Passing Score</h4>
            </div>
            <p className="text-primary-700 dark:text-primary-300">
              Score <strong>36 out of 50 questions (72%)</strong> or higher to qualify for TECHNO BOARD membership
            </p>
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

export default TechnoBoardLanding;