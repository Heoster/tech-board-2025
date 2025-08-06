@echo off
echo 🔍 MCQ Testing System - API Verification
echo ========================================
echo.

echo 📡 Testing API endpoints...
echo.

echo 1. Health Check:
curl -s http://localhost:8000/health
echo.
echo.

echo 2. Testing Student Registration:
curl -s -X POST http://localhost:8000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Student\",\"rollNumber\":99,\"grade\":8,\"section\":\"A\",\"password\":\"test123\"}"
echo.
echo.

echo 3. Testing Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}"
echo.
echo.

echo 4. Testing Admin Login:
curl -s -X POST http://localhost:8000/api/auth/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
echo.
echo.

echo ✅ API verification complete!
echo If you see JSON responses above, the API is working correctly.
echo.
pause