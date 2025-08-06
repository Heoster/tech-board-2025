@echo off
echo ========================================
echo FRONTEND DIAGNOSTICS
echo ========================================
echo.

echo 🔍 CHECKING SYSTEM REQUIREMENTS...
echo.

echo Node.js version:
node --version 2>nul || echo ❌ Node.js not found - Install from https://nodejs.org/

echo.
echo npm version:
npm --version 2>nul || echo ❌ npm not found

echo.
echo 🔍 CHECKING PROJECT STRUCTURE...
echo.

if exist "client" (
    echo ✅ Client directory exists
) else (
    echo ❌ Client directory missing
    goto :end
)

if exist "client\package.json" (
    echo ✅ Client package.json exists
) else (
    echo ❌ Client package.json missing
    goto :end
)

if exist "client\src" (
    echo ✅ Client src directory exists
) else (
    echo ❌ Client src directory missing
    goto :end
)

if exist "client\src\App.tsx" (
    echo ✅ App.tsx exists
) else (
    echo ❌ App.tsx missing
    goto :end
)

echo.
echo 🔍 CHECKING DEPENDENCIES...
echo.

if exist "client\node_modules" (
    echo ✅ Client node_modules exists
    
    echo.
    echo Checking key dependencies:
    
    if exist "client\node_modules\react" (
        echo ✅ React installed
    ) else (
        echo ❌ React missing
    )
    
    if exist "client\node_modules\vite" (
        echo ✅ Vite installed
    ) else (
        echo ❌ Vite missing
    )
    
    if exist "client\node_modules\typescript" (
        echo ✅ TypeScript installed
    ) else (
        echo ❌ TypeScript missing
    )
    
) else (
    echo ❌ Client node_modules missing - Run: cd client && npm install
)

echo.
echo 🔍 CHECKING CONFIGURATION...
echo.

if exist "client\.env" (
    echo ✅ Client .env exists
    echo Contents:
    type client\.env
) else (
    echo ❌ Client .env missing
    echo Creating default .env file...
    echo VITE_API_URL=http://localhost:8000/api > client\.env
    echo ✅ Created client .env
)

if exist "client\vite.config.ts" (
    echo ✅ Vite config exists
) else (
    echo ❌ Vite config missing
)

echo.
echo 🔍 CHECKING PORTS...
echo.

echo Checking if port 5173 is available...
netstat -an | find "5173" >nul
if errorlevel 1 (
    echo ✅ Port 5173 is available
) else (
    echo ⚠️  Port 5173 is in use
    echo Kill existing process or use different port
)

echo.
echo Checking if backend is running on port 8000...
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Backend not running on port 8000
    echo Start backend with: cd server && npm start
) else (
    echo ✅ Backend is running on port 8000
)

echo.
echo 🔍 TESTING CLIENT BUILD...
echo.

cd client
echo Running client build test...
call npm run build >nul 2>&1
if errorlevel 1 (
    echo ❌ Client build failed
    echo Run 'cd client && npm run build' to see detailed errors
) else (
    echo ✅ Client build successful
)
cd ..

echo.
echo ========================================
echo DIAGNOSTIC SUMMARY
echo ========================================
echo.

echo If all checks passed, try running:
echo   start-dev-complete.bat
echo.
echo If issues persist:
echo 1. Delete client\node_modules and run: cd client && npm install
echo 2. Check for TypeScript errors: cd client && npm run lint
echo 3. Try running client directly: cd client && npm run dev
echo.

:end
pause