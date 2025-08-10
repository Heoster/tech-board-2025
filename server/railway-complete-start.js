// Railway Complete Start Script for TECH BOARD 2025 MCQ System
require('dotenv').config();

console.log('🚀 STARTING TECH BOARD 2025 MCQ SYSTEM ON RAILWAY');
console.log('=================================================');
console.log('');

// Set production environment and Railway-specific settings
process.env.NODE_ENV = 'production';
process.env.TRUST_PROXY = '1'; // Enable proxy trust for Railway

// Log environment info
console.log('📊 Environment Information:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT || 8000}`);
console.log(`   TRUST_PROXY: ${process.env.TRUST_PROXY}`);
console.log(`   Database: SQLite (embedded)`);
console.log(`   Railway Deployment: ✅ Configured`);
console.log('');

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    // Don't exit immediately in production, let Railway handle restarts
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit immediately in production, let Railway handle restarts
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
});

// Import and start the main server
console.log('🔧 Loading main server...');
try {
    require('./index.js');
    
    // Auto-seed database if needed (Railway deployment)
    console.log('🌱 Checking database seeding...');
    const autoSeed = require('./scripts/railway-auto-seed');
    autoSeed().then(() => {
        console.log('✅ Database check completed');
    }).catch(error => {
        console.log('⚠️  Database seeding skipped:', error.message);
    });
    
    console.log('✅ TECH BOARD 2025 MCQ System started successfully!');
    console.log('🌐 System ready for student registrations and quizzes');
    console.log('🔐 Admin access available');
    console.log('📚 Questions loading in background...');
} catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
}

console.log('');