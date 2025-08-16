#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🔧 Tech Board 2025 - Error Detection and Fix Tool\n');

class ErrorChecker {
    constructor() {
        this.errors = [];
        this.fixes = [];
        this.warnings = [];
    }

    log(type, message, details = null) {
        const entry = { type, message, details, timestamp: new Date().toISOString() };
        
        if (type === 'error') {
            this.errors.push(entry);
            console.log(`❌ ERROR: ${message}`);
        } else if (type === 'fix') {
            this.fixes.push(entry);
            console.log(`✅ FIXED: ${message}`);
        } else if (type === 'warning') {
            this.warnings.push(entry);
            console.log(`⚠️  WARNING: ${message}`);
        } else {
            console.log(`ℹ️  INFO: ${message}`);
        }
        
        if (details) {
            console.log(`   Details: ${details}`);
        }
    }

    // Check for critical files
    checkCriticalFiles() {
        console.log('\n📁 Checking critical files...');
        
        const criticalFiles = [
            { path: 'package.json', required: true },
            { path: 'server/package.json', required: true },
            { path: 'server/index.js', required: true },
            { path: 'server/config/database.js', required: true },
            { path: 'server/database/init.sql', required: true },
            { path: 'server/database/mcq_system_fixed.db', required: false },
            { path: 'client/package.json', required: true },
            { path: 'client/src/main.tsx', required: false },
            { path: 'client/index.html', required: false }
        ];

        criticalFiles.forEach(file => {
            const filePath = path.join(__dirname, file.path);
            if (fs.existsSync(filePath)) {
                this.log('info', `${file.path} exists`);
            } else {
                if (file.required) {
                    this.log('error', `Missing required file: ${file.path}`);
                } else {
                    this.log('warning', `Optional file missing: ${file.path}`);
                }
            }
        });
    }

    // Check package.json dependencies
    checkDependencies() {
        console.log('\n📦 Checking dependencies...');
        
        try {
            // Check root package.json
            const rootPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
            this.log('info', `Root package.json loaded (${Object.keys(rootPkg.dependencies || {}).length} dependencies)`);
            
            // Check server package.json
            const serverPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/package.json'), 'utf8'));
            this.log('info', `Server package.json loaded (${Object.keys(serverPkg.dependencies || {}).length} dependencies)`);
            
            // Check for essential server dependencies
            const essentialServerDeps = ['express', 'sqlite3', 'bcrypt', 'cors', 'helmet'];
            essentialServerDeps.forEach(dep => {
                if (!serverPkg.dependencies || !serverPkg.dependencies[dep]) {
                    this.log('error', `Missing essential server dependency: ${dep}`);
                } else {
                    this.log('info', `Essential dependency ${dep} found`);
                }
            });
            
        } catch (error) {
            this.log('error', 'Failed to read package.json files', error.message);
        }
    }

    // Check database
    checkDatabase() {
        console.log('\n💾 Checking database...');
        
        const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
        if (fs.existsSync(dbPath)) {
            const stats = fs.statSync(dbPath);
            this.log('info', `Database exists (${Math.round(stats.size / 1024)}KB)`);
            
            // Basic database validation
            try {
                const sqlite3 = require('sqlite3').verbose();
                const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
                
                db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='questions'", (err, row) => {
                    if (err) {
                        this.log('error', 'Database corruption detected', err.message);
                    } else if (row) {
                        this.log('info', 'Database structure appears valid');
                    } else {
                        this.log('error', 'Database missing essential tables');
                    }
                    db.close();
                });
            } catch (error) {
                this.log('error', 'Cannot validate database', error.message);
            }
        } else {
            this.log('warning', 'Database file not found - will be created on first run');
        }
    }

    // Check for syntax errors
    async checkSyntax() {
        console.log('\n🔧 Checking syntax...');
        
        const jsFiles = [
            'server/index.js',
            'server/config/database.js',
            'validate-app.js'
        ];

        for (const file of jsFiles) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                try {
                    // Try to require the file to check for syntax errors
                    delete require.cache[require.resolve(filePath)];
                    require(filePath);
                    this.log('info', `${file} syntax OK`);
                } catch (error) {
                    this.log('error', `Syntax error in ${file}`, error.message);
                }
            }
        }
    }

    // Check environment configuration
    checkEnvironment() {
        console.log('\n🌍 Checking environment...');
        
        const envFiles = ['.env.example', '.env.production'];
        envFiles.forEach(envFile => {
            const envPath = path.join(__dirname, envFile);
            if (fs.existsSync(envPath)) {
                this.log('info', `${envFile} exists`);
            } else {
                this.log('warning', `${envFile} missing`);
            }
        });
        
        // Check for required environment variables
        const requiredEnvVars = ['NODE_ENV'];
        requiredEnvVars.forEach(envVar => {
            if (process.env[envVar]) {
                this.log('info', `Environment variable ${envVar} is set`);
            } else {
                this.log('warning', `Environment variable ${envVar} not set`);
            }
        });
    }

    // Auto-fix common issues
    async autoFix() {
        console.log('\n🔨 Attempting auto-fixes...');
        
        // Create missing directories
        const requiredDirs = [
            'server/logs',
            'server/database',
            'server/backups'
        ];
        
        requiredDirs.forEach(dir => {
            const dirPath = path.join(__dirname, dir);
            if (!fs.existsSync(dirPath)) {
                try {
                    fs.mkdirSync(dirPath, { recursive: true });
                    this.log('fix', `Created missing directory: ${dir}`);
                } catch (error) {
                    this.log('error', `Failed to create directory: ${dir}`, error.message);
                }
            }
        });

        // Create .env.example if missing
        const envExamplePath = path.join(__dirname, '.env.example');
        if (!fs.existsSync(envExamplePath)) {
            const envContent = `# Tech Board 2025 MCQ System Environment Variables
NODE_ENV=development
PORT=8000
JWT_SECRET=your-secret-key-here
DB_PATH=server/database/mcq_system_fixed.db
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200
`;
            try {
                fs.writeFileSync(envExamplePath, envContent);
                this.log('fix', 'Created .env.example file');
            } catch (error) {
                this.log('error', 'Failed to create .env.example', error.message);
            }
        }
    }

    // Generate summary report
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 ERROR CHECK SUMMARY');
        console.log('='.repeat(60));
        
        console.log(`❌ Errors found: ${this.errors.length}`);
        console.log(`✅ Fixes applied: ${this.fixes.length}`);
        console.log(`⚠️  Warnings: ${this.warnings.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n🚨 CRITICAL ERRORS:');
            this.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error.message}`);
                if (error.details) {
                    console.log(`   ${error.details}`);
                }
            });
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach((warning, index) => {
                console.log(`${index + 1}. ${warning.message}`);
            });
        }
        
        console.log('\n' + '='.repeat(60));
        
        if (this.errors.length === 0) {
            console.log('🎉 NO CRITICAL ERRORS FOUND!');
            console.log('✨ The Tech Board 2025 MCQ System appears to be error-free');
            return true;
        } else {
            console.log('🔧 Please fix the critical errors listed above');
            return false;
        }
    }

    // Run all checks
    async runAllChecks() {
        console.log('🚀 Starting comprehensive error check...\n');
        
        this.checkCriticalFiles();
        this.checkDependencies();
        this.checkDatabase();
        await this.checkSyntax();
        this.checkEnvironment();
        await this.autoFix();
        
        return this.generateReport();
    }
}

// Run the error checker
const checker = new ErrorChecker();
checker.runAllChecks().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('❌ Error checker failed:', error.message);
    process.exit(1);
});
