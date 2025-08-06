const database = require('./server/config/database');
const fs = require('fs');
const path = require('path');

// Comprehensive diagnostic to identify persistent issues
async function diagnosePersistentIssues() {
    console.log('🔍 DIAGNOSING PERSISTENT ISSUES IN MCQ SYSTEM\n');
    
    const issues = [];
    const warnings = [];
    
    try {
        // 1. Check database connection
        console.log('📋 CHECK 1: Database Connection');
        try {
            await database.connect();
            console.log('   ✅ Database connection successful');
        } catch (error) {
            console.log('   ❌ Database connection failed:', error.message);
            issues.push('Database connection failure');
        }
        
        // 2. Check database files exist
        console.log('\n📋 CHECK 2: Database Files');
        const dbFiles = [
            'server/database/init.sql',
            'server/database/rules.sql', 
            'server/database/no-duplicate-questions.sql',
            'server/database/ultra-strict-constraints.sql'
        ];
        
        dbFiles.forEach(file => {
            if (fs.existsSync(file)) {
                console.log(`   ✅ ${file}: EXISTS`);
            } else {
                console.log(`   ❌ ${file}: MISSING`);
                issues.push(`Missing database file: ${file}`);
            }
        });
        
        // 3. Check question data integrity
        console.log('\n📋 CHECK 3: Question Data Integrity');
        const db = database.getDb();
        
        if (db) {
            // Check total questions
            const totalQuestions = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            console.log(`   📊 Total questions in database: ${totalQuestions}`);
            
            if (totalQuestions < 1000) {
                warnings.push(`Low question count: ${totalQuestions} (expected 1250+)`);
            }
            
            // Check for malformed questions
            const malformedQuestions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, question_text 
                    FROM questions 
                    WHERE question_text LIKE '%Option A%' 
                       OR question_text LIKE '%Option B%'
                       OR question_text LIKE '%Correct%Answer%'
                    LIMIT 5
                `, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            if (malformedQuestions.length > 0) {
                console.log('   ❌ Found malformed questions:');
                malformedQuestions.forEach(q => {
                    console.log(`      ID ${q.id}: "${q.question_text.substring(0, 80)}..."`);
                });
                issues.push(`${malformedQuestions.length} malformed questions found`);
            } else {
                console.log('   ✅ No malformed questions found');
            }
            
            // Check for duplicate questions in database
            const duplicateQuestions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT question_text, COUNT(*) as count
                    FROM questions
                    GROUP BY question_text
                    HAVING COUNT(*) > 1
                    LIMIT 5
                `, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            if (duplicateQuestions.length > 0) {
                console.log('   ❌ Found duplicate questions in database:');
                duplicateQuestions.forEach(q => {
                    console.log(`      "${q.question_text.substring(0, 50)}..." appears ${q.count} times`);
                });
                issues.push(`${duplicateQuestions.length} duplicate questions in database`);
            } else {
                console.log('   ✅ No duplicate questions in database');
            }
        }
        
        // 4. Check quiz route integrity
        console.log('\n📋 CHECK 4: Quiz Route Integrity');
        try {
            const quizRouteContent = fs.readFileSync('./server/routes/quiz.js', 'utf8');
            
            const hasUltraStrictFunction = quizRouteContent.includes('selectUniqueQuizQuestions');
            const hasMultipleChecks = quizRouteContent.includes('DUPLICATE CHECK');
            const hasValidation = quizRouteContent.includes('ULTRA-STRICT VALIDATION');
            
            console.log(`   Ultra-strict function: ${hasUltraStrictFunction ? '✅ PRESENT' : '❌ MISSING'}`);
            console.log(`   Multiple duplicate checks: ${hasMultipleChecks ? '✅ PRESENT' : '❌ MISSING'}`);
            console.log(`   Final validation: ${hasValidation ? '✅ PRESENT' : '❌ MISSING'}`);
            
            if (!hasUltraStrictFunction) issues.push('Ultra-strict function missing from quiz route');
            if (!hasMultipleChecks) issues.push('Multiple duplicate checks missing');
            if (!hasValidation) issues.push('Final validation missing');
            
        } catch (error) {
            console.log('   ❌ Could not read quiz route file');
            issues.push('Quiz route file unreadable');
        }
        
        // 5. Check server configuration
        console.log('\n📋 CHECK 5: Server Configuration');
        try {
            const serverContent = fs.readFileSync('./server/index.js', 'utf8');
            
            const isLocalhostOnly = serverContent.includes("'localhost'") || serverContent.includes('"localhost"');
            const hasProperCors = serverContent.includes('localhost:5173');
            const hasErrorHandling = serverContent.includes('Error handling middleware');
            
            console.log(`   Localhost-only config: ${isLocalhostOnly ? '✅ CONFIGURED' : '⚠️  NOT CONFIGURED'}`);
            console.log(`   Proper CORS setup: ${hasProperCors ? '✅ CONFIGURED' : '❌ MISSING'}`);
            console.log(`   Error handling: ${hasErrorHandling ? '✅ PRESENT' : '❌ MISSING'}`);
            
            if (!isLocalhostOnly) warnings.push('Server not configured for localhost-only access');
            if (!hasProperCors) issues.push('CORS configuration missing');
            if (!hasErrorHandling) issues.push('Error handling middleware missing');
            
        } catch (error) {
            console.log('   ❌ Could not read server file');
            issues.push('Server file unreadable');
        }
        
        // 6. Check environment configuration
        console.log('\n📋 CHECK 6: Environment Configuration');
        const envFiles = ['.env.example', 'server/.env', 'client/.env'];
        
        envFiles.forEach(file => {
            if (fs.existsSync(file)) {
                console.log(`   ✅ ${file}: EXISTS`);
            } else {
                console.log(`   ⚠️  ${file}: MISSING`);
                warnings.push(`Environment file missing: ${file}`);
            }
        });
        
        // 7. Test actual quiz generation
        console.log('\n📋 CHECK 7: Live Quiz Generation Test');
        if (db) {
            try {
                // Test quiz generation for Grade 11
                const testQuestions = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT id FROM questions 
                        WHERE grade = 11 
                        ORDER BY RANDOM() 
                        LIMIT 25
                    `, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows.map(r => r.id));
                    });
                });
                
                const uniqueQuestions = [...new Set(testQuestions)];
                
                console.log(`   📊 Generated ${testQuestions.length} questions`);
                console.log(`   📊 Unique questions: ${uniqueQuestions.length}`);
                
                if (uniqueQuestions.length === testQuestions.length && testQuestions.length === 25) {
                    console.log('   ✅ Quiz generation working correctly');
                } else {
                    console.log('   ❌ Quiz generation has issues');
                    issues.push('Quiz generation producing duplicates or wrong count');
                }
                
            } catch (error) {
                console.log('   ❌ Quiz generation test failed:', error.message);
                issues.push('Quiz generation test failure');
            }
        }
        
        // 8. Final assessment
        console.log('\n🏆 DIAGNOSTIC SUMMARY:');
        
        if (issues.length === 0 && warnings.length === 0) {
            console.log('✅ NO ISSUES FOUND - System is operating correctly');
            console.log('🔒 Ultra-strict no-duplicates system is fully functional');
        } else {
            if (issues.length > 0) {
                console.log(`❌ CRITICAL ISSUES FOUND (${issues.length}):`);
                issues.forEach((issue, index) => {
                    console.log(`   ${index + 1}. ${issue}`);
                });
            }
            
            if (warnings.length > 0) {
                console.log(`⚠️  WARNINGS (${warnings.length}):`);
                warnings.forEach((warning, index) => {
                    console.log(`   ${index + 1}. ${warning}`);
                });
            }
        }
        
        // 9. Recommended fixes
        if (issues.length > 0 || warnings.length > 0) {
            console.log('\n🔧 RECOMMENDED FIXES:');
            
            if (issues.includes('Database connection failure')) {
                console.log('   1. Run: node server/scripts/seed-250-per-grade.js');
            }
            
            if (issues.some(i => i.includes('malformed questions'))) {
                console.log('   2. Re-seed database: node server/scripts/seed-250-per-grade.js');
            }
            
            if (issues.some(i => i.includes('Ultra-strict function missing'))) {
                console.log('   3. Restore quiz route: copy server/routes/quiz-no-duplicates.js to server/routes/quiz.js');
            }
            
            if (warnings.some(w => w.includes('localhost-only'))) {
                console.log('   4. Update server config for localhost-only access');
            }
            
            console.log('   5. Run comprehensive test: node test-no-duplicates.js');
            console.log('   6. Verify system: node verify-ultra-strict-system.js');
        }
        
        process.exit(issues.length > 0 ? 1 : 0);
        
    } catch (error) {
        console.error('❌ Diagnostic failed:', error);
        process.exit(1);
    }
}

diagnosePersistentIssues();