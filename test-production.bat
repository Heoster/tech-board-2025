@echo off
echo Testing production build locally...

echo.
echo Building client...
cd client
call npm run build
if errorlevel 1 (
    echo Client build failed!
    pause
    exit /b 1
)

echo.
echo Starting production server...
cd ../server
set NODE_ENV=production
set PORT=8000
set CORS_ORIGINS=http://localhost:8000
call npm start

pause