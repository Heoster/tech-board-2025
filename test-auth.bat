@echo off
echo 🧪 MCQ Testing System - Authentication Test
echo ==========================================
echo.

echo 🚀 Starting servers for testing...
start "MCQ Server" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak >nul

echo 🌐 Starting client development server...
start "MCQ Client" cmd /k "cd client && npm run dev"

echo ⏳ Waiting for client to start...
timeout /t 10 /nobreak >nul

echo.
echo ✅ Both servers should now be running!
echo.
echo 🔗 Test URLs:
echo   - Frontend: http://localhost:5173
echo   - Backend API: http://localhost:8000/api
echo   - Health Check: http://localhost:8000/health
echo.
echo 🧪 Test Authentication:
echo   1. Go to http://localhost:5173
echo   2. Click "Register" to test signup
echo   3. Fill in the form and submit
echo   4. Try logging in with the created account
echo.
echo 🔑 Admin Login Test:
echo   - Go to http://localhost:5173/admin
echo   - Username: admin
echo   - Password: admin123
echo.
echo 👤 Sample Student Login:
echo   - Roll Number: 1
echo   - Grade: 8
echo   - Section: A
echo   - Password: student123
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:5173

echo.
echo 📝 If authentication doesn't work:
echo   1. Check that both servers are running
echo   2. Verify database was created in /database folder
echo   3. Check browser console for errors
echo   4. Ensure ports 5173 and 8000 are not blocked
echo.
pause