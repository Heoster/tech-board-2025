import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Student {
  id: number;
  name: string;
  roll_number: string;
  grade: number;
  section: string;
  registration_date: string;
  quiz_id: number | null;
  score: number | null;
  total_questions: number | null;
  passed: boolean | null;
  start_time: string | null;
  end_time: string | null;
  quiz_status: string | null;
  percentage: number | null;
  exam_status: 'not_started' | 'in_progress' | 'completed' | 'unknown';
}

interface StudentResult {
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
  student: StudentResult;
  responses: QuestionResponse[];
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<DetailedResult | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'completed'>('all');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students with exam status
        const studentsResponse = await axios.get('/admin/students');
        setStudents(studentsResponse.data.data);
        
        // Fetch completed results for detailed view
        const resultsResponse = await axios.get('/admin/results');
        setResults(resultsResponse.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fetchStudentDetails = async (student: Student | StudentResult) => {
    setLoadingDetails(true);
    try {
      // For Student type, use quiz_id, for StudentResult type, use id
      const quizId = 'quiz_id' in student ? student.quiz_id : student.id;
      
      if (!quizId) {
        console.error('No quiz found for this student');
        return;
      }
      
      const response = await axios.get(`/admin/student-details/${quizId}`);
      
      // Convert Student to StudentResult format if needed
      const studentResult: StudentResult = 'quiz_id' in student ? {
        id: student.quiz_id!,
        student_name: student.name,
        roll_number: student.roll_number,
        grade: student.grade,
        section: student.section,
        score: student.score!,
        total_questions: student.total_questions!,
        percentage: student.percentage!,
        status: student.quiz_status!,
        start_time: student.start_time!,
        end_time: student.end_time!,
        passed: student.passed ?? undefined
      } : student;
      
      setSelectedStudent({
        student: studentResult,
        responses: response.data.data
      });
    } catch (error) {
      console.error('Failed to fetch student details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-500 dark:text-gray-400';
    if (score >= 18) return 'text-green-600 dark:text-green-400'; // TECH BOARD 2025: 18+ out of 25
    if (score >= 12) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadge = (score: number | null) => {
    if (score === null) return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    if (score >= 18) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (score >= 12) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  };

  const getExamStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'in_progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'not_started':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
    }
  };

  const getExamStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'COMPLETED';
      case 'in_progress':
        return 'IN PROGRESS';
      case 'not_started':
        return 'NOT STARTED';
      default:
        return 'UNKNOWN';
    }
  };

  // Filter data based on view mode and grade
  const filteredData = viewMode === 'all' ? students : results;
  const filteredByGrade = selectedGrade === 'all'
    ? filteredData
    : filteredData.filter(item => item.grade.toString() === selectedGrade);

  // Calculate statistics
  const totalStudents = students.length;
  const completedCount = students.filter(s => s.exam_status === 'completed').length;
  const qualifiedCount = students.filter(s => s.score !== null && s.score >= 18).length;
  const notStartedCount = students.filter(s => s.exam_status === 'not_started').length;

