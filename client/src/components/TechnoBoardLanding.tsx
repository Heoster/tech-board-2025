import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Zap, Shield, Target, Star, CheckCircle, Clock, Trophy } from 'lucide-react';

const TechnoBoardLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TechnoBoard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ professionals
            </div>
            
            <h1 className="heading-1 mb-6">
              Master Your
              <span className="block text-gradient">Technical Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Advanced assessment platform designed for technical professionals. 
              Challenge yourself with real-world problems and accelerate your career growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/register" className="btn btn-primary btn-lg group">
                <span>Start Free Assessment</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/login" className="btn btn-secondary btn-lg">
                Admin Portal
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why Choose TechnoBoard?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for modern technical assessment with enterprise-grade features
            </p>
          </div>
          
          <div className="grid-auto">
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized performance with instant feedback and real-time progress tracking for seamless experience.
              </p>
            </div>
            
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security with comprehensive data protection and privacy controls you can trust.
              </p>
            </div>
            
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precision Analytics</h3>
              <p className="text-gray-600">
                Detailed performance insights and personalized recommendations for continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Information */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Assessment Details</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our technical assessments</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">30 Minutes Duration</h3>
                  <p className="text-gray-600">Carefully timed assessment with 25 multiple-choice questions designed to evaluate your technical knowledge efficiently.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-gray-600">Get immediate feedback with detailed explanations and performance analytics to understand your strengths and areas for improvement.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Grade-Specific Content</h3>
                  <p className="text-gray-600">Questions tailored to your academic level, covering topics from basic computer literacy to advanced programming concepts.</p>
                </div>
              </div>
            </div>
            
            <div className="card-gradient p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Excel?</h3>
              <p className="text-gray-600 mb-6">Join thousands of students advancing their technical skills</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Pass with 72% (18/25)</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">TechnoBoard Membership</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Achievement Certificate</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary w-full">
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Topics by Grade Level</h2>
            <p className="text-xl text-gray-600">Comprehensive curriculum covering all essential computer science concepts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { grade: 6, questions: 345, topics: ['Computer Parts', 'Input/Output Devices', 'Software Types', 'Digital Safety'], color: 'blue' },
              { grade: 7, questions: 330, topics: ['Internet Basics', 'Operating Systems', 'Email & Browsers', 'Cyber Safety'], color: 'green' },
              { grade: 8, questions: 180, topics: ['HTML Basics', 'Networking', 'Cloud Computing', 'Database Intro'], color: 'purple' },
              { grade: 9, questions: 365, topics: ['Programming Logic', 'Boolean Algebra', 'TCP/IP', 'Cybersecurity'], color: 'orange' },
              { grade: 11, questions: 370, topics: ['Python Programming', 'Data Structures', 'SQL & RDBMS', 'Advanced Networking'], color: 'red' }
            ].map((grade, i) => (
              <div key={i} className="card hover-lift">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${grade.color}-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4`}>
                    {grade.grade}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Grade {grade.grade}</h3>
                    <p className="text-sm text-gray-600">{grade.questions} Questions</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {grade.topics.map((topic, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-${grade.color}-500 rounded-full`}></div>
                      <span className="text-sm text-gray-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">TechnoBoard</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering technical excellence through innovative assessment
          </p>
          <div className="text-sm text-gray-500">
            © 2024 TechnoBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnoBoardLanding;