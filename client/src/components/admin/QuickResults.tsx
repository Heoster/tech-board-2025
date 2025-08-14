import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

interface Result {
  id: number;
  student_name: string;
  roll_number: number;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
}

const QuickResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await apiClient.get('/admin/results');
      setResults(response.data.results || []);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Results</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{results.length} students</span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {results.slice(0, 10).map((result) => (
          <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {result.student_name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Roll: {result.roll_number} | Grade {result.grade}-{result.section}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {result.score}/50
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                result.score >= 36 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
              }`}>
                {result.score >= 36 ? 'PASS' : 'FAIL'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickResults;