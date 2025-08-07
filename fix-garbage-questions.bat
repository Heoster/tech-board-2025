@echo off
echo ========================================
echo FIXING GARBAGE AUTO-GENERATED QUESTIONS
echo ========================================
echo.
echo You're absolutely right! Those auto-generated questions are terrible:
echo "Grade 8 Database Basics - Basic Question 146: What is the fundamental concept in database basics?"
echo.
echo This will replace ALL garbage questions with PROPER, MEANINGFUL questions.
echo.

set /p choice="Replace garbage questions with professional ones? (y/n): "
if /i "%choice%" neq "y" (
    echo Fix cancelled.
    pause
    exit /b 0
)

echo.
echo 🔥 FIXING GARBAGE QUESTIONS...
echo.

cd server
node scripts/fix-question-format.js

if errorlevel 1 (
    echo ❌ Fix failed! Check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo GARBAGE QUESTIONS FIXED!
echo ========================================
echo.
echo ✅ Replaced auto-generated garbage with professional questions
echo ✅ Questions now make sense and are educational
echo ✅ No more "What is fundamental concept" nonsense
echo ✅ Proper difficulty levels and meaningful content
echo.
echo 🎯 Test the quiz now - questions should be professional!
echo.

pause