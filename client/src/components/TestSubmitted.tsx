import { Link } from 'react-router-dom';

// Simple SVG icon components
const CheckCircle = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Home = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const Clock = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const TestSubmitted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="card text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-green-600">
              <CheckCircle />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for completing your Tech Board assessment. Your responses have been recorded.
          </p>

          {/* Information Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-amber-600">
                <Clock />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Results Confidential - Admin Review Only
            </h3>
            <p className="text-amber-700 text-sm">
              Your test responses have been securely submitted. Results are only visible to 
              administration and will be used for Tech Board selection. Qualified candidates 
              will be contacted directly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/dashboard"
              className="btn btn-primary"
            >
              <div className="mr-2">
                <Home />
              </div>
              Back to Dashboard
            </Link>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Important:</strong> Individual results are not displayed to students. 
              Only administration can view detailed test results. Qualified candidates will be 
              notified for Tech Board membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubmitted;