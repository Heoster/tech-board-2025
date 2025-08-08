const database = require('../config/database');

// Function to create questions for each grade and topic
const createQuestions = (grade, topic, questions) => {
    return questions.map(q => ({
        grade: grade,
        difficulty: 'basic',
        question_text: q.q,
        options: q.opts.map((opt, index) => ({
            text: opt,
            is_correct: index === q.correct
        }))
    }));
};

// Grade 7 Questions
const grade7Topics = {
    office: [
        { q: 'What is a template?', opts: ['A pre-designed format', 'A type of font', 'A color scheme', 'A sound effect'], correct: 0 },
        { q: 'What does spell check do?', opts: ['Finds spelling mistakes', 'Changes font size', 'Adds pictures', 'Prints documents'], correct: 0 },
        { q: 'What is Find and Replace?', opts: ['Tool to find and change text', 'Tool to add pictures', 'Tool to change colors', 'Tool to print documents'], correct: 0 },
        { q: 'What is a table in Word?', opts: ['Rows and columns to organize data', 'A type of picture', 'A font style', 'A color scheme'], correct: 0 },
        { q: 'What is mail merge?', opts: ['Combining letters with address lists', 'Sending emails', 'Printing documents', 'Saving files'], correct: 0 },
        { q: 'What is AutoSave?', opts: ['Automatic saving of work', 'Manual saving', 'Printing automatically', 'Closing files automatically'], correct: 0 },
        { q: 'What is a hyperlink?', opts: ['A clickable link to another location', 'A type of font', 'A color scheme', 'A picture format'], correct: 0 },
        { q: 'What is page orientation?', opts: ['Portrait or landscape layout', 'Font size', 'Text color', 'Picture quality'], correct: 0 },
        { q: 'What are margins?', opts: ['Empty space around page edges', 'Text in the document', 'Pictures in document', 'Font styles'], correct: 0 },
        { q: 'What is a header in Word?', opts: ['Text at the top of every page', 'The first paragraph', 'The title of document', 'A type of font'], correct: 0 }
    ],
    html: [
        { q: 'Which tag creates a link?', opts: ['<a>', '<link>', '<url>', '<href>'], correct: 0 },
        { q: 'Which tag is used for images?', opts: ['<img>', '<image>', '<pic>', '<photo>'], correct: 0 },
        { q: 'Which tag creates a list?', opts: ['<ul>', '<list>', '<item>', '<menu>'], correct: 0 },
        { q: 'Which tag is used for list items?', opts: ['<li>', '<item>', '<point>', '<bullet>'], correct: 0 },
        { q: 'What does <br> tag do?', opts: ['Creates a line break', 'Makes text bold', 'Creates a link', 'Adds an image'], correct: 0 },
        { q: 'What is the <title> tag for?', opts: ['Sets the page title in browser tab', 'Creates a heading on page', 'Makes text bold', 'Creates a link'], correct: 0 },
        { q: 'What does <hr> tag create?', opts: ['A horizontal line', 'A heading', 'A paragraph', 'A link'], correct: 0 },
        { q: 'Which tag is used for tables?', opts: ['<table>', '<tab>', '<grid>', '<chart>'], correct: 0 },
        { q: 'What does <strong> tag do?', opts: ['Makes text bold and important', 'Makes text italic', 'Creates a link', 'Adds an image'], correct: 0 },
        { q: 'What is an HTML attribute?', opts: ['Extra information about an element', 'A type of tag', 'Text content', 'A web browser'], correct: 0 }
    ],
    python: [
        { q: 'What is a variable in Python?', opts: ['A container to store data', 'A type of error', 'A programming language', 'A computer program'], correct: 0 },
        { q: 'What does input() do in Python?', opts: ['Gets text from user', 'Prints text on screen', 'Saves a file', 'Deletes data'], correct: 0 },
        { q: 'What is a string in Python?', opts: ['Text data in quotes', 'A number', 'A calculation', 'An error message'], correct: 0 },
        { q: 'What does len() function do?', opts: ['Finds the length of text', 'Prints text', 'Deletes text', 'Changes text color'], correct: 0 },
        { q: 'What is indentation in Python?', opts: ['Spaces at the beginning of lines', 'Text at the end of lines', 'Comments in code', 'Error messages'], correct: 0 },
        { q: 'What is a comment in Python?', opts: ['Text that explains code but does not run', 'Code that runs', 'An error in code', 'A variable name'], correct: 0 },
        { q: 'How do you write a comment in Python?', opts: ['Start with # symbol', 'Start with * symbol', 'Start with / symbol', 'Start with @ symbol'], correct: 0 },
        { q: 'What is syntax in programming?', opts: ['Rules for writing code correctly', 'The meaning of code', 'The speed of code', 'The color of code'], correct: 0 }
    ],
    networking: [
        { q: 'What does LAN stand for?', opts: ['Local Area Network', 'Large Area Network', 'Long Area Network', 'Limited Area Network'], correct: 0 },
        { q: 'What is an IP address?', opts: ['A unique address for devices on network', 'A type of computer', 'A programming language', 'A web browser'], correct: 0 },
        { q: 'What is a server?', opts: ['A computer that provides services to others', 'A type of software', 'A web browser', 'A storage device'], correct: 0 },
        { q: 'What is bandwidth?', opts: ['The speed of internet connection', 'The size of computer screen', 'The amount of storage', 'The number of programs'], correct: 0 },
        { q: 'What is a modem?', opts: ['Device that connects to internet service', 'A type of computer', 'A programming language', 'A storage device'], correct: 0 },
        { q: 'What is downloading?', opts: ['Getting files from internet to your computer', 'Sending files from your computer', 'Deleting files', 'Creating new files'], correct: 0 },
        { q: 'What is uploading?', opts: ['Sending files from your computer to internet', 'Getting files from internet', 'Deleting files', 'Creating new files'], correct: 0 }
    ]
};

async function addCompleteTopics() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING COMPLETE ADDITIONAL TOPICS');
        console.log('====================================');

        // Add Grade 7 questions
        console.log('\n📚 Adding Grade 7 questions...');
        let grade7Total = 0;
        
        for (const [topic, questions] of Object.entries(grade7Topics)) {
            const topicQuestions = createQuestions(7, topic, questions);
            
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
                grade7Total++;
            }
            console.log(`   ✅ ${topic}: ${questions.length} questions`);
        }

        console.log(`✅ Grade 7: Added ${grade7Total} total questions`);
        console.log(`\n🎉 ADDITIONAL TOPICS COMPLETED!`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await database.close();
    }
}

addCompleteTopics();