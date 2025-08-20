// Check current database schema

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function checkSchema() {
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔍 Checking current database schema...\n');
    
    // Check students table schema
    db.all("PRAGMA table_info(students)", (err, rows) => {
        if (err) {
            console.error('❌ Error checking students table:', err);
        } else {
            console.log('📋 Students table schema:');
            rows.forEach(row => {
                console.log(`  - ${row.name}: ${row.type} ${row.notnull ? 'NOT NULL' : ''} ${row.pk ? 'PRIMARY KEY' : ''}`);
            });
        }
        
        // Check if we have any students
        db.get("SELECT COUNT(*) as count FROM students", (err, row) => {
            if (err) {
                console.error('❌ Error counting students:', err);
            } else {
                console.log(`\n👥 Total students: ${row.count}`);
            }
            
            // Show sample student data
            db.all("SELECT * FROM students LIMIT 3", (err, rows) => {
                if (err) {
                    console.error('❌ Error fetching students:', err);
                } else {
                    console.log('\n📝 Sample student data:');
                    rows.forEach((student, index) => {
                        console.log(`  ${index + 1}. ID: ${student.id}, Name: ${student.name}, Grade: ${student.grade}`);
                        console.log(`     Roll: ${student.roll_number || 'N/A'}, Section: ${student.section || 'N/A'}`);
                    });
                }
                
                // Check questions count
                db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
                    if (err) {
                        console.error('❌ Error counting questions:', err);
                    } else {
                        console.log(`\n❓ Total questions: ${row.count}`);
                    }
                    
                    // Check questions by grade
                    db.all("SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade", (err, rows) => {
                        if (err) {
                            console.error('❌ Error counting questions by grade:', err);
                        } else {
                            console.log('\n📊 Questions by grade:');
                            rows.forEach(row => {
                                console.log(`  Grade ${row.grade}: ${row.count} questions`);
                            });
                        }
                        
                        db.close();
                    });
                });
            });
        });
    });
}

if (require.main === module) {
    checkSchema();
}

module.exports = { checkSchema };