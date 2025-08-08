#!/usr/bin/env node

/**
 * Simple Admin Security Update Script
 * Updates existing admin table with security columns
 */

const database = require('../config/database');

async function updateAdminSecurity() {
    console.log('🔐 Updating Admin Security...');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Add security columns to existing admin table (ignore if already exist)
        const securityColumns = [
            'ALTER TABLE admins ADD COLUMN failed_attempts INTEGER DEFAULT 0',
            'ALTER TABLE admins ADD COLUMN locked_until TEXT DEFAULT NULL',
            'ALTER TABLE admins ADD COLUMN last_login TEXT DEFAULT NULL'
        ];
        
        for (const sql of securityColumns) {
            try {
                await new Promise((resolve, reject) => {
                    db.run(sql, (err) => {
                        if (err && !err.message.includes('duplicate column')) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
                console.log('✅ Added security column');
            } catch (err) {
                console.log('⚠️  Column already exists or error:', err.message);
            }
        }
        
        console.log('✅ Admin security update complete!');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateAdminSecurity();