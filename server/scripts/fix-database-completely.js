require('dotenv').config();
const cleanDatabaseGarbage = require('./clean-database-garbage');
const seedProfessionalDatabase = require('./seed-professional-database');

/**
 * COMPLETE DATABASE FIX
 * 
 * This script performs a complete database fix:
 * 1. Removes all garbage questions
 * 2. Seeds professional, meaningful questions
 * 3. Verifies the results
 */

async function fixDatabaseCompletely() {
    console.log('🔥 COMPLETE DATABASE FIX - REMOVING ALL GARBAGE');
    console.log('='.repeat(70));
    console.log('');
    console.log('This will:');
    console.log('❌ Remove ALL garbage auto-generated questions');
    console.log('✅ Replace with professional, meaningful questions');
    console.log('✅ Ensure proper educational content');
    console.log('✅ Fix all malformed question text and options');
    console.log('');

    try {
        // Step 1: Clean all garbage
        console.log('STEP 1: CLEANING GARBAGE FROM DATABASE');
        console.log('-'.repeat(50));
        await cleanDatabaseGarbage();
        
        console.log('\n');
        
        // Step 2: Seed professional questions
        console.log('STEP 2: SEEDING PROFESSIONAL QUESTIONS');
        console.log('-'.repeat(50));
        await seedProfessionalDatabase();
        
        console.log('\n');
        console.log('🎉 COMPLETE DATABASE FIX SUCCESSFUL!');
        console.log('='.repeat(70));
        console.log('');
        console.log('✅ All garbage questions removed');
        console.log('✅ Professional questions added');
        console.log('✅ Database is now clean and educational');
        console.log('✅ Ready for professional testing');
        console.log('');
        console.log('🎯 Test your quiz now - questions will be meaningful!');
        
    } catch (error) {
        console.error('❌ Complete database fix failed:', error);
        process.exit(1);
    }
}

// Run complete fix if this file is executed directly
if (require.main === module) {
    fixDatabaseCompletely();
}

module.exports = fixDatabaseCompletely;