import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const handleStartTest = () => {
    navigate('/test');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 transition-all duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-glass dark:backdrop-blur-glass-dark border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-purple rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                  <path d="M3 17L12 22L21 17" />
                  <path d="M3 12L12 17L21 12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text font-space">TECHNO BOARD</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Welcome, {user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Grade {user?.grade} • Section {user?.section} • Roll {user?.roll_number}
                </p>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold font-space mb-4 gradient-text">
            Ready for TECHNO BOARD Selection?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Take the 50-question computer skills assessment to join the elite TECHNO BOARD community
          </p>
          
          <button
            onClick={handleStartTest}
            className="btn-glow text-xl px-12 py-4 font-space flex items-center space-x-3 mx-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Start TECHNO BOARD Test</span>
          </button>
        </div>

        {/* Test Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 font-space">50 Questions</h3>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive assessment covering computer fundamentals, programming, and digital literacy</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 font-space">30 Minutes</h3>
            <p className="text-gray-600 dark:text-gray-300">Timed assessment to evaluate your problem-solving speed and technical knowledge</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 font-space">72% to Pass</h3>
            <p className="text-gray-600 dark:text-gray-300">Score 36 out of 50 questions correctly to qualify for TECH BOARD membership</p>
          </div>
        </div>

        {/* Test Conductor Information */}
        <div className="card text-center animate-fade-in mb-8" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 font-space">Test Conductor</h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
            <p className="text-blue-800 dark:text-blue-200 font-bold text-lg">
              Pankaj Sir
            </p>
            <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
              On behalf of <span className="font-semibold">Maples Academy</span>
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This TECHNO BOARD 2025 selection test is being conducted under the supervision of Pankaj Sir from Maples Academy
          </p>
        </div>

        {/* Important Notice */}
        <div className="card text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 font-space">Important Notice</h3>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-4">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              Test results are confidential and will only be reviewed by the administration.
            </p>
          </div>
          <div className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Test responses are evaluated by admin only</p>
            <p>• No individual results will be provided to students</p>
            <p>• Contact administration for any queries about the test process</p>
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

export default Dashboard;