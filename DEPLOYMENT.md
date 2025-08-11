# Deployment Guide

## Production Configuration
- Domain: https://tech-board.up.railway.app
- Environment: Production
- Database: SQLite (auto-created)

## Deploy to Railway
1. Connect GitHub repository to Railway
2. Set environment variables from `.env.production`
3. Deploy using `Dockerfile`

## Environment Variables
```
NODE_ENV=production
PORT=8000
JWT_SECRET=tech-board-2025-super-secret-jwt-key-production
DB_PATH=./database/mcq_system.db
FRONTEND_URL=https://tech-board.up.railway.app
CORS_ORIGIN=https://tech-board.up.railway.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOW_MULTIPLE_ATTEMPTS=false
```

## Health Check
- Endpoint: `/api/health`
- Expected: `{"status":"OK","timestamp":"...","environment":"production"}`

## Security Features
- ✅ Helmet security headers
- ✅ CORS configured for domain
- ✅ Rate limiting (100 req/15min)
- ✅ CSRF protection
- ✅ Input sanitization
- ✅ Error handling

App is ready for production deployment.