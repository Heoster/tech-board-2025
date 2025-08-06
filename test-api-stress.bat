@echo off
echo ========================================
echo API QUIZ GENERATION STRESS TEST
echo ========================================
echo.
echo This test will:
echo - Start the server automatically
echo - Create multiple test students
echo - Generate multiple quizzes per student
echo - Test API endpoints under load
echo - Validate no duplicates in API responses
echo - Check database integrity after tests
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
echo Installing required dependencies...
npm install axios --save-dev

echo.
echo Starting API stress test...
echo This will automatically start and stop the server.
echo Test may take several minutes to complete...
echo.

node test-api-quiz-generation.js

echo.
echo ========================================
echo API STRESS TEST COMPLETED
echo ========================================
echo.
echo Check the output above for:
echo - API success rate
echo - Students created and quizzes generated
echo - Any duplicate violations in API responses
echo - Database integrity validation
echo - Performance under load
echo.

pause