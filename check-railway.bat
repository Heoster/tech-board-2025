@echo off
echo ========================================
echo RAILWAY DEPLOYMENT DIAGNOSTIC
echo ========================================
echo.

echo Running diagnostic check...
node check-railway-build.js

echo.
echo ========================================
echo MANUAL BUILD TEST
echo ========================================
echo.

echo Testing client build locally...
cd client
echo Building client...
call npm run build
if errorlevel 1 (
    echo ❌ Client build failed!
    cd ..
    pause
    exit /b 1
)

echo ✅ Client build successful!
cd ..

echo.
echo Running post-build diagnostic...
node check-railway-build.js

echo.
echo ========================================
echo RAILWAY DEPLOYMENT READY
echo ========================================
echo.
echo Your changes are ready for Railway deployment:
echo.
echo 1. Commit your changes:
echo    git add .
echo    git commit -m "Fix frontend serving for Railway"
echo.
echo 2. Push to trigger Railway deployment:
echo    git push origin main
echo.
echo 3. Check your app after deployment:
echo    https://tech-board.up.railway.app/
echo.

pause