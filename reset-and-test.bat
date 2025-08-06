@echo off
echo 🔄 MCQ Testing System - Reset Database and Test Submission
echo =========================================================
echo.

echo 🗑️  Step 1: Cleaning up old database...
if exist "database\mcq_system.db" (
    del "database\mcq_system.db"
    echo ✅ Old database deleted
) else (
    echo ℹ️  No existing database found
)

echo.
echo 🌱 Step 2: Reinitializing database...
cd server
call npm run seed
cd ..

echo.
echo 🚀 Step 3: Starting fresh server...
start "MCQ Server Fresh" cmd /k "cd server && npm start"

echo ⏳ Waiting for server to start...
timeout /t 8 /nobreak >nul

echo.
echo 🧪 Step 4: Testing complete flow...

echo 4.1 Student Login:
curl -s -X POST http://localhost:8000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"rollNumber\":1,\"grade\":8,\"section\":\"A\",\"password\":\"student123\"}" > test_login.json

for /f "tokens=2 delims=:" %%a in ('findstr "token" test_login.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN:,=%
set TOKEN=%TOKEN: =%

echo ✅ Login successful, token extracted

echo.
echo 4.2 Starting Quiz:
curl -s -X GET http://localhost:8000/api/quiz/start/8 ^
  -H "Authorization: Bearer %TOKEN%" > test_quiz.json

for /f "tokens=2 delims=:" %%a in ('findstr "quizId" test_quiz.json') do set QUIZ_ID=%%a
set QUIZ_ID=%QUIZ_ID:,=%
set QUIZ_ID=%QUIZ_ID: =%

echo ✅ Quiz started, ID: %QUIZ_ID%

echo.
echo 4.3 Testing Submission:
curl -s -X POST http://localhost:8000/api/quiz/submit ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"quizId\":%QUIZ_ID%,\"responses\":[{\"questionId\":1,\"selectedOptionId\":1},{\"questionId\":2,\"selectedOptionId\":5},{\"questionId\":3,\"selectedOptionId\":9}]}" > test_submit.json

echo.
echo Submission Result:
type test_submit.json

echo.
echo 📊 Step 5: Checking database integrity...
echo Database file exists:
if exist "database\mcq_system.db" (
    echo ✅ Database file present
) else (
    echo ❌ Database file missing
)

echo.
echo ✅ Reset and test complete!
echo.
echo 📋 Check test_submit.json for submission results
echo If submission failed, check server console for detailed errors

del test_login.json test_quiz.json test_submit.json 2>nul

pause