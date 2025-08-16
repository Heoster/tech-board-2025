const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting TechBoard 2025 Production Server on Railway...\n');

// Load production environment variables
require('dotenv').config({ path: '.env.production' });

// Railway-specific environment setup
if (process.env.RAILWAY_ENVIRONMENT) {
    console.log('🚂 Railway environment detected');
    console.log(`   Domain: ${process.env.RAILWAY_STATIC_URL || 'tech-board.up.railway.app'}`);
}

// Ensure production database exists and is seeded
async function ensureProductionDatabase() {
    const dbPath = path.join(__dirname, 'database/mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);
    
    // Create database directory if it doesn't exist
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('📁 Created database directory');
    }
    
    // Check if database needs initialization
    if (!fs.existsSync(dbPath) || fs.statSync(dbPath).size < 1024) {
        console.log('🗄️ Initializing production database...');
        
        try {
            // Run database setup
            const setupScript = path.join(__dirname, '../production-setup.js');
            if (fs.existsSync(setupScript)) {
                require(setupScript);
            } else {
                console.log('⚠️ Production setup script not found, database will initialize at runtime');
            }
        } catch (error) {
            console.log('⚠️ Database setup warning:', error.message);
            console.log('Database will be initialized at runtime');
        }
    } else {
        console.log('✅ Production database exists');
    }
}

// Verify static files exist
function verifyStaticFiles() {
    const publicDir = path.join(__dirname, 'public');
    const indexPath = path.join(publicDir, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.log('⚠️ Static files not found, attempting to build...');
        
        try {
            // Try to build client if not already built
            const buildScript = path.join(__dirname, '../build-production.js');
            if (fs.existsSync(buildScript)) {
                execSync('node ../build-production.js', { stdio: 'inherit' });
            }
        } catch (error) {
            console.log('❌ Failed to build static files:', error.message);
            console.log('Server will start but may not serve frontend correctly');
        }
    } else {
        console.log('✅ Static files ready');
    }
}

// Health check endpoint setup
function setupHealthCheck() {
    console.log('🏥 Health check will be available at /health');
}

async function startProduction() {
    try {
        console.log('🔧 Railway Production Environment Setup:');
        console.log(`  Node.js: ${process.version}`);
        console.log(`  Environment: ${process.env.NODE_ENV}`);
        console.log(`  Port: ${process.env.PORT}`);
        console.log(`  Database: ${process.env.DB_PATH}`);
        console.log(`  CORS Origin: ${process.env.CORS_ORIGIN}`);
        console.log(`  Railway URL: ${process.env.RAILWAY_STATIC_URL}`);
        console.log(`  Rate Limit: ${process.env.RATE_LIMIT_MAX} requests per ${Math.round(process.env.RATE_LIMIT_WINDOW_MS / 60000)} minutes`);
        console.log('');
        
        // Setup steps
        await ensureProductionDatabase();
        verifyStaticFiles();
        setupHealthCheck();
        
        // Ensure database is ready for production
        console.log('🔍 Verifying database readiness...');
        try {
            // Just check if database file exists and has content
            const dbPath = path.join(__dirname, 'database/mcq_system_fixed.db');
            if (fs.existsSync(dbPath)) {
                const stats = fs.statSync(dbPath);
                if (stats.size > 1024) {
                    console.log('✅ Database verification passed');
                } else {
                    console.log('⚠️ Database file is too small, but continuing...');
                }
            } else {
                console.log('⚠️ Database file not found, will be created at runtime');
            }
        } catch (error) {
            console.log('⚠️ Database verification error:', error.message);
            console.log('Continuing with startup...');
        }
        
        console.log('🎯 Starting Express server...\n');
        
        // Start the main application
        const serverModule = require('./index.js');
        if (serverModule && typeof serverModule.startServer === 'function') {
            await serverModule.startServer();
        } else {
            console.log('⚠️ startServer() not found; ensure server auto-starts in index.js');
        }
        
    } catch (error) {
        console.error('❌ Production startup failed:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});

// Start production server
startProduction();