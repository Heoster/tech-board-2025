@echo off
echo Starting MCQ Testing System in Development Mode
echo ================================================

echo.
echo 1. Starting Backend Server...
start "Backend Server" cmd /k "cd server && node index.js"

echo.
echo 2. Waiting for server to start...
timeout /t 3 /nobreak > nul

echo.
echo 3. Starting Frontend Development Server...
start "Frontend Dev Server" cmd /k "cd client && npm run dev"

echo.
echo ✅ Development servers started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul