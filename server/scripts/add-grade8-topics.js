const database = require('../config/database');

// Grade 8 Questions - Advanced Basic Level
const grade8Topics = {
    office: [
        { q: 'What is a pivot table in Excel?', opts: ['A tool to summarize and analyze data', 'A type of chart', 'A formula', 'A color scheme'], correct: 0 },
        { q: 'What does VLOOKUP do in Excel?', opts: ['Searches for data in a table', 'Creates a chart', 'Formats cells', 'Prints the spreadsheet'], correct: 0 },
        { q: 'What is conditional formatting?', opts: ['Formatting cells based on their values', 'Formatting all cells the same way', 'Deleting cell contents', 'Printing cells'], correct: 0 },
        { q: 'What is a macro in Office?', opts: ['A recorded sequence of actions', 'A type of font', 'A color scheme', 'A file format'], correct: 0 },
        { q: 'What is data validation in Excel?', opts: ['Controlling what data can be entered', 'Deleting invalid data', 'Formatting data', 'Printing data'], correct: 0 },
        { q: 'What is a master slide in PowerPoint?', opts: ['A template that controls all slide layouts', 'The first slide in presentation', 'The last slide in presentation', 'A slide with animations'], correct: 0 },
        { q: 'What is slide transition?', opts: ['Effect when moving between slides', 'Text on a slide', 'Picture on a slide', 'Sound on a slide'], correct: 0 },
        { q: 'What is track changes in Word?', opts: ['Feature that shows edits made to document', 'Feature that counts words', 'Feature that changes fonts', 'Feature that prints document'], correct: 0 },
        { q: 'What is a style in Word?', opts: ['A set of formatting options', 'A type of font', 'A color scheme', 'A page layout'], correct: 0 },
        { q: 'What is a table of contents?', opts: ['A list of topics with page numbers', 'A type of table', 'A list of pictures', 'A bibliography'], correct: 0 },
        { q: 'What is version control?', opts: ['Managing different versions of a document', 'Controlling font versions', 'Controlling color versions', 'Controlling print versions'], correct: 0 },
        { q: 'What is collaboration in Office?', opts: ['Multiple people working on same document', 'Working alone on document', 'Printing multiple copies', 'Saving multiple files'], correct: 0 },
        { q: 'What is cloud storage in Office?', opts: ['Storing files on internet servers', 'Storing files on local computer', 'Storing files on USB drive', 'Storing files on CD'], correct: 0 },
        { q: 'What is AutoCorrect?', opts: ['Feature that fixes common typing mistakes', 'Feature that changes font size', 'Feature that adds pictures', 'Feature that prints documents'], correct: 0 },
        { q: 'What is a citation in Word?', opts: ['A reference to a source', 'A type of heading', 'A page number', 'A font style'], correct: 0 }
    ],
    html: [
        { q: 'What is CSS?', opts: ['Language for styling web pages', 'A programming language', 'A web browser', 'A type of computer'], correct: 0 },
        { q: 'What does CSS stand for?', opts: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], correct: 0 },
        { q: 'Which tag is used for forms?', opts: ['<form>', '<input>', '<button>', '<field>'], correct: 0 },
        { q: 'Which tag creates a button?', opts: ['<button>', '<click>', '<press>', '<action>'], correct: 0 },
        { q: 'What is the <div> tag used for?', opts: ['Creating sections or containers', 'Creating headings', 'Creating links', 'Creating images'], correct: 0 },
        { q: 'What is the <span> tag used for?', opts: ['Styling small parts of text', 'Creating paragraphs', 'Creating headings', 'Creating links'], correct: 0 },
        { q: 'What is an HTML form?', opts: ['A way to collect user input', 'A type of table', 'A type of image', 'A type of link'], correct: 0 },
        { q: 'What does the action attribute do in forms?', opts: ['Specifies where to send form data', 'Changes form color', 'Changes form size', 'Hides the form'], correct: 0 },
        { q: 'What is responsive design?', opts: ['Web pages that work on all device sizes', 'Web pages that load quickly', 'Web pages with animations', 'Web pages with sound'], correct: 0 },
        { q: 'What is the viewport in web design?', opts: ['The visible area of a web page', 'The title of a web page', 'The footer of a web page', 'The menu of a web page'], correct: 0 }
    ],
    python: [
        { q: 'What is a list in Python?', opts: ['A collection of items in order', 'A single number', 'A single text', 'An error message'], correct: 0 },
        { q: 'What is a loop in Python?', opts: ['Code that repeats', 'Code that runs once', 'Code that has errors', 'Code that prints text'], correct: 0 },
        { q: 'What is an if statement?', opts: ['Code that runs only if condition is true', 'Code that always runs', 'Code that never runs', 'Code that has errors'], correct: 0 },
        { q: 'What is a function in Python?', opts: ['A reusable block of code', 'A type of variable', 'A type of error', 'A type of comment'], correct: 0 },
        { q: 'What does def keyword do?', opts: ['Defines a function', 'Deletes a function', 'Prints a function', 'Runs a function'], correct: 0 },
        { q: 'What is a parameter in a function?', opts: ['Input that function receives', 'Output that function gives', 'Error in function', 'Name of function'], correct: 0 },
        { q: 'What does return do in a function?', opts: ['Gives back a result', 'Starts the function', 'Deletes the function', 'Prints the function'], correct: 0 },
        { q: 'What is debugging in Python?', opts: ['Finding and fixing errors in code', 'Writing new code', 'Running code faster', 'Deleting code'], correct: 0 }
    ],
    networking: [
        { q: 'What does WAN stand for?', opts: ['Wide Area Network', 'World Area Network', 'Wireless Area Network', 'Web Area Network'], correct: 0 },
        { q: 'What is a firewall?', opts: ['Security system that controls network traffic', 'A type of computer', 'A programming language', 'A web browser'], correct: 0 },
        { q: 'What is encryption?', opts: ['Converting data into secret code', 'Deleting data', 'Copying data', 'Printing data'], correct: 0 },
        { q: 'What is a protocol in networking?', opts: ['Rules for how devices communicate', 'A type of computer', 'A programming language', 'A web browser'], correct: 0 },
        { q: 'What does HTTP stand for?', opts: ['HyperText Transfer Protocol', 'High Text Transfer Protocol', 'Home Text Transfer Protocol', 'Hyperlink Text Protocol'], correct: 0 },
        { q: 'What is the difference between HTTP and HTTPS?', opts: ['HTTPS is secure, HTTP is not', 'HTTP is faster than HTTPS', 'HTTPS is older than HTTP', 'No difference'], correct: 0 },
        { q: 'What is cloud computing?', opts: ['Using internet-based computing services', 'Computing with weather data', 'Computing in the sky', 'A type of software'], correct: 0 }
    ]
};

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

async function addGrade8Topics() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING GRADE 8 ADDITIONAL TOPICS');
        console.log('===================================');

        let grade8Total = 0;

        for (const [topic, questions] of Object.entries(grade8Topics)) {
            const topicQuestions = createQuestions(8, topic, questions);

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
                grade8Total++;
            }
            console.log(`   ✅ ${topic}: ${questions.length} questions`);
        }

        console.log(`✅ Grade 8: Added ${grade8Total} total questions`);

        // Final verification
        const finalCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count 
                FROM questions 
                WHERE grade IN (6, 7, 8) 
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

        console.log(`\n🎉 ALL ADDITIONAL TOPICS COMPLETED!`);
        console.log(`✅ Microsoft Office questions added to all grades`);
        console.log(`✅ HTML tags questions added to all grades`);
        console.log(`✅ Python basics questions added to all grades`);
        console.log(`✅ Networking questions added to all grades`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await database.close();
    }
}

addGrade8Topics();