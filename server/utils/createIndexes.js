const database = require('../config/database');

/**
 * Create database indexes for improved query performance
 */
async function createIndexes() {
    const db = database.getDb();
    
    console.log('🔧 Creating database indexes for performance optimization...');
    
    const indexes = [
        // Questions table indexes
        {
            name: 'idx_questions_grade',
            sql: 'CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade)',
            description: 'Index on grade for faster question filtering'
        },
        {
            name: 'idx_questions_subject',
            sql: 'CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject)',
            description: 'Index on subject for subject-based queries'
        },
        {
            name: 'idx_questions_difficulty',
            sql: 'CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)',
            description: 'Index on difficulty for difficulty-based filtering'
        },
        {
            name: 'idx_questions_grade_subject',
            sql: 'CREATE INDEX IF NOT EXISTS idx_questions_grade_subject ON questions(grade, subject)',
            description: 'Composite index for grade and subject queries'
        },
        
        // Students table indexes
        {
            name: 'idx_students_email',
            sql: 'CREATE UNIQUE INDEX IF NOT EXISTS idx_students_email ON students(email)',
            description: 'Unique index on email for login queries'
        },
        {
            name: 'idx_students_grade',
            sql: 'CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade)',
            description: 'Index on grade for student filtering'
        },
        {
            name: 'idx_students_school',
            sql: 'CREATE INDEX IF NOT EXISTS idx_students_school ON students(school)',
            description: 'Index on school for school-based queries'
        },
        
        // Quiz sessions table indexes
        {
            name: 'idx_quiz_sessions_student_id',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_sessions_student_id ON quiz_sessions(student_id)',
            description: 'Index on student_id for session lookups'
        },
        {
            name: 'idx_quiz_sessions_status',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_sessions_status ON quiz_sessions(status)',
            description: 'Index on status for filtering active/completed sessions'
        },
        {
            name: 'idx_quiz_sessions_created_at',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_sessions_created_at ON quiz_sessions(created_at)',
            description: 'Index on created_at for time-based queries'
        },
        {
            name: 'idx_quiz_sessions_student_status',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_sessions_student_status ON quiz_sessions(student_id, status)',
            description: 'Composite index for student session status queries'
        },
        
        // Quiz responses table indexes
        {
            name: 'idx_quiz_responses_session_id',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id ON quiz_responses(session_id)',
            description: 'Index on session_id for response lookups'
        },
        {
            name: 'idx_quiz_responses_question_id',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_responses_question_id ON quiz_responses(question_id)',
            description: 'Index on question_id for question analysis'
        },
        {
            name: 'idx_quiz_responses_session_question',
            sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_question ON quiz_responses(session_id, question_id)',
            description: 'Composite index for session-question lookups'
        },
        
        // Question options table indexes
        {
            name: 'idx_question_options_question_id',
            sql: 'CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON question_options(question_id)',
            description: 'Index on question_id for option lookups'
        },
        {
            name: 'idx_question_options_order',
            sql: 'CREATE INDEX IF NOT EXISTS idx_question_options_order ON question_options(question_id, option_order)',
            description: 'Composite index for ordered option retrieval'
        }
    ];
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const index of indexes) {
        try {
            await new Promise((resolve, reject) => {
                db.run(index.sql, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            });
            
            console.log(`✅ Created index: ${index.name} - ${index.description}`);
            successCount++;
        } catch (error) {
            console.error(`❌ Failed to create index ${index.name}:`, error.message);
            errorCount++;
        }
    }
    
    console.log(`\n📊 Index creation summary:`);
    console.log(`   ✅ Successfully created: ${successCount} indexes`);
    console.log(`   ❌ Failed to create: ${errorCount} indexes`);
    
    // Analyze table statistics after index creation
    await analyzeTableStats();
    
    return { successCount, errorCount };
}

/**
 * Analyze table statistics for query optimization
 */
async function analyzeTableStats() {
    const db = database.getDb();
    
    console.log('\n📈 Analyzing table statistics...');
    
    const tables = ['questions', 'students', 'quiz_sessions', 'quiz_responses', 'question_options'];
    
    for (const table of tables) {
        try {
            // Get row count
            const countResult = await new Promise((resolve, reject) => {
                db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            
            // Get table info
            const tableInfo = await new Promise((resolve, reject) => {
                db.all(`PRAGMA table_info(${table})`, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            // Get index list
            const indexList = await new Promise((resolve, reject) => {
                db.all(`PRAGMA index_list(${table})`, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log(`\n📋 Table: ${table}`);
            console.log(`   Rows: ${countResult.count}`);
            console.log(`   Columns: ${tableInfo.length}`);
            console.log(`   Indexes: ${indexList.length}`);
            
        } catch (error) {
            console.error(`❌ Failed to analyze table ${table}:`, error.message);
        }
    }
}

/**
 * Drop all custom indexes (for cleanup/reset)
 */
async function dropIndexes() {
    const db = database.getDb();
    
    console.log('🗑️ Dropping custom indexes...');
    
    const customIndexes = [
        'idx_questions_grade',
        'idx_questions_subject', 
        'idx_questions_difficulty',
        'idx_questions_grade_subject',
        'idx_students_email',
        'idx_students_grade',
        'idx_students_school',
        'idx_quiz_sessions_student_id',
        'idx_quiz_sessions_status',
        'idx_quiz_sessions_created_at',
        'idx_quiz_sessions_student_status',
        'idx_quiz_responses_session_id',
        'idx_quiz_responses_question_id',
        'idx_quiz_responses_session_question',
        'idx_question_options_question_id',
        'idx_question_options_order'
    ];
    
    let dropCount = 0;
    
    for (const indexName of customIndexes) {
        try {
            await new Promise((resolve, reject) => {
                db.run(`DROP INDEX IF EXISTS ${indexName}`, (err) => {
                    if (err) reject(err);
                    else resolve(true);
                });
            });
            
            console.log(`✅ Dropped index: ${indexName}`);
            dropCount++;
        } catch (error) {
            console.error(`❌ Failed to drop index ${indexName}:`, error.message);
        }
    }
    
    console.log(`\n📊 Dropped ${dropCount} indexes`);
    return dropCount;
}

/**
 * Get query execution plan for analysis
 */
async function explainQuery(sql, params = []) {
    const db = database.getDb();
    
    try {
        const plan = await new Promise((resolve, reject) => {
            db.all(`EXPLAIN QUERY PLAN ${sql}`, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\n🔍 Query Execution Plan:');
        console.log('SQL:', sql);
        plan.forEach((step, index) => {
            console.log(`${index + 1}. ${step.detail}`);
        });
        
        return plan;
    } catch (error) {
        console.error('❌ Failed to explain query:', error.message);
        return null;
    }
}

module.exports = {
    createIndexes,
    dropIndexes,
    analyzeTableStats,
    explainQuery
};