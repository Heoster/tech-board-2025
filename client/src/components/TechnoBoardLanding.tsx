import React from 'react';
import { Link } from 'react-router-dom';
import TechBoardLogoSVG from './TechBoardLogoSVG';

// Type-safe Link wrapper
const SafeLink: React.FC<{ to: string; className?: string; children: React.ReactNode }> = ({ to, className, children }) => {
  const LinkComponent = Link as any;
  return (
    <LinkComponent to={to} className={className}>
      {children}
    </LinkComponent>
  );
};

// Simple SVG icon components
const BookOpen = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const Users = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const Award = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const ArrowRight = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const Target = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Star = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const CheckCircle = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Clock = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Trophy = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;

const TechnoBoardLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src="/logoSch.png" alt="Maples Academy" className="w-10 h-10 rounded-xl shadow-lg" onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (sibling && sibling instanceof HTMLElement) sibling.style.display = 'flex';
              }} />
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
                <BookOpen />
              </div>
              <span className="text-2xl font-bold text-gray-900">Tech Board</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>powered by</span>
              <img src="/logoSch.png" alt="Maples Academy" className="h-8 w-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <span className="font-semibold text-orange-600">Maples Academy</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SafeLink to="/login" className="nav-link">Login</SafeLink>
            <SafeLink to="/register" className="btn btn-primary">Get Started</SafeLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* SVG Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <TechBoardLogoSVG
            width={600}
            height={300}
            colors={{
              primary: '#3B82F6',
              secondary: '#8B5CF6',
              accent: '#6B7280'
            }}
          />
        </div>

        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container text-center relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <div className="mr-2"><Star /></div>
              Led by PANKAJ Sir - Maples Academy
            </div>

            <h1 className="heading-1 mb-6">
              Tech Board
              <span className="block text-gradient">Selection Test</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the exclusive Tech Board - an elite group of tech experts founded by Maples Academy.
              Prove your technical skills and become part of a prestigious community of tech enthusiasts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <SafeLink to="/register" className="btn btn-primary btn-lg group">
                <span>Take Selection Test</span>
                <div className="ml-2 group-hover:translate-x-1 transition-transform"><ArrowRight /></div>
              </SafeLink>
              <SafeLink to="/admin/login" className="btn btn-secondary btn-lg">
                Admin Portal
              </SafeLink>
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
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                <Users />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Elite Community</h3>
              <p className="text-gray-600">
                Join an exclusive network of tech enthusiasts and get mentorship from PANKAJ Sir and Maples Academy experts.
              </p>
            </div>

            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                <Award />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recognition & Certificates</h3>
              <p className="text-gray-600">
                Earn official Tech Board certification and gain recognition for your technical skills and achievements.
              </p>
            </div>

            <div className="card hover-lift group">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                <Target />
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about the Tech Board selection process
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  <Clock />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">50 Minutes Duration</h3>
                  <p className="text-gray-600">Comprehensive test with 50 questions to assess your technical skills.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
                  <Trophy />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-gray-600">Get immediate feedback and know if you qualify for Tech Board membership.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                  <Users />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Grade-Specific Content</h3>
                  <p className="text-gray-600">Questions designed for your academic level by Maples Academy experts.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                <Award />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Ready to Join Tech Board?</h3>
              <p className="text-gray-600 mb-6 text-center">Take the selection test and become part of an elite tech community</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle />
                  <span className="text-gray-700">Pass with 72% (36/50)</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle />
                  <span className="text-gray-700">Tech Board Membership</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle />
                  <span className="text-gray-700">Achievement Certificate</span>
                </div>
              </div>

              <SafeLink to="/register" className="btn btn-primary w-full">
                Take Selection Test
              </SafeLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src="/logoSch.png" alt="Maples Academy" className="w-10 h-10 rounded-lg" onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const sibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (sibling && sibling instanceof HTMLElement) sibling.style.display = 'flex';
            }} />
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
              <BookOpen />
            </div>
            <span className="text-2xl font-bold">Tech Board</span>
          </div>

          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Empowering technical excellence through innovative assessment and fostering the next generation of tech leaders
          </p>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-gray-400">Powered by</span>
            <span className="font-semibold text-orange-400">Maples Academy</span>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="text-gray-400">
              © 2025 Tech Board. All rights reserved. | Designed with ❤️ for future tech leaders
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnoBoardLanding;