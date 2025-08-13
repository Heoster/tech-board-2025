const bcrypt = require('bcrypt');
const database = require('../config/database');

async function ensureAdmin() {
    try {
        await database.connect();
        console.log('Checking admin user...');
        
        // Check if admin exists
        const existingAdmin = await database.get('SELECT * FROM admins WHERE username = ?', ['admin']);
        
        if (existingAdmin) {
            console.log('✅ Admin user exists');
            
            // Verify password works
            const passwordValid = await bcrypt.compare('admin123', existingAdmin.password);
            if (!passwordValid) {
                console.log('⚠️ Admin password needs update');
                const hashedPassword = await bcrypt.hash('admin123', 10);
                await database.run('UPDATE admins SET password = ? WHERE username = ?', [hashedPassword, 'admin']);
                console.log('✅ Admin password updated');
            } else {
                console.log('✅ Admin password verified');
            }
        } else {
            console.log('Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await database.run(
                'INSERT INTO admins (username, password) VALUES (?, ?)',
                ['admin', hashedPassword]
            );
            console.log('✅ Admin user created');
        }
        
        console.log('Admin setup complete');
        
    } catch (error) {
        console.error('❌ Admin setup failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    ensureAdmin();
}

module.exports = ensureAdmin;