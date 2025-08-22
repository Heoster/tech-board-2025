#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building and Deploying Tech Board 2025 Complete Application...\n');

const steps = [
    'Install dependencies',
    'Build React frontend',
    'Setup database',
    'Copy frontend to server',
    'Start production server'
];

let currentStep = 0;

function logStep(message) {
    currentStep++;
    console.log(`\n[${currentStep}/${steps.length}] ${message}`);
    console.log('='.repeat(50));
}

function runCommand(command, description) {
    console.log(`📝 ${description}`);
    try {
        execSync(command, { stdio: 'inherit', cwd: __dirname });
        console.log(`✅ ${description} completed`);
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        throw error;
    }
}

async function buildAndDeploy() {
    try {
        // Step 1: Install dependencies
        logStep('Installing Dependencies');
        
        // Install root dependencies
        if (fs.existsSync('package.json')) {
            runCommand('npm install', 'Installing root dependencies');
        }
        
        // Install server dependencies
        if (fs.existsSync('server/package.json')) {
            runCommand('npm install --prefix server', 'Installing server dependencies');
        }
        
        // Install client dependencies
        if (fs.existsSync('client/package.json')) {
            runCommand('npm install --prefix client', 'Installing client dependencies');
        }

        // Step 2: Build React frontend
        logStep('Building React Frontend');
        
        if (fs.existsSync('client/package.json')) {
            runCommand('npm run build --prefix client', 'Building React application');
            
            // Verify build output
            const distPath = path.join(__dirname, 'client', 'dist');
            if (!fs.existsSync(path.join(distPath, 'index.html'))) {
                throw new Error('Frontend build failed - index.html not found in dist/');
            }
            console.log('✅ Frontend build verified');
        } else {
            console.log('⚠️ No client package.json found, skipping frontend build');
        }

        // Step 3: Setup database
        logStep('Setting Up Database');
        
        const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
        if (fs.existsSync(dbPath)) {
            console.log('✅ Database already exists');
            
            // Verify database has questions
            try {
                runCommand('npm run verify:production', 'Verifying database content');
            } catch (error) {
                console.log('⚠️ Database verification failed, will seed during startup');
            }
        } else {
            console.log('📦 Database not found, will be created during startup');
            
            // Ensure database directory exists
            const dbDir = path.dirname(dbPath);
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
                console.log('📁 Created database directory');
            }
        }

        // Step 4: Copy frontend to server public directory
        logStep('Copying Frontend to Server');
        
        const clientDistPath = path.join(__dirname, 'client', 'dist');
        const serverPublicPath = path.join(__dirname, 'server', 'public');
        
        if (fs.existsSync(clientDistPath)) {
            // Create server public directory
            if (!fs.existsSync(serverPublicPath)) {
                fs.mkdirSync(serverPublicPath, { recursive: true });
            }
            
            // Copy dist files to server/public
            if (process.platform === 'win32') {
                runCommand(`xcopy "${clientDistPath}" "${serverPublicPath}" /E /I /Y`, 'Copying frontend files (Windows)');
            } else {
                runCommand(`cp -r "${clientDistPath}"/* "${serverPublicPath}"/`, 'Copying frontend files (Unix)');
            }
            
            console.log('✅ Frontend files copied to server/public');
        } else {
            console.log('⚠️ No frontend build found, server will create fallback UI');
        }

        // Step 5: Start production server
        logStep('Starting Production Server');
        
        console.log('🎯 Production server configuration:');
        console.log('   - Environment: production');
        console.log('   - Port: 8000 (configurable via PORT env var)');
        console.log('   - Database: SQLite with 1,620 MCQ questions');
        console.log('   - Admin credentials: admin/admin123');
        console.log('   - Frontend: React SPA with admin dashboard');
        console.log('   - API: RESTful endpoints for auth, quiz, admin');
        
        console.log('\n🚀 Starting complete production server...');
        console.log('📝 Use Ctrl+C to stop the server\n');
        
        // Start the complete production server
        process.env.NODE_ENV = 'production';
        require('./complete-production-server.js');
        
    } catch (error) {
        console.error('\n❌ Build and deployment failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Ensure Node.js version >= 18');
        console.log('2. Check if all package.json files exist');
        console.log('3. Verify network connectivity for npm install');
        console.log('4. Check file permissions');
        console.log('5. Try running individual steps manually');
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down build process...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down build process...');
    process.exit(0);
});

// Start build and deployment
buildAndDeploy().catch(console.error);
