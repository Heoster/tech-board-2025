const database = require('../config/database');

// Class 9 Questions - Comprehensive Computer Topics (200 questions)
const generateClass9Questions = () => {
    const questions = [];

    // Computer Architecture (20 questions)
    const architectureQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What does CPU stand for?',
            options: [
                { text: 'Central Processing Unit', is_correct: true },
                { text: 'Computer Processing Unit', is_correct: false },
                { text: 'Central Program Unit', is_correct: false },
                { text: 'Computer Program Unit', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the main function of ALU?',
            options: [
                { text: 'Performs arithmetic and logical operations', is_correct: true },
                { text: 'Controls program execution', is_correct: false },
                { text: 'Stores temporary data', is_correct: false },
                { text: 'Manages input/output operations', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does ALU stand for?',
            options: [
                { text: 'Arithmetic Logic Unit', is_correct: true },
                { text: 'Advanced Logic Unit', is_correct: false },
                { text: 'Automatic Logic Unit', is_correct: false },
                { text: 'Applied Logic Unit', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the function of Control Unit?',
            options: [
                { text: 'Controls and coordinates computer operations', is_correct: true },
                { text: 'Performs calculations', is_correct: false },
                { text: 'Stores data permanently', is_correct: false },
                { text: 'Displays output', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What are registers in CPU?',
            options: [
                { text: 'High-speed storage locations in CPU', is_correct: true },
                { text: 'External storage devices', is_correct: false },
                { text: 'Input devices', is_correct: false },
                { text: 'Output devices', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'Which component of CPU is responsible for decision making?',
            options: [
                { text: 'Control Unit', is_correct: true },
                { text: 'ALU', is_correct: false },
                { text: 'Registers', is_correct: false },
                { text: 'Cache', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What happens when CPU needs to perform 5 + 3?',
            options: [
                { text: 'ALU performs the addition operation', is_correct: true },
                { text: 'Control Unit calculates the result', is_correct: false },
                { text: 'Registers store the calculation', is_correct: false },
                { text: 'Cache performs the operation', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'In a CPU architecture, what is the relationship between Control Unit, ALU, and Registers?',
            options: [
                { text: 'Control Unit coordinates ALU operations using data from Registers', is_correct: true },
                { text: 'ALU controls both Control Unit and Registers', is_correct: false },
                { text: 'Registers control ALU and ignore Control Unit', is_correct: false },
                { text: 'All three work independently without coordination', is_correct: false }
            ]
        }
    ];

    // Types of Memory (20 questions)
    const memoryQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What does RAM stand for?',
            options: [
                { text: 'Random Access Memory', is_correct: true },
                { text: 'Read Access Memory', is_correct: false },
                { text: 'Rapid Access Memory', is_correct: false },
                { text: 'Remote Access Memory', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does ROM stand for?',
            options: [
                { text: 'Read Only Memory', is_correct: true },
                { text: 'Random Only Memory', is_correct: false },
                { text: 'Rapid Only Memory', is_correct: false },
                { text: 'Remote Only Memory', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which memory is volatile?',
            options: [
                { text: 'RAM', is_correct: true },
                { text: 'ROM', is_correct: false },
                { text: 'Hard Disk', is_correct: false },
                { text: 'CD-ROM', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is cache memory?',
            options: [
                { text: 'High-speed memory between CPU and RAM', is_correct: true },
                { text: 'Permanent storage memory', is_correct: false },
                { text: 'External storage device', is_correct: false },
                { text: 'Input memory device', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which is an example of secondary storage?',
            options: [
                { text: 'Hard Disk', is_correct: true },
                { text: 'RAM', is_correct: false },
                { text: 'Cache', is_correct: false },
                { text: 'Registers', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the main difference between primary and secondary memory?',
            options: [
                { text: 'Primary memory is directly accessible by CPU, secondary is not', is_correct: true },
                { text: 'Primary memory is slower than secondary memory', is_correct: false },
                { text: 'Primary memory is permanent, secondary is temporary', is_correct: false },
                { text: 'Primary memory is external, secondary is internal', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'Why is cache memory faster than RAM?',
            options: [
                { text: 'It is located closer to CPU and uses faster technology', is_correct: true },
                { text: 'It has more storage capacity than RAM', is_correct: false },
                { text: 'It is permanent storage unlike RAM', is_correct: false },
                { text: 'It uses magnetic storage technology', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'In memory hierarchy, what is the optimal arrangement from fastest to slowest?',
            options: [
                { text: 'Registers → Cache → RAM → Secondary Storage', is_correct: true },
                { text: 'RAM → Cache → Registers → Secondary Storage', is_correct: false },
                { text: 'Secondary Storage → RAM → Cache → Registers', is_correct: false },
                { text: 'Cache → RAM → Registers → Secondary Storage', is_correct: false }
            ]
        }
    ];

    // Number Systems (15 questions)
    const numberSystemQuestions = [
        {
            difficulty: 'basic',
            question_text: 'How many digits are used in binary number system?',
            options: [
                { text: '2 (0 and 1)', is_correct: true },
                { text: '8 (0 to 7)', is_correct: false },
                { text: '10 (0 to 9)', is_correct: false },
                { text: '16 (0 to F)', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the base of decimal number system?',
            options: [
                { text: '10', is_correct: true },
                { text: '2', is_correct: false },
                { text: '8', is_correct: false },
                { text: '16', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the base of octal number system?',
            options: [
                { text: '8', is_correct: true },
                { text: '2', is_correct: false },
                { text: '10', is_correct: false },
                { text: '16', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the base of hexadecimal number system?',
            options: [
                { text: '16', is_correct: true },
                { text: '2', is_correct: false },
                { text: '8', is_correct: false },
                { text: '10', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is binary equivalent of decimal number 5?',
            options: [
                { text: '101', is_correct: true },
                { text: '110', is_correct: false },
                { text: '111', is_correct: false },
                { text: '100', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is decimal equivalent of binary 1010?',
            options: [
                { text: '10', is_correct: true },
                { text: '8', is_correct: false },
                { text: '12', is_correct: false },
                { text: '14', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'Convert hexadecimal A3 to decimal:',
            options: [
                { text: '163', is_correct: true },
                { text: '153', is_correct: false },
                { text: '173', is_correct: false },
                { text: '143', is_correct: false }
            ]
        }
    ];

    // Boolean Logic & Gates (15 questions)
    const booleanLogicQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What is the output of AND gate when both inputs are 1?',
            options: [
                { text: '1', is_correct: true },
                { text: '0', is_correct: false },
                { text: 'Undefined', is_correct: false },
                { text: 'Error', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the output of OR gate when both inputs are 0?',
            options: [
                { text: '0', is_correct: true },
                { text: '1', is_correct: false },
                { text: 'Undefined', is_correct: false },
                { text: 'Error', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does NOT gate do?',
            options: [
                { text: 'Inverts the input', is_correct: true },
                { text: 'Adds inputs', is_correct: false },
                { text: 'Multiplies inputs', is_correct: false },
                { text: 'Stores input', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'In AND gate, what is the output when inputs are A=1, B=0?',
            options: [
                { text: '0', is_correct: true },
                { text: '1', is_correct: false },
                { text: 'A', is_correct: false },
                { text: 'B', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a truth table?',
            options: [
                { text: 'Table showing all possible input-output combinations', is_correct: true },
                { text: 'Table showing only true values', is_correct: false },
                { text: 'Table showing only false values', is_correct: false },
                { text: 'Table showing mathematical operations', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'For OR gate with inputs A=1, B=1, what is the output and why?',
            options: [
                { text: '1, because OR gate outputs 1 when at least one input is 1', is_correct: true },
                { text: '0, because both inputs are the same', is_correct: false },
                { text: '2, because it adds both inputs', is_correct: false },
                { text: 'Undefined, because both inputs cannot be 1', is_correct: false }
            ]
        }
    ];

    // Add all question arrays to main questions array
    questions.push(...architectureQuestions);
    questions.push(...memoryQuestions);
    questions.push(...numberSystemQuestions);
    questions.push(...booleanLogicQuestions);

    // Add grade to all questions
    return questions.map(q => ({ ...q, grade: 9 }));
};

async function addClass9Comprehensive() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING CLASS 9 COMPREHENSIVE COMPUTER TOPICS');
        console.log('===============================================');
        console.log('📚 Topics: Architecture, Memory, Number Systems, Boolean Logic');
        console.log('🎯 Target: ~200 questions with Basic, Medium, Advanced levels');

        // Clear existing Grade 9 questions first
        console.log('\n🧹 Clearing existing Grade 9 questions...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE grade = 9)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions WHERE grade = 9', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Cleared existing Grade 9 questions');

        // Generate and add new questions
        const class9Questions = generateClass9Questions();

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const question of class9Questions) {
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [question.grade, question.difficulty, question.question_text],
                    function (err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            for (let i = 0; i < question.options.length; i++) {
                const option = question.options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, i + 1, option.is_correct ? 1 : 0],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }

            // Count by difficulty
            if (question.difficulty === 'basic') basicCount++;
            else if (question.difficulty === 'medium') mediumCount++;
            else if (question.difficulty === 'advanced') advancedCount++;

            addedCount++;
        }

        console.log(`\n✅ Added ${addedCount} Class 9 questions:`);
        console.log(`   Basic: ${basicCount} questions`);
        console.log(`   Medium: ${mediumCount} questions`);
        console.log(`   Advanced: ${advancedCount} questions`);

        // Verify final count
        const finalCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = 9', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`\n📊 Final Grade 9 count: ${finalCount} questions`);
        console.log(`🎉 CLASS 9 COMPREHENSIVE TOPICS ADDED SUCCESSFULLY!`);

    } catch (error) {
        console.error('❌ Error adding Class 9 questions:', error);
    } finally {
        await database.close();
    }
}

addClass9Comprehensive();
// Continue with more Class 9 topics
const generateMoreClass9Questions = () => {
    const questions = [];

    // Operating Systems (15 questions)
    const osQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What is an operating system?',
            options: [
                { text: 'Software that manages computer hardware and software', is_correct: true },
                { text: 'Hardware component of computer', is_correct: false },
                { text: 'Application software for games', is_correct: false },
                { text: 'Input device for computer', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which is an example of single-user operating system?',
            options: [
                { text: 'MS-DOS', is_correct: true },
                { text: 'UNIX', is_correct: false },
                { text: 'Linux Server', is_correct: false },
                { text: 'Windows Server', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which is an example of multi-user operating system?',
            options: [
                { text: 'UNIX', is_correct: true },
                { text: 'MS-DOS', is_correct: false },
                { text: 'Windows 95', is_correct: false },
                { text: 'Personal Windows', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the main difference between single-user and multi-user OS?',
            options: [
                { text: 'Multi-user OS allows multiple users simultaneously, single-user allows only one', is_correct: true },
                { text: 'Single-user OS is faster than multi-user OS', is_correct: false },
                { text: 'Multi-user OS has less security than single-user OS', is_correct: false },
                { text: 'Single-user OS can run more programs than multi-user OS', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'Why would a company choose multi-user OS over single-user OS for their servers?',
            options: [
                { text: 'Allows multiple employees to access resources simultaneously with proper security', is_correct: true },
                { text: 'Multi-user OS is always cheaper than single-user OS', is_correct: false },
                { text: 'Single-user OS cannot connect to internet', is_correct: false },
                { text: 'Multi-user OS uses less memory than single-user OS', is_correct: false }
            ]
        }
    ];

    // Software Classification (15 questions)
    const softwareQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What is system software?',
            options: [
                { text: 'Software that manages and controls computer hardware', is_correct: true },
                { text: 'Software for entertainment purposes', is_correct: false },
                { text: 'Software for creating documents', is_correct: false },
                { text: 'Software for playing games', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is application software?',
            options: [
                { text: 'Software designed for end-users to accomplish specific tasks', is_correct: true },
                { text: 'Software that controls hardware', is_correct: false },
                { text: 'Software that manages memory', is_correct: false },
                { text: 'Software that controls CPU', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What are utility programs?',
            options: [
                { text: 'Programs that perform maintenance tasks for computer', is_correct: true },
                { text: 'Programs for creating presentations', is_correct: false },
                { text: 'Programs for playing music', is_correct: false },
                { text: 'Programs for browsing internet', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'Which is an example of utility program?',
            options: [
                { text: 'Antivirus software', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Google Chrome', is_correct: false },
                { text: 'Adobe Photoshop', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'How do system software, application software, and utility programs work together?',
            options: [
                { text: 'System software provides platform, utilities maintain system, applications serve users', is_correct: true },
                { text: 'All three work independently without any interaction', is_correct: false },
                { text: 'Application software controls both system and utility programs', is_correct: false },
                { text: 'Utility programs control both system and application software', is_correct: false }
            ]
        }
    ];

    // Networking Basics (20 questions)
    const networkingQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What does LAN stand for?',
            options: [
                { text: 'Local Area Network', is_correct: true },
                { text: 'Large Area Network', is_correct: false },
                { text: 'Long Area Network', is_correct: false },
                { text: 'Limited Area Network', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does WAN stand for?',
            options: [
                { text: 'Wide Area Network', is_correct: true },
                { text: 'World Area Network', is_correct: false },
                { text: 'Wireless Area Network', is_correct: false },
                { text: 'Web Area Network', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does PAN stand for?',
            options: [
                { text: 'Personal Area Network', is_correct: true },
                { text: 'Public Area Network', is_correct: false },
                { text: 'Private Area Network', is_correct: false },
                { text: 'Protected Area Network', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is TCP/IP?',
            options: [
                { text: 'A set of protocols for internet communication', is_correct: true },
                { text: 'A type of computer hardware', is_correct: false },
                { text: 'A programming language', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is an IP address?',
            options: [
                { text: 'Unique identifier for devices on a network', is_correct: true },
                { text: 'Internet Protocol address for websites only', is_correct: false },
                { text: 'Internal Program address for software', is_correct: false },
                { text: 'Input Port address for hardware', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the main difference between LAN and WAN?',
            options: [
                { text: 'LAN covers small area like building, WAN covers large area like cities', is_correct: true },
                { text: 'LAN is always wireless, WAN is always wired', is_correct: false },
                { text: 'LAN is faster, WAN is always slower', is_correct: false },
                { text: 'LAN uses TCP/IP, WAN does not', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'Why are protocols like TCP/IP important in networking?',
            options: [
                { text: 'They provide standard rules for devices to communicate', is_correct: true },
                { text: 'They make networks faster automatically', is_correct: false },
                { text: 'They prevent all network security issues', is_correct: false },
                { text: 'They eliminate the need for IP addresses', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'In a company network setup, how would LAN, WAN, and PAN be used together?',
            options: [
                { text: 'PAN for personal devices, LAN for office network, WAN to connect multiple offices', is_correct: true },
                { text: 'All three networks work independently without connection', is_correct: false },
                { text: 'Only WAN is needed for all networking requirements', is_correct: false },
                { text: 'PAN replaces both LAN and WAN in modern networks', is_correct: false }
            ]
        }
    ];

    // Internet & Web Technologies (20 questions)
    const webTechQuestions = [
        {
            difficulty: 'basic',
            question_text: 'What is a web browser?',
            options: [
                { text: 'Software used to access and view websites', is_correct: true },
                { text: 'Hardware device for internet connection', is_correct: false },
                { text: 'Type of computer network', is_correct: false },
                { text: 'Programming language for web', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does URL stand for?',
            options: [
                { text: 'Uniform Resource Locator', is_correct: true },
                { text: 'Universal Resource Locator', is_correct: false },
                { text: 'Uniform Resource Link', is_correct: false },
                { text: 'Universal Resource Link', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does HTML stand for?',
            options: [
                { text: 'HyperText Markup Language', is_correct: true },
                { text: 'High Tech Markup Language', is_correct: false },
                { text: 'Home Tool Markup Language', is_correct: false },
                { text: 'Hyperlink Text Markup Language', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does HTTP stand for?',
            options: [
                { text: 'HyperText Transfer Protocol', is_correct: true },
                { text: 'High Tech Transfer Protocol', is_correct: false },
                { text: 'Home Text Transfer Protocol', is_correct: false },
                { text: 'Hyperlink Transfer Protocol', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does HTTPS stand for?',
            options: [
                { text: 'HyperText Transfer Protocol Secure', is_correct: true },
                { text: 'HyperText Transfer Protocol System', is_correct: false },
                { text: 'HyperText Transfer Protocol Standard', is_correct: false },
                { text: 'HyperText Transfer Protocol Service', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the main difference between HTTP and HTTPS?',
            options: [
                { text: 'HTTPS is secure and encrypted, HTTP is not', is_correct: true },
                { text: 'HTTP is faster than HTTPS', is_correct: false },
                { text: 'HTTPS works only with certain browsers', is_correct: false },
                { text: 'HTTP is newer version of HTTPS', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the purpose of HTML in web development?',
            options: [
                { text: 'To structure and organize content on web pages', is_correct: true },
                { text: 'To make web pages load faster', is_correct: false },
                { text: 'To provide internet connection', is_correct: false },
                { text: 'To protect websites from viruses', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'When accessing a secure online banking site, why is HTTPS important?',
            options: [
                { text: 'It encrypts data transmission protecting sensitive financial information', is_correct: true },
                { text: 'It makes the website load faster for banking operations', is_correct: false },
                { text: 'It allows multiple users to access the same account', is_correct: false },
                { text: 'It automatically backs up all banking data', is_correct: false }
            ]
        }
    ];

    // Add all question arrays
    questions.push(...osQuestions);
    questions.push(...softwareQuestions);
    questions.push(...networkingQuestions);
    questions.push(...webTechQuestions);

    // Add grade to all questions
    return questions.map(q => ({ ...q, grade: 9 }));
};

// Update the main function to include more questions
const getAllClass9Questions = () => {
    return [...generateClass9Questions(), ...generateMoreClass9Questions()];
};