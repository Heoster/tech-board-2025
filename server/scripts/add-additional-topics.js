const database = require('../config/database');

// Grade 6: Basic Microsoft Office and Simple Concepts (40 questions)
const generateGrade6AdditionalQuestions = () => {
    return [
        // Microsoft Office Basics (15 questions)
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is Microsoft Word used for?',
            options: [
                { text: 'Writing documents', is_correct: true },
                { text: 'Making calculations', is_correct: false },
                { text: 'Creating presentations', is_correct: false },
                { text: 'Browsing internet', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is Microsoft Excel used for?',
            options: [
                { text: 'Working with numbers and tables', is_correct: true },
                { text: 'Writing letters', is_correct: false },
                { text: 'Making presentations', is_correct: false },
                { text: 'Drawing pictures', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is Microsoft PowerPoint used for?',
            options: [
                { text: 'Making presentations', is_correct: true },
                { text: 'Writing documents', is_correct: false },
                { text: 'Calculating numbers', is_correct: false },
                { text: 'Sending emails', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which program is used to type letters?',
            options: [
                { text: 'Microsoft Word', is_correct: true },
                { text: 'Microsoft Excel', is_correct: false },
                { text: 'Microsoft PowerPoint', is_correct: false },
                { text: 'Paint', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which program is used to make slides?',
            options: [
                { text: 'Microsoft PowerPoint', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Microsoft Excel', is_correct: false },
                { text: 'Notepad', is_correct: false }
            ]
        }
    ];
};

async function addAdditionalTopics() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING ADDITIONAL TOPICS TO CURRICULUM');
        console.log('==========================================');
        console.log('📚 Topics: Microsoft Office, HTML, Python, Networking');
        console.log('🎯 Target: 40 questions per grade (6, 7, 8)');

        const gradeQuestions = {
            6: [...generateGrade6AdditionalQuestions(), ...getGrade6RestQuestions()]
        };

        let totalAdded = 0;

        for (const [grade, questions] of Object.entries(gradeQuestions)) {
            console.log(`\n📚 Adding ${questions.length} additional questions to Grade ${grade}...`);
            
            let addedCount = 0;
            for (const question of questions) {
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
                addedCount++;
            }
            
            console.log(`✅ Grade ${grade}: Added ${addedCount} additional topic questions`);
            totalAdded += addedCount;
        }

        console.log(`\n🎉 ADDITIONAL TOPICS ADDED SUCCESSFULLY!`);
        console.log(`📊 Total New Questions Added: ${totalAdded}`);

    } catch (error) {
        console.error('❌ Error adding additional topics:', error);
    } finally {
        await database.close();
    }
}

// Run the addition
addAdditionalTopics();
// Continue Grade 6 questions
const getGrade6RestQuestions = () => {
    return [
        // More Microsoft Office (10 more)
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a spreadsheet?',
            options: [
                { text: 'A table with rows and columns', is_correct: true },
                { text: 'A type of document', is_correct: false },
                { text: 'A presentation slide', is_correct: false },
                { text: 'A picture file', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'In Excel, what is a cell?',
            options: [
                { text: 'A box where you type data', is_correct: true },
                { text: 'A type of phone', is_correct: false },
                { text: 'A computer part', is_correct: false },
                { text: 'A software program', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Save mean in Office programs?',
            options: [
                { text: 'Store your work on computer', is_correct: true },
                { text: 'Delete your work', is_correct: false },
                { text: 'Print your work', is_correct: false },
                { text: 'Close the program', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Print do?',
            options: [
                { text: 'Makes a paper copy', is_correct: true },
                { text: 'Saves the file', is_correct: false },
                { text: 'Deletes the file', is_correct: false },
                { text: 'Opens a new file', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a document?',
            options: [
                { text: 'A file with text or information', is_correct: true },
                { text: 'A computer program', is_correct: false },
                { text: 'A type of hardware', is_correct: false },
                { text: 'An internet website', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Copy do?',
            options: [
                { text: 'Makes a duplicate of selected text', is_correct: true },
                { text: 'Deletes selected text', is_correct: false },
                { text: 'Changes text color', is_correct: false },
                { text: 'Prints the text', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Paste do?',
            options: [
                { text: 'Puts copied text in new place', is_correct: true },
                { text: 'Deletes text', is_correct: false },
                { text: 'Changes text size', is_correct: false },
                { text: 'Saves the document', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is formatting in Word?',
            options: [
                { text: 'Changing how text looks', is_correct: true },
                { text: 'Deleting text', is_correct: false },
                { text: 'Saving the document', is_correct: false },
                { text: 'Printing the document', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Bold do to text?',
            options: [
                { text: 'Makes text thicker and darker', is_correct: true },
                { text: 'Makes text smaller', is_correct: false },
                { text: 'Makes text red', is_correct: false },
                { text: 'Deletes the text', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is Microsoft Office?',
            options: [
                { text: 'A collection of office programs', is_correct: true },
                { text: 'A type of computer', is_correct: false },
                { text: 'An internet browser', is_correct: false },
                { text: 'A computer game', is_correct: false }
            ]
        },

        // HTML Basics (10 questions)
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does HTML stand for?',
            options: [
                { text: 'HyperText Markup Language', is_correct: true },
                { text: 'Home Text Markup Language', is_correct: false },
                { text: 'High Text Modern Language', is_correct: false },
                { text: 'Hyperlink Text Language', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is HTML used for?',
            options: [
                { text: 'Creating web pages', is_correct: true },
                { text: 'Making calculations', is_correct: false },
                { text: 'Playing music', is_correct: false },
                { text: 'Storing files', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What are HTML tags?',
            options: [
                { text: 'Special codes in angle brackets', is_correct: true },
                { text: 'Pictures on web pages', is_correct: false },
                { text: 'Links to other websites', is_correct: false },
                { text: 'Text on web pages', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which tag is used for headings?',
            options: [
                { text: '<h1>', is_correct: true },
                { text: '<p>', is_correct: false },
                { text: '<b>', is_correct: false },
                { text: '<i>', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which tag is used for paragraphs?',
            options: [
                { text: '<p>', is_correct: true },
                { text: '<h1>', is_correct: false },
                { text: '<b>', is_correct: false },
                { text: '<i>', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which tag makes text bold?',
            options: [
                { text: '<b>', is_correct: true },
                { text: '<p>', is_correct: false },
                { text: '<h1>', is_correct: false },
                { text: '<i>', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which tag makes text italic?',
            options: [
                { text: '<i>', is_correct: true },
                { text: '<b>', is_correct: false },
                { text: '<p>', is_correct: false },
                { text: '<h1>', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a web page?',
            options: [
                { text: 'A page on the internet', is_correct: true },
                { text: 'A page in a book', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A type of printer', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a website?',
            options: [
                { text: 'A collection of web pages', is_correct: true },
                { text: 'A single web page', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A type of software', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'HTML tags are written in what?',
            options: [
                { text: 'Angle brackets < >', is_correct: true },
                { text: 'Round brackets ( )', is_correct: false },
                { text: 'Square brackets [ ]', is_correct: false },
                { text: 'Curly brackets { }', is_correct: false }
            ]
        },

        // Python Basics (8 questions)
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is Python?',
            options: [
                { text: 'A programming language', is_correct: true },
                { text: 'A type of snake', is_correct: false },
                { text: 'A computer game', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does print() do in Python?',
            options: [
                { text: 'Shows text on screen', is_correct: true },
                { text: 'Prints on paper', is_correct: false },
                { text: 'Saves a file', is_correct: false },
                { text: 'Deletes text', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is programming?',
            options: [
                { text: 'Writing instructions for computer', is_correct: true },
                { text: 'Using Microsoft Word', is_correct: false },
                { text: 'Browsing the internet', is_correct: false },
                { text: 'Playing computer games', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a program?',
            options: [
                { text: 'A set of instructions for computer', is_correct: true },
                { text: 'A type of hardware', is_correct: false },
                { text: 'A computer game', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'In Python, what are quotes used for?',
            options: [
                { text: 'To write text', is_correct: true },
                { text: 'To write numbers', is_correct: false },
                { text: 'To delete text', is_correct: false },
                { text: 'To save files', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is code?',
            options: [
                { text: 'Instructions written for computer', is_correct: true },
                { text: 'A secret message', is_correct: false },
                { text: 'A type of password', is_correct: false },
                { text: 'A computer virus', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What happens when code has an error?',
            options: [
                { text: 'Program does not work correctly', is_correct: true },
                { text: 'Computer breaks', is_correct: false },
                { text: 'Nothing happens', is_correct: false },
                { text: 'Computer gets faster', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is debugging?',
            options: [
                { text: 'Finding and fixing errors in code', is_correct: true },
                { text: 'Writing new code', is_correct: false },
                { text: 'Deleting all code', is_correct: false },
                { text: 'Running the program', is_correct: false }
            ]
        },

        // Networking Basics (7 questions)
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a network?',
            options: [
                { text: 'Computers connected together', is_correct: true },
                { text: 'A single computer', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A type of printer', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is the internet?',
            options: [
                { text: 'A big network of computers worldwide', is_correct: true },
                { text: 'A single computer', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A type of software', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is WiFi?',
            options: [
                { text: 'Wireless internet connection', is_correct: true },
                { text: 'A type of computer', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A storage device', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What do you need to connect to internet?',
            options: [
                { text: 'Internet connection', is_correct: true },
                { text: 'Only a computer', is_correct: false },
                { text: 'Only a printer', is_correct: false },
                { text: 'Only a mouse', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is sharing files?',
            options: [
                { text: 'Giving files to other people', is_correct: true },
                { text: 'Deleting files', is_correct: false },
                { text: 'Creating new files', is_correct: false },
                { text: 'Printing files', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is a router?',
            options: [
                { text: 'Device that connects computers to internet', is_correct: true },
                { text: 'A type of computer', is_correct: false },
                { text: 'A computer program', is_correct: false },
                { text: 'A storage device', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does connected mean?',
            options: [
                { text: 'Linked together', is_correct: true },
                { text: 'Separated', is_correct: false },
                { text: 'Broken', is_correct: false },
                { text: 'Deleted', is_correct: false }
            ]
        }
    ];
};