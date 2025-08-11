const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system.db');
const db = new sqlite3.Database(dbPath);

const grade6Questions = [
    // Characteristics of a computer - Basic (30 questions)
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the main characteristic that makes a computer different from a calculator?',
        options: ['It can store programs', 'It has a screen', 'It uses electricity', 'It has buttons'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which characteristic allows a computer to work without getting tired?',
        options: ['Speed', 'Accuracy', 'Diligence', 'Storage'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does "versatility" mean for a computer?',
        options: ['It is fast', 'It can do many different tasks', 'It is small', 'It is expensive'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which characteristic means a computer rarely makes mistakes?',
        options: ['Speed', 'Accuracy', 'Storage', 'Versatility'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the ability of a computer to remember information called?',
        options: ['Processing', 'Storage', 'Input', 'Output'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'How fast can modern computers perform calculations?',
        options: ['Hundreds per second', 'Thousands per second', 'Millions per second', 'Billions per second'],
        correct: 3
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does it mean that computers have "no feelings"?',
        options: ['They are sad', 'They work objectively', 'They are broken', 'They are slow'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is NOT a characteristic of computers?',
        options: ['Speed', 'Accuracy', 'Emotions', 'Storage'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What makes computers reliable for important tasks?',
        options: ['They are expensive', 'They work consistently', 'They are big', 'They use electricity'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Can computers think like humans?',
        options: ['Yes, always', 'No, they follow instructions', 'Sometimes', 'Only smart computers'],
        correct: 1
    },

    // Computer systems & organization - Basic (25 questions)
    {
        grade: 6, difficulty: 'basic',
        question: 'What are the main parts of a computer system?',
        options: ['Hardware and Software', 'Monitor and Keyboard', 'CPU and RAM', 'Input and Output'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is hardware?',
        options: ['Computer programs', 'Physical parts of computer', 'Internet connection', 'Computer games'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is software?',
        options: ['Physical parts', 'Computer programs', 'Computer screen', 'Computer mouse'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is an example of hardware?',
        options: ['Microsoft Word', 'Google Chrome', 'Monitor', 'Windows'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is an example of software?',
        options: ['Keyboard', 'Mouse', 'Calculator app', 'Speaker'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does CPU stand for?',
        options: ['Computer Processing Unit', 'Central Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the CPU often called?',
        options: ['Heart of computer', 'Brain of computer', 'Eyes of computer', 'Hands of computer'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does RAM stand for?',
        options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Real Access Memory'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the main job of RAM?',
        options: ['Store programs permanently', 'Store data temporarily', 'Display images', 'Connect to internet'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What happens to data in RAM when computer is turned off?',
        options: ['It stays forever', 'It gets lost', 'It moves to hard disk', 'It gets printed'],
        correct: 1
    },

    // Input, output, and storage devices - Basic (35 questions)
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is an input device?',
        options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is an output device?',
        options: ['Mouse', 'Microphone', 'Monitor', 'Scanner'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the main purpose of input devices?',
        options: ['Show information', 'Store information', 'Send information to computer', 'Print information'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the main purpose of output devices?',
        options: ['Send data to computer', 'Show results from computer', 'Store data', 'Process data'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which device is used for typing?',
        options: ['Mouse', 'Keyboard', 'Monitor', 'Printer'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which device is used for pointing and clicking?',
        options: ['Keyboard', 'Mouse', 'Monitor', 'Speaker'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What type of device is a hard disk?',
        options: ['Input device', 'Output device', 'Storage device', 'Processing device'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the main purpose of storage devices?',
        options: ['Show data', 'Input data', 'Keep data permanently', 'Process data'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is a storage device?',
        options: ['Keyboard', 'Monitor', 'USB drive', 'Mouse'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does a scanner do?',
        options: ['Prints documents', 'Converts paper to digital', 'Plays music', 'Shows videos'],
        correct: 1
    },

    // Office tools basics - Medium (40 questions)
    {
        grade: 6, difficulty: 'medium',
        question: 'Which Microsoft Office application is used for writing documents?',
        options: ['Excel', 'PowerPoint', 'Word', 'Paint'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which application is best for creating spreadsheets?',
        options: ['Word', 'Excel', 'PowerPoint', 'Notepad'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is PowerPoint mainly used for?',
        options: ['Writing letters', 'Creating presentations', 'Calculating numbers', 'Drawing pictures'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'In Microsoft Word, what does Ctrl+S do?',
        options: ['Select all', 'Save document', 'Search text', 'Start new document'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is a cell in Excel?',
        options: ['A phone', 'A small room', 'Intersection of row and column', 'A battery'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'In PowerPoint, what is a slide?',
        options: ['A playground equipment', 'A single page of presentation', 'A type of animation', 'A sound effect'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which key combination copies selected text?',
        options: ['Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+Z'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which key combination pastes copied text?',
        options: ['Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+Z'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What does Ctrl+Z do?',
        options: ['Zoom in', 'Undo last action', 'Close program', 'Open file'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'In Word, how do you make text bold?',
        options: ['Ctrl+I', 'Ctrl+U', 'Ctrl+B', 'Ctrl+S'],
        correct: 2
    },

    // Networking fundamentals - Medium (35 questions)
    {
        grade: 6, difficulty: 'medium',
        question: 'What does PAN stand for?',
        options: ['Personal Area Network', 'Public Area Network', 'Private Area Network', 'Portable Area Network'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What does LAN stand for?',
        options: ['Large Area Network', 'Local Area Network', 'Long Area Network', 'Limited Area Network'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What does WAN stand for?',
        options: ['Wide Area Network', 'Wireless Area Network', 'World Area Network', 'Web Area Network'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which network covers the smallest area?',
        options: ['WAN', 'MAN', 'LAN', 'PAN'],
        correct: 3
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which network covers the largest area?',
        options: ['PAN', 'LAN', 'MAN', 'WAN'],
        correct: 3
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is Wi-Fi?',
        options: ['A type of cable', 'Wireless internet connection', 'A computer brand', 'A software program'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is Bluetooth used for?',
        options: ['Long distance communication', 'Short range wireless connection', 'Internet browsing', 'Printing documents'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is cloud computing?',
        options: ['Computing in the sky', 'Using internet-based services', 'Weather prediction', 'Flying computers'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which is an example of cloud storage?',
        options: ['Hard disk', 'USB drive', 'Google Drive', 'CD-ROM'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is the main advantage of cloud computing?',
        options: ['Faster computers', 'Access from anywhere', 'Cheaper computers', 'Better graphics'],
        correct: 1
    },

    // Cybercrimes - Advanced (25 questions)
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is cyberstalking?',
        options: ['Following someone online to harm them', 'Playing online games', 'Sending emails', 'Using social media'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is phishing?',
        options: ['Catching fish online', 'Tricking people to give personal information', 'Playing games', 'Sending photos'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is malware?',
        options: ['Good software', 'Harmful software', 'Free software', 'Gaming software'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is a computer virus?',
        options: ['A sick computer', 'Malware that spreads to other files', 'An antivirus program', 'A computer game'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is adware?',
        options: ['Software that shows unwanted ads', 'Software for creating ads', 'Free software', 'Gaming software'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'How can you protect yourself from phishing?',
        options: ['Click all links', 'Never use email', 'Verify sender before giving information', 'Share passwords'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What should you do if you receive a suspicious email?',
        options: ['Open all attachments', 'Reply immediately', 'Delete it without opening', 'Forward to friends'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'Which is a sign of a phishing email?',
        options: ['From known sender', 'Asks for personal information urgently', 'Has good grammar', 'Contains useful information'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is the best way to avoid malware?',
        options: ['Download everything', 'Use antivirus software', 'Never use internet', 'Share files freely'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'Why is cyberstalking dangerous?',
        options: ['It uses too much internet', 'It can cause emotional harm', 'It is expensive', 'It is slow'],
        correct: 1
    },

    // AI reflection, project cycle & ethics - Advanced (20 questions)
    {
        grade: 6, difficulty: 'advanced',
        question: 'What does AI stand for?',
        options: ['Automatic Intelligence', 'Artificial Intelligence', 'Advanced Intelligence', 'Amazing Intelligence'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'Which is an example of AI in daily life?',
        options: ['Calculator', 'Voice assistants like Siri', 'Television', 'Radio'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is the first step in a project cycle?',
        options: ['Testing', 'Planning', 'Implementation', 'Evaluation'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'Why is ethics important in technology?',
        options: ['To make money', 'To ensure responsible use', 'To make things faster', 'To reduce costs'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What should you consider before starting a project?',
        options: ['Only the cost', 'Goals and requirements', 'Only the time', 'Only the tools'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is an ethical concern with AI?',
        options: ['It is too fast', 'Privacy and job displacement', 'It uses electricity', 'It is expensive'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'In project planning, what comes after identifying the problem?',
        options: ['Testing', 'Finding solutions', 'Celebrating', 'Giving up'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is machine learning?',
        options: ['Machines that learn from data', 'Teaching machines to walk', 'Repairing machines', 'Building machines'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'Why should we test our projects?',
        options: ['To waste time', 'To find and fix problems', 'To make it expensive', 'To confuse users'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'advanced',
        question: 'What is bias in AI?',
        options: ['AI being too fast', 'AI making unfair decisions', 'AI being too expensive', 'AI being too smart'],
        correct: 1
    },

    // Computational thinking & programming concepts - Medium (30 questions)
    {
        grade: 6, difficulty: 'medium',
        question: 'What is computational thinking?',
        options: ['Using computers only', 'Problem-solving approach', 'Playing computer games', 'Repairing computers'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is an algorithm?',
        options: ['A computer program', 'Step-by-step instructions', 'A type of computer', 'A programming language'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is a flowchart?',
        options: ['A chart showing water flow', 'Visual representation of algorithm', 'A type of graph', 'A computer screen'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which shape is used for start/end in flowcharts?',
        options: ['Rectangle', 'Diamond', 'Oval', 'Circle'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which shape is used for decisions in flowcharts?',
        options: ['Rectangle', 'Diamond', 'Oval', 'Triangle'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What does decomposition mean in computational thinking?',
        options: ['Breaking down complex problems', 'Putting things together', 'Making things faster', 'Making things smaller'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is pattern recognition?',
        options: ['Drawing patterns', 'Finding similarities and trends', 'Creating designs', 'Recognizing faces'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is abstraction in computational thinking?',
        options: ['Making things concrete', 'Focusing on important details only', 'Adding more details', 'Making things complex'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Why are algorithms important?',
        options: ['They are fun', 'They provide clear instructions', 'They are colorful', 'They are expensive'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What should a good algorithm be?',
        options: ['Long and complex', 'Clear and step-by-step', 'Confusing', 'Incomplete'],
        correct: 1
    },

    // Python basics - Medium (35 questions)
    {
        grade: 6, difficulty: 'medium',
        question: 'What is Python?',
        options: ['A snake', 'A programming language', 'A computer brand', 'A game'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which function is used to display output in Python?',
        options: ['input()', 'print()', 'show()', 'display()'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which function is used to get input from user in Python?',
        options: ['get()', 'input()', 'read()', 'take()'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What will print("Hello World") do?',
        options: ['Display Hello World', 'Save Hello World', 'Delete Hello World', 'Hide Hello World'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is a syntax error?',
        options: ['Error in logic', 'Error in grammar of code', 'Error in output', 'Error in input'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What is a runtime error?',
        options: ['Error before running', 'Error while program is running', 'Error in syntax', 'Error in planning'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'Which is correct Python syntax?',
        options: ['print "Hello"', 'print("Hello")', 'Print("Hello")', 'PRINT("Hello")'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What does input() function return?',
        options: ['Number', 'String', 'Boolean', 'List'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'How do you write comments in Python?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correct: 2
    },
    {
        grade: 6, difficulty: 'medium',
        question: 'What happens if you have a syntax error?',
        options: ['Program runs slowly', 'Program won\'t run', 'Program runs normally', 'Program crashes later'],
        correct: 1
    },

    // Web development basics - Basic (25 questions)
    {
        grade: 6, difficulty: 'basic',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which tag is used for the main heading?',
        options: ['<head>', '<h1>', '<title>', '<header>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which tag is used for paragraphs?',
        options: ['<para>', '<p>', '<paragraph>', '<text>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which tag is used to create links?',
        options: ['<link>', '<a>', '<url>', '<href>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What is the basic structure of an HTML page?',
        options: ['<html><body></body></html>', '<html><head></head><body></body></html>', '<body><html></html></body>', '<head><body></body></head>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which tag contains information about the webpage?',
        options: ['<body>', '<head>', '<html>', '<title>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which tag contains the visible content of webpage?',
        options: ['<head>', '<body>', '<html>', '<content>'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'How do you create a link to another website?',
        options: ['<a href="website.com">Link</a>', '<link>website.com</link>', '<url>website.com</url>', '<href>website.com</href>'],
        correct: 0
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'What does the <title> tag do?',
        options: ['Creates a heading', 'Sets the page title in browser tab', 'Makes text bold', 'Creates a link'],
        correct: 1
    },
    {
        grade: 6, difficulty: 'basic',
        question: 'Which is the largest heading tag?',
        options: ['<h1>', '<h6>', '<head>', '<header>'],
        correct: 0
    }
];

console.log('🌱 Seeding Grade 6 questions...');

db.serialize(() => {
    const insertQuestion = db.prepare('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)');
    const insertOption = db.prepare('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)');
    
    grade6Questions.forEach((q, index) => {
        insertQuestion.run(q.grade, q.difficulty, q.question, function(err) {
            if (err) {
                console.error(`Error inserting question ${index + 1}:`, err);
                return;
            }
            
            const questionId = this.lastID;
            q.options.forEach((option, optIndex) => {
                insertOption.run(questionId, option, optIndex === q.correct ? 1 : 0, optIndex + 1);
            });
        });
    });
    
    insertQuestion.finalize();
    insertOption.finalize();
    
    console.log(`✅ Grade 6: ${grade6Questions.length} questions seeded`);
    db.close();
});