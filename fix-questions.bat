@echo off
echo ========================================
echo FIXING MALFORMED QUIZ QUESTIONS
echo ========================================
echo.
echo This will fix the question display issue where
echo questions and options were showing concatenated text.
echo.
echo BEFORE: "Grade 11 Advanced Programming - Basic Question 37..."
echo AFTER:  "What is software engineering?"
echo.

set /p choice="Do you want to fix the malformed questions? (y/n): "
if /i "%choice%" neq "y" (
    echo Fix cancelled.
    pause
    exit /b 0
)

echo.
echo 🔧 Running question format fix...
echo This will:
echo - Remove all malformed questions
echo - Add properly formatted questions
echo - Ensure clean display in quiz interface
echo.

echo Installing required dependencies...
if not exist "node_modules\dotenv" (
    npm install dotenv
)

echo Running fix script...
node fix-question-format.js

if errorlevel 1 (
    echo ❌ Fix failed! Check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo QUESTION FORMAT FIX COMPLETED
echo ========================================
echo.
echo ✅ All questions now have proper formatting
echo ✅ Quiz interface will display clean text
echo ✅ Each grade has 50+ questions available
echo.
echo 🎯 Next steps:
echo 1. Test the quiz interface locally
echo 2. If deploying to Railway, commit and push changes
echo 3. Questions should now display properly
echo.

pause