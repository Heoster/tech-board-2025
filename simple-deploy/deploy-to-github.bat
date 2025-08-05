@echo off
echo 🚀 MCQ Testing System - GitHub Deployment Script
echo.

echo 📁 Initializing Git repository...
git init

echo 📝 Adding files to Git...
git add .

echo 💾 Creating initial commit...
git commit -m "Initial commit: MCQ Testing System production ready"

echo 🌐 Adding GitHub remote...
echo Please create a new repository on GitHub first, then run:
echo git remote add origin https://github.com/YOUR_USERNAME/mcq-testing-system.git
echo git branch -M main
echo git push -u origin main
echo.

echo ✅ Repository initialized! 
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Copy the remote URL
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.

echo 🚀 For Railway deployment:
echo 1. railway login
echo 2. railway init
echo 3. railway up
echo.

echo 🎯 Your MCQ Testing System is production ready!
pause