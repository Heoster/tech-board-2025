const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

async function verifyDatabaseWorking() {
    console.log('🔍 Verifying database is working...\n');
    
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    
    // Check if database file exists
    if (!fs.existsSync(dbPath)) {
        console.log('❌ Database file not found!');
        console.log('💡 Run: npm run db:fix');
        return false;
    }
    
    console.log('✅ Database file exists');
    console.log('📍 Location:', dbPath);
    console.log('📏 Size:', Math.round(fs.statSync(dbPath).size / 1024) + ' KB\n');
    
    return new Promise((resolve) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.log('❌ Database connection failed:', err.message);
                resolve(false);
                return;
            }
            console.log('✅ Database connection successful\n');
        });
        
        let allChecks = [];
        
        // Check 1: Tables exist
        const expectedTables = ['students', 'admins', 'questions', 'options', 'quizzes', 'quiz_answers'];
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
            if (err) {
                console.log('❌ Failed to check tables:', err.message);
                allChecks.push(false);
            } else {
                const tableNames = rows.map(row => row.name);
                const missingTables = expectedTables.filter(table => !tableNames.includes(table));
                
                if (missingTables.length === 0) {
                    console.log('✅ All required tables exist:', expectedTables.join(', '));
                    allChecks.push(true);
                } else {
                    console.log('❌ Missing tables:', missingTables.join(', '));
                    allChecks.push(false);
                }
            }
            
            // Check 2: Admin user exists
            db.get("SELECT COUNT(*) as count FROM admins WHERE username = 'admin'", (err, row) => {
                if (err) {
                    console.log('❌ Failed to check admin user:', err.message);
                    allChecks.push(false);
                } else if (row.count > 0) {
                    console.log('✅ Admin user exists (username: admin)');
                    allChecks.push(true);
                } else {
                    console.log('❌ Admin user not found');
                    allChecks.push(false);
                }
                
                // Check 3: Questions exist
                db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
                    if (err) {
                        console.log('❌ Failed to check questions:', err.message);
                        allChecks.push(false);
                    } else if (row.count > 0) {
                        console.log(`✅ Questions loaded: ${row.count} total`);
                        allChecks.push(true);
                    } else {
                        console.log('❌ No questions found');
                        allChecks.push(false);
                    }
                    
                    // Check 4: Questions by grade
                    db.all("SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade", (err, rows) => {
                        if (err) {
                            console.log('❌ Failed to check questions by grade:', err.message);
                            allChecks.push(false);
                        } else {
                            console.log('✅ Questions by grade:');
                            rows.forEach(row => {
                                console.log(`   Grade ${row.grade}: ${row.count} questions`);
                            });
                            allChecks.push(true);
                        }
                        
                        // Check 5: Options exist
                        db.get("SELECT COUNT(*) as count FROM options", (err, row) => {
                            if (err) {
                                console.log('❌ Failed to check options:', err.message);
                                allChecks.push(false);
                            } else if (row.count > 0) {
                                console.log(`✅ Options loaded: ${row.count} total`);
                                allChecks.push(true);
                            } else {
                                console.log('❌ No options found');
                                allChecks.push(false);
                            }
                            
                            // Final verification
                            db.close(() => {
                                const allPassed = allChecks.every(check => check === true);
                                
                                console.log('\\n' + '='.repeat(50));
                                if (allPassed) {
                                    console.log('🎉 DATABASE IS WORKING PERFECTLY!');
                                    console.log('✅ All checks passed');
                                    console.log('🚀 Ready to start server with: npm run server:start');
                                    console.log('🔐 Admin login: username=admin, password=admin123');
                                } else {
                                    console.log('❌ Database has issues');
                                    console.log('💡 Fix with: npm run db:fix');
                                }
                                console.log('='.repeat(50));
                                
                                resolve(allPassed);
                            });
                        });
                    });
                });
            });
        });
    });
}

// Run verification
if (require.main === module) {
    verifyDatabaseWorking().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = { verifyDatabaseWorking };