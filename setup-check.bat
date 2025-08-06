@echo off
echo 🔍 MCQ Testing System - Setup Verification
echo ==========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    goto :end
) else (
    echo ✅ Node.js: 
    node --version
)

echo.
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    goto :end
) else (
    echo ✅ npm: 
    npm --version
)

echo.
echo Checking project structure...
if exist "client\package.json" (
    echo ✅ Client directory found
) else (
    echo ❌ Client directory or package.json missing
)

if exist "server\package.json" (
    echo ✅ Server directory found
) else (
    echo ❌ Server directory or package.json missing
)

if exist "package.json" (
    echo ✅ Root package.json found
) else (
    echo ❌ Root package.json missing
)

echo.
echo Checking dependencies...
if exist "node_modules" (
    echo ✅ Root dependencies installed
) else (
    echo ⚠️  Root dependencies not installed - run 'npm install'
)

if exist "client\node_modules" (
    echo ✅ Client dependencies installed
) else (
    echo ⚠️  Client dependencies not installed - run 'cd client && npm install'
)

if exist "server\node_modules" (
    echo ✅ Server dependencies installed
) else (
    echo ⚠️  Server dependencies not installed - run 'cd server && npm install'
)

echo.
echo 🎯 Setup Status Summary:
echo ========================
echo If all items show ✅, you're ready to run: start-dev.bat
echo If any items show ❌ or ⚠️, please fix them first.
echo.
echo 📚 For detailed setup instructions, see README.md
echo.

:end
pause