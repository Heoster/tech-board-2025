# Render Deployment Guide

This MCQ Testing System is configured to run specifically on Render.com.

## Quick Deploy

1. **Fork/Clone this repository** to your GitHub account

2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure the service**:
   - **Name**: `mcq-testing-system`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

4. **Environment Variables** (set in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-secure-jwt-secret-here
   DB_PATH=./database/mcq_system.db
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   CORS_ORIGINS=https://your-app-name.onrender.com
   ```

5. **Add Persistent Disk** (for database):
   - In your service settings, add a disk
   - **Name**: `mcq-database`
   - **Mount Path**: `/opt/render/project/src/database`
   - **Size**: 1GB (free tier)

## Auto-Deploy with render.yaml

This repository includes a `render.yaml` file for automatic deployment:

1. Push your code to GitHub
2. In Render dashboard, go to "Blueprint" → "New Blueprint Instance"
3. Connect your repository
4. Render will automatically configure everything based on `render.yaml`

## Post-Deployment Setup

1. **Access your app** at `https://your-app-name.onrender.com`
2. **Seed the database** (if needed):
   - Go to your service shell in Render dashboard
   - Run: `npm run seed:complete`
3. **Admin login**: Use the credentials you set in environment variables

## Important Notes

- **Free tier limitations**: 
  - Service spins down after 15 minutes of inactivity
  - 750 hours/month limit
  - Database persists on disk storage

- **Database**: SQLite database is stored on persistent disk and survives deployments

- **CORS**: Make sure to update `CORS_ORIGINS` with your actual Render URL

- **Security**: Change default admin credentials in production

## Troubleshooting

- **Build fails**: Check that all dependencies are in package.json
- **Database issues**: Ensure persistent disk is properly mounted
- **CORS errors**: Verify CORS_ORIGINS environment variable
- **Service won't start**: Check logs in Render dashboard

## Scaling

For production use, consider upgrading to a paid plan for:
- Always-on service (no spin-down)
- Better performance
- More database storage
- Custom domains