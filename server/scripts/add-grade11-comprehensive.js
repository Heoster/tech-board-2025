const database = require('../config/database');

// Grade 11 Questions - Advanced Computer Topics
const grade11Topics = {
    programming: [
        { q: 'What is object-oriented programming?', opts: ['Programming paradigm based on objects and classes', 'Programming with only functions', 'Programming without variables', 'Programming with only loops'], correct: 0, diff: 'basic' },
        { q: 'What is a class in programming?', opts: ['A blueprint for creating objects', 'A type of variable', 'A programming language', 'A computer component'], correct: 0, diff: 'basic' },
        { q: 'What is inheritance in OOP?', opts: ['Ability of a class to inherit properties from another class', 'Copying code from one file to another', 'Deleting unused code', 'Running multiple programs'], correct: 0, diff: 'medium' },
        { q: 'What is polymorphism?', opts: ['Ability of objects to take multiple forms', 'Having multiple computers', 'Using multiple programming languages', 'Creating multiple files'], correct: 0, diff: 'medium' },
        { q: 'What is encapsulation in OOP?', opts: ['Hiding internal details of an object', 'Making all variables public', 'Copying objects', 'Deleting objects'], correct: 0, diff: 'medium' },
        { q: 'What is an algorithm?', opts: ['Step-by-step procedure to solve a problem', 'A programming language', 'A computer component', 'A type of software'], correct: 0, diff: 'basic' },
        { q: 'What is pseudocode?', opts: ['Informal description of programming logic', 'A programming language', 'Compiled code', 'Machine code'], correct: 0, diff: 'basic' },
        { q: 'What is debugging?', opts: ['Process of finding and fixing errors in code', 'Writing new code', 'Deleting code', 'Running code'], correct: 0, diff: 'basic' },
        { q: 'What is a compiler?', opts: ['Translates source code into machine code', 'Runs programs directly', 'Edits source code', 'Deletes programs'], correct: 0, diff: 'medium' },
        { q: 'What is an interpreter?', opts: ['Executes code line by line', 'Compiles entire program first', 'Only checks syntax', 'Only formats code'], correct: 0, diff: 'medium' },
        { q: 'What is the difference between compiler and interpreter?', opts: ['Compiler translates entire program, interpreter executes line by line', 'No difference between them', 'Compiler is slower than interpreter', 'Interpreter creates executable files'], correct: 0, diff: 'advanced' },
        { q: 'What is recursion in programming?', opts: ['Function calling itself', 'Function calling another function', 'Loop running forever', 'Variable changing value'], correct: 0, diff: 'advanced' }
    ],
    databases: [
        { q: 'What is a database?', opts: ['Organized collection of data', 'A programming language', 'A computer component', 'A web browser'], correct: 0, diff: 'basic' },
        { q: 'What does DBMS stand for?', opts: ['Database Management System', 'Data Base Management Software', 'Database Management Software', 'Data Base Management Service'], correct: 0, diff: 'basic' },
        { q: 'What is SQL?', opts: ['Structured Query Language for databases', 'A programming language for games', 'A web development framework', 'A computer operating system'], correct: 0, diff: 'basic' },
        { q: 'What is a table in database?', opts: ['Collection of related data in rows and columns', 'A type of chart', 'A programming function', 'A computer component'], correct: 0, diff: 'basic' },
        { q: 'What is a primary key?', opts: ['Unique identifier for each record in table', 'Password for database', 'Main table in database', 'First column in table'], correct: 0, diff: 'medium' },
        { q: 'What is a foreign key?', opts: ['Field that links to primary key of another table', 'Key from another country', 'Backup key for database', 'Special password'], correct: 0, diff: 'medium' },
        { q: 'What is normalization in databases?', opts: ['Process of organizing data to reduce redundancy', 'Making database faster', 'Adding more tables', 'Deleting old data'], correct: 0, diff: 'advanced' },
        { q: 'What is a query in database?', opts: ['Request for specific data from database', 'Question about programming', 'Database backup', 'Database error'], correct: 0, diff: 'basic' }
    ],
    networking_advanced: [
        { q: 'What is a server?', opts: ['Computer that provides services to other computers', 'A programming language', 'A web browser', 'A database'], correct: 0, diff: 'basic' },
        { q: 'What is a client in networking?', opts: ['Computer that requests services from server', 'Person using computer', 'Network administrator', 'Internet provider'], correct: 0, diff: 'basic' },
        { q: 'What is client-server architecture?', opts: ['Model where clients request services from servers', 'Type of computer building', 'Programming pattern', 'Database design'], correct: 0, diff: 'medium' },
        { q: 'What is a domain name?', opts: ['Human-readable address for websites', 'Type of computer network', 'Programming variable', 'Database table'], correct: 0, diff: 'basic' },
        { q: 'What is DNS?', opts: ['Domain Name System that translates domain names to IP addresses', 'Data Network System', 'Digital Network Service', 'Database Network System'], correct: 0, diff: 'medium' },
        { q: 'What is a router?', opts: ['Device that forwards data between networks', 'Software for web browsing', 'Type of computer', 'Programming tool'], correct: 0, diff: 'basic' },
        { q: 'What is bandwidth?', opts: ['Amount of data that can be transmitted in given time', 'Width of computer screen', 'Size of hard disk', 'Speed of processor'], correct: 0, diff: 'medium' },
        { q: 'What is latency in networking?', opts: ['Delay in data transmission', 'Amount of data sent', 'Network security level', 'Number of connected devices'], correct: 0, diff: 'advanced' },
        { q: 'What is cloud computing?', opts: ['Delivering computing services over internet', 'Computing with weather data', 'Storing data in sky', 'Using multiple computers'], correct: 0, diff: 'basic' },
        { q: 'What are the main types of cloud services?', opts: ['IaaS, PaaS, SaaS', 'Hardware, Software, Network', 'Public, Private, Hybrid', 'Storage, Computing, Database'], correct: 0, diff: 'advanced' }
    ],
    web_development: [
        { q: 'What is front-end development?', opts: ['Creating user interface and user experience', 'Server-side programming', 'Database management', 'Network configuration'], correct: 0, diff: 'basic' },
        { q: 'What is back-end development?', opts: ['Server-side logic and database management', 'User interface design', 'Website graphics', 'Network setup'], correct: 0, diff: 'basic' },
        { q: 'What is full-stack development?', opts: ['Both front-end and back-end development', 'Only front-end development', 'Only back-end development', 'Only database development'], correct: 0, diff: 'medium' },
        { q: 'What is CSS used for?', opts: ['Styling and layout of web pages', 'Server-side programming', 'Database queries', 'Network protocols'], correct: 0, diff: 'basic' },
        { q: 'What is JavaScript?', opts: ['Programming language for web interactivity', 'Markup language for web structure', 'Styling language for web design', 'Database query language'], correct: 0, diff: 'basic' },
        { q: 'What is responsive web design?', opts: ['Design that adapts to different screen sizes', 'Design that responds to user clicks', 'Design that loads quickly', 'Design with animations'], correct: 0, diff: 'medium' },
        { q: 'What is a web framework?', opts: ['Pre-built structure for web development', 'Type of web browser', 'Web hosting service', 'Website template'], correct: 0, diff: 'medium' },
        { q: 'What is an API?', opts: ['Application Programming Interface for software communication', 'Advanced Programming Interface', 'Automated Programming Interface', 'Application Protocol Interface'], correct: 0, diff: 'advanced' }
    ],
    cybersecurity: [
        { q: 'What is cybersecurity?', opts: ['Protection of digital systems from threats', 'Type of computer virus', 'Internet connection method', 'Programming language'], correct: 0, diff: 'basic' },
        { q: 'What is malware?', opts: ['Malicious software designed to harm systems', 'Helpful software for computers', 'Type of hardware', 'Network protocol'], correct: 0, diff: 'basic' },
        { q: 'What is a virus in computing?', opts: ['Malicious program that replicates itself', 'Helpful program for cleaning', 'Type of hardware component', 'Network connection'], correct: 0, diff: 'basic' },
        { q: 'What is phishing?', opts: ['Fraudulent attempt to obtain sensitive information', 'Type of computer game', 'Method of data backup', 'Programming technique'], correct: 0, diff: 'medium' },
        { q: 'What is two-factor authentication?', opts: ['Security method using two different verification factors', 'Using two passwords', 'Having two user accounts', 'Using two computers'], correct: 0, diff: 'medium' },
        { q: 'What is encryption?', opts: ['Converting data into coded form for security', 'Deleting sensitive data', 'Copying data multiple times', 'Storing data in cloud'], correct: 0, diff: 'basic' },
        { q: 'What is a firewall?', opts: ['Security system that monitors network traffic', 'Physical barrier around computers', 'Type of antivirus software', 'Network cable'], correct: 0, diff: 'basic' },
        { q: 'What is social engineering in cybersecurity?', opts: ['Manipulating people to reveal confidential information', 'Building social networks', 'Engineering social media', 'Creating user communities'], correct: 0, diff: 'advanced' }
    ]
};

