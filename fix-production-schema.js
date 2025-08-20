// Fix production database schema to add missing columns

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function fixProductionSchema() {
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔧 Fixing production database schema...');
    
    try {
        // Check current schema
        const schema = await new Promise((resolve, reject) => {
            db.all('PRAGMA table_info(students)', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('Current students table schema:');
        schema.forEach(col => {
            console.log(`  - ${col.name}: ${col.type}`);
        });
        
        const hasRollNumber = schema.some(col => col.name === 'roll_number');
        const hasSection = schema.some(col => col.name === 'section');
        
        // Add missing columns
        if (!hasRollNumber) {
            console.log('Adding roll_number column...');
            await new Promise((resolve, reject) => {
                db.run('ALTER TABLE students ADD COLUMN roll_number INTEGER', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            console.log('✅ roll_number column added');
        }
        
        if (!hasSection) {
            console.log('Adding section column...');
            await new Promise((resolve, reject) => {
                db.run('ALTER TABLE students ADD COLUMN section TEXT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            console.log('✅ section column added');
        }
        
        // Update existing students with roll_number and section
        console.log('Updating existing students...');
        const students = await new Promise((resolve, reject) => {
            db.all('SELECT id, name, grade FROM students', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const rollNumber = 79 + i; // Start from 79
            const section = i % 2 === 0 ? 'A' : 'B'; // Alternate sections
            
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE students SET roll_number = ?, section = ? WHERE id = ?',
                    [rollNumber, section, student.id],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            
            console.log(`  Updated student ${student.name}: roll=${rollNumber}, section=${section}`);
        }
        
        // Verify the fix
        const updatedStudents = await new Promise((resolve, reject) => {
            db.all('SELECT id, name, roll_number, grade, section FROM students', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\n✅ Updated students:');
        updatedStudents.forEach(student => {
            console.log(`  - ID: ${student.id}, Name: ${student.name}, Roll: ${student.roll_number}, Grade: ${student.grade}, Section: ${student.section}`);
        });
        
        console.log('\n🎉 Database schema fixed successfully!');
        
    } catch (error) {
        console.error('❌ Schema fix failed:', error);
    } finally {
        db.close();
    }
}

if (require.main === module) {
    fixProductionSchema();
}

module.exports = { fixProductionSchema };