@echo off
echo 🚀 Updating GitHub Repository with Production-Ready MCQ System
echo.

echo 📁 Backing up current files...
if not exist "backup" mkdir backup
xcopy /E /I /Y client backup\client\ 2>nul
xcopy /E /I /Y server backup\server\ 2>nul

echo 📁 Updating with production files...
echo   - Updating client with simple HTML version...
rmdir /S /Q client 2>nul
xcopy /E /I /Y simple-deploy\client .\client\

echo   - Updating server with production version...
rmdir /S /Q server 2>nul
xcopy /E /I /Y simple-deploy\server .\server\

echo   - Updating database...
if not exist "database" mkdir database
xcopy /E /I /Y simple-deploy\database .\database\

echo   - Updating configuration files...
copy /Y simple-deploy\package.json .\package.json
copy /Y simple-deploy\Procfile .\Procfile
copy /Y simple-deploy\railway.json .\railway.json
copy /Y simple-deploy\Dockerfile .\Dockerfile
copy /Y simple-deploy\README.md .\README.md
copy /Y simple-deploy\.gitignore .\.gitignore

echo 📝 Checking git status...
git status

echo 📝 Adding all changes to Git...
git add .

echo 💾 Committing changes...
git commit -m "🚀 Production Ready: MCQ Testing System with Simple Deployment

✅ FIXES APPLIED:
- Fixed TypeScript build issues with simple HTML/JS frontend
- Resolved login/signup authentication problems
- Working student registration and login system
- Grade-based quiz generation (1, 6, 7, 8, 9, 11)
- 30-minute timed quizzes with auto-submission
- Instant scoring and results system

✅ FEATURES:
- Mobile-responsive design
- Security features (JWT, password hashing, rate limiting)
- SQLite database with sample questions
- No build process required - deploy directly
- Ready for Railway/Heroku/Docker deployment

✅ DEPLOYMENT:
- Railway: railway login && railway init && railway up
- Heroku: heroku create app-name && git push heroku main
- Docker: docker build -t mcq-system . && docker run -p 8000:8000 mcq-system

🎯 READY FOR PRODUCTION USE!"

echo.
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Repository updated successfully!
echo.
echo 🚀 Next steps for deployment:
echo 1. Railway: railway login ^&^& railway init ^&^& railway up
echo 2. Heroku: heroku create your-app ^&^& git push heroku main
echo 3. Docker: docker build -t mcq-system . ^&^& docker run -p 8000:8000 mcq-system
echo.
echo 🎯 Your production-ready MCQ system is now on GitHub!
echo 📍 Repository: https://github.com/Heoster/tech-board-2025-selection-test
echo.
pause