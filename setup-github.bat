@echo off
echo 🚀 Setting up Tech Board 2025 for GitHub...

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Initialize git repository if not already done
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
) else (
    echo ✅ Git repository already initialized
)

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "feat: initial commit - Tech Board 2025 MCQ Testing System - Complete React frontend with responsive design - Node.js backend with Express and SQLite - 1,500 questions database (300 per grade) - JWT authentication and admin panel - 50-minute timed tests with auto-submit - Results privacy and comprehensive analytics - Railway deployment configuration - Production-ready with health monitoring"

REM Prompt for GitHub username
echo.
echo 🔗 Setting up GitHub remote...
set /p github_username="Enter your GitHub username: "

if "%github_username%"=="" (
    echo ❌ GitHub username is required
    pause
    exit /b 1
)

REM Add remote origin
git remote add origin https://github.com/%github_username%/tech-board-2025.git

REM Set main branch
git branch -M main

echo.
echo ✅ Git setup complete!
echo.
echo 📋 Next steps:
echo 1. Create a new repository on GitHub:
echo    - Go to https://github.com/new
echo    - Repository name: tech-board-2025
echo    - Description: Tech Board 2025 MCQ Testing System
echo    - Make it Public or Private
echo    - DO NOT initialize with README, .gitignore, or license
echo.
echo 2. Push to GitHub:
echo    git push -u origin main
echo.
echo 3. Your repository will be available at:
echo    https://github.com/%github_username%/tech-board-2025
echo.
echo 🎉 Ready to push to GitHub!
pause