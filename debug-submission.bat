@echo off
echo 🐛 MCQ Testing System - Quiz Submission Debug
echo =============================================
echo.

echo 🚀 Starting server for submission debugging...
start "MCQ Server Debug" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 8 /nobreak >nul

echo.
echo 🔍 Step-by-step submission debugging:
echo.

echo 1. Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > debug_login.json

echo Login Response:
type debug_login.json
echo.

for /f "tokens=2 delims=:" %%a in ('findstr "token" debug_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

echo.
echo 2. Starting Quiz:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Authorization: Bearer %TOKEN%" > debug_quiz.json

echo Quiz Start Response (first 500 chars):
type debug_quiz.json | more /c 500
echo.

echo.
echo 3. Extracting Quiz ID and Question IDs:
for /f "tokens=2 delims=:" %%a in ('findstr "quizId" debug_quiz.json') do set QUIZ_ID=%%a
set QUIZ_ID=%QUIZ_ID:,=%
set QUIZ_ID=%QUIZ_ID: =%

echo Quiz ID: %QUIZ_ID%

echo.
echo 4. Testing Quiz Submission with sample data:
curl -v -X POST http://localhost:8000/api/quiz/submit ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"quizId\":%QUIZ_ID%,\"responses\":[{\"questionId\":1,\"selectedOptionId\":1},{\"questionId\":2,\"selectedOptionId\":5}]}" > debug_submit.json 2> debug_submit_error.txt

echo.
echo Submission Response:
type debug_submit.json
echo.

echo Submission Error Details:
type debug_submit_error.txt
echo.

echo.
echo 5. Checking Database State:
echo Testing database connection...
curl -s http://localhost:8000/health

echo.
echo ✅ Debug complete! Check the responses above for specific errors.
echo.
echo 📋 Files created for analysis:
echo   - debug_login.json (login response)
echo   - debug_quiz.json (quiz start response)  
echo   - debug_submit.json (submission response)
echo   - debug_submit_error.txt (submission error details)
echo.

pause