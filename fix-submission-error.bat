@echo off
echo 🔧 MCQ Testing System - Fix Submission Error
echo =============================================
echo.

echo 🎯 This script will identify and fix quiz submission errors
echo.

echo 📋 Step 1: Checking system requirements...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    pause
    exit /b 1
)
echo ✅ Node.js available

echo.
echo 🗑️  Step 2: Clean database reset...
if exist "database\mcq_system.db" del "database\mcq_system.db"
if exist "server\database\mcq_system.db" del "server\database\mcq_system.db"

echo.
echo 🌱 Step 3: Fresh database initialization...
cd server
call npm run seed
cd ..

echo.
echo 🚀 Step 4: Starting server with debug logging...
start "MCQ Server Debug" cmd /k "cd server && set DEBUG=* && npm start"

echo ⏳ Waiting for server startup...
timeout /t 10 /nobreak >nul

echo.
echo 🧪 Step 5: Complete submission test...

echo 5.1 Health Check:
curl -s http://localhost:8000/health
echo.

echo 5.2 Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > fix_login.json

echo Login Response:
type fix_login.json
echo.

for /f "tokens=2 delims=:" %%a in ('findstr "token" fix_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

if "%TOKEN%"=="" (
    echo ❌ Failed to extract token
    pause
    exit /b 1
)

echo ✅ Token extracted: %TOKEN:~0,20%...

echo.
echo 5.3 Quiz Start:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Authorization: Bearer %TOKEN%" > fix_quiz.json

echo Quiz Response (first 200 chars):
type fix_quiz.json | more /c 200
echo.

for /f "tokens=2 delims=:" %%a in ('findstr "quizId" fix_quiz.json') do set QUIZ_ID=%%a
set QUIZ_ID=%QUIZ_ID:,=%
set QUIZ_ID=%QUIZ_ID: =%

if "%QUIZ_ID%"=="" (
    echo ❌ Failed to extract quiz ID
    echo Full quiz response:
    type fix_quiz.json
    pause
    exit /b 1
)

echo ✅ Quiz ID extracted: %QUIZ_ID%

echo.
echo 5.4 Quiz Submission Test:
curl -v -X POST http://localhost:8000/api/quiz/submit ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"quizId\":%QUIZ_ID%,\"responses\":[{\"questionId\":1,\"selectedOptionId\":1},{\"questionId\":2,\"selectedOptionId\":5},{\"questionId\":3,\"selectedOptionId\":9},{\"questionId\":4,\"selectedOptionId\":13}]}" > fix_submit.json 2> fix_submit_error.txt

echo.
echo Submission Response:
type fix_submit.json
echo.

echo Submission Error Details:
type fix_submit_error.txt
echo.

echo.
echo 📊 Step 6: Analysis...
findstr "success.*true" fix_submit.json >nul
if %errorlevel% equ 0 (
    echo ✅ SUBMISSION SUCCESSFUL!
    echo 🎉 Quiz submission is working correctly
) else (
    echo ❌ SUBMISSION FAILED
    echo 🔍 Check the error details above
    echo 💡 Common fixes:
    echo    - Restart the server
    echo    - Check database permissions
    echo    - Verify token authentication
    echo    - Check network connectivity
)

echo.
echo 🧹 Cleanup...
del fix_login.json fix_quiz.json fix_submit.json fix_submit_error.txt 2>nul

echo.
echo ✅ Fix attempt complete!
echo 📝 If submission still fails, check server console for detailed error logs
echo.
pause