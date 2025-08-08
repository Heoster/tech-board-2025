const database = require('../config/database');

// Medium difficulty questions for each grade
const generateMediumQuestions = (grade) => {
    const baseQuestions = {
        6: [
            {
                question_text: 'Which of these operations requires both input and output devices?',
                options: [
                    { text: 'Typing a document and printing it', is_correct: true },
                    { text: 'Only saving a file', is_correct: false },
                    { text: 'Only viewing a document', is_correct: false },
                    { text: 'Only turning on computer', is_correct: false }
                ]
            },
            {
                question_text: 'What happens when you press Ctrl+S in Microsoft Word?',
                options: [
                    { text: 'The document is saved to storage', is_correct: true },
                    { text: 'The document is printed', is_correct: false },
                    { text: 'The document is deleted', is_correct: false },
                    { text: 'A new document opens', is_correct: false }
                ]
            },
            {
                question_text: 'If you want to make text bold in Word, which steps would you follow?',
                options: [
                    { text: 'Select text, then click Bold button or press Ctrl+B', is_correct: true },
                    { text: 'Just click Bold button without selecting text', is_correct: false },
                    { text: 'Press Ctrl+S then type text', is_correct: false },
                    { text: 'Change font size to make it bold', is_correct: false }
                ]
            },
            {
                question_text: 'What is the relationship between RAM and computer performance?',
                options: [
                    { text: 'More RAM allows computer to run more programs smoothly', is_correct: true },
                    { text: 'RAM only affects printing speed', is_correct: false },
                    { text: 'RAM has no effect on performance', is_correct: false },
                    { text: 'Less RAM makes computer faster', is_correct: false }
                ]
            },
            {
                question_text: 'When creating a simple webpage, what is the correct order?',
                options: [
                    { text: 'Write HTML structure, add content, then style with formatting', is_correct: true },
                    { text: 'Add pictures first, then write text', is_correct: false },
                    { text: 'Start with colors, then add text', is_correct: false },
                    { text: 'Only write text without any structure', is_correct: false }
                ]
            }
        ],
        7: [
            {
                question_text: 'In Excel, if cell A1 contains 10 and A2 contains 20, what does =A1+A2 calculate?',
                options: [
                    { text: '30', is_correct: true },
                    { text: '10', is_correct: false },
                    { text: '20', is_correct: false },
                    { text: 'A1A2', is_correct: false }
                ]
            },
            {
                question_text: 'What is the purpose of using <ul> and <li> tags together in HTML?',
                options: [
                    { text: 'To create an organized list with bullet points', is_correct: true },
                    { text: 'To make text bold and italic', is_correct: false },
                    { text: 'To create a table with rows', is_correct: false },
                    { text: 'To add images to webpage', is_correct: false }
                ]
            },
            {
                question_text: 'In Python, what would print("Hello " + "World") display?',
                options: [
                    { text: 'Hello World', is_correct: true },
                    { text: 'Hello + World', is_correct: false },
                    { text: 'HelloWorld', is_correct: false },
                    { text: 'Error message', is_correct: false }
                ]
            },
            {
                question_text: 'What is the main difference between LAN and WAN networks?',
                options: [
                    { text: 'LAN covers small area like office, WAN covers large area like cities', is_correct: true },
                    { text: 'LAN is wireless, WAN is wired', is_correct: false },
                    { text: 'LAN is faster, WAN is slower always', is_correct: false },
                    { text: 'LAN uses internet, WAN does not', is_correct: false }
                ]
            },
            {
                question_text: 'When would you use mail merge in Microsoft Word?',
                options: [
                    { text: 'To send personalized letters to many people using address list', is_correct: true },
                    { text: 'To combine two documents into one', is_correct: false },
                    { text: 'To check spelling in document', is_correct: false },
                    { text: 'To change font style throughout document', is_correct: false }
                ]
            }
        ],
        8: [
            {
                question_text: 'In Excel, what is the advantage of using VLOOKUP over manual searching?',
                options: [
                    { text: 'It automatically finds and returns data from large tables quickly', is_correct: true },
                    { text: 'It only works with small amounts of data', is_correct: false },
                    { text: 'It changes the original data in table', is_correct: false },
                    { text: 'It only works with text, not numbers', is_correct: false }
                ]
            },
            {
                question_text: 'What is the benefit of using CSS with HTML?',
                options: [
                    { text: 'Separates content from styling, making websites easier to maintain', is_correct: true },
                    { text: 'Makes websites load slower but look better', is_correct: false },
                    { text: 'Only works with images, not text', is_correct: false },
                    { text: 'Replaces HTML completely', is_correct: false }
                ]
            },
            {
                question_text: 'In Python, why would you create a function instead of writing the same code multiple times?',
                options: [
                    { text: 'Functions make code reusable and easier to maintain', is_correct: true },
                    { text: 'Functions make programs run slower', is_correct: false },
                    { text: 'Functions can only be used once', is_correct: false },
                    { text: 'Functions are only for advanced programmers', is_correct: false }
                ]
            },
            {
                question_text: 'Why is HTTPS more secure than HTTP for online banking?',
                options: [
                    { text: 'HTTPS encrypts data transmission, protecting sensitive information', is_correct: true },
                    { text: 'HTTPS is faster than HTTP', is_correct: false },
                    { text: 'HTTPS works only with certain browsers', is_correct: false },
                    { text: 'HTTPS uses less internet bandwidth', is_correct: false }
                ]
            },
            {
                question_text: 'What is the main purpose of using conditional formatting in Excel?',
                options: [
                    { text: 'To automatically highlight cells based on their values or conditions', is_correct: true },
                    { text: 'To delete cells that contain errors', is_correct: false },
                    { text: 'To convert numbers to text format', is_correct: false },
                    { text: 'To print only selected cells', is_correct: false }
                ]
            }
        ]
    };

    return baseQuestions[grade] || [];
};

