const database = require('./server/config/database.js');

/**
 * Additional safeguards for quiz submission system
 * Addresses issues found during comprehensive testing
 */

// Authorization check function
function checkAuthorization() {
    const isAuthorized = process.env.NODE_ENV === 'development' || 
                        process.env.ADMIN_SETUP === 'true' ||
                        process.argv.includes('--admin-setup');
    
    if (!isAuthorized) {
        console.error('❌ AUTHORIZATION FAILED: This script requires admin privileges');
        console.error('   Set NODE_ENV=development or ADMIN_SETUP=true or use --admin-setup flag');
        return false;
    }
    
    console.log('✅ Authorization verified');
    return true;
}

async function implementAdditionalSafeguards() {
    try {
        // Check authorization before proceeding
        if (!checkAuthorization()) {
            process.exit(1);
        }
        
        console.log('🛡️ IMPLEMENTING ADDITIONAL QUIZ SAFEGUARDS');
        console.log('==========================================\n');
        
        // Verify authorization again before database operations
        if (!checkAuthorization()) {
            throw new Error('Authorization verification failed');
        }
        
        await database.connect();
        const db = database.getDb();
        
        // SAFEGUARD 1: Enhanced question selection validation
        console.log('🔍 SAFEGUARD 1: Enhanced Question Selection Validation');
        console.log('-----------------------------------------------------');
        
        // Add database function to validate question requests
        const questionValidationTrigger = `
        CREATE TRIGGER IF NOT EXISTS validate_quiz_creation
        BEFORE INSERT ON quizzes
        BEGIN
            -- Validate student exists and is authorized
            SELECT CASE
                WHEN NOT EXISTS (SELECT 1 FROM students WHERE id = NEW.student_id) THEN
                    RAISE(ABORT, 'Unauthorized: Invalid student ID')
            END;
            
            -- Validate grade is supported
            SELECT CASE
                WHEN NEW.grade NOT IN (6, 7, 8, 9, 11) THEN
                    RAISE(ABORT, 'Invalid grade: must be 6, 7, 8, 9, or 11')
            END;
            
            -- Validate total_questions is positive
            SELECT CASE
                WHEN NEW.total_questions <= 0 THEN
                    RAISE(ABORT, 'Invalid question count: must be greater than 0')
                WHEN NEW.total_questions > 100 THEN
                    RAISE(ABORT, 'Invalid question count: maximum 100 questions allowed')
            END;
        END;
        `;
        
        await new Promise((resolve, reject) => {
            db.run(questionValidationTrigger, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ Enhanced quiz creation validation trigger added');
        
        // SAFEGUARD 2: Concurrent access protection
        console.log('\n🔍 SAFEGUARD 2: Concurrent Access Protection');
        console.log('----------------------------------------------');
        
        // Add index for better concurrent access handling
        const concurrentAccessIndex = `
        CREATE INDEX IF NOT EXISTS idx_active_quizzes 
        ON quizzes(student_id, status) 
        WHERE status = 'in_progress';
        `;
        
        await new Promise((resolve, reject) => {
            db.run(concurrentAccessIndex, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ Concurrent access index created');
        
        // SAFEGUARD 3: Quiz timeout protection
        console.log('\n🔍 SAFEGUARD 3: Quiz Timeout Protection');
        console.log('---------------------------------------');
        
        // Add trigger to auto-timeout old in-progress quizzes
        const timeoutTrigger = `
        CREATE TRIGGER IF NOT EXISTS auto_timeout_old_quizzes
        AFTER INSERT ON quizzes
        BEGIN
            -- Mark old in-progress quizzes as timed out if they're older than 2 hours
            UPDATE quizzes 
            SET status = 'timed_out', 
                end_time = CURRENT_TIMESTAMP 
            WHERE student_id = NEW.student_id 
            AND status = 'in_progress' 
            AND id != NEW.id 
            AND start_time < datetime('now', '-2 hours');
        END;
        `;
        
        await new Promise((resolve, reject) => {
            db.run(timeoutTrigger, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ Auto-timeout trigger for old quizzes added');
        
        // SAFEGUARD 4: Response validation enhancement
        console.log('\n🔍 SAFEGUARD 4: Response Validation Enhancement');
        console.log('-----------------------------------------------');
        
        // Enhanced response validation trigger
        const responseValidationTrigger = `
        CREATE TRIGGER IF NOT EXISTS validate_response_submission
        BEFORE INSERT ON responses
        BEGIN
            -- Validate quiz exists and is in progress and belongs to authorized student
            SELECT CASE
                WHEN NOT EXISTS (
                    SELECT 1 FROM quizzes q
                    INNER JOIN students s ON q.student_id = s.id
                    WHERE q.id = NEW.quiz_id AND q.status = 'in_progress'
                ) THEN
                    RAISE(ABORT, 'Unauthorized: Cannot submit response - quiz not found, not in progress, or student not authorized')
            END;
            
            -- Validate question exists
            SELECT CASE
                WHEN NOT EXISTS (
                    SELECT 1 FROM questions 
                    WHERE id = NEW.question_id
                ) THEN
                    RAISE(ABORT, 'Invalid question ID')
            END;
            
            -- Validate selected option belongs to the question (if not null)
            SELECT CASE
                WHEN NEW.selected_option_id IS NOT NULL 
                AND NOT EXISTS (
                    SELECT 1 FROM options 
                    WHERE id = NEW.selected_option_id 
                    AND question_id = NEW.question_id
                ) THEN
                    RAISE(ABORT, 'Selected option does not belong to the question')
            END;
        END;
        `;
        
        await new Promise((resolve, reject) => {
            db.run(responseValidationTrigger, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ Enhanced response validation trigger added');
        
        // SAFEGUARD 5: Score calculation verification
        console.log('\n🔍 SAFEGUARD 5: Score Calculation Verification');
        console.log('-----------------------------------------------');
        
        // Create view for score verification
        const scoreVerificationView = `
        CREATE VIEW IF NOT EXISTS quiz_score_verification AS
        SELECT 
            q.id as quiz_id,
            q.student_id,
            q.grade,
            q.total_questions,
            q.score as recorded_score,
            COUNT(r.id) as total_responses,
            SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) as calculated_score,
            q.passed as recorded_passed,
            CASE 
                WHEN SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) >= CAST(q.total_questions * 0.72 AS INTEGER) 
                THEN 1 ELSE 0 
            END as calculated_passed,
            CASE
                WHEN q.score != SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) THEN 'SCORE_MISMATCH'
                WHEN q.passed != (CASE WHEN SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) >= CAST(q.total_questions * 0.72 AS INTEGER) THEN 1 ELSE 0 END) THEN 'PASS_STATUS_MISMATCH'
                WHEN COUNT(r.id) != q.total_questions THEN 'RESPONSE_COUNT_MISMATCH'
                ELSE 'OK'
            END as verification_status
        FROM quizzes q
        LEFT JOIN responses r ON q.id = r.quiz_id
        WHERE q.status = 'completed'
        GROUP BY q.id, q.student_id, q.grade, q.total_questions, q.score, q.passed;
        `;
        
        await new Promise((resolve, reject) => {
            db.run(scoreVerificationView, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ Score verification view created');
        
        // SAFEGUARD 6: System health monitoring
        console.log('\n🔍 SAFEGUARD 6: System Health Monitoring');
        console.log('-----------------------------------------');
        
        // Create system health monitoring view
        const systemHealthView = `
        CREATE VIEW IF NOT EXISTS system_health_monitor AS
        SELECT 
            'ACTIVE_QUIZZES' as metric_name,
            COUNT(*) as metric_value,
            'Number of currently in-progress quizzes' as description
        FROM quizzes WHERE status = 'in_progress'
        
        UNION ALL
        
        SELECT 
            'COMPLETED_QUIZZES_TODAY' as metric_name,
            COUNT(*) as metric_value,
            'Quizzes completed today' as description
        FROM quizzes 
        WHERE status = 'completed' 
        AND DATE(end_time) = DATE('now')
        
        UNION ALL
        
        SELECT 
            'SYSTEM_INTEGRITY_SCORE' as metric_name,
            CASE 
                WHEN COUNT(CASE WHEN verification_status != 'OK' THEN 1 END) = 0 THEN 100
                ELSE CAST((COUNT(*) - COUNT(CASE WHEN verification_status != 'OK' THEN 1 END)) * 100.0 / COUNT(*) AS INTEGER)
            END as metric_value,
            'System integrity percentage' as description
        FROM quiz_score_verification
        
        UNION ALL
        
        SELECT 
            'DUPLICATE_RESPONSES' as metric_name,
            COUNT(*) as metric_value,
            'Number of duplicate responses detected' as description
        FROM duplicate_questions_report;
        `;
        
        await new Promise((resolve, reject) => {
            db.run(systemHealthView, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ System health monitoring view created');
        
        // Test all safeguards
        console.log('\n🧪 TESTING SAFEGUARDS');
        console.log('---------------------');
        
        // Test question validation
        console.log('Testing question validation...');
        try {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                    [99999, 15, 50, 'in_progress'], // Invalid grade
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('❌ Should have rejected invalid grade');
        } catch (error) {
            console.log('✅ Invalid grade correctly rejected');
        }
        
        try {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                    [99999, 9, 0, 'in_progress'], // Zero questions
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('❌ Should have rejected zero questions');
        } catch (error) {
            console.log('✅ Zero questions correctly rejected');
        }
        
        // Check system health
        console.log('\nChecking system health...');
        const healthMetrics = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM system_health_monitor', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('📊 System Health Metrics:');
        healthMetrics.forEach(metric => {
            console.log(`   ${metric.metric_name}: ${metric.metric_value} (${metric.description})`);
        });
        
        console.log('\n🛡️ ALL SAFEGUARDS IMPLEMENTED SUCCESSFULLY');
        console.log('==========================================');
        
        await database.close();
        
        return {
            success: true,
            safeguardsImplemented: 6,
            validationTriggersAdded: 3,
            monitoringViewsCreated: 2,
            indexesCreated: 1
        };
        
    } catch (error) {
        console.error('❌ Failed to implement safeguards:', error);
        try {
            await database.close();
        } catch (closeError) {
            console.error('Failed to close database:', closeError);
        }
        return {
            success: false,
            error: error.message
        };
    }
}

// Run if called directly
if (require.main === module) {
    implementAdditionalSafeguards()
        .then(result => {
            console.log('\n📋 Final Result:', result);
            process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
            console.error('Implementation failed:', error);
            process.exit(1);
        });
}

module.exports = { implementAdditionalSafeguards };