@echo off
echo ========================================
echo MCQ TESTING SYSTEM - COMPLETE DEV SETUP
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

echo ✅ Node.js version: 
node --version

echo.
echo ========================================
echo STEP 1: INSTALLING DEPENDENCIES
echo ========================================

echo.
echo 📦 Installing root dependencies...
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install root dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Root dependencies already installed
)

echo.
echo 📦 Installing server dependencies...
if not exist "server\node_modules" (
    cd server
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install server dependencies
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ✅ Server dependencies already installed
)

echo.
echo 📦 Installing client dependencies...
if not exist "client\node_modules" (
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
echo ========================================
echo STEP 2: ENVIRONMENT CONFIGURATION
echo ========================================

echo.
echo 📝 Setting up server environment...
if not exist "server\.env" (
    echo Creating server environment file...
    (
        echo PORT=8000
        echo NODE_ENV=development
        echo JWT_SECRET=mcq-testing-system-jwt-secret-2025
        echo DB_PATH=./database/mcq_system.db
        echo ADMIN_USERNAME=admin
        echo ADMIN_PASSWORD=admin123
        echo CORS_ORIGINS=http://localhost:5173,http://localhost:3000
    ) > server\.env
    echo ✅ Server environment created
) else (
    echo ✅ Server environment already exists
)

echo.
echo 📝 Setting up client environment...
if not exist "client\.env" (
    echo Creating client environment file...
    echo VITE_API_URL=http://localhost:8000/api > client\.env
    echo ✅ Client environment created
) else (
    echo ✅ Client environment already exists
)

echo.
echo ========================================
echo STEP 3: DATABASE SETUP
echo ========================================

echo.
echo 🗄️ Checking database...
if not exist "server\database\mcq_system.db" (
    echo Database not found. Setting up database...
    cd server
    call npm run seed
    if errorlevel 1 (
        echo ❌ Database setup failed
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Database setup completed
) else (
    echo ✅ Database already exists
)

echo.
echo ========================================
echo STEP 4: STARTING DEVELOPMENT SERVERS
echo ========================================

echo.
echo 🚀 Starting both frontend and backend servers...
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo Admin:    http://localhost:5173/admin
echo.
echo Login credentials:
echo - Admin: admin / admin123
echo - Student: Roll=1, Grade=8, Section=A, Password=student123
echo.
echo Press Ctrl+C to stop all servers
echo.

npm run dev

pause