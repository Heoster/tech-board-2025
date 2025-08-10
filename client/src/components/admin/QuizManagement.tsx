import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QuizResult {
  id: number;
  student_name: string;
  roll_number: string;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  status: string;
  start_time: string;
  end_time: string;
  passed?: boolean;
}

interface QuestionResponse {
  question_id: number;
  question_text: string;
  selected_option_id: number | null;
  selected_option_text: string | null;
  correct_option_id: number;
  correct_option_text: string;
  is_correct: boolean;
  difficulty: string;
  options: Array<{
    id: number;
    text: string;
    is_correct: boolean;
  }>;
}

interface DetailedResult {
  student: QuizResult;
  responses: QuestionResponse[];
}

interface Analytics {
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  gradeStats: Array<{
    grade: number;
    attempts: number;
    averageScore: number;
    passRate: number;
  }>;
  difficultyStats: Array<{
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
  }>;
}

const QuizManagement: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<DetailedResult | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'percentage' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchResults();
    calculateAnalytics();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('/admin/results');
      setResults(response.data.data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = async () => {
    try {
      const response = await axios.get('/admin/results');
      const data = response.data.data;
      
      if (data.length === 0) {
        setAnalytics({
          totalAttempts: 0,
          averageScore: 0,
          passRate: 0,
          gradeStats: [],
          difficultyStats: []
        });
        return;
      }

      const totalAttempts = data.length;
      const averageScore = data.reduce((sum: number, result: QuizResult) => sum + result.score, 0) / totalAttempts;
      const passedCount = data.filter((result: QuizResult) => result.score >= 36).length;
      const passRate = (passedCount / totalAttempts) * 100;

      // Grade-wise statistics
      const gradeGroups = data.reduce((acc: Record<number, QuizResult[]>, result: QuizResult) => {
        if (!acc[result.grade]) {
          acc[result.grade] = [];
        }
        acc[result.grade].push(result);
        return acc;
      }, {});

      const gradeStats = Object.keys(gradeGroups).map(grade => {
        const gradeResults = gradeGroups[grade];
        const gradeAverage = gradeResults.reduce((sum: number, result: QuizResult) => sum + result.score, 0) / gradeResults.length;
        const gradePassed = gradeResults.filter((result: QuizResult) => result.score >= 36).length;
        const gradePassRate = (gradePassed / gradeResults.length) * 100;

        return {
          grade: parseInt(grade),
          attempts: gradeResults.length,
          averageScore: gradeAverage,
          passRate: gradePassRate
        };
      });

      setAnalytics({
        totalAttempts,
        averageScore,
        passRate,
        gradeStats,
        difficultyStats: [] // This would require more complex calculation with question data
      });
    } catch (error) {
      console.error('Failed to calculate analytics:', error);
    }
  };

  const fetchDetailedResult = async (quizId: number) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`/admin/student-details/${quizId}`);
      const student = results.find(r => r.id === quizId);
      
      if (student) {
        setSelectedResult({
          student,
          responses: response.data.data
        });
      }
    } catch (error) {
      console.error('Failed to fetch detailed result:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const exportToCSV = () => {
    const csvData = filteredAndSortedResults.map(result => ({
      'Student Name': result.student_name,
      'Roll Number': result.roll_number,
      'Grade': result.grade,
      'Section': result.section,
      'Score': result.score,
      'Total Questions': result.total_questions,
      'Percentage': result.percentage.toFixed(1),
      'Result': result.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED',
      'Start Time': new Date(result.start_time).toLocaleString(),
      'End Time': new Date(result.end_time).toLocaleString()
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_results_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = result.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.roll_number.toString().includes(searchTerm);
    const matchesGrade = filterGrade === 'all' || result.grade.toString() === filterGrade;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'qualified' && result.score >= 36) ||
                         (filterStatus === 'not_qualified' && result.score < 36);
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const filteredAndSortedResults = [...filteredResults].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'score':
        aValue = a.score;
        bValue = b.score;
        break;
      case 'percentage':
        aValue = a.percentage;
        bValue = b.percentage;
        break;
      case 'date':
        aValue = new Date(a.end_time).getTime();
        bValue = new Date(b.end_time).getTime();
        break;
      default:
        aValue = a.score;
        bValue = b.score;
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quiz Results & Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive quiz performance analysis</p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Attempts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.totalAttempts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.averageScore.toFixed(1)}/50</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pass Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics.passRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Qualified</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {results.filter(r => r.score >= 36).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade-wise Statistics */}
      {analytics && analytics.gradeStats.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Grade-wise Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-600">
                  <th className="text-left py-2 px-4 font-medium text-gray-700 dark:text-gray-300">Grade</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700 dark:text-gray-300">Attempts</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700 dark:text-gray-300">Average Score</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700 dark:text-gray-300">Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {analytics.gradeStats.map(stat => (
                  <tr key={stat.grade} className="border-b border-gray-100 dark:border-dark-700">
                    <td className="py-2 px-4 font-medium text-gray-900 dark:text-gray-100">Grade {stat.grade}</td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{stat.attempts}</td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{stat.averageScore.toFixed(1)}/50</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        stat.passRate >= 70 ? 'bg-green-100 text-green-800' :
                        stat.passRate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {stat.passRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Grade
            </label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="all">All Grades</option>
              {[6, 7, 8, 9, 11].map(grade => (
                <option key={grade} value={grade.toString()}>Grade {grade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Result
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="all">All Results</option>
              <option value="qualified">Qualified</option>
              <option value="not_qualified">Not Qualified</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'percentage' | 'date')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="score">Score</option>
              <option value="percentage">Percentage</option>
              <option value="date">Date</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-dark-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedResults.length} of {results.length} results
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {filteredAndSortedResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {result.student_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Section {result.section}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                    {result.roll_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {result.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                    {result.score}/{result.total_questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                    {result.percentage.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreBadge(result.score)}`}>
                      {result.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(result.end_time).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => fetchDetailedResult(result.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Result Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedResult.student.student_name}</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Roll Number: {selectedResult.student.roll_number}</div>
                    <div>Grade: {selectedResult.student.grade} - Section {selectedResult.student.section}</div>
                    <div>Score: {selectedResult.student.score}/{selectedResult.student.total_questions}</div>
                    <div>Result: {selectedResult.student.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="p-6 border-b border-gray-200 dark:border-dark-600">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedResult.responses.filter(r => r.is_correct).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedResult.responses.filter(r => !r.is_correct && r.selected_option_id !== null).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Wrong</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {selectedResult.responses.filter(r => r.selected_option_id === null).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unanswered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedResult.student.percentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="overflow-y-auto max-h-96 p-6">
              <h3 className="text-lg font-semibold mb-4">Question-by-Question Analysis</h3>
              <div className="space-y-4">
                {selectedResult.responses.map((response, index) => (
                  <div
                    key={response.question_id}
                    className={`border-2 rounded-xl p-4 ${
                      response.selected_option_id === null
                        ? 'border-gray-300 bg-gray-50 dark:bg-dark-700 dark:border-dark-600'
                        : response.is_correct
                        ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-600'
                        : 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Q{index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          response.difficulty === 'basic' ? 'bg-blue-100 text-blue-800' :
                          response.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {response.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {response.selected_option_id === null ? (
                          <span className="text-gray-500 text-sm">Not Answered</span>
                        ) : response.is_correct ? (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {response.question_text}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {response.options.map((option, optIndex) => (
                        <div
                          key={option.id}
                          className={`p-2 rounded-lg flex items-center space-x-2 ${
                            option.id === response.selected_option_id && option.is_correct
                              ? 'bg-green-100 dark:bg-green-900/30 border border-green-300'
                              : option.id === response.selected_option_id && !option.is_correct
                                ? 'bg-red-100 dark:bg-red-900/30 border border-red-300'
                                : option.is_correct
                                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300'
                                  : 'bg-gray-50 dark:bg-dark-700'
                          }`}
                        >
                          <span className="font-semibold text-sm">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="flex-1">{option.text}</span>
                          {option.id === response.selected_option_id && (
                            <span className="text-xs font-bold text-blue-600">SELECTED</span>
                          )}
                          {option.is_correct && (
                            <span className="text-xs font-bold text-green-600">CORRECT</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {response.selected_option_id === null && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                        Student did not answer this question
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loadingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
              <span className="text-gray-700 dark:text-gray-300">Loading detailed results...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;