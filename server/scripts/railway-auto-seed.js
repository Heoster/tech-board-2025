// Railway Auto-Seed Script for TECH BOARD 2025
const database = require('../config/database');

async function railwayAutoSeed() {
    console.log('🌱 RAILWAY AUTO-SEED: Checking database...');
    
    try {
        const db = database.getDb();
        
        // Check current question count
        const currentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`📊 Current questions in database: ${currentCount}`);

        // If less than 100 questions, run comprehensive seeding
        if (currentCount < 100) {
            console.log('🌱 Database needs seeding, running comprehensive seed...');
            
            // Import and run the comprehensive seeding script
            const seedScript = require('./seed-1500-comprehensive');
            if (typeof seedScript === 'function') {
                await seedScript();
            } else {
                // If it's not a function, try to execute it
                console.log('🔄 Executing seeding script...');
            }
            
            // Verify seeding
            const newCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });

            console.log(`✅ Seeding completed. New question count: ${newCount}`);
            
            if (newCount >= 1000) {
                console.log('🎉 Railway database successfully seeded!');
            } else {
                console.log('⚠️  Seeding may be incomplete');
            }
        } else {
            console.log('✅ Database already has sufficient questions');
        }

    } catch (error) {
        console.error('❌ Auto-seed error:', error.message);
        console.log('⚠️  Continuing with existing database...');
    }
}

module.exports = railwayAutoSeed;