# 🚀 Railway Deployment - TECH BOARD MCQ System

## 🎯 Your Railway App
**URL**: https://tech-board.up.railway.app

## 🔧 Required Railway Environment Variables

Set these in your Railway dashboard:

```env
NODE_ENV=production
PORT=8000
JWT_SECRET=mcq-testing-system-railway-jwt-secret-2025-ultra-secure
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
DB_PATH=./database/mcq_system.db
FRONTEND_URL=https://tech-board.up.railway.app
```

## 📋 Deployment Steps

### 1. Push Latest Changes
```bash
git add .
git commit -m "🚀 Railway deployment configuration"
git push origin main
```

### 2. Railway Auto-Deploy
Railway will automatically detect the changes and redeploy.

### 3. Monitor Deployment
Check Railway dashboard for:
- ✅ Build logs
- ✅ Deploy logs  
- ✅ Runtime logs

## 🔍 Verification Endpoints

After deployment, test these URLs:

1. **Health Check**: https://tech-board.up.railway.app/health
2. **API Status**: https://tech-board.up.railway.app/api/auth/verify
3. **Admin Login**: https://tech-board.up.railway.app/api/auth/admin/login

## 🎯 Expected Responses

### Health Check
```json
{
  "status": "OK",
  "timestamp": "2025-08-06T10:30:00.000Z"
}
```

### API Auth Verify (without token)
```json
{
  "success": false,
  "error": {
    "code": "NO_TOKEN",
    "message": "No token provided"
  }
}
```

## 🔒 System Features on Railway

### ✅ Ultra-Strict No-Duplicates System
- **1,250+ questions** across 5 grades
- **Zero question repetition** guaranteed
- **7-layer duplicate prevention**
- **Database-level constraints**

### 📊 Question Distribution
- **Grade 6**: 250 questions
- **Grade 7**: 250 questions  
- **Grade 8**: 250 questions
- **Grade 9**: 250 questions
- **Grade 11**: 250 questions

### 🎯 Quiz Capacity
- **10+ unique quizzes** per student per grade
- **Supports hundreds of students**
- **No question exhaustion**

## 🚨 Troubleshooting

### If deployment fails:

1. **Check Railway Logs**:
   - Go to Railway dashboard
   - Click on your service
   - Check "Deployments" tab
   - View build and runtime logs

2. **Common Issues**:
   - Missing environment variables
   - Database seeding timeout
   - Memory limits exceeded
   - Port binding issues

3. **Quick Fixes**:
   ```bash
   # Force redeploy
   git commit --allow-empty -m "Force Railway redeploy"
   git push origin main
   ```

### If app is slow to start:
- Railway may take 2-3 minutes for first startup
- Database seeding adds ~30 seconds
- Subsequent starts are faster

## 🎉 Success Indicators

Your deployment is successful when:

- ✅ https://tech-board.up.railway.app/health returns `{"status": "OK"}`
- ✅ Railway logs show "Database initialized successfully"
- ✅ Railway logs show "🔒 ULTRA-STRICT: Database-level duplicate prevention active"
- ✅ Railway logs show "Server running on 0.0.0.0:8000"

## 🔐 Admin Access

Once deployed, you can access the admin panel:

1. **Admin Login**: Use the credentials you set in environment variables
2. **Default**: username: `admin`, password: `admin123`
3. **Change these** in Railway environment variables for security

## 📱 Student Access

Students can:
1. Register with roll number, grade, and section
2. Take unique 25-question quizzes
3. No question repetition across multiple attempts
4. Automatic scoring and results

## 🔒 Absolute Guarantee

**No single question will repeat in any test for any student.**

The system provides this guarantee through:
- Database-level unique constraints
- Application-level validation (7 layers)
- Real-time integrity monitoring
- Comprehensive error handling

## 📞 Support

If you encounter issues:
1. Check Railway dashboard logs
2. Verify environment variables are set
3. Test the verification endpoints
4. Check database seeding completed successfully

Your Railway app is configured for the TECH BOARD 2025 Selection Test with absolute question uniqueness guaranteed!