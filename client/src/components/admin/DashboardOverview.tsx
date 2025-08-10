import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

interface GradeStats {
  grade: number;
  totalStudents: number;
  completedTests: number;
  averageScore: number;
  passRate: number;
}

interface DifficultyStats {
  basic: number;
  medium: number;
  advanced: number;
}

interface SystemStats {
  totalStudents: number;
  totalQuestions: number;
  totalQuizzes: number;
  databaseSize: string;
  lastBackup: string;
  activeTests: number;
  completedTests: number;
  qualifiedStudents: number;
  averageScore: number;
  topScore: number;
  gradeStats: GradeStats[];
  difficultyStats: DifficultyStats;
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    
    try {
      // Fetch system statistics
      const statsResponse = await apiClient.get('/admin/system-stats');
      setStats((statsResponse.data as any).data);

      // Fetch recent quiz attempts
      const resultsResponse = await apiClient.get('/admin/results');
      const recentResults = ((resultsResponse.data as any).data || [])
        .sort((a: RecentActivity, b: RecentActivity) => 
          new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
        )
        .slice(0, 15);
      setRecentActivity(recentResults);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 36) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (score >= 25) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  };

  const getProgressPercentage = (current: number, total: number) => {
    return total > 0 ? Math.round((current / total) * 100) : 0;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time system statistics and student performance analytics</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Students</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{formatNumber(stats.totalStudents)}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Registered accounts</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Questions */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Question Bank</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{formatNumber(stats.totalQuestions)}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Available questions</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Tests */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Completed Tests</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-1">{formatNumber(stats.completedTests || stats.totalQuizzes)}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Test submissions</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Qualified Students */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 shadow-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Qualified Students</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100 mt-1">{formatNumber((recentActivity || []).filter(r => r.score >= 36).length)}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Score ≥ 72%</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Summary */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Performance Overview</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Qualified Students */}
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Qualified Students</span>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {(recentActivity || []).filter(r => r.score >= 36).length}
              </span>
            </div>
            
            {/* Average Score */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Score</span>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {(recentActivity || []).length > 0 
                  ? (recentActivity.reduce((sum, r) => sum + r.score, 0) / recentActivity.length).toFixed(1)
                  : '0'
                }/50
              </span>
            </div>
            
            {/* Pass Rate with Progress Bar */}
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pass Rate</span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {(recentActivity || []).length > 0 
                    ? (((recentActivity || []).filter(r => r.score >= 36).length / recentActivity.length) * 100).toFixed(1)
                    : '0'
                  }%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(recentActivity || []).length > 0 
                      ? (((recentActivity || []).filter(r => r.score >= 36).length / recentActivity.length) * 100)
                      : 0
                    }%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Grade Distribution</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            {[6, 7, 8, 9, 11].map((grade, index) => {
              const gradeCount = (recentActivity || []).filter(r => r.grade === grade).length;
              const maxCount = Math.max(...[6, 7, 8, 9, 11].map(g => (recentActivity || []).filter(r => r.grade === g).length));
              const percentage = maxCount > 0 ? (gradeCount / maxCount) * 100 : 0;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];
              
              return (
                <div key={grade} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Grade {grade}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{gradeCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${colors[index]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Health</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Server Status */}
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Server Status</span>
              </div>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">Online</span>
            </div>
            
            {/* Database */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Database</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">Healthy</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stats?.databaseSize || 'N/A'}</div>
              </div>
            </div>
            
            {/* Last Backup */}
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Backup</span>
              </div>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                {stats ? new Date(stats.lastBackup).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-600">
        <div className="p-6 border-b border-gray-200 dark:border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Test Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest 15 completed assessments with detailed performance metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {(recentActivity || []).map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {activity.student_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {activity.student_name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Roll: {activity.roll_number} • Section {activity.section}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Grade {activity.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {activity.score}/{activity.total_questions}
                          </span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {activity.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              activity.score >= 36 ? 'bg-green-500' : 
                              activity.score >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${activity.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold ${getScoreBadge(activity.score)}`}>
                        {activity.score >= 36 ? (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            QUALIFIED
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            NOT QUALIFIED
                          </>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {new Date(activity.end_time).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.end_time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {(recentActivity || []).length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Test Results Yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Recent quiz attempts will appear here once students start taking tests.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;