const createQuestions = (grade, topic, questions) => {
    return questions.map(q => ({
        grade: grade,
        difficulty: q.diff,
        question_text: q.q,
        options: q.opts.map((opt, index) => ({
            text: opt,
            is_correct: index === q.correct
        }))
    }));
};

async function addGrade11Comprehensive() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING GRADE 11 COMPREHENSIVE COMPUTER TOPICS');
        console.log('===============================================');
        console.log('📚 Topics: Programming, Databases, Advanced Networking, Web Dev, Cybersecurity');
        console.log('🎯 Target: ~60 questions with Basic, Medium, Advanced levels');

        // Clear existing Grade 11 questions first
        console.log('\n🧹 Clearing existing Grade 11 questions...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE grade = 11)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions WHERE grade = 11', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Cleared existing Grade 11 questions');

        let grade11Total = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const [topic, questions] of Object.entries(grade11Topics)) {
            const topicQuestions = createQuestions(11, topic, questions);

            for (const question of topicQuestions) {
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
                
                grade11Total++;
            }
            console.log(`   ✅ ${topic}: ${questions.length} questions`);
        }

        console.log(`\n✅ Grade 11: Added ${grade11Total} total questions`);
        console.log(`   Basic: ${basicCount} questions`);
        console.log(`   Medium: ${mediumCount} questions`);
        console.log(`   Advanced: ${advancedCount} questions`);

        // Final verification
        const finalCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count 
                FROM questions 
                WHERE grade IN (6, 7, 8, 9, 11) 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📊 FINAL QUESTION COUNTS:');
        finalCounts.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });

        console.log(`\n🎉 GRADE 11 COMPREHENSIVE TOPICS COMPLETED!`);
        console.log(`✅ Programming concepts (OOP, algorithms, debugging)`);
        console.log(`✅ Database management (SQL, DBMS, normalization)`);
        console.log(`✅ Advanced networking (client-server, DNS, cloud)`);
        console.log(`✅ Web development (front-end, back-end, APIs)`);
        console.log(`✅ Cybersecurity (malware, encryption, authentication)`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await database.close();
    }
}

addGrade11Comprehensive();