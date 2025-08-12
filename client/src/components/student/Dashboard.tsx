import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Simple SVG icon components
const BookOpen = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const Play = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PlayLarge = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const User = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogOut = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>;
const Clock = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Target = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Award = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;

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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
              <BookOpen />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tech Board</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User />
              <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost"
            >
              <div className="mr-2">
                <LogOut />
              </div>
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
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Clock />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">50 Minutes</h3>
            <p className="text-gray-600 text-sm">Strict Time Limit</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600">
              <Target />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">50 Questions</h3>
            <p className="text-gray-600 text-sm">All Must Be Attempted</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600">
              <Award />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Admin Review</h3>
            <p className="text-gray-600 text-sm">Results Private</p>
          </div>
        </div>

        {/* Main Action Card */}
        <div className="card-gradient max-w-2xl mx-auto text-center p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
            <PlayLarge />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Assessment?
          </h3>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Complete all 50 questions within 50 minutes. Results will be reviewed by administration.
            Only qualified candidates will be notified for Tech Board membership.
          </p>

          <Link
            to="/test"
            className="btn btn-primary btn-lg inline-flex items-center"
          >
            <div className="mr-2">
              <Play />
            </div>
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
                <li>• Have exactly 50 minutes available</li>
                <li>• Close unnecessary applications</li>
                <li>• Test can only be taken once</li>
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
                <li>• Answer all 50 questions</li>
                <li>• You can navigate between questions</li>
                <li>• Timer will show remaining time</li>
                <li>• Auto-submit when time expires</li>
                <li>• Results visible to admin only</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;