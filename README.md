# 🚀 TechnoBoard - Professional Technical Assessment Platform

A modern, full-stack technical assessment platform built with React, TypeScript, Node.js, and Express. Features professional UI/UX design, secure authentication, and comprehensive quiz management.

## ✨ Features

### 🎨 **Professional UI/UX**
- Modern glass morphism design with animated backgrounds
- Responsive design optimized for all devices
- Professional color scheme with blue-purple gradients
- Smooth animations and micro-interactions
- Consistent component library and design system

### 🔐 **Authentication & Security**
- Secure JWT-based authentication
- Password strength validation
- Input sanitization and validation
- CSRF protection and rate limiting
- Helmet security headers

### 📚 **Assessment System**
- Grade-specific question banks (6, 7, 8, 9, 11)
- 25 multiple-choice questions per test
- 30-minute time limit with real-time countdown
- Instant results with detailed analytics
- Progress tracking and navigation

### 👨‍💼 **Admin Panel**
- Question management system
- Student performance analytics
- Quiz configuration and settings
- User management dashboard

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers

### DevOps & Deployment
- **Docker** containerization
- **Railway** deployment platform
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/technoboard.git
cd technoboard
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Setup**
```bash
# Server environment (.env)
cd ../server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Client environment (.env)
cd ../client
cp .env.example .env
# Edit .env with your API base URL
```

4. **Start Development Servers**
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
technoboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── styles/         # CSS and theme files
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── utils/             # Server utilities
├── Dockerfile             # Docker configuration
├── railway.json           # Railway deployment config
└── README.md              # Project documentation
```

## 🎯 Grade Levels & Topics

### Grade 6 (345 Questions)
- Computer Parts & Components
- Input/Output Devices
- Software Types & Categories
- Digital Safety & Ethics

### Grade 7 (330 Questions)
- Internet Basics & Browsing
- Operating Systems
- Email & Communication
- Cyber Safety & Security

### Grade 8 (180 Questions)
- HTML Basics & Web Development
- Computer Networking
- Cloud Computing Concepts
- Database Introduction

### Grade 9 (365 Questions)
- Programming Logic & Algorithms
- Boolean Algebra
- TCP/IP Networking
- Cybersecurity Fundamentals

### Grade 11 (370 Questions)
- Python Programming
- Data Structures & Algorithms
- SQL & Database Management
- Advanced Networking

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Quiz Management
- `GET /api/quiz/questions/:grade` - Get questions by grade
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/results/:userId` - Get user results

### Admin Routes
- `GET /api/admin/students` - Get all students
- `GET /api/admin/analytics` - Get platform analytics
- `POST /api/admin/questions` - Add new questions

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker
docker build -t technoboard .
docker run -p 3000:3000 technoboard
```

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by professional assessment platforms
- Designed for educational excellence

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: the.heoster@mail.com
- other  : codeex.care@gmail.com

---

**TechnoBoard** - Empowering technical excellence through innovative assessment 🚀
