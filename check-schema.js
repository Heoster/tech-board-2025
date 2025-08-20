const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

console.log('🔍 Checking database schema...\n');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        return;
    }
    console.log('✅ Connected to database');
});

// Get all tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error('❌ Error fetching tables:', err.message);
        return;
    }
    
    console.log('📋 Database Tables:');
    tables.forEach(table => {
        console.log(`  - ${table.name}`);
    });
    
    // Get schema for each table
    console.log('\n📊 Table Schemas:');
    
    const checkTableSchema = (tableName) => {
        return new Promise((resolve) => {
            db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
                if (err) {
                    console.error(`❌ Error checking ${tableName}:`, err.message);
                    resolve();
                    return;
                }
                
                console.log(`\n${tableName.toUpperCase()} TABLE:`);
                columns.forEach(col => {
                    const constraints = [];
                    if (col.pk) constraints.push('PRIMARY KEY');
                    if (col.notnull) constraints.push('NOT NULL');
                    if (col.dflt_value !== null) constraints.push(`DEFAULT ${col.dflt_value}`);
                    
                    const constraintStr = constraints.length > 0 ? ` (${constraints.join(', ')})` : '';
                    console.log(`  - ${col.name}: ${col.type}${constraintStr}`);
                });
                resolve();
            });
        });
    };
    
    // Check each table schema
    Promise.all(tables.map(table => checkTableSchema(table.name))).then(() => {
        
        // Check record counts
        console.log('\n📈 Record Counts:');
        
        const checkCount = (tableName) => {
            return new Promise((resolve) => {
                db.get(`SELECT COUNT(*) as count FROM ${tableName}`, (err, row) => {
                    if (err) {
                        console.error(`❌ Error counting ${tableName}:`, err.message);
                        resolve();
                        return;
                    }
                    console.log(`  - ${tableName}: ${row.count} records`);
                    resolve();
                });
            });
        };
        
        Promise.all(tables.map(table => checkCount(table.name))).then(() => {
            
            // Sample some data from questions table
            console.log('\n📋 Sample Questions:');
            db.all('SELECT id, grade, difficulty, question_text, options FROM questions LIMIT 3', (err, rows) => {
                if (err) {
                    console.error('❌ Error fetching sample questions:', err.message);
                } else {
                    rows.forEach((row, index) => {
                        console.log(`\n${index + 1}. [Grade ${row.grade}] [${row.difficulty.toUpperCase()}]`);
                        console.log(`   Question: ${row.question_text.substring(0, 80)}...`);
                        if (row.options) {
                            try {
                                const options = JSON.parse(row.options);
                                console.log(`   Options: ${options.length} options available`);
                            } catch (e) {
                                console.log(`   Options: ${row.options.substring(0, 50)}...`);
                            }
                        }
                    });
                }
                
                console.log('\n✅ Schema check completed!');
                db.close();
            });
        });
    });
});