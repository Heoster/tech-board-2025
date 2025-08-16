const removeDuplicates = require('./remove-duplicate-questions');
const optimizeDatabase = require('./optimize-database');
const fs = require('fs');

console.log('🔧 TechBoard 2025 - Complete Database Maintenance\n');

async function maintainDatabase() {
    try {
        const startTime = Date.now();

        console.log('🚀 Starting comprehensive database maintenance...\n');

        // Step 1: Remove duplicates
        console.log('📋 Step 1: Duplicate Detection & Removal');
        console.log('='.repeat(50));
        const duplicatesRemoved = await removeDuplicates();

        if (!duplicatesRemoved) {
            console.log('❌ Duplicate removal failed, aborting maintenance');
            return false;
        }

        console.log('\n✅ Duplicate removal completed\n');

        // Step 2: Optimize database
        console.log('📋 Step 2: Database Optimization');
        console.log('='.repeat(50));
        const optimizationSuccess = await optimizeDatabase();

        if (!optimizationSuccess) {
            console.log('❌ Database optimization failed');
            return false;
        }

        console.log('\n✅ Database optimization completed\n');

        // Step 3: Generate comprehensive report
        console.log('📋 Step 3: Generating Maintenance Report');
        console.log('='.repeat(50));

        const endTime = Date.now();
        const totalDuration = endTime - startTime;

        // Read individual reports if they exist
        let duplicateReport = null;
        let optimizationReport = null;

        try {
            if (fs.existsSync('duplicate-removal-report.json')) {
                duplicateReport = JSON.parse(fs.readFileSync('duplicate-removal-report.json', 'utf8'));
            }
        } catch (error) {
            console.log('⚠️ Could not read duplicate removal report');
        }

        try {
            if (fs.existsSync('database-optimization-report.json')) {
                optimizationReport = JSON.parse(fs.readFileSync('database-optimization-report.json', 'utf8'));
            }
        } catch (error) {
            console.log('⚠️ Could not read optimization report');
        }

        const maintenanceReport = {
            timestamp: new Date().toISOString(),
            operation: 'complete_database_maintenance',
            duration_ms: totalDuration,
            steps: [
                {
                    step: 1,
                    name: 'Duplicate Detection & Removal',
                    success: duplicatesRemoved,
                    report: duplicateReport
                },
                {
                    step: 2,
                    name: 'Database Optimization',
                    success: optimizationSuccess,
                    report: optimizationReport
                }
            ],
            summary: {
                duplicates_removed: duplicateReport?.removed || 0,
                database_size_kb: optimizationReport?.final_size_kb || 0,
                performance_tests_passed: optimizationReport?.performance_tests || 0,
                total_questions: duplicateReport?.after?.totalQuestions || 0
            },
            success: true
        };

        fs.writeFileSync('database-maintenance-report.json', JSON.stringify(maintenanceReport, null, 2));

        console.log('📊 Maintenance Summary:');
        console.log(`  Duration: ${(totalDuration / 1000).toFixed(2)} seconds`);
        console.log(`  Duplicates Removed: ${maintenanceReport.summary.duplicates_removed}`);
        console.log(`  Database Size: ${maintenanceReport.summary.database_size_kb} KB`);
        console.log(`  Total Questions: ${maintenanceReport.summary.total_questions}`);
        console.log(`  Performance Tests: ${maintenanceReport.summary.performance_tests_passed} passed`);

        console.log('\n📄 Complete maintenance report saved to: database-maintenance-report.json');

        // Clean up individual reports
        try {
            if (fs.existsSync('duplicate-removal-report.json')) {
                fs.unlinkSync('duplicate-removal-report.json');
            }
            if (fs.existsSync('database-optimization-report.json')) {
                fs.unlinkSync('database-optimization-report.json');
            }
        } catch (error) {
            console.log('⚠️ Could not clean up temporary reports');
        }

        console.log('\n🎉 Database maintenance completed successfully!');
        console.log('✅ All duplicates removed');
        console.log('✅ Database fully optimized');
        console.log('✅ Performance enhanced');
        console.log('✅ Ready for production use');

        return true;

    } catch (error) {
        console.error('❌ Database maintenance failed:', error);
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    maintainDatabase()
        .then(success => {
            console.log(`\n${success ? '🎯 Database maintenance successful!' : '❌ Database maintenance failed!'}`);
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = maintainDatabase;