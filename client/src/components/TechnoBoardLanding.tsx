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

        {/* Database Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="card text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,590</div>
            <div className="text-gray-600 dark:text-gray-400">Total Questions</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">5</div>
            <div className="text-gray-600 dark:text-gray-400">Grade Levels</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50</div>
            <div className="text-gray-600 dark:text-gray-400">Questions per Test</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">50</div>
            <div className="text-gray-600 dark:text-gray-400">Minutes Duration</div>
          </div>
        </div>

        {/* Grade-wise Topics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Topics by Grade Level</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Grade 6 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">6</div>
                <div>
                  <h3 className="text-xl font-bold">Grade 6 (345 Questions)</h3>
                  <p className="text-gray-600 dark:text-gray-400">Basic Computer Fundamentals</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Computer Parts (CPU, Monitor)', 'Input & Output Devices', 'Software Types', 'Storage Devices', 'Desktop Elements', 'Keyboard Shortcuts', 'Computer Uses', 'Digital Safety'].map((topic, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade 7 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">7</div>
                <div>
                  <h3 className="text-xl font-bold">Grade 7 (330 Questions)</h3>
                  <p className="text-gray-600 dark:text-gray-400">Internet & Programming Basics</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Computer Types', 'Operating Systems', 'Internet & Browsers', 'Email Basics', 'File Extensions', 'Cyber Safety', 'Programming Intro', 'Binary Numbers'].map((topic, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade 8 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">8</div>
                <div>
                  <h3 className="text-xl font-bold">Grade 8 (180 Questions)</h3>
                  <p className="text-gray-600 dark:text-gray-400">Logic & Web Development</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Computer Memory', 'Networking Basics', 'Cloud Computing', 'HTML Basics', 'Flowcharts', 'Cyber Ethics', 'Database Intro', 'Open Source Software'].map((topic, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade 9 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">9</div>
                <div>
                  <h3 className="text-xl font-bold">Grade 9 (365 Questions)</h3>
                  <p className="text-gray-600 dark:text-gray-400">Programming & Data Systems</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Computer Architecture', 'Number Systems', 'Boolean Logic', 'Operating Systems', 'Networking (TCP/IP)', 'Internet Technologies', 'Cybersecurity', 'Database Concepts'].map((topic, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grade 11 */}
          <div className="card max-w-2xl mx-auto mt-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">11</div>
              <div>
                <h3 className="text-xl font-bold">Grade 11 (370 Questions)</h3>
                <p className="text-gray-600 dark:text-gray-400">Advanced Programming & Systems</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Python Programming', 'Data Structures', 'File Handling', 'SQL & RDBMS', 'Boolean Algebra', 'Advanced Networking', 'Cyber Ethics', 'Technology Impact'].map((topic, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
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

        {/* Test Instructions */}
        <div className="card max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Test Instructions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📋 Test Format</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>50 Multiple Choice Questions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>50 Minutes Time Limit</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Questions from Your Grade Level</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Instant Result Display</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">✅ Qualification</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Minimum 36/50 (72%) to Pass</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>TECHNO BOARD Membership</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Certificate of Achievement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Advanced Workshop Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Levels */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Question Difficulty Distribution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📗</span>
              </div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Basic Level</h3>
              <p className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">830 Questions</p>
              <p className="text-sm text-green-600 dark:text-green-400">Fundamental concepts and definitions</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📙</span>
              </div>
              <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">Medium Level</h3>
              <p className="text-yellow-600 dark:text-yellow-400 text-lg font-semibold mb-2">510 Questions</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Application and analysis based</p>
            </div>
            <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📕</span>
              </div>
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Advanced Level</h3>
              <p className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">250 Questions</p>
              <p className="text-sm text-red-600 dark:text-red-400">Complex problem solving</p>
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

export default TechnoBoardLanding;