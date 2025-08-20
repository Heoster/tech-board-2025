# 🎓 Tech Board 2025 - MCQ Testing System

A comprehensive quiz management platform for Tech Board selection process with secure authentication, timed tests, and complete administrative controls.

## 🌐 Live Application

**🚀 Deployed on Railway**: [https://tech-board.up.railway.app](https://tech-board.up.railway.app)

## ✨ Features

### 🎯 Student Experience
- **Secure Registration** - Roll number, grade, and section validation
- **50-Minute Timed Tests** - Strict time enforcement with auto-submit
- **50 Questions Per Test** - Randomly selected from grade-specific question pools
- **Results Privacy** - Students only see qualification status
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### 🔐 Admin Experience
- **Complete Dashboard** - Tabbed interface with comprehensive controls
- **Results Management** - View all student results with detailed analytics
- **Question Bank Management** - Full CRUD operations for 1,500+ questions
- **Student Management** - Complete oversight of registered students
- **CSV Export** - Export results for further analysis
- **Grade Statistics** - Success rates and performance metrics

### 🛡️ Security & Performance
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Protection against abuse and DDoS attacks
- **Input Validation** - Comprehensive validation on all endpoints
- **CORS Protection** - Configured for production security
- **Optimized Performance** - Cached queries and compressed responses

## 🗄️ Database

- **1,500 Questions** - 300 questions per grade (6, 7, 8, 9, 11)
- **Zero Duplicates** - Verified clean database
- **SQLite** - Lightweight, fast, and reliable
- **Automatic Seeding** - Questions populated during deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm 10+

### Production Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tech-board-2025.git
   cd tech-board-2025
   ```

2. **Complete production setup**
   ```bash
   npm run setup:production
   ```
   This single command will:
   - Install all dependencies
   - Build the client application
   - Set up the database with 1,500 questions
   - Create environment files
   - Configure monitoring and logging
   - Run comprehensive tests

3. **Start the application**
   ```bash
   npm start
   ```

4. **Access the application**
   - Application: http://localhost:8000
   - Health Check: http://localhost:8000/api/health
   - Admin Panel: http://localhost:8000/admin/login

### Development Mode

1. **Start development servers**
   ```bash
   npm run dev
   ```
   This starts both frontend and backend in development mode.

2. **Access development servers**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Production Deployment

#### Deploy to Railway (Recommended)

1. **Prepare for Railway deployment**
   ```bash
   npm run deploy:railway
   ```
   This command will:
   - Run complete production setup
   - Update Railway configuration
   - Create environment variables guide
   - Test the build process

2. **Install Railway CLI and deploy**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

3. **Set environment variables**
   Follow the guide in `railway-env-guide.md` to set up environment variables in Railway dashboard.

4. **Verify deployment**
   ```bash
   npm run verify:railway
   ```

#### Deploy with Docker

1. **Build and run with Docker**
   ```bash
   npm run docker:build
   npm run docker:run
   ```

2. **Or use Docker Compose**
   ```bash
   npm run docker:compose
   ```

#### Deploy with PM2 (VPS/Server)

1. **Start with PM2**
   ```bash
   npm run pm2:start
   ```

2. **Monitor with PM2**
   ```bash
   npm run pm2:logs
   ```

#### Deploy to Other Platforms

The app includes configuration for:
- **Railway** (railway.json, nixpacks.toml)
- **Docker** (Dockerfile)
- **Heroku** (package.json scripts)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `8000` |
| `JWT_SECRET` | JWT signing secret | Required in production |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |
| `DB_PATH` | Database file path | `./database/mcq_system_fixed.db` |

### Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`
- **⚠️ Important**: Change password immediately after first login!

## 📊 API Endpoints

### Public Endpoints
- `GET /` - React application
- `GET /api/health` - Health check
- `GET /api` - API information
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin/login` - Admin login

### Protected Student Endpoints
- `POST /api/quiz/start` - Start quiz
- `POST /api/quiz/submit` - Submit quiz

### Protected Admin Endpoints
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/results` - Complete results
- `GET /api/admin/questions` - Question management
- `POST /api/admin/questions` - Add questions
- `PUT /api/admin/questions/:id` - Edit questions
- `DELETE /api/admin/questions/:id` - Delete questions

## 🧪 Testing

### Complete Functionality Test
```bash
# Test all features (recommended)
npm test

# Test specific components
npm run test:server    # Server-side tests only
npm run test:complete  # Full integration tests
```

### Health Monitoring
```bash
# Check application health
npm run health

# Start monitoring
npm run monitor

# View logs
npm run logs
```

### Performance Testing
```bash
# Test database performance
node test-complete-functionality.js

# Monitor in production
npm run pm2:logs
```

## 📁 Project Structure

```
tech-board-2025/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── config/             # Configuration files
│   ├── database/           # Database files
│   ├── tests/              # Test files
│   └── package.json
├── build-production.js     # Production build script
├── railway.json           # Railway configuration
├── Dockerfile             # Docker configuration
└── README.md
```

## 🔍 Monitoring

### Health Check
Visit `/api/health` to check system status:

```json
{
  "status": "OK",
  "database": { "connected": true },
  "questions": { "total": 1500, "status": "Ready" },
  "features": {
    "authentication": "Available",
    "quizSystem": "Available",
    "adminPanel": "Available"
  }
}
```

### Performance Metrics
- **Page Load**: < 3 seconds
- **API Response**: < 500ms
- **Database Queries**: < 100ms
- **Concurrent Users**: 100+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

1. **Build Failures**
   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall dependencies
   - Check build logs for specific errors

2. **Database Issues**
   - Run `node ensure-300-questions.js` to seed database
   - Check database file permissions
   - Verify SQLite is properly installed

3. **Authentication Issues**
   - Verify JWT_SECRET is set in production
   - Check CORS_ORIGIN matches your domain
   - Ensure admin credentials are correct

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/your-username/tech-board-2025/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/tech-board-2025/discussions)

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Bulk student import
- [ ] Question categories and tags
- [ ] Mobile app (React Native)

## 🏆 Acknowledgments

- Built with React, Node.js, and SQLite
- Deployed on Railway
- UI components inspired by modern design principles
- Security best practices implemented throughout

---

**Tech Board 2025** - Empowering educational institutions with modern quiz management technology.

Made with ❤️ for educational excellence.# tech-board-2025
