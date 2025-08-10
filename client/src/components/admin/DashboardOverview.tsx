import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SystemStats {
  totalStudents: number;
  totalQuestions: number;
  totalQuizzes: number;
  databaseSize: string;
  lastBackup: string;
}

interface RecentActivity {
  id: number;
  student_name: string;
  roll_number: string;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  end_time: string;
  passed: boolean;
}

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch system statistics
      const statsResponse = await axios.get('/api/admin/system-stats');
      setStats(statsResponse.data.data);

      // Fetch recent quiz attempts
      const resultsResponse = await axios.get('/api/admin/results');
      const recentResults = resultsResponse.data.data
        .sort((a: RecentActivity, b: RecentActivity) => 
          new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
        )
        .slice(0, 10);
      setRecentActivity(recentResults);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 36) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (score >= 25) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">System statistics and recent activity</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalQuestions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quiz Attempts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalQuizzes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Database Size</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.databaseSize}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Qualified Students:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {recentActivity.filter(r => r.score >= 36).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average Score:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {recentActivity.length > 0 
                  ? (recentActivity.reduce((sum, r) => sum + r.score, 0) / recentActivity.length).toFixed(1)
                  : '0'
                }/50
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pass Rate:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {recentActivity.length > 0 
                  ? ((recentActivity.filter(r => r.score >= 36).length / recentActivity.length) * 100).toFixed(1)
                  : '0'
                }%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {[6, 7, 8, 9, 11].map(grade => {
              const gradeCount = recentActivity.filter(r => r.grade === grade).length;
              return (
                <div key={grade} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Grade {grade}:</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{gradeCount}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Server Status:</span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 dark:text-green-400 font-semibold">Online</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Last Backup:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {stats ? new Date(stats.lastBackup).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Database:</span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-600 dark:text-green-400 font-semibold">Healthy</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-dark-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Quiz Attempts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Latest 10 completed quizzes</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {activity.student_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Roll: {activity.roll_number} - Section {activity.section}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {activity.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {activity.score}/{activity.total_questions}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.percentage.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreBadge(activity.score)}`}>
                      {activity.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.end_time).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {recentActivity.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No recent quiz attempts found
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;