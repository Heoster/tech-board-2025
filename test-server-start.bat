@echo off
echo 🧪 MCQ Testing System - Server Startup Test
echo ==========================================
echo.

echo 🗑️  Step 1: Clean database...
if exist "database\mcq_system.db" (
    del "database\mcq_system.db"
    echo ✅ Old database deleted
)

echo.
echo 🚀 Step 2: Testing server startup...
cd server

echo Starting server...
timeout /t 3 /nobreak >nul
start "MCQ Server Test" cmd /k "npm start"

echo ⏳ Waiting for server to initialize...
timeout /t 8 /nobreak >nul

echo.
echo 🔍 Step 3: Testing health endpoint...
curl -s http://localhost:8000/health

echo.
echo.
echo ✅ Server startup test complete!
echo.
echo 📋 If you see a JSON health response above, the server started successfully.
echo 📋 If you see connection errors, check the server console for detailed error messages.
echo.
pause