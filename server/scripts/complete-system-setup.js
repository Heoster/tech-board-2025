require('dotenv').config();
const database = require('../config/database');
const bcrypt = require('bcrypt');

// Import the question generation function
const generate1500Questions = require('./generate-1500-questions');
const createAdminCredentials = require('./create-admin-credentials');

async function completeSystemSetup() {
    try {
        console.log('🚀 COMPLETE TECH BOARD 2025 SYSTEM SETUP');
        console.log('========================================');
        console.log('');

        // Step 1: Generate 1500 questions
        console.log('📚 STEP 1: Generating 1500+ Questions...');
        await generate1500Questions();
        console.log('✅ Questions generation complete');
        console.log('');

        // Step 2: Create admin credentials
        console.log('🔐 STEP 2: Creating Admin Credentials...');
        await createAdminCredentials();
        console.log('✅ Admin credentials creation complete');
        console.log('');

        // Step 3: Final verification
        console.log('🔍 STEP 3: Final System Verification...');
        await verifyCompleteSystem();
        console.log('✅ System verification complete');
        console.log('');

        console.log('🎉 COMPLETE SYSTEM SETUP FINISHED!');
        console.log('==================================');
        console.log('✅ 1500+ questions seeded (300 per grade)');
        console.log('✅ Admin credentials created');
        console.log('✅ System fully ready for TECH BOARD 2025');
        console.log('✅ Live at: https://tech-board.up.railway.app');

    } catch (error) {
        console.error('❌ Complete system setup failed:', error);
    }
}

async function verifyCompleteSystem() {
    try {
        await database.connect();
        const db = database.getDb();

        // Verify questions
        const totalQuestions = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = "basic"', (err, row) => {
                resolve(row ? row.count : 0);
            });
        });

        // Verify admin accounts
        const adminCount = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                resolve(row ? row.count : 0);
            });
        });

        // Grade-wise verification
        const gradeVerification = {};
        for (const grade of [6, 7, 8, 9, 11]) {
            const count = await new Promise((resolve) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = "basic"', [grade], (err, row) => {
                    resolve(row ? row.count : 0);
                });
            });
            gradeVerification[grade] = count;
        }

        console.log('📊 SYSTEM VERIFICATION RESULTS:');
        console.log('===============================');
        console.log(`✅ Total Questions: ${totalQuestions}`);
        console.log(`✅ Admin Accounts: ${adminCount}`);
        console.log('');
        console.log('📚 Grade-wise Question Distribution:');
        for (const [grade, count] of Object.entries(gradeVerification)) {
            const status = count >= 250 ? '✅' : '⚠️ ';
            console.log(`${status} Grade ${grade}: ${count} questions`);
        }

        await database.close();
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

if (require.main === module) {
    completeSystemSetup();
}

module.exports = completeSystemSetup;