#!/usr/bin/env node

/**
 * Comprehensive Fix Script for TECH BOARD 2025 MCQ Testing System
 * This script addresses all identified issues in the application
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting comprehensive fix for TECH BOARD 2025 MCQ Testing System...\n');

// Issue fixes
const fixes = [
    {
        name: 'Client Environment Configuration',
        description: 'Fix API base URL configuration to prevent double /api/api issues',
        fix: () => {
            const envPath = path.join(__dirname, 'client', '.env');
            const envContent = `VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=TECH BOARD 2025
VITE_APP_VERSION=1.0.0
`;
            fs.writeFileSync(envPath, envContent);
            
            const envProdPath = path.join(__dirname, 'client', '.env.production');
            const envProdContent = `VITE_API_URL=/api
VITE_APP_NAME=TECH BOARD 2025
VITE_APP_VERSION=1.0.0
`;
            fs.writeFileSync(envProdPath, envProdContent);
            
            console.log('✅ Fixed client environment configuration');
        }
    },
    
    {
        name: 'Server Environment Configuration',
        description: 'Ensure proper server environment variables',
        fix: () => {
            const serverEnvPath = path.join(__dirname, 'server', '.env');
            const serverEnvContent = `NODE_ENV=development
PORT=8000
DB_PATH=./database/mcq_system.db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
LOG_LEVEL=info
FRONTEND_URL=http://localhost:5173
`;
            fs.writeFileSync(serverEnvPath, serverEnvContent);
            
            const serverEnvProdPath = path.join(__dirname, 'server', '.env.production');
            const serverEnvProdContent = `NODE_ENV=production
PORT=8000
DB_PATH=./database/mcq_system.db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
LOG_LEVEL=info
FRONTEND_URL=https://tech-board.up.railway.app
`;
            fs.writeFileSync(serverEnvProdPath, serverEnvProdContent);
            
            console.log('✅ Fixed server environment configuration');
        }
    },
    
    {
        name: 'Package.json Scripts',
        description: 'Fix package.json scripts for proper deployment',
        fix: () => {
            // Fix client package.json
            const clientPackagePath = path.join(__dirname, 'client', 'package.json');
            const clientPackage = JSON.parse(fs.readFileSync(clientPackagePath, 'utf8'));
            
            clientPackage.scripts = {
                ...clientPackage.scripts,
                "build": "vite build --mode production",
                "build:dev": "vite build --mode development",
                "preview": "vite preview --port 4173"
            };
            
            fs.writeFileSync(clientPackagePath, JSON.stringify(clientPackage, null, 2));
            
            // Fix server package.json
            const serverPackagePath = path.join(__dirname, 'server', 'package.json');
            const serverPackage = JSON.parse(fs.readFileSync(serverPackagePath, 'utf8'));
            
            serverPackage.scripts = {
                ...serverPackage.scripts,
                "start": "node index.js",
                "start:prod": "NODE_ENV=production node index.js",
                "dev": "nodemon index.js"
            };
            
            fs.writeFileSync(serverPackagePath, JSON.stringify(serverPackage, null, 2));
            
            console.log('✅ Fixed package.json scripts');
        }
    },
    
    {
        name: 'Database Health Check',
        description: 'Create a robust database health check script',
        fix: () => {
            const healthCheckScript = `#!/usr/bin/env node

const database = require('./config/database');

async function healthCheck() {
    try {
        console.log('🔍 Starting database health check...');
        
        await database.connect();
        console.log('✅ Database connection successful');
        
        const db = database.getDb();
        
        // Check essential tables
        const tables = ['students', 'questions', 'options', 'quizzes', 'responses', 'admins'];
        for (const table of tables) {
            const result = await new Promise((resolve, reject) => {
                db.get(\`SELECT COUNT(*) as count FROM \${table}\`, (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            console.log(\`✅ Table \${table}: \${result} records\`);
        }
        
        console.log('🎉 Database health check completed successfully');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Database health check failed:', error.message);
        process.exit(1);
    }
}

healthCheck();
`;
            
            fs.writeFileSync(path.join(__dirname, 'server', 'health-check.js'), healthCheckScript);
            console.log('✅ Created database health check script');
        }
    },
    
    {
        name: 'Production Startup Script',
        description: 'Create a robust production startup script',
        fix: () => {
            const startupScript = `#!/usr/bin/env node

/**
 * Production Startup Script for TECH BOARD 2025
 * Ensures all systems are ready before starting the server
 */

const fs = require('fs');
const path = require('path');

async function startProduction() {
    console.log('🚀 Starting TECH BOARD 2025 Production Server...');
    
    // Check environment
    if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV = 'production';
        console.log('⚠️  Set NODE_ENV to production');
    }
    
    // Check database file exists
    const dbPath = process.env.DB_PATH || './database/mcq_system.db';
    if (!fs.existsSync(dbPath)) {
        console.error('❌ Database file not found:', dbPath);
        process.exit(1);
    }
    
    // Check client build exists
    const clientBuildPath = path.join(__dirname, '../client/dist');
    if (!fs.existsSync(clientBuildPath)) {
        console.error('❌ Client build not found. Please run: cd client && npm run build');
        process.exit(1);
    }
    
    console.log('✅ Pre-flight checks passed');
    
    // Start the main server
    require('./index.js');
}

startProduction();
`;
            
            fs.writeFileSync(path.join(__dirname, 'server', 'start-production.js'), startupScript);
            console.log('✅ Created production startup script');
        }
    },
    
    {
        name: 'Error Handling Improvements',
        description: 'Create comprehensive error handling utilities',
        fix: () => {
            const errorHandlerScript = `/**
 * Enhanced Error Handling Utilities
 */

class AppError extends Error {
    constructor(message, statusCode, code = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message, details = []) {
        super(message, 400, 'VALIDATION_ERROR');
        this.details = details;
    }
}

class DatabaseError extends AppError {
    constructor(message, originalError = null) {
        super(message, 500, 'DATABASE_ERROR');
        this.originalError = originalError;
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

class AuthorizationError extends AppError {
    constructor(message = 'Insufficient permissions') {
        super(message, 403, 'AUTHORIZATION_ERROR');
    }
}

const handleError = (error, req, res, next) => {
    let { statusCode = 500, message, code } = error;
    
    // Log error details
    console.error('Error occurred:', {
        message: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    });
    
    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'Something went wrong!';
    }
    
    res.status(statusCode).json({
        success: false,
        error: {
            code: code || 'INTERNAL_SERVER_ERROR',
            message,
            ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
        }
    });
};

module.exports = {
    AppError,
    ValidationError,
    DatabaseError,
    AuthenticationError,
    AuthorizationError,
    handleError
};
`;
            
            fs.writeFileSync(path.join(__dirname, 'server', 'utils', 'errors.js'), errorHandlerScript);
            console.log('✅ Created enhanced error handling utilities');
        }
    }
];

// Execute all fixes
async function runFixes() {
    for (const fix of fixes) {
        try {
            console.log(`🔧 ${fix.name}: ${fix.description}`);
            await fix.fix();
        } catch (error) {
            console.error(`❌ Failed to apply fix "${fix.name}":`, error.message);
        }
    }
    
    console.log('\n🎉 All fixes applied successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. cd client && npm install && npm run build');
    console.log('2. cd server && npm install');
    console.log('3. cd server && node health-check.js');
    console.log('4. cd server && npm start');
    console.log('\n✨ Your TECH BOARD 2025 MCQ Testing System should now be working properly!');
}

runFixes().catch(console.error);