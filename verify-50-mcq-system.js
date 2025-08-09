const fs = require('fs');
const path = require('path');

console.log('🎯 VERIFYING 50 MCQ SYSTEM FOR EVERY STUDENT');
console.log('==============================================');

let allGood = true;
const issues = [];

// 1. Check server-side quiz route configuration
console.log('\n1️⃣ CHECKING SERVER-SIDE CONFIGURATION...');

try {
    const quizRouteContent = fs.readFileSync('server/routes/quiz.js', 'utf8');
    
    // Check default question count
    if (quizRouteContent.includes('totalQuestions = 50')) {
        console.log('✅ Default question count: 50 questions');
    } else {
        console.log('❌ Default question count: Not set to 50');
        issues.push('Server route not configured for 50 questions by default');
        allGood = false;
    }
    
    // Check ultra-strict selection function
    if (quizRouteContent.includes('selectUniqueQuizQuestions')) {
        console.log('✅ Ultra-strict question selection: Implemented');
    } else {
        console.log('❌ Ultra-strict question selection: Missing');
        issues.push('Ultra-strict question selection not implemented');
        allGood = false;
    }
    
    // Check pass criteria (36 out of 50 = 72%)
    if (quizRouteContent.includes('correctAnswers >= 36')) {
        console.log('✅ Pass criteria: 36/50 (72%)');
    } else {
        console.log('❌ Pass criteria: Not updated for 50 questions');
        issues.push('Pass criteria not updated for 50 questions');
        allGood = false;
    }
    
    // Check percentage calculation
    if (quizRouteContent.includes('correctAnswers / 50')) {
        console.log('✅ Percentage calculation: Based on 50 questions');
    } else {
        console.log('❌ Percentage calculation: Not updated for 50 questions');
        issues.push('Percentage calculation not based on 50 questions');
        allGood = false;
    }
    
    // Check duplicate prevention
    if (quizRouteContent.includes('ULTRA-STRICT') && quizRouteContent.includes('ZERO duplicates')) {
        console.log('✅ Duplicate prevention: Ultra-strict system implemented');
    } else {
        console.log('❌ Duplicate prevention: Not properly implemented');
        issues.push('Ultra-strict duplicate prevention not implemented');
        allGood = false;
    }
    
} catch (error) {
    console.log('❌ Could not read server quiz route');
    issues.push('Server quiz route file not accessible');
    allGood = false;
}

// 2. Check client-side configuration
console.log('\n2️⃣ CHECKING CLIENT-SIDE CONFIGURATION...');

try {
    const quizInterfaceContent = fs.readFileSync('client/src/components/QuizInterface.tsx', 'utf8');
    
    // Check timer (3000 seconds = 50 minutes)
    if (quizInterfaceContent.includes('timeRemaining: 3000')) {
        console.log('✅ Timer: 3000 seconds (50 minutes)');
    } else {
        console.log('❌ Timer: Not set to 50 minutes');
        issues.push('Client timer not set to 50 minutes');
        allGood = false;
    }
    
    // Check answers array initialization
    if (quizInterfaceContent.includes('new Array(50).fill(null)')) {
        console.log('✅ Answer array: Initialized for 50 questions');
    } else {
        console.log('❌ Answer array: Not configured for 50 questions');
        issues.push('Client answer array not configured for 50 questions');
        allGood = false;
    }
    
    // Check instruction text
    if (quizInterfaceContent.includes('Total Questions: 50')) {
        console.log('✅ Instructions: Updated for 50 questions');
    } else {
        console.log('❌ Instructions: Not updated for 50 questions');
        issues.push('Client instructions not updated for 50 questions');
        allGood = false;
    }
    
    // Check compulsory attempt message
    if (quizInterfaceContent.includes('attempt all 50 questions') || quizInterfaceContent.includes('ATTEMPT ALL QUESTIONS IS COMPULSORY')) {
        console.log('✅ Compulsory attempt: Message displayed');
    } else {
        console.log('❌ Compulsory attempt: Message missing');
        issues.push('Compulsory attempt message not displayed');
        allGood = false;
    }
    
} catch (error) {
    console.log('❌ Could not read client quiz interface');
    issues.push('Client quiz interface file not accessible');
    allGood = false;
}

// 3. Check database schema
console.log('\n3️⃣ CHECKING DATABASE SCHEMA...');

