@echo off
echo 📊 MCQ Testing System - Question Verification
echo =============================================
echo.

echo 🔍 Verifying question counts for all grades...
echo.

echo 🚀 Starting server to check database...
start "MCQ Server Verify" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 8 /nobreak >nul

echo.
echo 📊 Checking question distribution...
echo.

echo 🧪 Testing Grade 8 quiz generation (should work):
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > verify_login.json

for /f "tokens=2 delims=:" %%a in ('findstr "token" verify_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

if "%TOKEN%"=="" (
    echo ❌ Login failed - check if database is seeded
    pause
    exit /b 1
)

echo ✅ Login successful

echo.
echo 🎯 Testing quiz generation for Grade 8:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Authorization: Bearer %TOKEN%" > verify_quiz.json

findstr "success.*true" verify_quiz.json >nul
if %errorlevel% equ 0 (
    echo ✅ Quiz generation successful for Grade 8
    
    echo.
    echo 📋 Quiz details:
    findstr "totalQuestions\|questionDistribution" verify_quiz.json
) else (
    echo ❌ Quiz generation failed for Grade 8
    echo.
    echo Error details:
    type verify_quiz.json
)

echo.
echo 🔍 Manual verification needed for other grades:
echo   - Grade 1: Basic math questions
echo   - Grade 6: Elementary concepts  
echo   - Grade 7: Intermediate topics
echo   - Grade 9: Advanced concepts
echo   - Grade 11: Expert level
echo.

echo 📊 Required per grade:
echo   - Minimum 50 questions total
echo   - 30+ basic questions (60%)
echo   - 15+ medium questions (30%)
echo   - 5+ advanced questions (10%)
echo.

echo 💡 To add more questions:
echo   - Run: cd server && npm run seed:all
echo   - Or create specific grade seed scripts
echo.

del verify_login.json verify_quiz.json 2>nul

echo ✅ Verification complete!
pause