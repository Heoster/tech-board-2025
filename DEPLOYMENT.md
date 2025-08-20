# Deployment Guide

## Docker Deployment

### Quick Start with Docker Compose
```bash
# Build and run with docker-compose
npm run docker:compose

# Or manually:
docker-compose up --build
```

### Manual Docker Build
```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run

# Or manually:
docker build -t mcq-system .
docker run -p 8000:8000 -e JWT_SECRET=your-secret-key mcq-system
```

### Environment Variables
- `NODE_ENV`: Set to `production` for production deployment
- `PORT`: Server port (default: 8000)
- `JWT_SECRET`: Secret key for JWT tokens (required in production)
- `DB_PATH`: Database file path (optional, defaults to `./database/mcq_system.db`)

### Health Check
The application includes a health check endpoint at `/api/health` that returns:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-08-11T12:00:00.000Z",
  "environment": "production"
}
```

## Railway Deployment

The application is configured for Railway deployment with:
- `railway:build` script for build process
- `railway:start` script for starting the application
- Automatic database initialization

## Production Checklist

- [ ] Set `JWT_SECRET` environment variable
- [ ] Set `NODE_ENV=production`
- [ ] Ensure database directory is writable
- [ ] Configure proper logging
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategy for database
- [ ] Test health check endpoint
- [ ] Verify all API endpoints are working
- [ ] Test performance monitoring features

## Performance Monitoring

The application includes built-in performance monitoring:
- Core Web Vitals tracking (FCP, LCP, FID, CLS, TTFB)
- Server performance metrics
- Database query performance
- Memory usage monitoring
- SEO performance scoring

Access performance data via:
- `/api/performance/metrics` - Current metrics
- `/api/performance/health` - Health status with performance info
- Client-side performance monitoring with `usePerformance` hook

## SEO Optimization

The application includes comprehensive SEO features:
- Meta tags generation
- Structured data (JSON-LD)
- Sitemap generation utilities
- Performance-based SEO recommendations
- Core Web Vitals optimization

## Troubleshooting

### Container fails to start
- Check if all required environment variables are set
- Verify the database directory is accessible
- Check logs: `docker logs <container-id>`

### Database issues
- Ensure database directory has write permissions
- Check if database file exists and is not corrupted
- Run production setup: `npm run setup:prod`

### Performance issues
- Monitor memory usage via health endpoint
- Check database query performance
- Review Core Web Vitals metrics
- Use performance monitoring dashboard