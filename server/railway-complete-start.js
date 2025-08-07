// Railway Complete Start Script for TECH BOARD 2025 MCQ System
require('dotenv').config();

console.log('🚀 STARTING TECH BOARD 2025 MCQ SYSTEM ON RAILWAY');
console.log('=================================================');
console.log('');

// Set production environment
process.env.NODE_ENV = 'production';

// Log environment info
console.log('📊 Environment Information:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT || 8000}`);
console.log(`   Database: SQLite (embedded)`);
console.log('');

// Import and start the main server
console.log('🔧 Loading main server...');
require('./index.js');

console.log('✅ TECH BOARD 2025 MCQ System started successfully!');
console.log('🌐 System ready for student registrations and quizzes');
console.log('🔐 Admin access available');
console.log('📚 1500 questions loaded across all grades');
console.log('');