  // Detailed Student View Component
  const StudentDetailModal = () => {
    if (!selectedStudent) return null;

    const { student, responses } = selectedStudent;
    const correctAnswers = responses.filter(r => r.is_correct).length;
    const wrongAnswers = responses.filter(r => !r.is_correct && r.selected_option_id !== null).length;
    const unanswered = responses.filter(r => r.selected_option_id === null).length;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{student.student_name}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Roll Number: {student.roll_number}</div>
                  <div>Grade: {student.grade} - Section {student.section}</div>
                  <div>Score: {student.score}/25</div>
                  <div>Status: {student.score >= 18 ? 'QUALIFIED' : 'NOT QUALIFIED'}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
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
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{wrongAnswers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Wrong</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{unanswered}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Unanswered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{student.percentage}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="overflow-y-auto max-h-96 p-6">
            <h3 className="text-lg font-semibold mb-4">Question-by-Question Analysis</h3>
            <div className="space-y-4">
              {responses.map((response, index) => (
                <div
                  key={response.question_id}
                  className={`border-2 rounded-xl p-4 ${response.selected_option_id === null
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
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${response.difficulty === 'basic' ? 'bg-blue-100 text-blue-800' :
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
                        className={`p-2 rounded-lg flex items-center space-x-2 ${option.id === response.selected_option_id && option.is_correct
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 transition-all duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-glass dark:backdrop-blur-glass-dark border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                  <path d="M3 17L12 22L21 17" />
                  <path d="M3 12L12 17L21 12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text font-space">TECH BOARD 2025 Admin</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Results Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin: {user?.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Results Management</p>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalStudents}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Registered</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</h3>
            <p className="text-gray-600 dark:text-gray-400">Completed Exam</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{qualifiedCount}</h3>
            <p className="text-gray-600 dark:text-gray-400">Qualified (18+/25)</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">{notStartedCount}</h3>
            <p className="text-gray-600 dark:text-gray-400">Not Started</p>
          </div>

          <div className="card text-center hover:scale-105 transform transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {completedCount > 0 ? Math.round((qualifiedCount / completedCount) * 100) : 0}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>
        </div>

        {/* Filter and Results */}
        <div className="card animate-slide-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold font-space gradient-text mb-4 sm:mb-0">
              TECH BOARD 2025 Student Management
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</label>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as 'all' | 'completed')}
                  className="px-3 py-2 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Students</option>
                  <option value="completed">Completed Only</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Grade:</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-dark-700 border-2 border-gray-200 dark:border-dark-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Grades</option>
                  {[6, 7, 8, 9, 11].map(grade => (
                    <option key={grade} value={grade.toString()}>Grade {grade}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-glow">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Loading data...</p>
            </div>
          ) : filteredByGrade.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-dark-600">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Student</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Roll No.</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Grade</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Exam Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Score</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Result</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredByGrade.map((item) => {
                    // Handle both Student and StudentResult types
                    const isStudent = 'exam_status' in item;
                    const student = isStudent ? item as Student : null;
                    const result = !isStudent ? item as StudentResult : null;
                    
                    const name = student ? student.name : result!.student_name;
                    const rollNumber = student ? student.roll_number : result!.roll_number;
                    const grade = student ? student.grade : result!.grade;
                    const section = student ? student.section : result!.section;
                    const examStatus = student ? student.exam_status : 'completed';
                    const score = student ? student.score : result!.score;
                    const totalQuestions = student ? student.total_questions : result!.total_questions;
                    const date = student ? 
                      (student.end_time ? new Date(student.end_time).toLocaleDateString() : new Date(student.registration_date).toLocaleDateString()) :
                      new Date(result!.start_time).toLocaleDateString();
                    
                    return (
                      <tr key={student ? `student-${student.id}` : `result-${result!.id}`} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">{name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Section {section}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono text-gray-900 dark:text-gray-100">{rollNumber}</td>
                        <td className="py-4 px-4 text-gray-900 dark:text-gray-100">{grade}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getExamStatusBadge(examStatus)}`}>
                            {getExamStatusText(examStatus)}
                          </span>
                        </td>
                        <td className={`py-4 px-4 font-bold ${getScoreColor(score)}`}>
                          {score !== null && totalQuestions !== null ? `${score}/${totalQuestions}` : '-'}
                        </td>
                        <td className="py-4 px-4">
                          {score !== null ? (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getScoreBadge(score)}`}>
                              {score >= 18 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                            </span>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {date}
                        </td>
                        <td className="py-4 px-4">
                          {examStatus === 'completed' ? (
                            <button
                              onClick={() => fetchStudentDetails(item)}
                              disabled={loadingDetails}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                              {loadingDetails ? 'Loading...' : 'View Details'}
                            </button>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm italic">
                              {examStatus === 'not_started' ? 'Not started' : 'In progress'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">No Data Found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {viewMode === 'all' ? 'No students registered yet.' : 'No students have completed the test yet.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Student Detail Modal */}
      <StudentDetailModal />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
