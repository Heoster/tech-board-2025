@echo off
echo 🗄️  MCQ Testing System - Database Initialization
echo ===============================================
echo.

echo 📁 Ensuring database directory exists...
if not exist "database" mkdir database

echo 🌱 Seeding database with 250+ questions per grade...
cd server
npm run seed:250

echo.
echo ✅ Database initialization completed!
echo.
echo 🔑 Default Credentials:
echo   Admin Username: admin
echo   Admin Password: admin123
echo.
echo 👤 Sample Student:
echo   Roll Number: 1
echo   Grade: 8
echo   Section: A
echo   Password: student123
echo.
echo 📊 Database includes sample questions for all grades (1, 6, 7, 8, 9, 11)
echo.
pause