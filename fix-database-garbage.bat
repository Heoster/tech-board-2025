@echo off
echo ========================================
echo COMPLETE DATABASE GARBAGE CLEANUP
echo ========================================
echo.
echo This will COMPLETELY FIX the database by:
echo.
echo ❌ REMOVING ALL GARBAGE QUESTIONS like:
echo    "Grade 8 Database Basics - Basic Question 146"
echo    "What is the fundamental concept in database basics?"
echo    Options: "Database Basics - Correct Basic Answer"
echo.
echo ✅ REPLACING WITH PROFESSIONAL QUESTIONS like:
echo    "What is a database used for?"
echo    Options: "Storing and organizing large amounts of data efficiently"
echo.

set /p choice="Completely fix the database? (y/n): "
if /i "%choice%" neq "y" (
    echo Fix cancelled.
    pause
    exit /b 0
)

echo.
echo 🔥 PERFORMING COMPLETE DATABASE FIX...
echo This will take a moment...
echo.

cd server
node scripts/fix-database-completely.js

if errorlevel 1 (
    echo ❌ Database fix failed! Check the error messages above.
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo DATABASE COMPLETELY FIXED!
echo ========================================
echo.
echo ✅ All garbage questions removed from database
echo ✅ Professional, meaningful questions added
echo ✅ No more auto-generated nonsense
echo ✅ Questions are now educational and proper
echo.
echo 🎯 Your quiz now has REAL questions that make sense!
echo.
echo Test the quiz interface now - you'll see the difference!
echo.

pause