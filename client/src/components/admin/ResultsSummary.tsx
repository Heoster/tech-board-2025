import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

interface QuizResult {
  id: number;
  student_name: string;
  roll_number: string;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  started_at: string;
  completed_at: string;
  status: string;
}

interface DetailedAnswer {
  question_id: number;
  question_text: string;
  difficulty: string;
  selected_option_text: string;
  correct_option_text: string;
  is_correct: boolean;
}

const ResultsSummary: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizResult | null>(null);
  const [detailedAnswers, setDetailedAnswers] = useState<DetailedAnswer[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await apiClient.get('/admin/results');
      setResults((response.data as any)?.data || []);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailedAnswers = async (quizId: number) => {
    try {
      const response = await apiClient.get(`/students/quiz/${quizId}/details`);
      setDetailedAnswers((response.data as any)?.data || []);
    } catch (error) {
      console.error('Failed to fetch detailed answers:', error);
    }
  };

  const handleViewDetails = async (quiz: QuizResult) => {
    setSelectedQuiz(quiz);
    setShowDetailModal(true);
    await fetchDetailedAnswers(quiz.id);
  };

  const exportResults = () => {
    const csvContent = [
      ['Student Name', 'Roll Number', 'Grade', 'Section', 'Score', 'Total', 'Percentage', 'Status', 'Completed At'].join(','),
      ...filteredResults.map(result => [
        result.student_name,
        result.roll_number,
        result.grade,
        result.section,
        result.score,
        result.total_questions,
        `${result.percentage}%`,
        result.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED',
        new Date(result.completed_at).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-board-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = result.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.roll_number.includes(searchTerm);
    const matchesGrade = filterGrade === 'all' || result.grade.toString() === filterGrade;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'qualified' && result.score >= 36) ||
                         (filterStatus === 'not_qualified' && result.score < 36);
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const getStatusBadge = (score: number) => {
    if (score >= 36) return 'bg-green-100 text-green-800';
    if (score >= 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getGradeStats = () => {
    const stats: { [key: number]: { total: number; qualified: number } } = {};
    
    results.forEach(result => {
      if (!stats[result.grade]) {
        stats[result.grade] = { total: 0, qualified: 0 };
      }
      stats[result.grade].total++;
      if (result.score >= 36) {
        stats[result.grade].qualified++;
      }
    });
    
    return stats;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const gradeStats = getGradeStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Results Summary</h2>
          <p className="text-gray-600">Comprehensive view of all student test results</p>
        </div>
        <button
          onClick={exportResults}
          className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Grade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(gradeStats).map(([grade, stats]) => (
          <div key={grade} className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grade {grade}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Qualified:</span>
                <span className="font-medium text-green-600">{stats.qualified}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Rate:</span>
                <span className="font-medium">
                  {stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Grade
            </label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Grades</option>
              {[6, 7, 8, 9, 11].map(grade => (
                <option key={grade} value={grade.toString()}>Grade {grade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Results</option>
              <option value="qualified">Qualified (≥72%)</option>
              <option value="not_qualified">Not Qualified (&lt;72%)</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing {filteredResults.length} of {results.length} results
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {result.student_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Section {result.section}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {result.roll_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.score}/50
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(result.score)}`}>
                      {result.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(result.completed_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(result)}
                      className="text-blue-600 hover:text-blue-900"
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

      {/* Detailed Results Modal */}
      {showDetailModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Detailed Results: {selectedQuiz.student_name}
                </h3>
                <p className="text-gray-600">
                  Roll: {selectedQuiz.roll_number} | Grade: {selectedQuiz.grade} | 
                  Score: {selectedQuiz.score}/50 ({selectedQuiz.percentage}%)
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {detailedAnswers.map((answer, index) => (
                <div key={answer.question_id} className={`p-4 rounded-lg border ${answer.is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Q{index + 1} ({answer.difficulty.toUpperCase()})
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${answer.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {answer.is_correct ? 'CORRECT' : 'INCORRECT'}
                    </span>
                  </div>
                  
                  <p className="text-gray-900 font-medium mb-3">
                    {answer.question_text}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Student Answer:</span>
                      <p className={`mt-1 p-2 rounded ${answer.is_correct ? 'bg-green-100' : 'bg-red-100'}`}>
                        {answer.selected_option_text}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Correct Answer:</span>
                      <p className="mt-1 p-2 rounded bg-green-100">
                        {answer.correct_option_text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSummary;