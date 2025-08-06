@echo off
echo 🧪 MCQ Testing System - Quiz Submission Debug
echo =============================================
echo.

echo 🚀 Starting server for debugging...
start "MCQ Server Debug" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo 🔍 Testing Quiz Flow:
echo.

echo 1. Testing Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > temp_login.json

echo.
echo Login Response:
type temp_login.json
echo.

echo.
echo 2. Extracting Token...
for /f "tokens=2 delims=:" %%a in ('findstr "token" temp_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

echo Token: %TOKEN%
echo.

echo 3. Testing Quiz Start:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" > temp_quiz.json

echo.
echo Quiz Start Response:
type temp_quiz.json
echo.

echo 4. Testing Quiz Submit (with sample data):
curl -s -X POST http://localhost:8000/api/quiz/submit ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"quizId\":1,\"responses\":[{\"questionId\":1,\"selectedOptionId\":1}]}" > temp_submit.json

echo.
echo Quiz Submit Response:
type temp_submit.json
echo.

echo ✅ Debug complete! Check the responses above for errors.
echo.

del temp_login.json temp_quiz.json temp_submit.json 2>nul

pause