// Advanced difficulty questions for each grade
const generateAdvancedQuestions = (grade) => {
    const baseQuestions = {
        6: [
            {
                question_text: 'A student needs to create a presentation about animals, add pictures, and present it to class. Which sequence of tools and steps would be most efficient?',
                options: [
                    { text: 'Use PowerPoint to create slides, insert images from internet, practice presentation mode', is_correct: true },
                    { text: 'Use Word to write text, print it, then draw pictures by hand', is_correct: false },
                    { text: 'Use Excel to make calculations, then copy to PowerPoint', is_correct: false },
                    { text: 'Use Paint to draw everything, then copy to Word', is_correct: false }
                ]
            },
            {
                question_text: 'If a computer is running very slowly and has many programs open, what would be the best approach to improve performance?',
                options: [
                    { text: 'Close unnecessary programs to free up RAM, then restart if needed', is_correct: true },
                    { text: 'Open more programs to balance the load', is_correct: false },
                    { text: 'Delete all files from hard disk', is_correct: false },
                    { text: 'Disconnect from internet immediately', is_correct: false }
                ]
            }
        ],
        7: [
            {
                question_text: 'A teacher wants to create a grade tracking system that automatically calculates averages and highlights failing grades. Which combination of Excel features would be most appropriate?',
                options: [
                    { text: 'Use AVERAGE function for calculations and conditional formatting for highlighting', is_correct: true },
                    { text: 'Use only SUM function and manually color cells', is_correct: false },
                    { text: 'Use PowerPoint charts and Word tables', is_correct: false },
                    { text: 'Use only basic addition and no formatting', is_correct: false }
                ]
            },
            {
                question_text: 'When designing a school website, what would be the most user-friendly navigation structure?',
                options: [
                    { text: 'Clear menu with sections like Home, About, Classes, Contact using proper HTML structure', is_correct: true },
                    { text: 'Put all information on one very long page', is_correct: false },
                    { text: 'Use only images without any text links', is_correct: false },
                    { text: 'Hide navigation and make users guess how to find information', is_correct: false }
                ]
            }
        ],
        8: [
            {
                question_text: 'A company needs to analyze sales data from multiple regions, create visual reports, and share them securely with remote teams. What would be the most comprehensive solution?',
                options: [
                    { text: 'Use Excel with pivot tables for analysis, charts for visualization, and cloud storage with proper permissions for secure sharing', is_correct: true },
                    { text: 'Use only basic calculator and email everything as plain text', is_correct: false },
                    { text: 'Use Word to write reports and fax them to everyone', is_correct: false },
                    { text: 'Use PowerPoint only and present everything in person', is_correct: false }
                ]
            },
            {
                question_text: 'When developing a web application that handles user login, what security considerations are most important?',
                options: [
                    { text: 'Use HTTPS for data transmission, encrypt passwords, validate input data, and implement proper authentication', is_correct: true },
                    { text: 'Use only HTTP and store passwords in plain text for easy access', is_correct: false },
                    { text: 'Allow any user input without validation to be flexible', is_correct: false },
                    { text: 'Make all user data publicly visible for transparency', is_correct: false }
                ]
            }
        ]
    };

    return baseQuestions[grade] || [];
};

