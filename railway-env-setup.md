# Railway Environment Variables Setup

## Required Environment Variables

Set these in your Railway project dashboard under "Variables":

### Core Configuration
```env
NODE_ENV=production
PORT=8000
```

### Security Configuration
```env
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-immediately
CORS_ORIGIN=https://your-app-name.up.railway.app
```

### Database Configuration (Optional - uses defaults if not set)
```env
DB_PATH=./database/mcq_system_fixed.db
```

### Performance Configuration (Optional)
```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
COMPRESSION_ENABLED=true
STATIC_CACHE_MAX_AGE=86400000
```

## How to Set Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Variables" tab
4. Add each variable with its value
5. Deploy your application

## Important Notes

- **JWT_SECRET**: Must be a strong, unique secret key
- **CORS_ORIGIN**: Replace with your actual Railway app URL
- **PORT**: Railway automatically sets this, but 8000 is the fallback
- All other variables have sensible defaults if not set

## Verification

After setting variables, check the health endpoint:
```
https://your-app-name.up.railway.app/api/health
```

This should return a JSON response with status "OK" and all features listed as "Available".