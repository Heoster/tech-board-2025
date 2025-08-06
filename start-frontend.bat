@echo off
echo ========================================
echo STARTING MCQ TESTING SYSTEM FRONTEND
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

echo.
echo Checking if client directory exists...
if not exist "client" (
    echo ❌ Client directory not found!
    echo Make sure you're running this from the project root directory.
    pause
    exit /b 1
)

echo ✅ Client directory found

echo.
echo Checking client dependencies...
if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install client dependencies
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ✅ Client dependencies already installed
)

echo.
echo Checking environment configuration...
if not exist "client\.env" (
    echo 📝 Creating client environment file...
    echo VITE_API_URL=http://localhost:8000/api > client\.env
)

echo ✅ Environment configured
type client\.env

echo.
echo Checking if server is running...
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Server is not running on port 8000
    echo.
    echo Starting server in background...
    start "MCQ Server" cmd /c "cd server && npm start"
    echo Waiting for server to start...
    timeout /t 5 /nobreak >nul
    
    echo Checking server again...
    curl -s http://localhost:8000/health >nul 2>&1
    if errorlevel 1 (
        echo ❌ Server failed to start
        echo Please start the server manually with: cd server && npm start
        pause
        exit /b 1
    )
)

echo ✅ Server is running

echo.
echo ========================================
echo STARTING FRONTEND DEVELOPMENT SERVER
echo ========================================
echo.
echo Frontend will be available at: http://localhost:5173
echo API will be proxied to: http://localhost:8000/api
echo.
echo Press Ctrl+C to stop the development server
echo.

cd client
npm run dev

pause