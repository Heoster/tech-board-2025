const database = require('../config/database');
const fs = require('fs');
const path = require('path');

async function applyNoRepeatSchema() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('📋 Applying no-repeat questions schema...');
        
        // Read the SQL file
        const sqlPath = path.join(__dirname, '../database/no-repeat-questions.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Execute the SQL
        await new Promise((resolve, reject) => {
            db.exec(sql, (err) => {
                if (err) {
                    console.error('❌ Error applying schema:', err);
                    reject(err);
                } else {
                    console.log('✅ No-repeat questions schema applied successfully');
                    resolve();
                }
            });
        });
        
        // Verify the table was created
        const tableExists = await new Promise((resolve, reject) => {
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='used_questions'", (err, row) => {
                if (err) reject(err);
                else resolve(!!row);
            });
        });
        
        if (tableExists) {
            console.log('✅ used_questions table created successfully');
            
            // Check if trigger was created
            const triggerExists = await new Promise((resolve, reject) => {
                db.get("SELECT name FROM sqlite_master WHERE type='trigger' AND name='mark_question_as_used'", (err, row) => {
                    if (err) reject(err);
                    else resolve(!!row);
                });
            });
            
            if (triggerExists) {
                console.log('✅ mark_question_as_used trigger created successfully');
            } else {
                console.log('⚠️  Trigger not found, but this might be expected');
            }
        } else {
            console.log('❌ used_questions table was not created');
        }
        
    } catch (error) {
        console.error('❌ Error applying no-repeat schema:', error);
        throw error;
    } finally {
        console.log('🔒 Closing database connection...');
        await database.close();
    }
}

// Run the schema application
if (require.main === module) {
    applyNoRepeatSchema()
        .then(() => {
            console.log('🎉 No-repeat questions schema applied successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to apply schema:', error);
            process.exit(1);
        });
}

module.exports = applyNoRepeatSchema;