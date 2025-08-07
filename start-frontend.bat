@echo off
echo Starting Frontend Development Server
echo ====================================

echo.
echo Checking if client directory exists...
if not exist "client" (
    echo ❌ Client directory not found!
    echo Please make sure you're in the project root directory.
    pause
    exit /b 1
)

echo ✅ Client directory found

echo.
echo Checking if node_modules exists in client...
if not exist "client\node_modules" (
    echo ⚠️  Node modules not found. Installing dependencies...
    cd client
    npm install
    cd ..
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

echo.
echo Starting Vite development server...
cd client
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo ✅ Frontend development server started!
echo 🌐 Frontend should be available at: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul