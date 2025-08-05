# 🎓 MCQ Testing System - Production Ready

A complete Multiple Choice Question testing system designed for TECH BOARD 2025 Selection Test.

## ✨ Features

- **Student Registration & Authentication** - Secure student registration with roll number validation
- **Grade-based Quiz System** - Supports grades 6, 7, 8, 9, and 11
- **Timed Quizzes** - 30-minute timer with automatic submission
- **Real-time Scoring** - Instant results after quiz completion
- **Admin Panel** - Question management and student monitoring
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Deploy

### Railway (Recommended)
```bash
# Clone and deploy
git clone <your-repo-url>
cd simple-deploy
railway login
railway init
railway up
```

### Heroku
```bash
# Clone and deploy
git clone <your-repo-url>
cd simple-deploy
heroku create your-app-name
git push heroku main
```

### Docker
```bash
# Build and run
docker build -t mcq-system .
docker run -p 8000:8000 mcq-system
```

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd simple-deploy
   ```

2. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open http://localhost:8000 in your browser

## 📁 Project Structure

```
simple-deploy/
├── client/
│   └── index.html          # Frontend (HTML/CSS/JS)
├── server/
│   ├── config/             # Database configuration
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── utils/              # Utility functions
│   └── index.js            # Main server file
├── database/
│   └── mcq_system.db       # SQLite database
├── package.json            # Dependencies
├── Procfile               # Heroku configuration
└── railway.json           # Railway configuration
```

## 🎯 Usage

### For Students
1. **Register** - Enter name, roll number (1-80), grade, section, and password
2. **Login** - Use your credentials to access the system
3. **Take Quiz** - Start a 25-question quiz based on your grade
4. **Submit** - Complete within 30 minutes for automatic scoring

### For Administrators
1. **Login** - Use admin credentials at `/admin`
2. **Manage Questions** - Add, edit, or remove quiz questions
3. **View Results** - Monitor student performance and scores
4. **Export Data** - Download student results and analytics

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 8000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT tokens
- `DB_PATH` - Database file path
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password

### Supported Grades
- Grade 6: Elementary level
- Grade 7: Intermediate level
- Grade 8: Advanced intermediate
- Grade 9: Pre-advanced level
- Grade 11: Advanced level

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **Input Validation** - Server-side validation for all inputs
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Protection** - Cross-origin request security
- **SQL Injection Prevention** - Parameterized queries

## 📊 Database Schema

### Students Table
- `id` - Primary key
- `name` - Student name
- `roll_number` - Roll number (1-80)
- `grade` - Grade level
- `section` - Section (A/B)
- `password_hash` - Encrypted password

### Questions Table
- `id` - Primary key
- `question_text` - Question content
- `grade` - Target grade
- `subject` - Subject category
- `difficulty` - Difficulty level

### Quiz Results Table
- `id` - Primary key
- `student_id` - Foreign key to students
- `score` - Quiz score
- `total_questions` - Total questions
- `completed_at` - Completion timestamp

## 🚨 Production Checklist

- [ ] Change JWT_SECRET in production
- [ ] Update CORS origins for your domain
- [ ] Set strong admin password
- [ ] Configure proper database backup
- [ ] Set up monitoring and logging
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up error tracking

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built for TECH BOARD 2025 Selection Test** 🎓