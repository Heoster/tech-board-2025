@echo off
echo ========================================
echo COMPREHENSIVE QUIZ GENERATION TEST
echo ========================================
echo.
echo This test will:
echo - Load ALL questions from the database
echo - Generate multiple quizzes for each grade
echo - Ensure EVERY question is tested
echo - Validate no duplicates exist
echo - Provide detailed coverage analysis
echo.

echo Checking if database exists...
if not exist "server\database\mcq_system.db" (
    echo Database not found! Running complete setup first...
    call setup-complete.bat
    if errorlevel 1 (
        echo Setup failed! Cannot proceed with testing.
        pause
        exit /b 1
    )
)

echo.
echo Starting comprehensive test...
echo This may take several minutes to complete...
echo.

node test-complete-question-coverage.js

echo.
echo ========================================
echo TEST COMPLETED
echo ========================================
echo.
echo Check the output above for:
echo - Overall coverage percentage
echo - Questions covered vs not covered
echo - Any duplicate violations found
echo - Grade-by-grade breakdown
echo - Recommendations for improvement
echo.

pause