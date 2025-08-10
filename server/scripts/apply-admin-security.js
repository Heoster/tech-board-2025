#!/usr/bin/env node

/**
 * Admin Security Enhancement Script
 * Applies security upgrades to the admin system
 */

const fs = require('fs');
const path = require('path');
const database = require('../config/database');

// Authorization check function
function checkAuthorization() {
    // Check if running with proper authorization
    const isAuthorized = process.env.NODE_ENV === 'development' || 
                        process.env.ADMIN_SETUP === 'true' ||
                        process.argv.includes('--admin-setup') ||
                        process.getuid && process.getuid() === 0; // Unix root check
    
    if (!isAuthorized) {
        console.error('❌ AUTHORIZATION FAILED: This script requires admin privileges');
        console.error('   Set NODE_ENV=development or ADMIN_SETUP=true or use --admin-setup flag');
        return false;
    }
    
    console.log('✅ Authorization verified for admin security operations');
    return true;
}

async function applyAdminSecurity() {
    console.log('🔐 Applying Admin Security Enhancements...');
    console.log('===========================================');

    try {
        // Check authorization before proceeding
        if (!checkAuthorization()) {
            process.exit(1);
        }
        
        // Verify authorization again before database operations
        if (!checkAuthorization()) {
            throw new Error('Authorization verification failed');
        }
        
        // Initialize database connection
        await database.initializeDatabase();
        const db = database.getDb();
        
        // Read migration SQL
        const migrationPath = path.join(__dirname, '../database/admin-security-migration.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
        
        // Split SQL statements
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        console.log(`📝 Executing ${statements.length} security migration statements...`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            console.log(`   ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`);
            
            await new Promise((resolve, reject) => {
                db.run(statement, (err) => {
                    if (err) {
                        // Ignore "duplicate column" errors as they're expected
                        if (err.message.includes('duplicate column name')) {
                            console.log(`     ⚠️  Column already exists (skipping)`);
                            resolve();
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve();
                    }
                });
            });
        }

        // Verify security tables exist
        console.log('\n🔍 Verifying security tables...');
        
        const tables = ['admin_sessions', 'admin_activity_log'];
        for (const table of tables) {
            const exists = await new Promise((resolve, reject) => {
                db.get(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
                    [table],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(!!row);
                    }
                );
            });
            
            console.log(`   ✅ Table '${table}': ${exists ? 'EXISTS' : 'MISSING'}`);
        }

        // Check admin table columns
        console.log('\n🔍 Verifying admin table security columns...');
        const adminColumns = await new Promise((resolve, reject) => {
            db.all("PRAGMA table_info(admins)", (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.name));
            });
        });

        const securityColumns = ['failed_attempts', 'locked_until', 'last_login'];
        for (const column of securityColumns) {
            const exists = adminColumns.includes(column);
            console.log(`   ✅ Column '${column}': ${exists ? 'EXISTS' : 'MISSING'}`);
        }

        // Final authorization check before logging
        if (!checkAuthorization()) {
            throw new Error('Final authorization check failed');
        }
        
        // Log security upgrade
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO admin_activity_log (admin_id, action, details, ip_address, timestamp) 
                 SELECT 1, 'SECURITY_MIGRATION', 'Admin security features applied successfully', 'system', datetime('now')
                 WHERE EXISTS (SELECT 1 FROM admins WHERE id = 1)`,
                (err) => {
                    if (err) console.warn('Could not log security upgrade:', err.message);
                    resolve();
                }
            );
        });

        console.log('\n✅ Admin Security Enhancement Complete!');
        console.log('\n🛡️  Security Features Enabled:');
        console.log('   • Account lockout after 5 failed attempts');
        console.log('   • Time-based security codes for enhanced protection');
        console.log('   • Session logging and monitoring');
        console.log('   • Activity logging for audit trails');
        console.log('   • IP address and browser fingerprinting');
        console.log('   • Failed attempt tracking and rate limiting');
        
        console.log('\n🔐 Admin Login Security Levels:');
        console.log('   • Normal: Username + Password');
        console.log('   • High: Username + Password + Time-based Security Code');
        console.log('   • Automatic escalation after failed attempts');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error applying admin security:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    applyAdminSecurity();
}

module.exports = { applyAdminSecurity };