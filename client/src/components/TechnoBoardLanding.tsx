import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Zap, Shield, Target, Star, CheckCircle, Clock, Trophy } from 'lucide-react';

const TechnoBoardLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Tech Board</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>powered by</span>
              <img src="/logoSch.png" alt="Maples Academy" className="h-8 w-auto" />
              <span className="font-semibold text-orange-600">Maples Academy</span>
            </div>
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
              Led by PANKAJ Sir - Maples Academy
            </div>
            
            <h1 className="heading-1 mb-6">
              Tech Board
              <span className="block text-gradient">Selection Test</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the exclusive Tech Board - an elite NFO (Non-Formal Organization) founded by Maples Academy. 
              Prove your technical skills and become part of a prestigious community of tech enthusiasts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/register" className="btn btn-primary btn-lg group">
                <span>Take Selection Test</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/login" className="btn btn-secondary btn-lg">
                Admin Portal
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">1500+</div>
                <div className="text-sm text-gray-600">Students Tested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">72%</div>
                <div className="text-sm text-gray-600">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">Grade Levels</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Benefits of Joining Tech Board</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exclusive advantages for Tech Board members under PANKAJ Sir's guidance
            </p>
          </div>
          
          <div className="grid-auto">
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Elite Community</h3>
              <p className="text-gray-600">
                Join an exclusive network of tech enthusiasts and get mentorship from PANKAJ Sir and Maples Academy experts.
              </p>
            </div>
            
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recognition & Certificates</h3>
              <p className="text-gray-600">
                Earn official Tech Board certification and gain recognition for your technical skills and achievements.
              </p>
            </div>
            
            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Development</h3>
              <p className="text-gray-600">
                Access exclusive workshops, coding sessions, and technical training programs designed by Maples Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Information */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Selection Test Details</h2>
            <p className="text-xl text-gray-600">Everything you need to know about the Tech Board selection process</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">60 Minutes Duration</h3>
                  <p className="text-gray-600">Comprehensive selection test with 50 carefully crafted questions to assess your technical aptitude and problem-solving skills.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-gray-600">Receive immediate feedback on your performance and know instantly if you qualify for Tech Board membership.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Grade-Specific Content</h3>
                  <p className="text-gray-600">Questions designed by Maples Academy experts, covering essential computer science topics relevant to your academic level.</p>
                </div>
              </div>
            </div>
            
            <div className="card-gradient p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Tech Board?</h3>
              <p className="text-gray-600 mb-6">Take the selection test and become part of an elite tech community</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Pass with 72% (36/50)</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Tech Board Membership</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Achievement Certificate</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary w-full">
                Take Selection Test
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
              { grade: 6, questions: 300, topics: ['Computer Parts', 'Input/Output Devices', 'Software Types', 'Digital Safety'], color: 'blue' },
              { grade: 7, questions: 300, topics: ['Internet Basics', 'Operating Systems', 'Email & Browsers', 'Cyber Safety'], color: 'green' },
              { grade: 8, questions: 300, topics: ['HTML Basics', 'Networking', 'Cloud Computing', 'Database Intro'], color: 'purple' },
              { grade: 9, questions: 300, topics: ['Programming Logic', 'Boolean Algebra', 'TCP/IP', 'Cybersecurity'], color: 'orange' },
              { grade: 11, questions: 300, topics: ['Python Programming', 'Data Structures', 'SQL & RDBMS', 'Advanced Networking'], color: 'red' }
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
            <span className="text-2xl font-bold">Tech Board</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering technical excellence through innovative assessment
          </p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-gray-400">Powered by</span>
            <img src="/logoSch.png" alt="Maples Academy" className="h-6 w-auto" />
            <span className="text-sm font-semibold text-orange-400">Maples Academy</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Tech Board. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnoBoardLanding;