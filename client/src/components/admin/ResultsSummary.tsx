import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

interface OverallStats {
  total_students: number;
  completed_tests: number;
  passed_students: number;
  avg_score: number;
  avg_percentage: number;
  pass_rate: number;
}

interface GradeStats {
  grade: number;
  total_students: number;
  completed_tests: number;
  passed_students: number;
  avg_score: number;
  avg_percentage: number;
  pass_rate: number;
}

interface SectionStats {
  grade: number;
  section: string;
  total_students: number;
  completed_tests: number;
  passed_students: number;
  avg_score: number;
  pass_rate: number;
}

interface TopPerformer {
  name: string;
  roll_number: number;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
}

interface StudentResult {
  id: number;
  student_name: string;
  roll_number: number;
  grade: number;
  section: string;
  score: number;
  total_questions: number;
  percentage: number;
  started_at: string;
  completed_at: string;
  status: string;
}

interface SummaryData {
  overall: OverallStats;
  byGrade: GradeStats[];
  bySection: SectionStats[];
  topPerformers: TopPerformer[];
}

interface DetailedResult {
  question_id: number;
  question_text: string;
  difficulty: string;
  selected_option_id: number;
  selected_option_text: string;
  correct_option_id: number;
  correct_option_text: string;
  is_correct: boolean;
  options: Array<{
    id: number;
    text: string;
    is_correct: boolean;
  }>;
}

const ResultsSummary: React.FC = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [allResults, setAllResults] = useState<StudentResult[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [detailedResults, setDetailedResults] = useState<DetailedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'summary' | 'detailed'>('summary');
  const [filterGrade, setFilterGrade] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [summaryResponse, resultsResponse] = await Promise.all([
        adminService.getResultsSummary(),
        adminService.getResults()
      ]);
      setData(summaryResponse.data);
      setAllResults(resultsResponse.results || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (quizId: number) => {
    try {
      setDetailsLoading(true);
      const response = await fetch(`/api/admin/student-details/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDetailedResults(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch student details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewDetails = (student: StudentResult) => {
    setSelectedStudent(student);
    fetchStudentDetails(student.id);
  };

  const exportResults = () => {
    const csvContent = [
      ['Name', 'Roll Number', 'Grade', 'Section', 'Score', 'Total Questions', 'Percentage', 'Status', 'Completed At'].join(','),
      ...filteredResults.map(result => [
        result.student_name,
        result.roll_number,
        result.grade,
        result.section,
        result.score,
        result.total_questions,
        result.percentage,
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

  const filteredResults = allResults.filter(result => {
    const matchesGrade = filterGrade === '' || result.grade === filterGrade;
    const matchesSearch = searchTerm === '' || 
      result.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.roll_number.toString().includes(searchTerm);
    return matchesGrade && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        <button 
          onClick={fetchAllData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Student Results Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveView('summary')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'summary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveView('detailed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'detailed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Detailed Results
          </button>
          <button
            onClick={exportResults}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {activeView === 'summary' && (
        <>
          {/* Overall Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Overall Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.overall.total_students}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.overall.completed_tests}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{data.overall.passed_students}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Passed Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{data.overall.avg_score || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{data.overall.pass_rate || 0}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Grade-wise Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Grade-wise Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Completed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Passed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Avg Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.byGrade.map((grade) => (
                    <tr key={grade.grade}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        Grade {grade.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {grade.total_students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {grade.completed_tests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {grade.passed_students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {grade.avg_score || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          (grade.pass_rate || 0) >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                          (grade.pass_rate || 0) >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                        }`}>
                          {grade.pass_rate || 0}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section-wise Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Section-wise Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Grade & Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Completed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Passed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.bySection.map((section) => (
                    <tr key={`${section.grade}-${section.section}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        Grade {section.grade} - Section {section.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {section.total_students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {section.completed_tests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {section.passed_students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          (section.pass_rate || 0) >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                          (section.pass_rate || 0) >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                        }`}>
                          {section.pass_rate || 0}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Top 10 Performers</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Percentage</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.topPerformers.map((performer, index) => (
                    <tr key={`${performer.roll_number}-${performer.grade}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                          index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                          index === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                        }`}>
                          #{index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {performer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {performer.roll_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {performer.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {performer.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {performer.score}/{performer.total_questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {performer.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeView === 'detailed' && (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Grade</label>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Grades</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="11">Grade 11</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search Student</label>
                <input
                  type="text"
                  placeholder="Name or Roll Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredResults.length} of {allResults.length} results
              </div>
            </div>
          </div>

          {/* Detailed Results Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Grade/Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Completed At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.student_name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Roll: {result.roll_number}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Grade {result.grade} - {result.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {result.score}/{result.total_questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <span className={`font-semibold ${
                          result.percentage >= 72 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          result.score >= 36
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                        }`}>
                          {result.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(result.completed_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(result)}
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

          {/* Student Detail Modal */}
          {selectedStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Detailed Results: {selectedStudent.student_name}
                    </h3>
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Roll Number:</span>
                        <div className="text-gray-900 dark:text-gray-100">{selectedStudent.roll_number}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Grade/Section:</span>
                        <div className="text-gray-900 dark:text-gray-100">{selectedStudent.grade}-{selectedStudent.section}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Final Score:</span>
                        <div className="text-gray-900 dark:text-gray-100">{selectedStudent.score}/{selectedStudent.total_questions}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Percentage:</span>
                        <div className={`font-semibold ${
                          selectedStudent.percentage >= 72 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {selectedStudent.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {detailsLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Question-by-Question Analysis</h4>
                      {detailedResults.map((detail, index) => (
                        <div key={detail.question_id} className={`p-4 rounded-lg border ${
                          detail.is_correct 
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Question {index + 1} ({detail.difficulty})
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              detail.is_correct 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                            }`}>
                              {detail.is_correct ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-gray-100 mb-3">{detail.question_text}</p>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium text-gray-700 dark:text-gray-300">Student's Answer: </span>
                              <span className={detail.is_correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {detail.selected_option_text}
                              </span>
                            </div>
                            {!detail.is_correct && (
                              <div className="text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Correct Answer: </span>
                                <span className="text-green-600 dark:text-green-400">{detail.correct_option_text}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsSummary;