# Tech Board 2025 - Complete Deployment Guide

## 🚀 Quick Start (Recommended)

The fastest way to deploy the complete application with frontend and backend:

```bash
# Clone and navigate to project
cd tech-board-2025-main

# Run complete build and deployment
node build-and-deploy.js
```

This will:
- Install all dependencies
- Build React frontend
- Setup database
- Copy frontend to server
- Start production server on port 8000

## 📋 System Requirements

- **Node.js**: >= 18.0.0
- **NPM**: >= 9.0.0
- **Memory**: >= 512MB RAM
- **Storage**: >= 100MB free space
- **OS**: Windows, macOS, or Linux

## 🎯 Deployment Options

### Option 1: Complete Production Server (Recommended)

```bash
# Start complete production server
node complete-production-server.js
```

**Features:**
- Integrated frontend and backend
- Production-ready security middleware
- Rate limiting and compression
- Health checks and monitoring
- Fallback UI if React build missing

### Option 2: Docker Deployment

```bash
# Using Docker Compose (easiest)
docker-compose up -d

# Or build and run manually
docker build -f Dockerfile.production -t tech-board-2025 .
docker run -p 8000:8000 tech-board-2025
```

### Option 3: Railway Deployment

```bash
# Prepare for Railway
npm run deploy:railway

# Follow the Railway setup instructions
# Then deploy with Railway CLI
railway up
```

### Option 4: Manual Setup

```bash
# 1. Install dependencies
npm install
npm install --prefix server
npm install --prefix client

# 2. Build frontend
npm run build --prefix client

# 3. Copy frontend to server
# Windows:
xcopy "client\dist" "server\public" /E /I /Y
# Unix/Mac:
cp -r client/dist/* server/public/

# 4. Start server
node complete-production-server.js
```

## 🔧 Environment Configuration

### Production Environment Variables

Copy `production.env` and update these values:

```bash
NODE_ENV=production
PORT=8000
JWT_SECRET=your-super-secure-jwt-secret-here
DB_PATH=./server/database/mcq_system_fixed.db
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_MAX=500
```

### Important Security Notes

- **Change JWT_SECRET** to a random 64+ character string
- **Update CORS_ORIGIN** to your actual domain
- **Change admin password** after first login (admin/admin123)

## 🗄️ Database Information

- **Type**: SQLite
- **Location**: `server/database/mcq_system_fixed.db`
- **Size**: ~632KB
- **Questions**: 1,620 total (300 per grade: 6,7,8,9,11)
- **Features**: Unique constraints, foreign keys, proper indexing

## 🌐 Application URLs

After deployment, access these endpoints:

- **Main App**: `http://localhost:8000`
- **Health Check**: `http://localhost:8000/health`
- **API Info**: `http://localhost:8000/api`
- **Admin Login**: `http://localhost:8000/admin/login`
- **Student Registration**: `http://localhost:8000/register`

## 🔐 Default Credentials

**Admin Access:**
- Username: `admin`
- Password: `admin123`
- **⚠️ IMPORTANT**: Change password immediately after first login!

## 📊 System Features

### Frontend (React SPA)
- Modern responsive UI
- Admin dashboard
- Student registration/login
- Quiz interface
- Results tracking
- Performance analytics

### Backend (Node.js/Express)
- RESTful API endpoints
- JWT authentication
- Rate limiting
- Security middleware
- Database management
- File serving

### Database Features
- 1,620 curriculum-aligned MCQs
- 5 grade levels (6,7,8,9,11)
- Difficulty distribution (50% basic, 35% medium, 15% advanced)
- Student management
- Quiz results tracking
- Admin analytics

## 🔍 Health Monitoring

### Health Check Endpoint
```bash
curl http://localhost:8000/health
```

**Response includes:**
- Server status
- Database connectivity
- Memory usage
- Uptime
- Environment info

### API Status
```bash
curl http://localhost:8000/api
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Change port in production.env
PORT=8001
```

**Database Issues:**
```bash
# Verify database
npm run verify:production

# Recreate database
rm server/database/mcq_system_fixed.db
node build-and-deploy.js
```

**Frontend Not Loading:**
```bash
# Rebuild frontend
npm run build --prefix client
# Copy to server
cp -r client/dist/* server/public/
```

**Permission Errors (Linux/Mac):**
```bash
# Fix permissions
chmod +x build-and-deploy.js
chmod +x complete-production-server.js
```

### Log Files

Check these locations for logs:
- Console output during startup
- Browser developer tools for frontend issues
- `server/logs/` directory (if configured)

## 🚀 Production Deployment Checklist

- [ ] Environment variables configured
- [ ] JWT_SECRET changed from default
- [ ] CORS_ORIGIN set to production domain
- [ ] Admin password changed
- [ ] Database verified (1,620 questions)
- [ ] Frontend built and copied
- [ ] Health check responding
- [ ] SSL/HTTPS configured (if applicable)
- [ ] Firewall rules configured
- [ ] Backup strategy in place

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify system requirements
3. Check console logs for error messages
4. Ensure all dependencies are installed
5. Try rebuilding from scratch

## 🎉 Success Verification

Your deployment is successful when:

- Health check returns `{"status":"healthy"}`
- Admin dashboard accessible at `/admin/login`
- Student registration works at `/register`
- Quiz system functional
- Database contains 1,620 questions
- All API endpoints responding

**Congratulations! Your Tech Board 2025 MCQ system is now running in production!** 🎊
