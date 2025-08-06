@echo off
echo ========================================
echo 🎓 MCQ Testing System - TECH BOARD 2025
echo ========================================
echo.

echo 📦 Installing dependencies...
call npm run install:all

echo.
echo 🌐 Starting development servers...
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:8000
echo   - Database: SQLite (auto-created)
echo.
echo 📋 Available Features:
echo   - Student Registration & Login
echo   - Grade-based Quizzes (1, 6, 7, 8, 9, 11)
echo   - 30-minute Timed Tests
echo   - Admin Panel
echo   - Real-time Scoring
echo.
echo 🚀 Starting servers... (Press Ctrl+C to stop)
echo.

npm run dev