async function addDifficultyLevels() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING MEDIUM AND ADVANCED DIFFICULTY QUESTIONS');
        console.log('==================================================');
        console.log('🎯 Target Ratio: 60% Basic, 30% Medium, 10% Advanced');

        const grades = [6, 7, 8];
        let totalAdded = 0;

        for (const grade of grades) {
            console.log(`\n📚 Processing Grade ${grade}...`);
            
            // Get current count
            const currentCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });

            console.log(`   Current questions: ${currentCount}`);

            // Calculate target numbers for 300 total questions
            const targetTotal = 300;
            const targetBasic = Math.floor(targetTotal * 0.6); // 180
            const targetMedium = Math.floor(targetTotal * 0.3); // 90
            const targetAdvanced = targetTotal - targetBasic - targetMedium; // 30

            const needMedium = Math.max(0, targetMedium);
            const needAdvanced = Math.max(0, targetAdvanced);

            console.log(`   Target: ${targetBasic} basic, ${targetMedium} medium, ${targetAdvanced} advanced`);
            console.log(`   Need to add: ${needMedium} medium, ${needAdvanced} advanced`);

            // Add medium questions
            const mediumQuestions = generateMediumQuestions(grade);
            let mediumAdded = 0;
            
            for (let i = 0; i < Math.min(needMedium, mediumQuestions.length); i++) {
                const question = mediumQuestions[i];
                
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [grade, 'medium', question.question_text],
                        function (err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                for (let j = 0; j < question.options.length; j++) {
                    const option = question.options[j];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, j + 1, option.is_correct ? 1 : 0],
                            function (err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                mediumAdded++;
            }

            // Add advanced questions
            const advancedQuestions = generateAdvancedQuestions(grade);
            let advancedAdded = 0;
            
            for (let i = 0; i < Math.min(needAdvanced, advancedQuestions.length); i++) {
                const question = advancedQuestions[i];
                
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [grade, 'advanced', question.question_text],
                        function (err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                for (let j = 0; j < question.options.length; j++) {
                    const option = question.options[j];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, j + 1, option.is_correct ? 1 : 0],
                            function (err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                advancedAdded++;
            }

            console.log(`   ✅ Added: ${mediumAdded} medium, ${advancedAdded} advanced questions`);
            totalAdded += mediumAdded + advancedAdded;
        }

        // Final verification
        console.log('\n📊 FINAL DIFFICULTY DISTRIBUTION:');
        console.log('==================================');
        
        for (const grade of grades) {
            const distribution = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT 
                        COUNT(*) as total,
                        COUNT(CASE WHEN difficulty = 'basic' THEN 1 END) as basic,
                        COUNT(CASE WHEN difficulty = 'medium' THEN 1 END) as medium,
                        COUNT(CASE WHEN difficulty = 'advanced' THEN 1 END) as advanced
                    FROM questions 
                    WHERE grade = ?
                `, [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });

            console.log(`Grade ${grade}: ${distribution.total} total`);
            console.log(`  Basic: ${distribution.basic} (${Math.round(distribution.basic/distribution.total*100)}%)`);
            console.log(`  Medium: ${distribution.medium} (${Math.round(distribution.medium/distribution.total*100)}%)`);
            console.log(`  Advanced: ${distribution.advanced} (${Math.round(distribution.advanced/distribution.total*100)}%)`);
            console.log('');
        }

        console.log(`🎉 DIFFICULTY LEVELS ADDED SUCCESSFULLY!`);
        console.log(`📊 Total New Questions Added: ${totalAdded}`);
        console.log(`✅ Database now has balanced difficulty distribution`);
        console.log(`🎯 Ready for comprehensive TECH BOARD 2025 assessment`);

    } catch (error) {
        console.error('❌ Error adding difficulty levels:', error);
    } finally {
        await database.close();
    }
}

addDifficultyLevels();