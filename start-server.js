const { startServer } = require('./server/index');

console.log('🚀 Starting Tech Board 2025 Server...');
console.log('📍 Database: server/database/mcq_system_fixed.db');
console.log('🔐 Admin: username=admin, password=admin123');
console.log('');

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '8000';
process.env.DB_PATH = './database/mcq_system_fixed.db';

startServer().catch(error => {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
});