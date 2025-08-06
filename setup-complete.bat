@echo off
echo ========================================
echo 🎓 MCQ Testing System - Complete Setup
echo ========================================
echo.

echo 📦 Step 1: Installing all dependencies...
call npm run install:all

echo.
echo 🔧 Step 2: Configuring environment...
echo   - Setting up client environment for localhost...
echo VITE_API_URL=http://localhost:8000/api > client\.env

echo.
echo 🗄️  Step 3: Initializing database...
call init-database.bat

echo.
echo 🔧 Step 4: Verifying setup...
call setup-check.bat

echo.
echo ========================================
echo ✅ SETUP COMPLETE!
echo ========================================
echo.
echo 🚀 Your MCQ Testing System is ready!
echo.
echo 🌐 To start development servers:
echo   - Run: start-dev.bat
echo   - Frontend: http://localhost:5173
echo   - Backend: http://localhost:8000
echo.
echo 🔑 Admin Credentials (consistent across all servers):
echo   - Username: admin
echo   - Password: admin123
echo.
echo 👤 Sample Student Credentials:
echo   - Roll Number: 1, Grade: 8, Section: A
echo   - Password: student123
echo.
echo 📚 For more information, see README.md
echo.
pause