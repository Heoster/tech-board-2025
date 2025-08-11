import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Play, User, LogOut, Clock, Target, Award } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TechnoBoard</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Ready to test your technical skills? Let's get started with your assessment.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">30 Minutes</h3>
            <p className="text-gray-600 text-sm">Test Duration</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">25 Questions</h3>
            <p className="text-gray-600 text-sm">Multiple Choice</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">72% Pass</h3>
            <p className="text-gray-600 text-sm">Minimum Score</p>
          </div>
        </div>

        {/* Main Action Card */}
        <div className="card-gradient max-w-2xl mx-auto text-center p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Assessment?
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Test your technical knowledge with questions tailored to your grade level. 
            Get instant results and detailed feedback.
          </p>
          
          <Link
            to="/test"
            className="btn btn-primary btn-lg inline-flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Test
          </Link>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Test Instructions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                Before You Start
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Ensure stable internet connection</li>
                <li>• Find a quiet environment</li>
                <li>• Have 30 minutes available</li>
                <li>• Close unnecessary applications</li>
              </ul>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                During the Test
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Read each question carefully</li>
                <li>• You can navigate between questions</li>
                <li>• Timer will show remaining time</li>
                <li>• Submit before time expires</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;