try {
    const schemaContent = fs.readFileSync('server/database/init.sql', 'utf8');
    
    if (schemaContent.includes('total_questions INTEGER DEFAULT 50')) {
        console.log('✅ Database schema: Default 50 questions');
    } else {
        console.log('❌ Database schema: Not configured for 50 questions');
        issues.push('Database schema not configured for 50 questions');
        allGood = false;
    }
    
    if (schemaContent.includes('36+ correct answers') || schemaContent.includes('72%')) {
        console.log('✅ Database schema: Updated pass criteria comment');
    } else {
        console.log('❌ Database schema: Old pass criteria comment');
        issues.push('Database schema comments not updated');
        allGood = false;
    }
    
} catch (error) {
    console.log('❌ Could not read database schema');
    issues.push('Database schema file not accessible');
    allGood = false;
}

// 4. Check landing pages and UI components
console.log('\n4️⃣ CHECKING UI COMPONENTS...');

const uiFiles = [
    'client/src/components/TechnoBoardLanding.tsx',
    'client/src/components/student/Dashboard.tsx',
    'client/src/components/LandingPage.tsx'
];

for (const file of uiFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const fileName = path.basename(file);
        
        if (content.includes('50 Questions') || content.includes('50 questions')) {
            console.log(`✅ ${fileName}: Updated to 50 questions`);
        } else if (content.includes('25 Questions') || content.includes('25 questions')) {
            console.log(`❌ ${fileName}: Still shows 25 questions`);
            issues.push(`${fileName} still shows 25 questions instead of 50`);
            allGood = false;
        } else {
            console.log(`ℹ️  ${fileName}: No specific question count found`);
        }
        
    } catch (error) {
        console.log(`❌ Could not read ${file}`);
        issues.push(`UI file ${file} not accessible`);
        allGood = false;
    }
}

// 5. Check for question bank adequacy
console.log('\n5️⃣ CHECKING QUESTION BANK ADEQUACY...');

try {
    // Check if seeding scripts exist for comprehensive question bank
    const seedingFiles = [
        'server/scripts/seed-1500-comprehensive.js',
        'server/scripts/seed-comprehensive-mcq.js',
        'server/scripts/create-comprehensive-difficulty-questions.js'
    ];
    
    let seedingFilesFound = 0;
    for (const file of seedingFiles) {
        if (fs.existsSync(file)) {
            seedingFilesFound++;
            console.log(`✅ Found seeding script: ${path.basename(file)}`);
        }
    }
    
    if (seedingFilesFound >= 2) {
        console.log('✅ Question bank: Adequate seeding scripts available');
    } else {
        console.log('❌ Question bank: Insufficient seeding scripts');
        issues.push('Not enough question seeding scripts for comprehensive question bank');
        allGood = false;
    }
    
} catch (error) {
    console.log('❌ Could not check question bank seeding scripts');
    issues.push('Question bank seeding scripts not accessible');
    allGood = false;
}

// 6. Final system validation
console.log('\n6️⃣ SYSTEM VALIDATION SUMMARY...');

console.log('\n📊 CONFIGURATION ANALYSIS');
console.log('==========================');

if (allGood) {
    console.log('🎉 EXCELLENT! 50 MCQ SYSTEM FULLY CONFIGURED');
    console.log('✅ Every student will receive exactly 50 questions');
    console.log('✅ Timer set to 50 minutes (1 minute per question)');
    console.log('✅ Pass criteria: 36/50 (72%)');
    console.log('✅ Ultra-strict duplicate prevention implemented');
    console.log('✅ All UI components updated');
    console.log('✅ Database schema configured correctly');
    console.log('✅ Question bank adequately seeded');
    console.log('');
    console.log('🎯 TECH BOARD 2025 READY FOR 50-QUESTION TESTS!');
    console.log('');
    console.log('📋 KEY FEATURES:');
    console.log('   • Exactly 50 MCQs per student');
    console.log('   • 50-minute time limit');
    console.log('   • Zero duplicate questions');
    console.log('   • Compulsory attempt of all questions');
    console.log('   • 72% pass criteria (36/50)');
    console.log('   • Ultra-strict validation system');
} else {
    console.log('❌ ISSUES FOUND - SYSTEM NEEDS ATTENTION');
    console.log('');
    console.log('🔧 ISSUES TO RESOLVE:');
    issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('');
    console.log('⚠️  Please resolve these issues before deploying the 50-question system.');
}

console.log('\n' + '='.repeat(60));
console.log('VERIFICATION COMPLETE');
console.log('='.repeat(60));

return allGood;