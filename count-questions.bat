@echo off
echo 📊 MCQ Testing System - Question Count Analysis
echo ===============================================
echo.

echo 🔍 Analyzing question distribution in seed scripts...
echo.

echo Grade 6 Questions:
echo ==================
findstr /c:"grade: 6" server\scripts\*.js | find /c "grade: 6"
echo Basic:
findstr /c:"grade: 6" server\scripts\*.js | findstr /c:"basic"
echo Medium:
findstr /c:"grade: 6" server\scripts\*.js | findstr /c:"medium"
echo Advanced:
findstr /c:"grade: 6" server\scripts\*.js | findstr /c:"advanced"

echo.
echo Grade 7 Questions:
echo ==================
findstr /c:"grade: 7" server\scripts\*.js | find /c "grade: 7"

echo.
echo Grade 8 Questions:
echo ==================
findstr /c:"grade: 8" server\scripts\*.js | find /c "grade: 8"

echo.
echo Grade 9 Questions:
echo ==================
findstr /c:"grade: 9" server\scripts\*.js | find /c "grade: 9"

echo.
echo Grade 11 Questions:
echo ===================
findstr /c:"grade: 11" server\scripts\*.js | find /c "grade: 11"

echo.
echo 📋 Required per quiz:
echo - Total: 25 questions
echo - Basic: 15 questions (60%)
echo - Medium: 7 questions (30%)
echo - Advanced: 3 questions (10%)
echo.
echo 🎯 Target per grade: 250+ questions
echo - Basic: 150+ questions (60%)
echo - Medium: 75+ questions (30%)
echo - Advanced: 25+ questions (10%)
echo.

pause