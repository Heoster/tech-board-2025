require('dotenv').config();
const database = require('../config/database');

async function fixTriggers() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Fixing Database Triggers ===');
        
        // Drop problematic triggers
        await new Promise((resolve, reject) => {
            db.run('DROP TRIGGER IF EXISTS enforce_roll_number_rules_insert', (err) => {
                if (err) reject(err);
                else {
                    console.log('✅ Dropped INSERT trigger');
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DROP TRIGGER IF EXISTS enforce_roll_number_rules_update', (err) => {
                if (err) reject(err);
                else {
                    console.log('✅ Dropped UPDATE trigger');
                    resolve();
                }
            });
        });

        // Create simpler, working triggers
        await new Promise((resolve, reject) => {
            db.run(`
                CREATE TRIGGER IF NOT EXISTS simple_roll_number_check_insert
                BEFORE INSERT ON students
                FOR EACH ROW
                BEGIN
                    SELECT CASE 
                        WHEN NEW.roll_number < 1 OR NEW.roll_number > 80 THEN
                            RAISE(ABORT, 'Roll number must be between 1 and 80')
                        WHEN NEW.grade NOT IN (6, 7, 8, 9, 11) THEN
                            RAISE(ABORT, 'Invalid grade')
                        WHEN NEW.section NOT IN ('A', 'B') THEN
                            RAISE(ABORT, 'Invalid section')
                    END;
                END;
            `, (err) => {
                if (err) reject(err);
                else {
                    console.log('✅ Created simple INSERT trigger');
                    resolve();
                }
            });
        });

        console.log('=== Triggers fixed successfully ===');

    } catch (error) {
        console.error('❌ Error fixing triggers:', error.message);
    } finally {
        await database.close();
    }
}

fixTriggers();