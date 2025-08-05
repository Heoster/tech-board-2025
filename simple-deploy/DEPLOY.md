# 🚀 Simple MCQ System Deployment

This is a simplified deployment package that bypasses all TypeScript compilation issues.

## ✅ What's Included
- ✅ Complete Node.js backend server
- ✅ Simple HTML/CSS/JS frontend (no build required)
- ✅ SQLite database with sample questions
- ✅ All necessary configuration files

## 🌐 Deployment Options

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI if not already installed
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize and deploy
railway init
railway up
```

### Option 2: Heroku
```bash
# Install Heroku CLI if not already installed
# Create a new Heroku app
heroku create your-mcq-app-name

# Initialize git and deploy
git init
git add .
git commit -m "Initial deployment"
git push heroku main
```

### Option 3: Docker
```bash
# Build the Docker image
docker build -t mcq-app .

# Run locally
docker run -p 8000:8000 mcq-app

# Or deploy to any Docker hosting service
```

### Option 4: Any Node.js Hosting
1. Upload the entire `simple-deploy` folder to your hosting service
2. Run `npm install` in the server directory
3. Start with `npm start`
4. Make sure port 8000 is accessible

## 🔧 Configuration
- The app runs on port 8000 by default
- Database is SQLite (no external database needed)
- Frontend is served as static files from `/client`

## 🎯 Features
- Student registration and login
- Grade-based quiz generation (1, 6, 7, 8, 9, 11)
- 30-minute timer per quiz
- Automatic scoring
- Simple, clean interface

## 🧪 Test Locally
```bash
cd server
npm install
npm start
```
Then visit http://localhost:8000

## 📝 Sample Login
After running the server, you can:
1. Register a new student
2. Login with your credentials
3. Take a quiz based on your grade

The system includes sample questions for all supported grades.