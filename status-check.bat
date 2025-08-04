@echo off
echo ========================================
echo   TECH BOARD 2025 - System Status
echo ========================================
echo.

echo Checking Backend Server (Port 8000):
curl -s http://192.168.31.234:8000/health
if %errorlevel% equ 0 (
    echo ✅ Backend is running
) else (
    echo ❌ Backend is not responding
)

echo.
echo Checking Frontend Server (Port 5173):
netstat -an | findstr :5173 | findstr LISTENING >nul
if %errorlevel% equ 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend is not running
)

echo.
echo ========================================
echo   Access URLs
echo ========================================
echo Frontend: http://192.168.31.234:5173
echo Backend:  http://192.168.31.234:8000
echo Health:   http://192.168.31.234:8000/health
echo.

echo Network IP: 192.168.31.234
echo Local Access: http://localhost:5173
echo.
pause