# 🚀 Railway Deployment Guide for MCQ Testing System

## Quick Deploy to Railway

### 1. One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

### 2. Manual Deployment Steps

#### Step 1: Create Railway Project
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init
```

#### Step 2: Set Environment Variables
In Railway dashboard, set these environment variables:

```env
NODE_ENV=production
PORT=8000
JWT_SECRET=your-secure-jwt-secret-for-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
DB_PATH=./database/mcq_system.db
FRONTEND_URL=https://your-railway-app.railway.app
```

#### Step 3: Deploy
```bash
# Deploy to Railway
railway up
```

## 🔧 Configuration Files

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run railway:build"
  },
  "deploy": {
    "startCommand": "npm run railway:start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### nixpacks.toml
```toml
[phases.setup]
nixPkgs = ['nodejs-18_x', 'npm-9_x']

[phases.install]
cmds = [
    'npm ci',
    'cd server && npm ci',
    'cd client && npm ci'
]

[phases.build]
cmds = [
    'cd client && npm run build',
    'cd server && npm run seed:250'
]

[start]
cmd = 'cd server && npm start'
```

## 📊 System Features for Railway

### ✅ Production Ready Features
- **Ultra-Strict No-Duplicates System**: 1,250+ questions with zero repetition
- **Database Auto-Seeding**: Automatically seeds 250+ questions per grade
- **Health Check Endpoint**: `/health` for Railway monitoring
- **Error Handling**: Comprehensive error handling and logging
- **Security**: CORS, Helmet, Rate limiting configured
- **Graceful Shutdown**: Proper cleanup on container restart

### 🔒 Security Configuration
- Production CORS settings
- Secure JWT authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- SQL injection protection

### 📈 Performance Optimizations
- SQLite database with optimized indexes
- Efficient question selection algorithms
- Memory-efficient duplicate prevention
- Compressed responses
- Connection pooling

## 🎯 Post-Deployment Verification

After deployment, verify these endpoints:

1. **Health Check**: `https://your-app.railway.app/health`
2. **API Status**: `https://your-app.railway.app/api/auth/verify`
3. **Admin Login**: Use the admin credentials you set
4. **Student Registration**: Test the registration flow

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in package.json
2. **Database Issues**: Ensure DB_PATH is set correctly
3. **CORS Errors**: Update FRONTEND_URL environment variable
4. **Memory Issues**: Railway provides 512MB by default, should be sufficient

### Logs:
```bash
# View deployment logs
railway logs

# View real-time logs
railway logs --follow
```

## 📚 Database Information

- **Total Questions**: 1,250 across all grades
- **Grades Supported**: 6, 7, 8, 9, 11
- **Questions per Grade**: 250+ each
- **Distribution**: ~60% Basic, ~30% Medium, ~10% Advanced
- **Unique Quizzes**: 10+ per student per grade

## 🎉 Success Indicators

Your deployment is successful when you see:
- ✅ Health check returns `{"status": "OK"}`
- ✅ Database initialized with 1,250+ questions
- ✅ Ultra-strict constraints applied
- ✅ All API endpoints responding
- ✅ Admin login working
- ✅ Student registration functional

## 🔒 Absolute Guarantee

**No single question will repeat in any test for any student.**

The system provides absolute guarantees through:
- 7-layer duplicate prevention
- Database-level constraints
- Real-time integrity monitoring
- Comprehensive validation algorithms