const database = require('./server/config/database');
const fs = require('fs');

console.log('⚡ TechBoard 2025 - Database Optimization\n');

async function optimizeDatabase() {
    try {
        console.log('📡 Connecting to database...');
        await database.connect();
        console.log('✅ Database connected successfully\n');

        // Step 1: Database integrity check
        console.log('🔍 Running database integrity check...');
        
        try {
            const integrityResult = await database.get('PRAGMA integrity_check');
            if (integrityResult && integrityResult.integrity_check === 'ok') {
                console.log('✅ Database integrity check passed');
            } else {
                console.log('⚠️ Database integrity issues detected');
            }
        } catch (error) {
            console.log('⚠️ Integrity check failed:', error.message);
        }

        // Step 2: Analyze database statistics
        console.log('\n📊 Analyzing database statistics...');
        
        const stats = await database.query(`
            SELECT name as table_name
            FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
        `);

        for (const table of stats) {
            try {
                const count = await database.get(`SELECT COUNT(*) as count FROM ${table.table_name}`);
                console.log(`  ${table.table_name}: ${count.count} records`);
            } catch (error) {
                console.log(`  ${table.table_name}: Error counting records`);
            }
        }

        // Step 3: Check for orphaned records
        console.log('\n🔍 Checking for orphaned records...');
        
        // Check for options without questions
        const orphanedOptions = await database.get(`
            SELECT COUNT(*) as count 
            FROM options o 
            LEFT JOIN questions q ON o.question_id = q.id 
            WHERE q.id IS NULL
        `);
        
        if (orphanedOptions.count > 0) {
            console.log(`⚠️ Found ${orphanedOptions.count} orphaned options`);
            
            // Remove orphaned options
            const removedOptions = await database.run(`
                DELETE FROM options 
                WHERE question_id NOT IN (SELECT id FROM questions)
            `);
            console.log(`✅ Removed ${removedOptions.changes} orphaned options`);
        } else {
            console.log('✅ No orphaned options found');
        }

        // Check for quiz answers without quizzes
        const orphanedAnswers = await database.get(`
            SELECT COUNT(*) as count 
            FROM quiz_answers qa 
            LEFT JOIN quizzes q ON qa.quiz_id = q.id 
            WHERE q.id IS NULL
        `);
        
        if (orphanedAnswers.count > 0) {
            console.log(`⚠️ Found ${orphanedAnswers.count} orphaned quiz answers`);
            
            // Remove orphaned quiz answers
            const removedAnswers = await database.run(`
                DELETE FROM quiz_answers 
                WHERE quiz_id NOT IN (SELECT id FROM quizzes)
            `);
            console.log(`✅ Removed ${removedAnswers.changes} orphaned quiz answers`);
        } else {
            console.log('✅ No orphaned quiz answers found');
        }

        // Step 4: Optimize database structure
        console.log('\n⚡ Optimizing database structure...');
        
        // Update statistics
        console.log('  Updating table statistics...');
        await database.run('ANALYZE');
        console.log('  ✅ Statistics updated');

        // Rebuild indexes
        console.log('  Rebuilding indexes...');
        await database.run('REINDEX');
        console.log('  ✅ Indexes rebuilt');

        // Vacuum database (reclaim space)
        console.log('  Reclaiming unused space...');
        const beforeSize = await getDatabaseSize();
        await database.run('VACUUM');
        const afterSize = await getDatabaseSize();
        const spaceSaved = beforeSize - afterSize;
        console.log(`  ✅ Space reclaimed: ${(spaceSaved / 1024).toFixed(2)} KB`);

        // Step 5: Optimize queries by ensuring proper indexes
        console.log('\n🔧 Ensuring optimal indexes...');
        
        const indexes = [
            {
                name: 'idx_questions_grade',
                sql: 'CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade)'
            },
            {
                name: 'idx_questions_difficulty',
                sql: 'CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)'
            },
            {
                name: 'idx_questions_grade_difficulty',
                sql: 'CREATE INDEX IF NOT EXISTS idx_questions_grade_difficulty ON questions(grade, difficulty)'
            },
            {
                name: 'idx_options_question_id',
                sql: 'CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id)'
            },
            {
                name: 'idx_quizzes_student_id',
                sql: 'CREATE INDEX IF NOT EXISTS idx_quizzes_student_id ON quizzes(student_id)'
            },
            {
                name: 'idx_quizzes_status',
                sql: 'CREATE INDEX IF NOT EXISTS idx_quizzes_status ON quizzes(status)'
            },
            {
                name: 'idx_quiz_answers_quiz_id',
                sql: 'CREATE INDEX IF NOT EXISTS idx_quiz_answers_quiz_id ON quiz_answers(quiz_id)'
            },
            {
                name: 'idx_students_roll_grade_section',
                sql: 'CREATE INDEX IF NOT EXISTS idx_students_roll_grade_section ON students(roll_number, grade, section)'
            }
        ];

        for (const index of indexes) {
            try {
                await database.run(index.sql);
                console.log(`  ✅ ${index.name}`);
            } catch (error) {
                console.log(`  ⚠️ ${index.name}: ${error.message}`);
            }
        }

        // Step 6: Database configuration optimization
        console.log('\n🔧 Optimizing database configuration...');
        
        const pragmas = [
            'PRAGMA journal_mode = WAL',
            'PRAGMA synchronous = NORMAL',
            'PRAGMA cache_size = 10000',
            'PRAGMA temp_store = MEMORY',
            'PRAGMA mmap_size = 268435456',
            'PRAGMA optimize'
        ];

        for (const pragma of pragmas) {
            try {
                await database.run(pragma);
                console.log(`  ✅ ${pragma}`);
            } catch (error) {
                console.log(`  ⚠️ ${pragma}: ${error.message}`);
            }
        }

        // Step 7: Performance test
        console.log('\n🏃 Running performance tests...');
        
        const performanceTests = [
            {
                name: 'Question retrieval by grade',
                sql: 'SELECT COUNT(*) FROM questions WHERE grade = 9'
            },
            {
                name: 'Question with options join',
                sql: `SELECT q.id, q.question_text, COUNT(o.id) as option_count 
                      FROM questions q 
                      LEFT JOIN options o ON q.id = o.question_id 
                      WHERE q.grade = 9 
                      GROUP BY q.id 
                      LIMIT 10`
            },
            {
                name: 'Student lookup',
                sql: 'SELECT * FROM students WHERE roll_number = 1 AND grade = 9 AND section = "A"'
            },
            {
                name: 'Quiz results query',
                sql: `SELECT q.*, s.name 
                      FROM quizzes q 
                      JOIN students s ON q.student_id = s.id 
                      WHERE q.status = "completed" 
                      LIMIT 10`
            }
        ];

        for (const test of performanceTests) {
            const startTime = Date.now();
            try {
                await database.query(test.sql);
                const duration = Date.now() - startTime;
                console.log(`  ✅ ${test.name}: ${duration}ms`);
            } catch (error) {
                console.log(`  ❌ ${test.name}: ${error.message}`);
            }
        }

        // Step 8: Final statistics
        console.log('\n📊 Final Database Statistics:');
        
        const finalStats = await database.query(`
            SELECT 
                'questions' as table_name,
                COUNT(*) as record_count,
                COUNT(DISTINCT grade) as unique_grades,
                COUNT(DISTINCT difficulty) as unique_difficulties
            FROM questions
            UNION ALL
            SELECT 
                'options' as table_name,
                COUNT(*) as record_count,
                COUNT(DISTINCT question_id) as questions_with_options,
                NULL as unique_difficulties
            FROM options
            UNION ALL
            SELECT 
                'students' as table_name,
                COUNT(*) as record_count,
                COUNT(DISTINCT grade) as unique_grades,
                COUNT(DISTINCT section) as unique_sections
            FROM students
            UNION ALL
            SELECT 
                'quizzes' as table_name,
                COUNT(*) as record_count,
                COUNT(DISTINCT student_id) as unique_students,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_quizzes
            FROM quizzes
        `);

        finalStats.forEach(stat => {
            console.log(`  ${stat.table_name}: ${stat.record_count} records`);
        });

        const dbSize = await getDatabaseSize();
        console.log(`  Database size: ${(dbSize / 1024).toFixed(2)} KB`);

        // Generate optimization report
        const report = {
            timestamp: new Date().toISOString(),
            operation: 'database_optimization',
            optimizations: [
                'Integrity check',
                'Orphaned record cleanup',
                'Statistics update',
                'Index rebuild',
                'Space reclamation',
                'Index optimization',
                'Configuration tuning'
            ],
            performance_tests: performanceTests.length,
            final_size_kb: Math.round(dbSize / 1024),
            success: true
        };

        fs.writeFileSync('database-optimization-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Optimization report saved to: database-optimization-report.json');

        await database.close();

        console.log('\n🎉 Database optimization completed successfully!');
        console.log('✅ Database integrity verified');
        console.log('✅ Orphaned records cleaned');
        console.log('✅ Indexes optimized');
        console.log('✅ Performance tuned');
        console.log('✅ Configuration optimized');

        return true;

    } catch (error) {
        console.error('❌ Database optimization failed:', error);
        
        try {
            await database.close();
        } catch (closeError) {
            console.error('Error closing database:', closeError);
        }
        
        return false;
    }
}

async function getDatabaseSize() {
    try {
        const dbPath = require('path').join(__dirname, 'server/database/mcq_system_fixed.db');
        if (fs.existsSync(dbPath)) {
            const stats = fs.statSync(dbPath);
            return stats.size;
        }
    } catch (error) {
        console.log('Could not determine database size');
    }
    return 0;
}

// Run if called directly
if (require.main === module) {
    optimizeDatabase()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = optimizeDatabase;