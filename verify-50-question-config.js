const fs = require('fs');
const path = require('path');

function verifyQuizConfiguration() {
    console.log('🔍 VERIFYING 50-QUESTION QUIZ CONFIGURATION');
    console.log('===========================================');

    let allGood = true;

    // Check server-side quiz route
    console.log('1. Checking server-side quiz configuration...');

    try {
        const quizRouteContent = fs.readFileSync('server/routes/quiz.js', 'utf8');

        // Check if selectUniqueQuizQuestions defaults to 50
        if (quizRouteContent.includes('totalQuestions = 50')) {
            console.log('✅ Server quiz route: Default 50 questions');
        } else {
            console.log('❌ Server quiz route: Not configured for 50 questions');
            allGood = false;
        }

        // Check pass criteria (36 out of 50)
        if (quizRouteContent.includes('correctAnswers >= 36')) {
            console.log('✅ Server pass criteria: 36/50 (72%)');
        } else {
            console.log('❌ Server pass criteria: Not updated for 50 questions');
            allGood = false;
        }

        // Check percentage calculation
        if (quizRouteContent.includes('correctAnswers / 50')) {
            console.log('✅ Server percentage: Based on 50 questions');
        } else {
            console.log('❌ Server percentage: Not updated for 50 questions');
            allGood = false;
        }

    } catch (error) {
        console.log('❌ Could not read server quiz route');
        allGood = false;
    }

    // Check client-side quiz interface
    console.log('\n2. Checking client-side quiz configuration...');

    try {
        const quizInterfaceContent = fs.readFileSync('client/src/components/QuizInterface.tsx', 'utf8');

        // Check timer (3000 seconds = 50 minutes)
        if (quizInterfaceContent.includes('timeRemaining: 3000')) {
            console.log('✅ Client timer: 3000 seconds (50 minutes)');
        } else {
            console.log('❌ Client timer: Not set to 50 minutes');
            allGood = false;
        }

        // Check answers array initialization
        if (quizInterfaceContent.includes('new Array(50).fill(null)')) {
            console.log('✅ Client answers: Array for 50 questions');
        } else {
            console.log('❌ Client answers: Not configured for 50 questions');
            allGood = false;
        }

        // Check instruction text
        if (quizInterfaceContent.includes('all 50 questions')) {
            console.log('✅ Client instructions: Updated for 50 questions');
        } else {
            console.log('❌ Client instructions: Still showing old question count');
            allGood = false;
        }

    } catch (error) {
        console.log('❌ Could not read client quiz interface');
        allGood = false;
    }

    // Check database schema
    console.log('\n3. Checking database schema...');

    try {
        const schemaContent = fs.readFileSync('server/database/init.sql', 'utf8');

        if (schemaContent.includes('total_questions INTEGER DEFAULT 50')) {
            console.log('✅ Database schema: Default 50 questions');
        } else {
            console.log('❌ Database schema: Not configured for 50 questions');
            allGood = false;
        }

        if (schemaContent.includes('36+ correct answers')) {
            console.log('✅ Database schema: Updated pass criteria comment');
        } else {
            console.log('❌ Database schema: Old pass criteria comment');
            allGood = false;
        }

    } catch (error) {
        console.log('❌ Could not read database schema');
        allGood = false;
    }

    // Check landing pages
    console.log('\n4. Checking landing page configurations...');

    const filesToCheck = [
        'client/src/components/TechnoBoardLanding.tsx',
        'client/src/components/student/Dashboard.tsx',
        'client/src/components/LandingPage.tsx',
        'client/src/components/auth/ModernLoginForm.tsx'
    ];

    for (const file of filesToCheck) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const fileName = path.basename(file);

            if (content.includes('50 Questions') || content.includes('50 questions')) {
                console.log(`✅ ${fileName}: Updated to 50 questions`);
            } else if (content.includes('25 Questions') || content.includes('25 questions')) {
                console.log(`❌ ${fileName}: Still shows 25 questions`);
                allGood = false;
            } else {
                console.log(`ℹ️  ${fileName}: No question count found`);
            }

        } catch (error) {
            console.log(`❌ Could not read ${file}`);
            allGood = false;
        }
    }

    // Summary
    console.log('\n📊 CONFIGURATION SUMMARY');
    console.log('========================');

    if (allGood) {
        console.log('🎉 ALL CONFIGURATIONS UPDATED SUCCESSFULLY!');
        console.log('✅ Quiz: 50 questions');
        console.log('✅ Timer: 50 minutes (3000 seconds)');
        console.log('✅ Pass criteria: 36/50 (72%)');
        console.log('✅ All UI components updated');
        console.log('🎯 TECH BOARD 2025 ready for 50-question tests!');
    } else {
        console.log('❌ SOME CONFIGURATIONS NEED ATTENTION');
        console.log('Please review the items marked with ❌ above');
    }

    return allGood;
}

// Run verification
verifyQuizConfiguration();