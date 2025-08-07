@echo off
echo ========================================
echo COMPLETE APP FUNCTIONALITY TEST
echo ========================================
echo.
echo This comprehensive test will validate:
echo.
echo 1. ✅ Student Signup Works
echo 2. ✅ Student Login Works  
echo 3. ✅ Quiz Generation Works
echo 4. ✅ Quiz Submission Works
echo 5. ✅ Results Submitted to Admin
echo 6. ✅ Admin Can View Results
echo 7. ✅ Admin Can Manage Students
echo.
echo The test will:
echo - Start the server automatically
echo - Create a test student account
echo - Generate and submit a quiz
echo - Test admin functionality
echo - Validate database integrity
echo - Provide detailed results
echo.

set /p choice="Run complete app functionality test? (y/n): "
if /i "%choice%" neq "y" (
    echo Test cancelled by user.
    pause
    exit /b 0
)

echo.
echo 🚀 Starting Complete App Functionality Test...
echo This will take a few minutes to complete all tests.
echo.

echo Installing required dependencies...
npm install axios --save-dev

echo.
echo Running comprehensive test suite...
node test-complete-app-functionality.js

echo.
echo ========================================
echo COMPLETE APP TEST FINISHED
echo ========================================
echo.
echo Check the detailed results above to see:
echo - Which features are working correctly
echo - Any issues that need attention
echo - Overall system health status
echo - Database integrity validation
echo.
echo If all tests pass, your MCQ Testing System is ready for production!
echo.

pause