import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SystemStats {
  totalStudents: number;
  totalQuestions: number;
  totalQuizzes: number;
  databaseSize: string;
  lastBackup: string;
}

interface QuizSettings {
  timeLimit: number;
  totalQuestions: number;
  passingScore: number;
  allowRetake: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

const SystemSettings: React.FC = () => {
  type TabType = 'general' | 'quiz' | 'database' | 'maintenance';
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    timeLimit: 60,
    totalQuestions: 50,
    passingScore: 36,
    allowRetake: false,
    shuffleQuestions: true,
    shuffleOptions: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSystemStats();
    fetchQuizSettings();
  }, []);

  const fetchSystemStats = async () => {
    try {
      // This would be implemented in the backend
      const response = await axios.get('/admin/system-stats');
      setSystemStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch system stats:', error);
      // Mock data for now
      setSystemStats({
        totalStudents: 150,
        totalQuestions: 1250,
        totalQuizzes: 89,
        databaseSize: '45.2 MB',
        lastBackup: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizSettings = async () => {
    try {
      // This would be implemented in the backend
      const response = await axios.get('/admin/quiz-settings');
      setQuizSettings(response.data.data);
    } catch (error) {
      console.error('Failed to fetch quiz settings:', error);
    }
  };

  const saveQuizSettings = async () => {
    setSaving(true);
    try {
      await axios.put('/admin/quiz-settings', quizSettings);
      alert('Quiz settings saved successfully');
    } catch (error) {
      console.error('Failed to save quiz settings:', error);
      alert('Failed to save quiz settings');
    } finally {
      setSaving(false);
    }
  };

  const handleBackupDatabase = async () => {
    if (!confirm('Are you sure you want to create a database backup?')) return;
    
    try {
      await axios.post('/admin/backup-database');
      alert('Database backup created successfully');
      fetchSystemStats(); // Refresh stats
    } catch (error) {
      console.error('Failed to backup database:', error);
      alert('Failed to create database backup');
    }
  };

  const handleRestoreDatabase = async () => {
    if (!confirm('Are you sure you want to restore the database? This will overwrite current data.')) return;
    
    const backupFile = prompt('Enter backup filename:');
    if (!backupFile) return;
    
    try {
      await axios.post('/admin/restore-database', { filename: backupFile });
      alert('Database restored successfully');
      fetchSystemStats(); // Refresh stats
    } catch (error) {
      console.error('Failed to restore database:', error);
      alert('Failed to restore database');
    }
  };

  const handleClearCache = async () => {
    if (!confirm('Are you sure you want to clear the system cache?')) return;
    
    try {
      await axios.post('/admin/clear-cache');
      alert('System cache cleared successfully');
    } catch (error) {
      console.error('Failed to clear cache:', error);
      alert('Failed to clear cache');
    }
  };

  const handleOptimizeDatabase = async () => {
    if (!confirm('Are you sure you want to optimize the database? This may take a few minutes.')) return;
    
    try {
      await axios.post('/admin/optimize-database');
      alert('Database optimized successfully');
      fetchSystemStats(); // Refresh stats
    } catch (error) {
      console.error('Failed to optimize database:', error);
      alert('Failed to optimize database');
    }
  };

  const tabs: Array<{ id: TabType; name: string; icon: string }> = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'quiz', name: 'Quiz Settings', icon: '📝' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧' }
  ];

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure system parameters and maintenance</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg">
        <div className="border-b border-gray-200 dark:border-dark-600">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && systemStats && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.totalStudents}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Questions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.totalQuestions}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quiz Attempts</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.totalQuizzes}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Database Size</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.databaseSize}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">System Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Server Status:</span>
                    <span className="ml-2 text-green-600 dark:text-green-400">Online</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Last Backup:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {new Date(systemStats.lastBackup).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">System Version:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">TECH BOARD 2025 v1.0</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Environment:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Production</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Settings Tab */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quiz Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="180"
                    value={quizSettings.timeLimit}
                    onChange={(e) => setQuizSettings({...quizSettings, timeLimit: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="100"
                    value={quizSettings.totalQuestions}
                    onChange={(e) => setQuizSettings({...quizSettings, totalQuestions: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Passing Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={quizSettings.totalQuestions}
                    value={quizSettings.passingScore}
                    onChange={(e) => setQuizSettings({...quizSettings, passingScore: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowRetake"
                      checked={quizSettings.allowRetake}
                      onChange={(e) => setQuizSettings({...quizSettings, allowRetake: e.target.checked})}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowRetake" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Allow Retake
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shuffleQuestions"
                      checked={quizSettings.shuffleQuestions}
                      onChange={(e) => setQuizSettings({...quizSettings, shuffleQuestions: e.target.checked})}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="shuffleQuestions" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Shuffle Questions
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shuffleOptions"
                      checked={quizSettings.shuffleOptions}
                      onChange={(e) => setQuizSettings({...quizSettings, shuffleOptions: e.target.checked})}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="shuffleOptions" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Shuffle Options
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveQuizSettings}
                  disabled={saving}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Database Tab */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Database Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">Backup Database</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Create a backup of the current database. This includes all students, questions, and quiz results.
                  </p>
                  <button
                    onClick={handleBackupDatabase}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Backup
                  </button>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">Restore Database</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Restore database from a previous backup. This will overwrite all current data.
                  </p>
                  <button
                    onClick={handleRestoreDatabase}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Restore Backup
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Database Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Tables:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">8</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Total Records:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {systemStats ? systemStats.totalStudents + systemStats.totalQuestions + systemStats.totalQuizzes : 'Loading...'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Size:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {systemStats ? systemStats.databaseSize : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Maintenance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">Clear Cache</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Clear system cache to free up memory and ensure fresh data loading.
                  </p>
                  <button
                    onClick={handleClearCache}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Clear Cache
                  </button>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">Optimize Database</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Optimize database performance by rebuilding indexes and cleaning up unused space.
                  </p>
                  <button
                    onClick={handleOptimizeDatabase}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Optimize Database
                  </button>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <h4 className="text-md font-semibold text-red-900 dark:text-red-100 mb-3">⚠️ Danger Zone</h4>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  These actions are irreversible and should be used with extreme caution.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all quiz results? This cannot be undone.')) {
                        // Implement reset quiz results
                        alert('This feature is not yet implemented');
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reset All Quiz Results
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset the entire system? This will delete ALL data.')) {
                        // Implement system reset
                        alert('This feature is not yet implemented');
                      }
                    }}
                    className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    Reset Entire System
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;