# 🎓 MCQ Testing System - Render Deployment Ready

A complete Multiple Choice Question testing system designed for TECH BOARD 2025 Selection Test, optimized for deployment on Render.com.

## ✨ Features

- **Student Registration & Authentication** - Secure student registration with roll number validation
- **Grade-based Quiz System** - Supports grades 6, 7, 8, 9, and 11
- **Timed Quizzes** - 30-minute timer with automatic submission
- **Real-time Scoring** - Instant results after quiz completion
- **Admin Panel** - Question management and student monitoring
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Built with React, TypeScript, and Tailwind CSS

## 🚀 Deploy to Render (Recommended)

This application is specifically configured for Render.com deployment.

### One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deployment

1. **Fork this repository** to your GitHub account

2. **Create a new Web Service** on [Render.com](https://render.com):
   - Connect your GitHub repository
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

3. **Set Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-secure-jwt-secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   CORS_ORIGINS=https://your-app-name.onrender.com
   ```

4. **Add Persistent Disk** for database:
   - Mount Path: `/opt/render/project/src/database`
   - Size: 1GB

5. **Deploy** - Your app will be available at `https://your-app-name.onrender.com`

For detailed deployment instructions, see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

## 🏃‍♂️ Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/Heoster/tech-board-2025-selection-test.git
cd tech-board-2025-selection-test

# 2. Install dependencies
npm install
cd server && npm install
cd ../client && npm install

# 3. Seed the database with 250+ questions per grade
cd ../server && npm run seed:250

# 4. Start the development servers
cd .. && start-dev.bat  # Windows
# OR manually:
# Terminal 1: cd server && npm start
# Terminal 2: cd client && npm run dev

# 5. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

### 🔐 Default Credentials
- **Admin**: username: `admin`, password: `admin123`
- **Test Student**: Roll: `1`, Grade: `8`, Section: `A`, Password: `student123`

## 🔒 Ultra-Strict No-Duplicates System

This system implements a **7-layer duplicate prevention system** that **absolutely guarantees no question repetition** in any test:

### ✅ **Absolute Guarantees**
- 🔒 **No question repeats within any single quiz** (25 unique questions always)
- 🔒 **No question repeats across multiple quizzes for the same student**
- 🔒 **Database-level protection** even if application logic fails
- 🔒 **Real-time monitoring** of any potential violations

### 📊 **Question Bank Statistics**
- **Total Questions**: 1,250+ questions across all grades
- **Per Grade**: 250+ questions each (Grades 6, 7, 8, 9, 11)
- **Distribution**: ~60% Basic, ~30% Medium, ~10% Advanced
- **Quiz Variety**: Each grade can generate 10+ completely unique quizzes
- **Capacity**: Supports hundreds of students without question exhaustion

### 🚀 **Database Seeding**

```bash
# Seed all grades with 250+ questions each (RECOMMENDED)
cd server && npm run seed:250

# Verify all grades have sufficient questions
node verify-250-questions.js

# Test the ultra-strict no-duplicates system
node test-no-duplicates.js

# Verify complete system integrity
node verify-ultra-strict-system.js
```

### 🔧 **7-Layer Duplicate Prevention**

1. **Database Constraints**: Unique indexes prevent duplicates at database level
2. **Database Triggers**: Block duplicate questions during insertion
3. **Application-Level Checking**: 5 different duplicate checks per question
4. **Cross-Quiz Tracking**: Maintains history of all used questions per student
5. **Multi-Phase Validation**: Pre, during, and post-selection validation
6. **Integrity Monitoring**: Real-time views monitor system health
7. **Comprehensive Testing**: Automated test suite validates no duplicates

### 📈 **System Capacity**
- **Grade 6**: 250 questions → ~10 unique quizzes per student
- **Grade 7**: 250 questions → ~10 unique quizzes per student
- **Grade 8**: 250 questions → ~10 unique quizzes per student
- **Grade 9**: 250 questions → ~10 unique quizzes per student
- **Grade 11**: 250 questions → ~10 unique quizzes per student

### 🎯 **Technical Implementation**
- Ultra-strict question selection algorithm with multiple validation layers
- Database triggers for automatic duplicate prevention
- Integrity monitoring views for real-time system health
- Comprehensive error handling and logging
- Production-ready localhost-only security configuration

## 🛠️ Local Development

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Quick Start
```bash
# Clone and install
git clone <your-repo-url>
cd mcq-testing-system
npm run install:all

# Start development servers
npm run dev
```

**Access locally:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

## 📁 Project Structure

```
mcq-testing-system/
├── client/                     # React TypeScript Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── admin/         # Admin panel components
│   │   │   └── student/       # Student dashboard components
│   │   ├── contexts/          # React contexts
│   │   └── App.tsx            # Main app component
│   ├── public/                # Static assets
│   ├── package.json           # Client dependencies
│   └── vite.config.ts         # Vite configuration
├── server/                     # Node.js Backend
│   ├── routes/                # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── quiz.js           # Quiz management routes
│   │   ├── admin.js          # Admin routes
│   │   └── students.js       # Student routes
│   ├── middleware/            # Express middleware
│   ├── config/               # Database configuration
│   ├── utils/                # Utility functions
│   ├── scripts/              # Database seeding scripts
│   └── index.js              # Main server file
├── database/                   # SQLite database files
├── package.json               # Root package.json
└── README.md                  # This file
```

## 🛠️ Development Commands

### Root Level Commands
```bash
# Install all dependencies (root, client, server)
npm run install:all

# Start both client and server in development mode
npm run dev

# Start only the client development server
npm run client:dev

# Start only the server development server
npm run server:dev
```

### Client Commands (run from /client directory)
```bash
cd client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Server Commands (run from /server directory)
```bash
cd server

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run database seeding
npm run seed
```

## 🎯 Usage Guide

### For Students

1. **Registration**
   - Navigate to http://localhost:5173
   - Click "Register" 
   - Fill in: Name, Roll Number (1-80), Grade, Section (A/B), Password
   - Submit registration

2. **Login**
   - Use your registered credentials to login
   - Access your student dashboard

3. **Taking a Quiz**
   - Click "Start Quiz" from your dashboard
   - Answer 25 questions based on your grade level
   - Submit before the 30-minute timer expires
   - View your results immediately

### For Administrators

1. **Admin Access**
   - Navigate to http://localhost:5173/admin
   - **Login Credentials (consistent across all servers):**
     - Username: `admin`
     - Password: `admin123`

2. **Managing Questions**
   - Add new questions for different grades
   - Edit existing questions
   - Set difficulty levels and subjects

3. **Monitoring Students**
   - View registered students
   - Check quiz results and scores
   - Export data for analysis

## 🔧 Configuration

### Environment Variables

**For Render Deployment** (set in Render dashboard):
```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your-secure-jwt-secret
DB_PATH=./database/mcq_system.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CORS_ORIGINS=https://your-app-name.onrender.com
```

**For Local Development** (`server/.env`):
```env
PORT=8000
NODE_ENV=development
JWT_SECRET=mcq-testing-system-jwt-secret-2025
DB_PATH=./database/mcq_system.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**🔑 Standardized Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`
- These credentials are consistent across all server deployments

### Database Setup

The SQLite database is automatically created and seeded with consistent data:

**Option 1: Automatic Setup**
```bash
setup-complete.bat  # Complete setup including database
```

**Option 2: Database Only**
```bash
init-database.bat   # Initialize database with default data
```

**Option 3: Manual Setup**
```bash
cd server
npm run seed        # Seed database with sample questions
```

**🗄️ Consistent Database Content:**
- Default admin account (admin/admin123)
- Sample student account (Roll: 2, Grade: 8, Section: A, Password: student123)
- Sample questions for all supported grades
- Identical database structure across all deployments

## 🎓 Supported Grades & Question Types

- **Grade 6**: Elementary computer science concepts
- **Grade 7**: Intermediate programming and logic
- **Grade 8**: Advanced programming concepts
- **Grade 9**: Data structures and algorithms
- **Grade 11**: Advanced computer science topics

## 🔒 Strict No Duplicate Questions Rule

**GUARANTEED**: No question with the same ID will ever repeat in any test.

### **Multi-Layer Protection:**
1. **Algorithm Level**: Question selection logic prevents duplicates
2. **Database Level**: Unique constraints prevent duplicate responses
3. **Validation Level**: Multiple validation checks before quiz generation
4. **Submission Level**: Validates no duplicate questions in answers

### **Testing the Rule:**
```bash
test-no-duplicates.bat  # Verify no duplicates are generated
```

### **Technical Implementation:**
- ✅ **Set-based Selection**: Uses Set data structure to prevent duplicates
- ✅ **Database Constraints**: Unique index on (quiz_id, question_id)
- ✅ **Validation Triggers**: Database triggers prevent duplicate insertions
- ✅ **Application Validation**: Multiple validation layers in code
- ✅ **Submission Checks**: Validates uniqueness before processing answers

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **Input Validation** - Server-side validation for all inputs
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Protection** - Cross-origin request security
- **SQL Injection Prevention** - Parameterized database queries

## 🧪 Testing Authentication

After running `setup-complete.bat`, test that login and signup work:

### **Quick Test**
```bash
test-auth.bat  # Starts servers and opens browser for testing
```

### **API Verification**
```bash
verify-api.bat  # Tests API endpoints directly
```

### **Manual Testing Steps**
1. **Test Registration:**
   - Go to http://localhost:5173
   - Click "Register"
   - Fill form: Name, Roll (1-80), Grade, Section, Password
   - Submit and verify success

2. **Test Login:**
   - Use registered credentials or sample student:
   - Roll: 2, Grade: 8, Section: A, Password: student123

3. **Test Admin Login:**
   - Go to http://localhost:5173/admin
   - Username: admin, Password: admin123

## 🐛 Troubleshooting

### Authentication Issues

1. **Registration/Login not working**
   ```bash
   # Check if API is accessible
   curl http://localhost:8000/health
   
   # Verify database exists
   dir database
   
   # Check client environment
   type client\.env
   ```

2. **API connection errors**
   ```bash
   # Ensure client points to correct API
   echo VITE_API_URL=http://localhost:8000/api > client\.env
   
   # Restart client
   cd client && npm run dev
   ```

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on ports 5173 or 8000
   npx kill-port 5173 8000
   ```

2. **Dependencies not installing**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   npm run install:all
   ```

3. **Database connection issues**
   ```bash
   # Reinitialize database
   init-database.bat
   ```

4. **Build errors**
   ```bash
   # Clear build cache
   cd client
   rm -rf dist node_modules
   npm install
   npm run build
   ```

### Getting Help

If you encounter issues:
1. Check the console logs in both client and server
2. Ensure all dependencies are installed correctly
3. Verify environment variables are set properly
4. Check that ports 5173 and 8000 are available

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/verify` - Token verification

### Quiz Management
- `POST /api/quiz/generate` - Generate quiz for student
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/results/:id` - Get quiz results

### Admin
- `GET /api/admin/students` - Get all students
- `GET /api/admin/results` - Get all quiz results
- `POST /api/admin/questions` - Add new questions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for TECH BOARD 2025 Selection Test
- Designed for educational assessment purposes
- Thanks to all contributors and testers

---
## for .env at server/ 
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DB_PATH=./database/mcq_system.db
NODE_ENV=development

## for .env at client/
VITE_API_URL=your-api-url

This document is written by harsh only for the purpose of MCQ testing system and helps you to solve any arror if you are facing. 

⚠️ Security Warning: Handle Environment Variables Responsibly
If you encounter any errors during setup or deployment, please troubleshoot carefully and ensure all configurations are correct.
Important Notice:
Do not misuse environment variables. Under no circumstances should sensitive information—such as database credentials—be exposed in public repositories or shared carelessly. If a database is found in any public source:
- It may be considered a serious breach of trust and professionalism.
- Such actions are unforgivable and may lead to permanent consequences, including revocation of access or legal implications.

**Happy Testing! 🎓**   
