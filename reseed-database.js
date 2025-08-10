#!/usr/bin/env node

const database = require('./server/config/database');
const bcrypt = require('./server/node_modules/bcrypt');

async function reseedDatabase() {
    console.log('🌱 RESEEDING DATABASE');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Create admin account
        const hashedPassword = await bcrypt.hash('admin123', 12);
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO admins (username, password_hash, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
                ['admin', hashedPassword],
                (err) => err ? reject(err) : resolve()
            );
        });
        
        console.log('✅ Admin created: username=admin, password=admin123');
        
        // Run seeding scripts
        console.log('🌱 Running seeding scripts...');
        
        const seedFiles = [
            './server/seed/grade6-comprehensive-seed.js',
            './server/seed/grade7-comprehensive-seed.js', 
            './server/seed/grade8-comprehensive-seed.js',
            './server/seed/grade9-comprehensive-seed.js',
            './server/seed/grade11-comprehensive-seed.js'
        ];
        
        for (const seedFile of seedFiles) {
            try {
                console.log(`Running ${seedFile}...`);
                require(seedFile);
            } catch (error) {
                console.log(`⚠️ ${seedFile} not found or failed, skipping`);
            }
        }
        
        await database.close();
        console.log('✅ Database reseeded successfully');
        
    } catch (error) {
        console.error('❌ Reseeding failed:', error);
        process.exit(1);
    }
}

reseedDatabase();