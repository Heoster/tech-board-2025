#!/usr/bin/env node

/**
 * Robust Railway Admin Fix
 * Creates a fresh admin account with proper error handling
 */

const database = require('./server/config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function fixRailwayAdminRobust() {
    console.log('🔧 ROBUST RAILWAY ADMIN FIX');
    console.log('===========================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Delete existing admin account to start fresh
        console.log('🗑️  Removing existing admin account...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM admins WHERE username = ?', ['admin'], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Create fresh admin account
        console.log('👨‍💼 Creating fresh admin account...');
        const adminUsername = 'admin';
        const adminPassword = 'TechBoard2025Admin!';
        
        // Hash password directly with bcrypt
        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        console.log('🔐 Password hashed successfully');

        // Insert new admin
        const adminId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO admins (username, password_hash, failed_attempts, locked_until, created_at) VALUES (?, ?, 0, NULL, CURRENT_TIMESTAMP)',
                [adminUsername, hashedPassword],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        console.log(`✅ Admin account created with ID: ${adminId}`);

        // Verify the account
        console.log('');
        console.log('🔍 Verifying admin account...');
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM admins WHERE username = ?',
                ['admin'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (admin) {
            console.log('✅ Admin account found in database');
            console.log(`   ID: ${admin.id}`);
            console.log(`   Username: ${admin.username}`);
            console.log(`   Created: ${admin.created_at}`);
            console.log(`   Failed Attempts: ${admin.failed_attempts}`);
            console.log(`   Locked Until: ${admin.locked_until || 'Not locked'}`);

            // Test password verification
            console.log('');
            console.log('🔐 Testing password verification...');
            const isPasswordValid = await bcrypt.compare(adminPassword, admin.password_hash);
            
            if (isPasswordValid) {
                console.log('✅ Password verification successful');
            } else {
                console.log('❌ Password verification failed');
                throw new Error('Password verification failed');
            }

            // Test JWT token generation
            console.log('');
            console.log('🎫 Testing JWT token generation...');
            const jwtSecret = process.env.JWT_SECRET || 'tech-board-2025-ultra-secure-jwt-secret-key-production';
            const testToken = jwt.sign({
                id: admin.id,
                username: admin.username,
                role: 'admin'
            }, jwtSecret, { expiresIn: '24h' });

            console.log('✅ JWT token generated successfully');
            console.log(`   Token length: ${testToken.length} characters`);

            // Verify token
            const decoded = jwt.verify(testToken, jwtSecret);
            console.log('✅ JWT token verification successful');
            console.log(`   Decoded user: ${decoded.username} (${decoded.role})`);

        } else {
            throw new Error('Admin account not found after creation');
        }

        // Log the fix
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
                ['RAILWAY_ADMIN_ROBUST_FIX', 'Created fresh admin account for Railway deployment with full verification'],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        await database.close();

        console.log('');
        console.log('🎉 RAILWAY ADMIN FIX COMPLETE!');
        console.log('==============================');
        console.log('✅ Fresh admin account created');
        console.log('✅ Password hashing verified');
        console.log('✅ JWT token generation tested');
        console.log('✅ Database operations successful');
        console.log('');
        console.log('🌐 Admin Login URL:');
        console.log('   https://tech-board.up.railway.app/admin/login');
        console.log('');
        console.log('🔑 Admin Credentials:');
        console.log('   Username: admin');
        console.log('   Password: TechBoard2025Admin!');
        console.log('');
        console.log('🚀 The admin login should now work on Railway!');

    } catch (error) {
        console.error('❌ Error in robust admin fix:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

if (require.main === module) {
    fixRailwayAdminRobust();
}

module.exports = { fixRailwayAdminRobust };