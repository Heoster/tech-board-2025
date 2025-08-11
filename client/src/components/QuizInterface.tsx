import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../utils/apiClient';
import { InputValidator } from '../utils/security';

interface Question {
  id: number;
  question_text: string;
  options: Array<{
    id: number;
    option_text: string;
    is_correct: boolean;
  }>;
  explanation?: string;
}

interface ApiError {
  response?: {
    data?: {
      error?: {
        message?: string
        details?: Array<{ msg: string }>
      }
      message?: string
    }
    status?: number
  }
  message?: string
  code?: string
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  timeRemaining: number;
  isSubmitted: boolean;
  quizId: number | null;
}

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar mb-6">
      <div
        className="progress-fill relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute right-2 top-0 h-full flex items-center">
          <span className="text-xs font-semibold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

const Timer = ({ timeRemaining }: { timeRemaining: number }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining < 300; // 5 minutes

  return (
    <div className={`
      flex items-center space-x-2 px-4 py-2 rounded-xl font-mono font-semibold
      ${isLowTime
        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse'
        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      }
    `}>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
};

const OptionButton = ({
  option,
  index,
  isSelected,
  isCorrect,
  isWrong,
  showResult,
  onClick
}: {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  showResult: boolean;
  onClick: () => void;
}) => {
  const getButtonClass = () => {
    if (showResult) {
      if (isCorrect) return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300';
      if (isWrong) return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300';
    }

    if (isSelected) {
      return 'bg-primary-100 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-300 shadow-glow';
    }

    return 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20';
  };

  return (
    <button
      onClick={onClick}
      disabled={showResult}
      className={`
        w-full p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-[1.02]
        focus:outline-none focus:ring-4 focus:ring-primary-300/50 dark:focus:ring-primary-800/50
        ${getButtonClass()}
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
          ${isSelected || showResult
            ? 'bg-current text-white'
            : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
          }
        `}>
          {String.fromCharCode(65 + index)}
        </div>
        <span className="flex-1 font-medium">{option}</span>
        {showResult && isCorrect && (
          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        {showResult && isWrong && (
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
};

const QuizInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [agreeToSubmit, setAgreeToSubmit] = useState(false);

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: new Array(50).fill(null), // 50 questions
    timeRemaining: 3000, // 50 minutes (50 * 60 seconds)
    isSubmitted: false,
    quizId: null
  });

  // Removed explanation functionality for TECH BOARD 2025 - students should not see explanations

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  // Fetch questions and start quiz (only after instructions are accepted)
  useEffect(() => {
    const startQuiz = async () => {
      if (!user || showInstructions) return;

      try {
        setLoading(true);
        setError('');

        console.log('🚀 Starting quiz for grade:', user.grade);
        const response = await apiClient.get(`/quiz/start/${user.grade}`);

        console.log('📊 Quiz response:', response.data);

        if (!response.data.success) {
          throw new Error(response.data.error?.message || 'Quiz generation failed');
        }

        const { quizId, questions: fetchedQuestions, totalQuestions, timeLimit } = response.data.data;

        console.log('🎯 Quiz started - received quizId:', quizId, 'type:', typeof quizId);
        console.log('📝 Questions received:', fetchedQuestions.length);
        console.log('🔍 Sample question:', fetchedQuestions[0]);

        if (!fetchedQuestions || fetchedQuestions.length === 0) {
          throw new Error('No questions available for your grade. Please contact administrator.');
        }

        // Validate questions have options
        const invalidQuestions = fetchedQuestions.filter(q => !q.options || q.options.length === 0);
        if (invalidQuestions.length > 0) {
          console.warn('⚠️ Found questions without options:', invalidQuestions.length);
        }

        setQuestions(fetchedQuestions);
        setQuizState(prev => ({
          ...prev,
          quizId: quizId,
          answers: new Array(totalQuestions).fill(null),
          // Use server-provided timeLimit or fallback to 30 minutes
          timeRemaining: timeLimit || 1800
        }));

        console.log('🎯 QuizState updated with quizId:', quizId, 'type:', typeof quizId);
        console.log('✅ Quiz initialized successfully');
      } catch (error: unknown) {
        console.error('❌ Quiz start error:', error);
        const apiError = error as ApiError;
        const errorMessage = apiError.response?.data?.error?.message ||
          apiError.response?.data?.message ||
          apiError.message ||
          'Failed to start quiz. Please try again.';
        setError(InputValidator.sanitizeInput(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    startQuiz();
  }, [user, showInstructions]);

  // Timer effect
  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isSubmitted) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearTimeout(timer);
    } else if (quizState.timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [quizState.timeRemaining, quizState.isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.isSubmitted) return;

    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const handleSubmitQuiz = async (retryCount = 0) => {
    if (!quizState.quizId) {
      setError('Quiz ID not found. Please refresh and try again.');
      return;
    }

    setQuizState(prev => ({ ...prev, isSubmitted: true }));
    setShowSubmitModal(false);
    setError(''); // Clear any previous errors

    try {
      // Submit quiz responses - ensure proper data types
      const responses = quizState.answers.map((answer, index) => ({
        questionId: questions[index].id, // Already a number from interface
        selectedOptionId: answer !== null ? questions[index].options[answer].id : null
      }));

      // Filter out any invalid responses
      const validResponses = responses.filter(r => r.questionId && typeof r.questionId === 'number');

      // Debug logging
      console.log('🔍 Quiz submission data validation:');
      console.log('  quizId:', quizState.quizId, '(type:', typeof quizState.quizId, ')');
      console.log('  responses count:', validResponses.length);
      console.log('  first response:', validResponses[0]);
      console.log('  response types:', {
        questionId: typeof validResponses[0]?.questionId,
        selectedOptionId: typeof validResponses[0]?.selectedOptionId
      });

      const submitResponse = await apiClient.post('/quiz/submit', {
        quizId: Number(quizState.quizId), // Ensure it's a number
        responses: validResponses
      });

      console.log('✅ Quiz submitted successfully:', submitResponse.data);

      // Show success message briefly then redirect
      setError('');
      
      // Show success notification
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce';
      successDiv.innerHTML = '✅ Test Submitted Successfully!';
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        document.body.removeChild(successDiv);
        navigate('/test-submitted');
      }, 2000);
    } catch (error: unknown) {
      console.error('❌ Quiz submission error:', error);
      const apiError = error as ApiError;
      console.error('❌ Error response:', apiError.response?.data);
      console.error('❌ Error message:', InputValidator.sanitizeInput(apiError.message || 'Unknown error'));

      // Reset submission state so user can try again
      setQuizState(prev => ({ ...prev, isSubmitted: false }));

      // Show detailed error message with validation details
      let errorMessage = apiError.response?.data?.error?.message ||
        apiError.response?.data?.message ||
        apiError.message ||
        'Failed to submit quiz. Please try again.';

      // If there are validation details, show them in development
      if (apiError.response?.data?.error?.details && import.meta.env.DEV) {
        const validationErrors = apiError.response.data.error.details.map((err) => InputValidator.sanitizeInput(err.msg)).join(', ');
        errorMessage += ` (Validation errors: ${validationErrors})`;
      }

      setError(`Submission failed: ${InputValidator.sanitizeInput(errorMessage)}`);

      // Auto-retry once if it's a network error
      if (retryCount === 0 && (apiError.code === 'NETWORK_ERROR' || apiError.message?.includes('Network Error'))) {
        console.log('🔄 Auto-retrying submission...');
        setTimeout(() => handleSubmitQuiz(1), 2000);
      }
    }
  };

  // Pre-test instructions screen
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-200 dark:border-red-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-black">⚠️ IMPORTANT TEST INSTRUCTIONS</h1>
                  <p className="text-red-100 text-lg">TECH BOARD 2025 Selection Test - Grade {user?.grade}</p>
                </div>
              </div>
            </div>

            {/* Instructions Content */}
            <div className="p-8 space-y-8">
              {/* Critical Rules */}
              <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                  🚫 STRICT RULES - ZERO TOLERANCE
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 dark:text-red-200">CHEATING IS NOT FORGIVABLE</h3>
                      <p className="text-red-700 dark:text-red-300">Any form of cheating, copying, or unfair means will result in immediate disqualification. No second chances.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 dark:text-red-200">ATTEMPT ALL QUESTIONS IS COMPULSORY</h3>
                      <p className="text-red-700 dark:text-red-300">You must attempt all 25 questions. Incomplete tests will not be evaluated.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 dark:text-red-200">NO EXTERNAL HELP ALLOWED</h3>
                      <p className="text-red-700 dark:text-red-300">No books, notes, internet, or assistance from others. This is an individual assessment.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Information */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  📋 TEST DETAILS
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 dark:text-blue-200">Total Questions: 50</p>
                        <p className="text-blue-600 dark:text-blue-400 text-sm">All questions are compulsory</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 dark:text-blue-200">Time Limit: 50 Minutes</p>
                        <p className="text-blue-600 dark:text-blue-400 text-sm">Auto-submit when time expires</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-green-800 dark:text-green-200">Passing Score: 42/50 (72%)</p>
                        <p className="text-green-600 dark:text-green-400 text-sm">Required for TECH BOARD selection</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-800 dark:text-purple-200">Question Type: MCQ</p>
                        <p className="text-purple-600 dark:text-purple-400 text-sm">Single correct answer per question</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📜 Terms & Conditions</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>Once you start the test, the timer cannot be paused or stopped.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>You can navigate between questions and change your answers before final submission.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>The test will auto-submit when time expires or when you click "Submit Test".</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>Results will be processed and communicated separately.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>Technical issues should be reported immediately to the supervisor.</p>
                  </div>
                </div>
              </div>

              {/* Acceptance Checkbox */}
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={hasAcceptedTerms}
                    onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                    className="w-6 h-6 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                  />
                  <label htmlFor="acceptTerms" className="text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-lg">I have read and understood all instructions.</span>
                    <br />
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      I acknowledge that cheating is not forgivable and attempting all questions is compulsory.
                    </span>
                    <br />
                    <span>I am ready to start the TECH BOARD 2025 Selection Test.</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
                >
                  ← Back to Dashboard
                </button>
                <button
                  onClick={() => {
                    if (hasAcceptedTerms) {
                      setShowInstructions(false);
                    }
                  }}
                  disabled={!hasAcceptedTerms}
                  className={`px-8 py-4 font-bold text-lg rounded-xl transition-all transform ${hasAcceptedTerms
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                >
                  🚀 START TEST NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-glow">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Preparing Your Test</h2>
          <p className="text-gray-600 dark:text-gray-400">Loading 50 questions for TECH BOARD selection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center">
        <div className="card max-w-lg text-center">
          <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Quiz Loading Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setError('');
                setLoading(true);
                window.location.reload();
              }}
              className="btn-primary w-full"
            >
              🔄 Retry Quiz
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary w-full">
              ← Back to Dashboard
            </button>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
            <p><strong>Troubleshooting:</strong></p>
            <p>• Check your internet connection</p>
            <p>• Try refreshing the page</p>
            <p>• Contact administrator if issue persists</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">No Questions Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">No questions found for your grade. Please contact the administrator.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const selectedAnswer = quizState.answers[quizState.currentQuestion];
  const answeredQuestions = quizState.answers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-glass dark:backdrop-blur-glass-dark border-b border-gray-200 dark:border-dark-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-purple rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" />
                  <path d="M3 17L12 22L21 17" />
                  <path d="M3 12L12 17L21 12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">TECH BOARD 2025 Selection Test</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Question {quizState.currentQuestion + 1} of {questions.length} • Grade {user?.grade}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Timer timeRemaining={quizState.timeRemaining} />
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <ProgressBar current={quizState.currentQuestion + 1} total={questions.length} />

        {/* Question Card */}
        <div className="card mb-8 animate-fade-in">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Question {quizState.currentQuestion + 1}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {answeredQuestions}/{questions.length} answered
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={option.id}
                option={option.option_text}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={quizState.isSubmitted && option.is_correct}
                isWrong={quizState.isSubmitted && selectedAnswer === index && !option.is_correct}
                showResult={quizState.isSubmitted}
                onClick={() => handleAnswerSelect(index)}
              />
            ))}
          </div>

          {/* No explanations shown during TECH BOARD 2025 test */}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex space-x-4">
            {quizState.currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitModal(true)}
                disabled={quizState.isSubmitted}
                className="btn-glow"
              >
                {quizState.isSubmitted ? 'Submitting Test...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="btn-primary"
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-8 p-6 bg-white/50 dark:bg-dark-800/50 rounded-2xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuizState(prev => ({ ...prev, currentQuestion: index }))}
                className={`
                  w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200
                  ${index === quizState.currentQuestion
                    ? 'bg-primary-500 text-white shadow-lg'
                    : quizState.answers[index] !== null
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  ⚠️ Final Submission Confirmation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You are about to submit your TECH BOARD 2025 test
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Questions Answered:</span>
                    <span className="font-semibold">{answeredQuestions}/{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Remaining:</span>
                    <span className="font-semibold">
                      {Math.floor(quizState.timeRemaining / 60)}:{String(quizState.timeRemaining % 60).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unanswered Questions:</span>
                    <span className={`font-semibold ${questions.length - answeredQuestions > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {questions.length - answeredQuestions}
                    </span>
                  </div>
                </div>
              </div>

              {questions.length - answeredQuestions > 0 && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-800 dark:text-red-200 font-semibold text-sm">
                        Warning: You have {questions.length - answeredQuestions} unanswered questions!
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                        Unanswered questions will be marked as incorrect.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToSubmit}
                    onChange={(e) => setAgreeToSubmit(e.target.checked)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      I confirm that I want to submit my test
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      I understand that once submitted, I cannot make any changes to my answers.
                      This action is final and irreversible.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    setAgreeToSubmit(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmitQuiz()}
                  disabled={!agreeToSubmit}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all ${
                    agreeToSubmit
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizInterface;