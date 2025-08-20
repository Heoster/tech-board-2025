import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle, BookOpen, Grid3X3, Eye, EyeOff } from 'lucide-react';
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

const ImprovedQuizInterface = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Initialize quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        const grade = user?.grade;
        if (!grade) {
          throw new Error('Grade information not available. Please log in again.');
        }
        
        const response = await apiClient.post<ApiResponse>('/quiz/start', {
          grade: grade
        });
        
        if (!response.data.success) {
          throw new Error(response.data.error || 'Quiz start failed');
        }

        const data = response.data.data;
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error('No quiz questions received');
        }
        
        setQuizData(data);
        setTimeLeft(50 * 60);

      } catch (error: any) {
        console.error('Failed to start quiz:', error);
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

    if (user) {
      initializeQuiz();
    } else {
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
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData]);

  // Update selected option when question changes
  useEffect(() => {
    setSelectedOption(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionId: number) => {
    setSelectedOption(optionId);
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

      const formattedAnswers = quizData.questions.map((question, index) => ({
        questionId: question.id,
        selectedOptionId: answers[index] || null
      }));

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

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowQuestionGrid(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Preparing Your Test</h3>
          <p className="text-gray-600 mb-6">Loading questions tailored for your grade...</p>
          {user && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-700 font-medium">
                <BookOpen className="inline w-5 h-5 mr-2" />
                Grade {user.grade} • {user.name}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user || !quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Required</h3>
          <p className="text-gray-600 mb-6">Please log in to access the test.</p>
          <div className="space-y-3">
            <button onClick={() => navigate('/login')} className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Go to Login
            </button>
            <button onClick={() => window.location.reload()} className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = quizData.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isTimeRunningOut = timeLeft <= 5 * 60;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tech Board Selection Test</h1>
                  <p className="text-sm text-gray-600">Grade {user.grade} • {user.name}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {answeredCount} Answered
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-mono font-bold ${
                isTimeRunningOut 
                  ? 'bg-red-100 text-red-700 border border-red-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
                {isTimeRunningOut && <span className="text-xs animate-pulse">URGENT</span>}
              </div>
              
              <button
                onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition-colors"
                title="Question Grid"
              >
                {showQuestionGrid ? <EyeOff className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="pb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {Math.round(progress)}%</span>
              <span>{answeredCount}/{questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Question Grid Overlay */}
      {showQuestionGrid && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Question Navigator</h3>
                <button
                  onClick={() => setShowQuestionGrid(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-10 gap-3">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-12 h-12 rounded-xl text-sm font-bold transition-all ${
                      index === currentQuestion
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : answers[index] !== undefined
                        ? 'bg-green-100 text-green-800 border-2 border-green-300 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Question {currentQuestion + 1}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentQ?.difficulty === 'basic' ? 'bg-green-500/20 text-green-100' :
                      currentQ?.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-100' :
                      'bg-red-500/20 text-red-100'
                    }`}>
                      {currentQ?.difficulty?.toUpperCase()}
                    </span>
                    {selectedOption && (
                      <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Answered</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Time Remaining</div>
                  <div className="text-xl font-mono font-bold">{formatTime(timeLeft)}</div>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-8">
              <div className="mb-8">
                <p className="text-xl text-gray-800 leading-relaxed font-medium">
                  {currentQ?.question_text}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQ?.options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {currentQuestion + 1} of {questions.length}
                  </span>
                  <button
                    onClick={() => handleSubmit()}
                    disabled={submitting}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50"
                  >
                    <Flag className="w-5 h-5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Test'}</span>
                  </button>
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
                <p className="text-amber-700 text-sm">
                  Test results are confidential and only visible to administration. 
                  You will be contacted directly if you qualify for the next round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImprovedQuizInterface;