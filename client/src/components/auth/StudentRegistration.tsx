import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { BookOpen, User, Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, GraduationCap, Sparkles, CheckCircle, Shield } from 'lucide-react';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    password: '',
    confirmPassword: '',
    grade: '',
    section: 'A'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        name: formData.name,
        roll_number: parseInt(formData.roll_number),
        password: formData.password,
        grade: parseInt(formData.grade),
        section: formData.section
      });

      if (response.success) {
        login(response.data.token, {
          id: response.data.user.id,
          role: 'student',
          name: response.data.user.name,
          rollNumber: response.data.user.roll_number,
          grade: response.data.user.grade,
          section: response.data.user.section
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const passwordStrength = formData.password.length >= 8 ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak';
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 hover:translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Registration Card */}
          <div className="backdrop-blur-glass border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 text-gradient">Join TechnoBoard</h1>
              <p className="text-gray-600 text-lg mb-4">Create your account and start your technical journey</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free</span>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error mb-6 animate-slide-scale">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 hover:bg-white/70"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Roll Number Field */}
              <div className="space-y-2">
                <label htmlFor="roll_number" className="block text-sm font-semibold text-gray-700">
                  Roll Number (1-100)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    id="roll_number"
                    name="roll_number"
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={formData.roll_number}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 hover:bg-white/70"
                    placeholder="Enter your roll number (1-100)"
                  />
                </div>
              </div>

              {/* Grade Field */}
              <div className="space-y-2">
                <label htmlFor="grade" className="block text-sm font-semibold text-gray-700">
                  Grade Level
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <GraduationCap className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <select
                    id="grade"
                    name="grade"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 hover:bg-white/70"
                  >
                    <option value="">Select your grade level</option>
                    <option value="6">Grade 6 </option>
                    <option value="7">Grade 7 </option>
                    <option value="8">Grade 8 </option>
                    <option value="9">Grade 9 </option>
                    <option value="11">Grade 11 </option>
                  </select>
                </div>
              </div>

              {/* Section Field */}
              <div className="space-y-2">
                <label htmlFor="section" className="block text-sm font-semibold text-gray-700">
                  Section
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <select
                    id="section"
                    name="section"
                    required
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 hover:bg-white/70"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 hover:bg-white/70"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`h-1 flex-1 rounded-full ${passwordStrength === 'strong' ? 'bg-green-500' :
                        passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    <span className={`text-xs font-medium ${passwordStrength === 'strong' ? 'text-green-600' :
                        passwordStrength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                      {passwordStrength === 'strong' ? 'Strong' :
                        passwordStrength === 'medium' ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-500">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-300 text-gray-900 placeholder-gray-500 hover:bg-white/70 ${passwordsMatch ? 'border-green-300 focus:border-green-500' : 'border-gray-200 focus:border-purple-500'
                      }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  {passwordsMatch && (
                    <div className="absolute inset-y-0 right-12 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span>Create My Account</span>
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-600 font-medium">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="w-full py-4 bg-white/70 border-2 border-gray-200 text-gray-700 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/90 hover:border-purple-300 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300/50 flex items-center justify-center"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;