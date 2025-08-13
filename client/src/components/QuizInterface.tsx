import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../utils/apiClient';

interface Question {
  id: number;
  question_text: string;
  difficulty: string;
  options: Array<{
    id: number;
    text: string;
    order: number;
  }>;
}

interface QuizData {
  quizId: number;
  questions: Question[];
  timeLimit: number;
  startTime: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: QuizData;
}

const QuizInterface = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Initialize quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        console.log('Initializing quiz with user:', user);
        
        // Get grade from user context or fallback
        const grade = user?.grade;
        if (!grade) {
          console.error('No grade found in user context:', user);
          throw new Error('Grade information not available. Please log in again.');
        }
        
        console.log('Starting quiz for grade:', grade);
        
        const response = await apiClient.post<ApiResponse>('/quiz/start', {
          grade: grade
        });

        console.log('Quiz start response:', response.data);
        
        if (!response.data.success) {
          throw new Error(response.data.error || 'Quiz start failed');
        }

        const data = response.data.data;
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error('No quiz questions received');
        }
        
        setQuizData(data);
        setTimeLeft(50 * 60); // 50 minutes

        // Show warning about time limit
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);

      } catch (error: any) {
        console.error('Failed to start quiz:', error);
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           error.message || 
                           'Failed to start quiz';
        
        alert(`Quiz Error: ${errorMessage}`);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    // Only initialize if user is available
    if (user) {
      initializeQuiz();
    } else {
      console.log('Waiting for user data...');
      setLoading(false);
      navigate('/login');
    }
  }, [user, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!quizData || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit(true); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (submitting) return;

    if (!autoSubmit) {
      const unanswered = 50 - Object.keys(answers).length;
      if (unanswered > 0) {
        const confirm = window.confirm(
          `You have ${unanswered} unanswered questions. Are you sure you want to submit?`
        );
        if (!confirm) return;
      }
    }

    setSubmitting(true);

    try {
      if (!quizData) throw new Error('No quiz data');

      // Prepare answers in the expected format
      const formattedAnswers = quizData.questions.map((question, index) => ({
        questionId: question.id,
        selectedOptionId: answers[index] || null
      })).filter(answer => answer.selectedOptionId !== null);

      await apiClient.post('/quiz/submit', {
        quizId: quizData.quizId,
        answers: formattedAnswers,
        startTime: quizData.startTime
      });

      navigate('/test-submitted');
    } catch (error: any) {
      console.error('Failed to submit quiz:', error);
      alert(error.response?.data?.error || 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your test...</p>
          {user && <p className="text-sm text-gray-500 mt-2">Grade: {user.grade}</p>}
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Please log in to access the test.</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary mt-4">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load test. Please try again.</p>
          <p className="text-sm text-gray-600 mt-2">User: {user?.name} (Grade {user?.grade})</p>
          <div className="mt-4 space-x-4">
            <button onClick={() => window.location.reload()} className="btn btn-secondary">
              Retry
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = quizData.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isTimeRunningOut = timeLeft <= 5 * 60; // Last 5 minutes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Time Warning */}
      {showWarning && (
        <div className="fixed top-4 right-4 bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">50-minute time limit enforced!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Tech Board Selection Test</h1>
            <div className="badge badge-primary">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${isTimeRunningOut ? 'text-red-600' : 'text-gray-700'}`}>
              <Clock className="w-5 h-5" />
              <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              {isTimeRunningOut && <span className="text-xs">(URGENT)</span>}
            </div>
            <button
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <div className="card">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Question {currentQuestion + 1}
                    </h2>
                    <div className="flex items-center space-x-2">
                      {answers[currentQuestion] !== undefined && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <p className="text-gray-800 text-lg leading-relaxed">
                    {questions[currentQuestion]?.question_text}
                  </p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${questions[currentQuestion]?.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                        questions[currentQuestion]?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {questions[currentQuestion]?.difficulty?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-8">
                  {questions[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${answers[currentQuestion] === option.id
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[currentQuestion] === option.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                          }`}>
                          {answers[currentQuestion] === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                        <span>{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="btn btn-secondary"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>

                  <button
                    onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentQuestion === questions.length - 1}
                    className="btn btn-secondary"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Test Progress</h3>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Answered</span>
                    <span>{answeredCount}/{questions.length}</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Questions</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${index === currentQuestion
                            ? 'bg-blue-500 text-white'
                            : answers[index] !== undefined
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    <strong>Important:</strong> Results are only visible to administration.
                    You will be contacted if qualified.
                  </p>
                </div>

                <button
                  onClick={() => handleSubmit()}
                  disabled={submitting}
                  className="btn btn-primary w-full"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Test'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizInterface;