const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function setupProductionDatabase() {
    console.log('🗄️ Setting up production database...\n');

    // Ensure database directory exists
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('📁 Created database directory');
    }

    const db = new sqlite3.Database(dbPath);

    try {
        // Check if database is already set up
        const tableCount = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count 
                FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        if (tableCount === 0) {
            console.log('🔧 Initializing database schema...');
            
            // Read and execute init.sql
            const initSqlPath = path.join(__dirname, 'server/database/init.sql');
            if (fs.existsSync(initSqlPath)) {
                const initSql = fs.readFileSync(initSqlPath, 'utf8');
                await new Promise((resolve, reject) => {
                    db.exec(initSql, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                console.log('✅ Database schema initialized');
            }
        }

        // Check question counts
        const questionCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const totalQuestions = questionCounts.reduce((sum, row) => sum + row.count, 0);
        
        console.log('📊 Current question counts:');
        questionCounts.forEach(row => {
            const status = row.count >= 300 ? '✅' : '❌';
            console.log(`  Grade ${row.grade}: ${row.count}/300 ${status}`);
        });

        if (totalQuestions < 1500) {
            console.log('\n🌱 Seeding questions to reach 300 per grade...');
            // Run the seeding script
            require('./ensure-300-questions.js');
        } else {
            console.log('\n✅ Database already has sufficient questions');
        }

        // Verify admin user exists
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        if (adminCount === 0) {
            console.log('👤 Creating default admin user...');
            const bcrypt = require('bcrypt');
            const adminPassword = await bcrypt.hash('admin123', 10);
            
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO admins (username, password) VALUES (?, ?)',
                    ['admin', adminPassword],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('✅ Default admin user created (username: admin, password: admin123)');
        }

        console.log('\n🎉 Production database setup completed successfully!');
        console.log('📈 Database Statistics:');
        console.log(`  Total Questions: ${totalQuestions >= 1500 ? totalQuestions : 'Seeding in progress'}`);
        console.log(`  Admin Users: ${adminCount > 0 ? adminCount : 'Created'}`);
        console.log(`  Database Size: ${fs.existsSync(dbPath) ? (fs.statSync(dbPath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}`);

    } catch (error) {
        console.error('❌ Database setup failed:', error);
        throw error;
    } finally {
        db.close();
    }
}

// Run setup if called directly
if (require.main === module) {
    setupProductionDatabase().catch(console.error);
}

module.exports = setupProductionDatabase;