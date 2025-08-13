import { Link } from 'react-router-dom';

// Enhanced SVG icon components
const BookOpen = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const Users = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const Award = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const ArrowRight = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const Target = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Star = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const CheckCircle = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Clock = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Trophy = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const Globe = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
const Sparkles = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const Lightning = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;

const TechnoBoardLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src="/logoSch.png" alt="Maples Academy" className="w-10 h-10 rounded-xl shadow-lg" onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                const sibling = target.nextElementSibling as HTMLElement;
                target.style.display = 'none';
                if (sibling) sibling.style.display = 'flex';
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
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* SVG Logo Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/logoSch.png)',
            backgroundSize: '400px 400px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg rotate-45 opacity-60"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce delay-2000">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-3000">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg opacity-60"></div>
          </div>
        </div>
        <div className="container text-center relative z-20 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-8 shadow-lg backdrop-blur-sm border border-white/20">
              <div className="mr-2 text-yellow-500"><Star /></div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Led by PANKAJ Sir - Maples Academy</span>
              <div className="ml-2"><Sparkles /></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Tech Board
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Selection Test
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Join the <span className="text-blue-600 font-semibold">exclusive Tech Board</span> - an elite group of tech experts founded by Maples Academy.
              <br className="hidden md:block" />
              Prove your technical skills and become part of a <span className="text-purple-600 font-semibold">prestigious community</span> of tech enthusiasts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/register" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 transform">
                <div className="flex items-center">
                  <Lightning />
                  <span className="mx-3 text-lg">Take Selection Test</span>
                  <div className="group-hover:translate-x-1 transition-transform"><ArrowRight /></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </Link>
              <Link to="/admin/login" className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-105 transform">
                Admin Portal
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/80 transition-all duration-300">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">1500+</div>
                <div className="text-gray-600 font-medium">Students Tested</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/80 transition-all duration-300">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">72%</div>
                <div className="text-gray-600 font-medium">Pass Rate</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/80 transition-all duration-300">
                <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">5</div>
                <div className="text-gray-600 font-medium">Grade Levels</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Benefits of Joining Tech Board
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exclusive advantages for Tech Board members under <span className="text-blue-600 font-semibold">PANKAJ Sir's</span> guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white shadow-lg">
                  <Users />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Elite Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join an exclusive network of tech enthusiasts and get mentorship from PANKAJ Sir and Maples Academy experts.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white shadow-lg">
                  <Award />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recognition & Certificates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn official Tech Board certification and gain recognition for your technical skills and achievements.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white shadow-lg">
                  <Target />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access exclusive workshops, coding sessions, and technical training programs designed by Maples Academy.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white shadow-lg">
                  <Globe />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Olympiad Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide you unlimited opportunities and training for Olympiads globally, preparing you for international competitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Information */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Selection Test Details
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about the Tech Board selection process
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">50 Minutes Duration</h3>
                  <p className="text-gray-600 leading-relaxed">Comprehensive selection test with 50 carefully crafted questions to assess your technical aptitude and problem-solving skills.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Trophy />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Results</h3>
                  <p className="text-gray-600 leading-relaxed">Receive immediate feedback on your performance and know instantly if you qualify for Tech Board membership.</p>
                </div>
              </div>

              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Grade-Specific Content</h3>
                  <p className="text-gray-600 leading-relaxed">Questions designed by Maples Academy experts, covering essential computer science topics relevant to your academic level.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-xl">
                  <div className="w-12 h-12"><Award /></div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6 text-center">Ready to Join Tech Board?</h3>
                <p className="text-xl text-gray-600 mb-8 text-center leading-relaxed">Take the selection test and become part of an elite tech community</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-xl">
                    <div className="text-green-500 flex-shrink-0"><CheckCircle /></div>
                    <span className="text-gray-700 font-medium">Pass with 72% (36/50)</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
                    <div className="text-blue-500 flex-shrink-0"><CheckCircle /></div>
                    <span className="text-gray-700 font-medium">Tech Board Membership</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-xl">
                    <div className="text-purple-500 flex-shrink-0"><CheckCircle /></div>
                    <span className="text-gray-700 font-medium">Achievement Certificate</span>
                  </div>
                </div>

                <Link to="/register" className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                  Take Selection Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Topics by Grade Level
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum covering all essential computer science concepts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { grade: 6, questions: 300, topics: ['Computer Parts', 'Input/Output Devices', 'Software Types', 'Digital Safety'], gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-100' },
              { grade: 7, questions: 300, topics: ['Internet Basics', 'Operating Systems', 'Email & Browsers', 'Cyber Safety'], gradient: 'from-green-500 to-green-600', bg: 'from-green-50 to-green-100' },
              { grade: 8, questions: 300, topics: ['HTML Basics', 'Networking', 'Cloud Computing', 'Database Intro'], gradient: 'from-purple-500 to-purple-600', bg: 'from-purple-50 to-purple-100' },
              { grade: 9, questions: 300, topics: ['Programming Logic', 'Boolean Algebra', 'TCP/IP', 'Cybersecurity'], gradient: 'from-orange-500 to-orange-600', bg: 'from-orange-50 to-orange-100' },
              { grade: 11, questions: 300, topics: ['Python Programming', 'Data Structures', 'SQL & RDBMS', 'Advanced Networking'], gradient: 'from-red-500 to-red-600', bg: 'from-red-50 to-red-100' }
            ].map((grade, i) => (
              <div key={i} className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${grade.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${grade.gradient} rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {grade.grade}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Grade {grade.grade}</h3>
                      <p className="text-gray-600 font-medium">{grade.questions} Questions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {grade.topics.map((topic, j) => (
                      <div key={j} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <div className={`w-3 h-3 bg-gradient-to-r ${grade.gradient} rounded-full shadow-sm`}></div>
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <img src="/logoSch.png" alt="Maples Academy" className="w-12 h-12 rounded-xl shadow-lg" onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              const sibling = target.nextElementSibling as HTMLElement;
              target.style.display = 'none';
              if (sibling) sibling.style.display = 'flex';
            }} />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ display: 'none' }}>
              <BookOpen />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Tech Board</span>
          </div>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering technical excellence through innovative assessment and fostering the next generation of tech leaders
          </p>

          <div className="flex items-center justify-center space-x-3 mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl inline-flex">
            <span className="text-gray-300">Powered by</span>
            <img src="/logoSch.png" alt="Maples Academy" className="h-8 w-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <span className="font-bold text-orange-400 text-lg">Maples Academy</span>
          </div>

          <div className="border-t border-white/20 pt-8">
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