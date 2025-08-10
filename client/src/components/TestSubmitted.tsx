import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TestSubmitted: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 dark:from-green-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 dark:border-green-800">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-t-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-black">🎉 TEST SUBMITTED SUCCESSFULLY!</h1>
                <p className="text-green-100 text-lg">TECH BOARD 2025 Selection Test - Grade {user?.grade}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4">
                Congratulations!
              </h2>
              <p className="text-lg text-green-700 dark:text-green-300 mb-2">
                Your TECH BOARD 2025 selection test has been submitted successfully.
              </p>
              <p className="text-green-600 dark:text-green-400">
                Your responses have been recorded and will be evaluated by our team.
              </p>
            </div>

            {/* Student Information */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                📋 Submission Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-200">Student: {user?.name}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">Roll Number: {user?.rollNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-200">Grade: {user?.grade}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">Section: {user?.section}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-200">Submitted: {new Date().toLocaleString()}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">Test completed successfully</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-800 dark:text-purple-200">Status: Under Review</p>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">Results will be announced</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                📢 Important Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Results Processing</h4>
                    <p className="text-yellow-700 dark:text-yellow-300">Your test responses are being evaluated. Results will be processed and announced according to the TECH BOARD 2025 schedule.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">No Retakes Allowed</h4>
                    <p className="text-yellow-700 dark:text-yellow-300">This was your official attempt for the TECH BOARD 2025 selection test. No additional attempts are permitted.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Stay Updated</h4>
                    <p className="text-yellow-700 dark:text-yellow-300">Keep checking your dashboard and official announcements for result updates and further instructions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">
                🙏 Thank You for Participating!
              </h3>
              <p className="text-lg text-purple-700 dark:text-purple-300 mb-4">
                You have successfully completed the TECH BOARD 2025 selection test. We appreciate your dedication and effort.
              </p>
              <p className="text-purple-600 dark:text-purple-400">
                Best of luck with your results! We hope to see you as part of the TECH BOARD 2025 team.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={handleBackToDashboard}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>← Back to Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubmitted;