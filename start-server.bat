@echo off
echo Starting TECH BOARD 2025 MCQ System on 192.168.31.234
echo.

echo Starting backend server...
cd server
start "Backend Server" cmd /k "npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend client...
cd ../client
start "Frontend Client" cmd /k "npm run dev"

echo.
echo ========================================
echo   TECH BOARD 2025 MCQ System Started
echo ========================================
echo.
echo Frontend: http://192.168.31.234:5173
echo Backend:  http://192.168.31.234:8000
echo.
echo Network Access:
echo - Local: http://localhost:5173
echo - Network: http://192.168.31.234:5173
echo.
echo Press any key to close this window...
pause > nul