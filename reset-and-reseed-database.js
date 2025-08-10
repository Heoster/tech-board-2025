#!/usr/bin/env node

/**
 * Complete Database Reset & Reseed Script
 * 1. Resets database completely
 * 2. Reseeds with all 1,590 questions
 * 3. Creates admin credentials
 */

const database = require('./server/config/database');
const { seedAllGrades } = require('./server/seed/master-comprehensive-seed');
const createAdminCredentials = require('./server/scripts/create-admin-credentials');

async function resetAndReseedDatabase() {
    console.log('🔄 COMPLETE DATABASE RESET & RESEED');
    console.log('===================================');
    console.log('This will:');
    console.log('1. ❌ Clear all existing data');
    console.log('2. 📚 Reseed with 1,590 questions');
    console.log('3. 🔐 Create admin credentials');
    console.log('');

    const startTime = Date.now();

    try {
        // Step 1: Reset Database
        console.log('🗑️  STEP 1: Resetting database...');
        await database.connect();
        const db = database.getDb();
        
        // Clear all data
        const tables = ['responses', 'quizzes', 'students', 'options', 'questions', 'admins'];
        for (const table of tables) {
            await new Promise((resolve, reject) => {
                db.run(`DELETE FROM ${table}`, (err) => {
                    if (err && !err.message.includes('no such table')) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
        
        // Reset auto-increment counters
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM sqlite_sequence', (err) => {
                if (err && !err.message.includes('no such table')) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        
        console.log('✅ Database reset complete');
        await database.close();

        // Step 2: Reseed with Questions
        console.log('');
        console.log('📚 STEP 2: Reseeding with questions...');
        await seedAllGrades();

        // Step 3: Create Admin Credentials
        console.log('');
        console.log('🔐 STEP 3: Creating admin credentials...');
        await createAdminCredentials();

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log('');
        console.log('🎉 DATABASE RESET & RESEED COMPLETED!');
        console.log('====================================');
        console.log(`⏱️  Total time: ${duration} seconds`);
        console.log('');
        console.log('📊 FINAL STATUS:');
        console.log('✅ Database completely reset');
        console.log('✅ 1,590 questions seeded across 5 grades');
        console.log('✅ Admin credentials created');
        console.log('✅ System ready for production');
        console.log('');
        console.log('🌐 ACCESS URLS:');
        console.log('• Student Portal: https://tech-board.up.railway.app');
        console.log('• Admin Portal: https://tech-board.up.railway.app/admin');
        console.log('• Username: admin');
        console.log('• Password: admin123');

        process.exit(0);

    } catch (error) {
        console.error('❌ Reset and reseed failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    resetAndReseedDatabase();
}

module.exports = resetAndReseedDatabase;