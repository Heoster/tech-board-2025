import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Floating Particles Background
const FloatingParticles = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ))}
  </div>
);

// Grade Selection Card
const GradeCard = ({ 
  grade, 
  title, 
  description, 
  questionCount, 
  difficulty, 
  color, 
  isSelected, 
  onClick 
}: {
  grade: number;
  title: string;
  description: string;
  questionCount: number;
  difficulty: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`
      relative cursor-pointer group transform transition-all duration-500 hover:scale-105
      ${isSelected ? 'scale-105 z-10' : ''}
    `}
  >
    <div className={`
      relative overflow-hidden rounded-3xl p-8 h-64 flex flex-col justify-between
      bg-gradient-to-br ${color} text-white shadow-2xl
      ${isSelected ? 'ring-4 ring-white/50 shadow-glow' : ''}
      group-hover:shadow-3xl transition-all duration-500
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-black">Grade {grade}</div>
          {isSelected && (
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="text-lg font-semibold mb-2">{title}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>

      <div className="relative z-10 flex justify-between items-end">
        <div>
          <div className="text-2xl font-bold">{questionCount}</div>
          <div className="text-xs opacity-75">Questions</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{difficulty}</div>
          <div className="text-xs opacity-75">Level</div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description, highlight }: {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}) => (
  <div className="group relative">
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
    <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 h-full">
      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        {highlight}
      </div>
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

// Main Landing Page Component
const LandingPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const gradeData = [
    {
      grade: 6,
      title: "Foundation",
      description: "Computer basics & digital literacy",
      questionCount: 211,
      difficulty: "Beginner",
      color: "from-green-400 via-green-500 to-green-600",
      syllabus: {
        topics: [
          {
            category: "🖥️ Computer Fundamentals",
            items: [
              "What is a computer? Types (desktop, laptop, tablet)",
              "Basic hardware: CPU, RAM, hard drive, motherboard",
              "Input/output devices: keyboard, mouse, monitor, printer",
              "Software types: System vs application software",
              "Operating systems: Windows, macOS basics"
            ]
          },
          {
            category: "🧮 Digital Literacy",
            items: [
              "File management: creating, saving, organizing folders",
              "Keyboard shortcuts: copy, paste, undo, redo",
              "Safe browsing: recognizing secure websites",
              "Online etiquette: respectful communication",
              "Digital footprint: understanding online presence"
            ]
          },
          {
            category: "🌐 Internet & Networking",
            items: [
              "How the internet works: basic concepts",
              "Web browsers: using tabs, bookmarks",
              "Search engines: smart searching techniques",
              "Email basics: sending, receiving, attachments",
              "Wi-Fi and networks: connecting devices"
            ]
          },
          {
            category: "🔐 Cyber Safety",
            items: [
              "Strong passwords: creation and management",
              "Privacy settings: basic understanding",
              "Avoiding scams and cyberbullying",
              "Safe sharing: what's okay to post online",
              "Recognizing and avoiding online threats"
            ]
          }
        ]
      }
    },
    {
      grade: 7,
      title: "Explorer",
      description: "Web technologies & programming intro",
      questionCount: 212,
      difficulty: "Intermediate",
      color: "from-blue-400 via-blue-500 to-blue-600",
      syllabus: {
        topics: [
          {
            category: "🖥️ Advanced Computer Concepts",
            items: [
              "Hardware vs software differences",
              "Operating systems comparison: Windows, macOS, Linux",
              "Storage concepts: GB, TB, cloud storage",
              "Computer performance: RAM, CPU speed",
              "Network types: LAN, WAN, internet basics"
            ]
          },
          {
            category: "📊 Productivity Tools",
            items: [
              "Word processors: formatting, images, tables",
              "Spreadsheets: basic formulas, charts, data entry",
              "Presentations: creating slides, transitions, design",
              "Cloud storage: Google Drive, OneDrive sharing",
              "Digital collaboration: sharing and editing files"
            ]
          },
          {
            category: "🧠 Programming Introduction",
            items: [
              "What is coding? Logic and problem-solving",
              "Block-based coding: Scratch programming",
              "Basic algorithms: sequencing, loops",
              "Debugging: finding and fixing errors",
              "Simple game design concepts"
            ]
          },
          {
            category: "🌐 Internet & Communication",
            items: [
              "IP addresses and domain names",
              "Wi-Fi networks and connectivity",
              "Email advanced features: CC, BCC, folders",
              "Video conferencing basics",
              "Social media safety and digital citizenship"
            ]
          }
        ]
      }
    },
    {
      grade: 8,
      title: "Developer",
      description: "Programming logic & system design",
      questionCount: 214,
      difficulty: "Advanced",
      color: "from-purple-400 via-purple-500 to-purple-600",
      syllabus: {
        topics: [
          {
            category: "🖥️ System Architecture",
            items: [
              "Motherboard functions and components",
              "RAM vs storage: temporary vs permanent memory",
              "CPU architecture and processing",
              "Input/output systems and ports",
              "Computer maintenance and troubleshooting"
            ]
          },
          {
            category: "🧠 Programming Fundamentals",
            items: [
              "HTML: web page structure and tags",
              "Programming conditions: if/then logic",
              "Loops and iterations in code",
              "Variables and data types",
              "Algorithm design and flowcharts"
            ]
          },
          {
            category: "🌐 Web Technologies",
            items: [
              "HTTPS and web security",
              "Search engines: how they work",
              "Website structure and navigation",
              "Basic web design principles",
              "Internet protocols and data transfer"
            ]
          },
          {
            category: "🔧 Digital Problem Solving",
            items: [
              "Computer troubleshooting: slow performance fixes",
              "Software updates: importance and process",
              "File organization and backup strategies",
              "Digital workflow optimization",
              "System security and maintenance"
            ]
          },
          {
            category: "🎨 Creative Computing",
            items: [
              "Digital art tools and techniques",
              "Basic animation concepts",
              "Game design fundamentals",
              "Multimedia project creation",
              "Creative software applications"
            ]
          }
        ]
      }
    },
    {
      grade: 9,
      title: "Architect",
      description: "Advanced algorithms & databases",
      questionCount: 200,
      difficulty: "Expert",
      color: "from-red-400 via-red-500 to-red-600",
      syllabus: {
        topics: [
          {
            category: "🏗️ System Design",
            items: [
              "Database fundamentals and design",
              "Network architecture and protocols",
              "Software development lifecycle",
              "System analysis and requirements",
              "Data structures and algorithms"
            ]
          },
          {
            category: "💻 Advanced Programming",
            items: [
              "Object-oriented programming concepts",
              "Advanced HTML/CSS and JavaScript basics",
              "Programming logic and problem decomposition",
              "Code optimization and efficiency",
              "Version control and collaboration"
            ]
          },
          {
            category: "🔒 Cybersecurity",
            items: [
              "Network security fundamentals",
              "Encryption and data protection",
              "Ethical hacking concepts",
              "Digital forensics basics",
              "Security protocols and best practices"
            ]
          },
          {
            category: "📊 Data Management",
            items: [
              "Database design and normalization",
              "SQL query fundamentals",
              "Data analysis and visualization",
              "Big data concepts",
              "Information systems design"
            ]
          }
        ]
      }
    },
    {
      grade: 11,
      title: "Innovator",
      description: "AI, ML & emerging technologies",
      questionCount: 300,
      difficulty: "Elite",
      color: "from-yellow-400 via-orange-500 to-red-500",
      syllabus: {
        topics: [
          {
            category: "🤖 Artificial Intelligence",
            items: [
              "Machine learning fundamentals",
              "Neural networks and deep learning",
              "AI applications in real world",
              "Natural language processing basics",
              "Computer vision concepts"
            ]
          },
          {
            category: "🚀 Emerging Technologies",
            items: [
              "Cloud computing and services",
              "Internet of Things (IoT)",
              "Blockchain and cryptocurrency",
              "Quantum computing basics",
              "Augmented and Virtual Reality"
            ]
          },
          {
            category: "💼 Tech Entrepreneurship",
            items: [
              "Software project management",
              "Tech startup fundamentals",
              "Digital marketing and analytics",
              "User experience (UX) design",
              "Technology ethics and society"
            ]
          },
          {
            category: "🔬 Advanced Computing",
            items: [
              "Advanced algorithms and complexity",
              "Distributed systems and microservices",
              "Mobile app development concepts",
              "DevOps and continuous integration",
              "Performance optimization techniques"
            ]
          },
          {
            category: "🌍 Global Tech Impact",
            items: [
              "Technology for social good",
              "Digital divide and accessibility",
              "Environmental impact of technology",
              "Future of work and automation",
              "International tech policies"
            ]
          }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation Header */}
      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TECH BOARD 2025
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">School Programme • Maples Academy</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => navigate('/admin/login')}
              className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Admin</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative z-10 max-w-7xl mx-auto px-6 py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Fun Banner */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full mb-8 shadow-lg animate-bounce">
          <span className="text-2xl">🏫</span>
          <span className="font-bold text-sm">Official School Programme - Tech Board 2025!</span>
          <span className="text-2xl">📚</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Learn & Play
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            With Computers! 🎯
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          🏫 Join our official school programme for computer science excellence! 
          <br />
          <span className="font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Participate in Tech Board 2025 and showcase your skills! 📚⭐
          </span>
        </p>

        {/* Fun Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {[
            { number: 1100, suffix: '+', label: 'Fun Questions 🎲', emoji: '🎯' },
            { number: 25, suffix: '', label: 'Questions Per Quiz 📝', emoji: '📚' },
            { number: 30, suffix: ' min', label: 'Play Time ⏰', emoji: '🎮' },
            { number: 18, suffix: '+', label: 'Score to Win 🏆', emoji: '⭐' }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-transparent hover:border-rainbow">
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-bold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={() => navigate('/register')}
            className="group relative px-16 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-1 animate-bounce border-4 border-white/30"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span className="text-3xl animate-spin">🚀</span>
              <span>SIGN UP NOW!</span>
              <span className="text-3xl animate-pulse">⭐</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="group relative px-16 py-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-white/30"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span className="text-3xl">👋</span>
              <span>LOGIN HERE!</span>
              <span className="text-3xl animate-bounce">🎯</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          </button>
        </div>
      </section>

      {/* Syllabus Overview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            📚 Complete Syllabus Overview
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Comprehensive curriculum designed for progressive learning from basic computer literacy to advanced technology concepts
          </p>
        </div>

        {/* Quick Syllabus Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              grades: "6-7",
              title: "Foundation & Exploration",
              icon: "🌱",
              color: "from-green-400 to-blue-500",
              topics: ["Computer Basics", "Digital Literacy", "Internet Safety", "Basic Programming", "Productivity Tools"]
            },
            {
              grades: "8-9", 
              title: "Development & Architecture",
              icon: "🏗️",
              color: "from-blue-500 to-purple-500",
              topics: ["System Design", "Web Technologies", "Advanced Programming", "Database Concepts", "Cybersecurity"]
            },
            {
              grades: "11",
              title: "Innovation & Leadership",
              icon: "🚀",
              color: "from-purple-500 to-pink-500",
              topics: ["Artificial Intelligence", "Machine Learning", "Emerging Tech", "Tech Entrepreneurship", "Global Impact"]
            }
          ].map((category, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${category.color} text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="text-sm font-bold mb-2 opacity-90">Grades {category.grades}</div>
                <h3 className="text-2xl font-black mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      <span className="text-sm opacity-90">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade Selection */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Grade Level
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select your grade to view detailed syllabus and start your TECH BOARD 2025 assessment journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {gradeData.map((grade, index) => (
            <div
              key={grade.grade}
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GradeCard
                {...grade}
                isSelected={selectedGrade === grade.grade}
                onClick={() => setSelectedGrade(grade.grade)}
              />
            </div>
          ))}
        </div>

        {selectedGrade && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Grade {selectedGrade} - {gradeData.find(g => g.grade === selectedGrade)?.title} Level
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Complete syllabus and assessment details for {gradeData.find(g => g.grade === selectedGrade)?.difficulty.toLowerCase()} level students
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-green-600 dark:text-green-400">
                      {gradeData.find(g => g.grade === selectedGrade)?.questionCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">25</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Test Questions</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-purple-600 dark:text-purple-400">30</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-pink-600 dark:text-pink-400">18+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pass Score</div>
                  </div>
                </div>
              </div>

              {/* Detailed Syllabus */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  📚 Complete Syllabus Breakdown
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {gradeData.find(g => g.grade === selectedGrade)?.syllabus.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                      <h5 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                        <span className="mr-2">{topic.category.split(' ')[0]}</span>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {topic.category.split(' ').slice(1).join(' ')}
                        </span>
                      </h5>
                      <div className="space-y-3">
                        {topic.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 group-hover:scale-125 transition-transform" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Assessment Format
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Multiple Choice Questions (MCQ)',
                      '4 options per question',
                      'Single correct answer',
                      'No negative marking',
                      'Questions cover all syllabus topics'
                    ].map((detail, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    Success Tips
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Review all syllabus topics thoroughly',
                      'Practice with sample questions',
                      'Manage your time effectively',
                      'Read questions carefully',
                      'Stay calm and focused during test'
                    ].map((tip, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-8">
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ready for the Challenge?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join thousands of students taking the TECH BOARD 2025 assessment. 
                  Prove your skills and earn recognition for your computer science knowledge!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/register')}
                    className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Register for Grade {selectedGrade}</span>
                    </span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/login')}
                    className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <span>Start Grade {selectedGrade} Test</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Why TECH BOARD 2025?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the most advanced and comprehensive technology assessment platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🚀",
              title: "Industry Recognition",
              description: "Get recognized by top tech companies and educational institutions worldwide",
              highlight: "Global Impact"
            },
            {
              icon: "🎯",
              title: "AI-Powered Assessment",
              description: "Advanced algorithms ensure fair evaluation and personalized question selection",
              highlight: "Smart Tech"
            },
            {
              icon: "🏆",
              title: "Elite Community",
              description: "Join an exclusive group of top-performing students and perfects",
              highlight: "Exclusive"
            },
            {
              icon: "💡",
              title: "Future Opportunities",
              description: "Open doors to get practical knowledege with PANKAJ SIR",
              highlight: "Career Boost"
            },
            {
              icon: "🔒",
              title: "Secure & Fair",
              description: "Bank-level security with anti-cheating measures and transparent evaluation",
              highlight: "100% Secure"
            },
            {
              icon: "⚡",
              title: "Real-time Processing",
              description: "Instant test processing with immediate submission confirmation",
              highlight: "Lightning Fast"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-3xl p-12 border border-purple-200/20 dark:border-purple-800/20">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ready to Make History?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join students from schools across the region in our official TECH BOARD 2025 programme. 
            Represent your school and showcase your computer science skills!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Register Now - It's Free!</span>
              </span>
            </button>
            
            <button
              onClick={() => navigate('/admin/login')}
              className="px-12 py-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border-2 border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-gray-200 font-bold text-xl rounded-2xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
            >
              Admin Portal
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            🔒 Secure Registration • ⚡ Instant Access • 🎯 Limited Time Opportunity
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;