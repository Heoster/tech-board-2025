#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Tech Board 2025 for Production...');
console.log('===============================================');

try {
    // Check if we're in the right directory
    const serverDir = path.join(__dirname, 'server');
    if (!fs.existsSync(serverDir)) {
        console.error('❌ Server directory not found');
        process.exit(1);
    }

    // Install dependencies (skip if in production environment)
    if (process.env.NODE_ENV !== 'production') {
        console.log('📦 Installing dependencies...');
        try {
            execSync('npm install', { 
                cwd: serverDir, 
                stdio: 'inherit' 
            });
        } catch (error) {
            console.log('⚠️  npm install failed, continuing with existing dependencies');
        }
    } else {
        console.log('📦 Skipping dependency installation in production');
    }

    // Setup production database
    console.log('🗄️  Setting up production database...');
    execSync('npm run setup:db', { 
        cwd: serverDir, 
        stdio: 'inherit' 
    });

    // Verify critical files exist
    console.log('🔍 Verifying production files...');
    const criticalFiles = [
        'server/database/mcq_system_fixed.db',
        'server/public/index.html',
        'server/complete-production-server.js',
        'server/package.json'
    ];

    let allFilesExist = true;
    criticalFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file}`);
        } else {
            console.log(`❌ ${file}`);
            allFilesExist = false;
        }
    });

    if (!allFilesExist) {
        console.error('❌ Some critical files are missing');
        process.exit(1);
    }

    // Verify database content
    console.log('🔍 Verifying database content...');
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Database connection failed:', err.message);
            process.exit(1);
        }
        
        db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
            if (err) {
                console.error('❌ Database verification failed:', err.message);
                process.exit(1);
            }
            
            console.log(`✅ Database contains ${row.count} questions`);
            
            if (row.count < 1000) {
                console.error('❌ Insufficient questions in database');
                process.exit(1);
            }
            
            db.close();
            
            console.log('✅ Production build completed successfully!');
            console.log('🚀 Ready for deployment!');
        });
    });

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}