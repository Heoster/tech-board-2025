#!/usr/bin/env node

/**
 * Check Admin Table Structure
 * Examines the actual admin table structure in the database
 */

const database = require('./config/database');

async function checkAdminTable() {
    console.log('🔍 CHECKING ADMIN TABLE STRUCTURE');
    console.log('=================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Get table schema
        console.log('📋 Admin table schema:');
        const schema = await new Promise((resolve, reject) => {
            db.all("PRAGMA table_info(admins)", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (schema.length === 0) {
            console.log('❌ Admin table does not exist');
        } else {
            schema.forEach(column => {
                const nullable = column.notnull ? 'NOT NULL' : 'NULLABLE';
                const defaultVal = column.dflt_value ? ` DEFAULT ${column.dflt_value}` : '';
                const primaryKey = column.pk ? ' [PRIMARY KEY]' : '';
                console.log(`   ${column.name}: ${column.type} ${nullable}${defaultVal}${primaryKey}`);
            });
        }

        // Check existing admin records
        console.log('');
        console.log('👥 Existing admin records:');
        const admins = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM admins", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (admins.length === 0) {
            console.log('   No admin records found');
        } else {
            admins.forEach(admin => {
                console.log(`   ID: ${admin.id}, Username: ${admin.username}`);
                Object.keys(admin).forEach(key => {
                    if (key !== 'id' && key !== 'username') {
                        console.log(`     ${key}: ${admin[key] || 'NULL'}`);
                    }
                });
            });
        }

        await database.close();

    } catch (error) {
        console.error('❌ Error checking admin table:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    checkAdminTable();
}

module.exports = { checkAdminTable };