@echo off
echo Checking port availability for TECH BOARD 2025...
echo.

echo Checking Backend Port (3001):
netstat -an | findstr :3001
if %errorlevel% equ 0 (
    echo ❌ Port 3001 is in use
    echo Processes using port 3001:
    netstat -ano | findstr :3001
) else (
    echo ✅ Port 3001 is available
)

echo.
echo Checking Frontend Port (5173):
netstat -an | findstr :5173
if %errorlevel% equ 0 (
    echo ❌ Port 5173 is in use
    echo Processes using port 5173:
    netstat -ano | findstr :5173
) else (
    echo ✅ Port 5173 is available
)

echo.
echo Your network configuration:
ipconfig | findstr "IPv4"

echo.
pause