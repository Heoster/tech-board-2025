import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Home, BarChart3, Clock } from 'lucide-react';

const TestSubmitted = () => {
  // Mock results - in real app, this would come from props or API
  const results = {
    score: 22,
    totalQuestions: 25,
    percentage: 88,
    passed: true,
    timeSpent: '24:35',
    correctAnswers: 22,
    incorrectAnswers: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="card text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Congratulations! You have completed your TechnoBoard assessment.
          </p>

          {/* Results Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {results.score}/{results.totalQuestions}
                </div>
                <div className="text-gray-600">Questions Correct</div>
              </div>
              
              {/* Percentage */}
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {results.percentage}%
                </div>
                <div className="text-gray-600">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Pass/Fail Status */}
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-8 ${
            results.passed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {results.passed ? (
              <>
                <Award className="w-6 h-6 mr-2" />
                Congratulations! You Passed
              </>
            ) : (
              <>
                <Clock className="w-6 h-6 mr-2" />
                Keep Practicing
              </>
            )}
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card-gradient p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {results.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            
            <div className="card-gradient p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {results.incorrectAnswers}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            
            <div className="card-gradient p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {results.timeSpent}
              </div>
              <div className="text-sm text-gray-600">Time Used</div>
            </div>
          </div>

          {/* Achievement Message */}
          {results.passed && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                TechnoBoard Membership Earned!
              </h3>
              <p className="text-yellow-700 text-sm">
                You've successfully qualified for TechnoBoard membership. 
                Your certificate will be available shortly.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="btn btn-primary"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            
            <button className="btn btn-secondary">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Detailed Results
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Your results have been saved to your account. 
              You can review them anytime from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubmitted;