@echo off
echo 🎯 MCQ Testing System - 250+ Questions Verification
echo ===================================================
echo.

echo 🚀 Testing comprehensive question bank...
echo.

echo 📊 Step 1: Reset and seed with 250+ questions per grade
echo.
if exist "database\mcq_system.db" (
    del "database\mcq_system.db"
    echo ✅ Old database deleted
)

echo 🌱 Seeding with master 250+ script...
cd server
call npm run seed:250
cd ..

echo.
echo 🚀 Step 2: Starting server for testing...
start "MCQ Server 250" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 10 /nobreak >nul

echo.
echo 🧪 Step 3: Testing quiz generation for all grades...

echo 3.1 Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > test250_login.json

for /f "tokens=2 delims=:" %%a in ('findstr "token" test250_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

if "%TOKEN%"=="" (
    echo ❌ Login failed
    pause
    exit /b 1
)

echo ✅ Login successful

echo.
echo 3.2 Testing quiz generation for each grade:

echo Testing Grade 1:
curl -s -X GET http://localhost:8000/api/quiz/start/1 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade1.json
findstr "success.*true" test250_grade1.json >nul && echo ✅ Grade 1 OK || echo ❌ Grade 1 Failed

echo Testing Grade 6:
curl -s -X GET http://localhost:8000/api/quiz/start/6 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade6.json
findstr "success.*true" test250_grade6.json >nul && echo ✅ Grade 6 OK || echo ❌ Grade 6 Failed

echo Testing Grade 7:
curl -s -X GET http://localhost:8000/api/quiz/start/7 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade7.json
findstr "success.*true" test250_grade7.json >nul && echo ✅ Grade 7 OK || echo ❌ Grade 7 Failed

echo Testing Grade 8:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade8.json
findstr "success.*true" test250_grade8.json >nul && echo ✅ Grade 8 OK || echo ❌ Grade 8 Failed

echo Testing Grade 9:
curl -s -X GET http://localhost:8000/api/quiz/start/9 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade9.json
findstr "success.*true" test250_grade9.json >nul && echo ✅ Grade 9 OK || echo ❌ Grade 9 Failed

echo Testing Grade 11:
curl -s -X GET http://localhost:8000/api/quiz/start/11 ^
  -H "Authorization: Bearer %TOKEN%" > test250_grade11.json
findstr "success.*true" test250_grade11.json >nul && echo ✅ Grade 11 OK || echo ❌ Grade 11 Failed

echo.
echo 📊 Step 4: Verification Summary
echo ================================

echo 🎯 Each grade should now have 250+ questions:
echo   - 150+ basic questions (60%)
echo   - 75+ medium questions (30%)
echo   - 25+ advanced questions (10%)
echo.

echo 🔍 Quiz generation test results above show if each grade works
echo.

echo 💡 To manually verify question counts:
echo   - Check server console for seeding logs
echo   - Run count-questions.bat for detailed counts
echo.

echo 🧹 Cleanup...
del test250_*.json 2>nul

echo ✅ 250+ Questions Test Complete!
echo.
echo 📋 Next steps:
echo   - All grades should now support multiple quiz attempts
echo   - No duplicate questions within any single quiz
echo   - Proper difficulty distribution maintained
echo.
pause