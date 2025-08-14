const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');
const db = new sqlite3.Database(dbPath);

const grade7Questions = [
    // Operating systems & file management - Basic (35 questions)
    {
        grade: 7, difficulty: 'basic',
        question: 'What is an operating system?',
        options: ['A computer game', 'Software that manages computer resources', 'A type of hardware', 'An internet browser'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Which is an example of an operating system?',
        options: ['Microsoft Word', 'Windows 10', 'Google Chrome', 'Adobe Photoshop'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is file management?',
        options: ['Playing games', 'Organizing and controlling files', 'Browsing internet', 'Typing documents'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is a folder?',
        options: ['A type of file', 'Container for organizing files', 'A computer program', 'A hardware device'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How do you create a new folder in Windows?',
        options: ['Right-click and select New Folder', 'Press Ctrl+F', 'Double-click desktop', 'Press Alt+Tab'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+C do in file management?',
        options: ['Create folder', 'Copy file', 'Cut file', 'Close file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+X do in file management?',
        options: ['Copy file', 'Cut file', 'Delete file', 'Rename file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+V do in file management?',
        options: ['Copy file', 'Cut file', 'Paste file', 'View file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is the Recycle Bin?',
        options: ['A folder for important files', 'Temporary storage for deleted files', 'A system folder', 'A backup folder'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How do you permanently delete a file?',
        options: ['Delete key', 'Shift+Delete', 'Ctrl+Delete', 'Alt+Delete'],
        correct: 1
    }
];// Addall remaining Grade 7 questions here

const additionalGrade7Questions = [
    // File extensions and formats - Medium (30 questions)
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a file extension?',
        options: ['File size', 'Characters after the dot in filename', 'File location', 'File creation date'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .docx?',
        options: ['Image file', 'Word document', 'Music file', 'Video file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .jpg?',
        options: ['Document file', 'Image file', 'Audio file', 'Video file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .mp3?',
        options: ['Image file', 'Document file', 'Audio file', 'Video file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .exe?',
        options: ['Document file', 'Image file', 'Executable program', 'Audio file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for Excel files?',
        options: ['.docx', '.xlsx', '.pptx', '.txt'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for PowerPoint files?',
        options: ['.docx', '.xlsx', '.pptx', '.pdf'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .pdf?',
        options: ['Editable document', 'Portable document format', 'Image file', 'Audio file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for video files?',
        options: ['.jpg', '.mp3', '.mp4', '.txt'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does .zip extension indicate?',
        options: ['Image file', 'Compressed archive', 'Text file', 'Audio file'],
        correct: 1
    }
];

// Combine all questions
const allGrade7Questions = [...grade7Questions, ...additionalGrade7Questions];

console.log('🌱 Seeding Grade 7 questions...');

db.serialize(() => {
    const insertQuestion = db.prepare('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)');
    const insertOption = db.prepare('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)');
    
    allGrade7Questions.forEach((q, index) => {
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
    
    console.log(`✅ Grade 7: ${allGrade7Questions.length} questions seeded`);
    db.close();
});