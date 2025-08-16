# 🗄️ Database Setup Guide

## ✅ Database Status: WORKING

Your Tech Board 2025 database has been successfully set up and is working properly!

## 📍 Database Location
- **Path**: `server/database/mcq_system_fixed.db`
- **Size**: ~86KB
- **Type**: SQLite3

## 🔧 Quick Setup Commands

### 1. Fix/Reset Database
```bash
npm run db:fix
```
This will:
- Remove old database
- Create fresh database with proper schema
- Add admin user (username: admin, password: admin123)
- Add 150 sample questions (30 per grade)

### 2. Test Database
```bash
npm run db:test
```
This will verify:
- Database connection
- All tables exist
- Admin user exists
- Question counts are correct

### 3. Complete Database Setup
```bash
npm run db:setup
```
This runs both fix and test commands.

### 4. Start Server
```bash
npm run server:start
```
This starts the server with the working database.

## 📊 Current Database Content

### Tables Created
- ✅ **students** - Student registrations
- ✅ **admins** - Admin users
- ✅ **questions** - Quiz questions
- ✅ **options** - Question options
- ✅ **quizzes** - Quiz sessions
- ✅ **quiz_answers** - Student answers

### Sample Data Added
- ✅ **Admin User**: username=admin, password=admin123
- ✅ **Questions**: 150 total (30 per grade: 6, 7, 8, 9, 11)
- ✅ **Options**: 600 total (4 options per question)

### Question Distribution
- Grade 6: 30 questions (10 basic, 10 medium, 10 advanced)
- Grade 7: 30 questions (10 basic, 10 medium, 10 advanced)
- Grade 8: 30 questions (10 basic, 10 medium, 10 advanced)
- Grade 9: 30 questions (10 basic, 10 medium, 10 advanced)
- Grade 11: 30 questions (10 basic, 10 medium, 10 advanced)

## 🔐 Default Credentials

### Admin Login
- **URL**: http://localhost:8000/admin/login
- **Username**: `admin`
- **Password**: `admin123`

### Test Student Registration
- **URL**: http://localhost:8000/register
- **Roll Number**: Any unique number (e.g., 123)
- **Grade**: 6, 7, 8, 9, or 11
- **Section**: A, B, or C
- **Password**: Any secure password

## 🧪 Testing Your Database

### 1. Manual Database Check
```bash
# Connect to database directly
sqlite3 server/database/mcq_system_fixed.db

# Check tables
.tables

# Check admin user
SELECT * FROM admins;

# Check question counts
SELECT grade, COUNT(*) FROM questions GROUP BY grade;

# Exit
.quit
```

### 2. API Health Check
```bash
# Start server
npm run server:start

# In another terminal, check health
curl http://localhost:8000/api/health
```

### 3. Web Interface Test
1. Start server: `npm run server:start`
2. Open browser: http://localhost:8000
3. Try admin login: http://localhost:8000/admin/login
4. Try student registration: http://localhost:8000/register

## 🔄 Database Management

### Reset Database
```bash
npm run db:fix
```

### Backup Database
```bash
# Manual backup
cp server/database/mcq_system_fixed.db server/database/backup_$(date +%Y%m%d_%H%M%S).db
```

### Add More Questions
Edit `fix-database.js` and modify the `addSampleQuestions` function to add more questions, then run:
```bash
npm run db:fix
```

## 🚨 Troubleshooting

### Database Connection Issues
1. Check if database file exists: `ls -la server/database/`
2. Check file permissions
3. Run database fix: `npm run db:fix`

### Schema Issues
1. Delete database: `rm server/database/mcq_system_fixed.db`
2. Run setup: `npm run db:setup`

### Missing Dependencies
```bash
npm install sqlite3 bcrypt
```

## 📈 Production Deployment

For production deployment, the database will be automatically set up with:
- 1,500 questions (300 per grade)
- Proper admin credentials
- Optimized performance settings

### Railway Deployment
The database will be automatically created during Railway deployment using the production setup scripts.

## ✅ Success Indicators

Your database is working if you see:
- ✅ Database connected successfully
- ✅ All tables exist
- ✅ Admin user exists
- ✅ Questions loaded (150+ questions)
- ✅ Server starts without errors
- ✅ Health check returns OK status

## 🎉 Next Steps

1. **Start Development**: `npm run server:start`
2. **Test Admin Panel**: Login with admin/admin123
3. **Test Student Flow**: Register a test student
4. **Add More Questions**: Modify the database setup script
5. **Deploy to Production**: Use Railway deployment scripts

Your database is now fully functional and ready for development and testing! 🚀