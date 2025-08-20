const database = require('./server/config/database');

async function fixProductionServer() {
    try {
        await database.connect();
        console.log('🔧 Fixing production server issues...');
        
        // Check current schema
        const studentsSchema = await database.query('PRAGMA table_info(students)');
        console.log('Current students schema:', studentsSchema.map(s => s.name));
        
        // Add missing columns if needed
        const hasRollNumber = studentsSchema.some(col => col.name === 'roll_number');
        const hasSection = studentsSchema.some(col => col.name === 'section');
        const hasPasswordHash = studentsSchema.some(col => col.name === 'password_hash');
        
        if (!hasRollNumber) {
            console.log('Adding roll_number column...');
            await database.run('ALTER TABLE students ADD COLUMN roll_number INTEGER DEFAULT 1');
        }
        
        if (!hasSection) {
            console.log('Adding section column...');
            await database.run('ALTER TABLE students ADD COLUMN section TEXT DEFAULT "A"');
        }
        
        if (!hasPasswordHash) {
            console.log('Adding password_hash column...');
            await database.run('ALTER TABLE students ADD COLUMN password_hash TEXT');
            // Copy password to password_hash
            await database.run('UPDATE students SET password_hash = password WHERE password_hash IS NULL');
        }
        
        // Ensure admin exists
        const admin = await database.get('SELECT * FROM admins WHERE username = ?', ['admin']);
        if (!admin) {
            console.log('Creating admin user...');
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await database.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
        }
        
        console.log('✅ Production server fixed');
        
    } catch (error) {
        console.error('❌ Fix failed:', error.message);
    }
}

fixProductionServer();