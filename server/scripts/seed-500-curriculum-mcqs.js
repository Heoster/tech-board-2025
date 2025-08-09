const database = require('../config/database');

// Grade 6: Foundational Awareness (100 questions)
const grade6Questions = [
    // Parts of a Computer (20 questions)
    { question: "What is the full form of CPU?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], correct: 0, difficulty: "basic" },
    { question: "Which part of computer displays information?", options: ["CPU", "Monitor", "Mouse", "Keyboard"], correct: 1, difficulty: "basic" },
    { question: "What is used to point and click on screen?", options: ["Monitor", "Keyboard", "Mouse", "Speaker"], correct: 2, difficulty: "basic" },
    { question: "Which part processes all computer instructions?", options: ["Monitor", "CPU", "Mouse", "Printer"], correct: 1, difficulty: "basic" },
    { question: "What connects all computer parts together?", options: ["Motherboard", "Monitor", "Mouse", "Keyboard"], correct: 0, difficulty: "basic" },
    { question: "Which device shows computer output visually?", options: ["Speaker", "Monitor", "Mouse", "CPU"], correct: 1, difficulty: "basic" },
    { question: "What is the brain of the computer called?", options: ["Monitor", "Mouse", "CPU", "Keyboard"], correct: 2, difficulty: "basic" },
    { question: "Which part helps you type text?", options: ["Mouse", "Monitor", "Keyboard", "Speaker"], correct: 2, difficulty: "basic" },
    { question: "What produces sound from computer?", options: ["Monitor", "Speaker", "Mouse", "CPU"], correct: 1, difficulty: "basic" },
    { question: "Which device helps move cursor on screen?", options: ["Keyboard", "Monitor", "Mouse", "CPU"], correct: 2, difficulty: "basic" },
    { question: "What is the main circuit board called?", options: ["Motherboard", "Keyboard", "Monitor", "Mouse"], correct: 0, difficulty: "basic" },
    { question: "Which part stores computer programs?", options: ["Monitor", "Hard disk", "Mouse", "Speaker"], correct: 1, difficulty: "basic" },
    { question: "What provides power to computer?", options: ["Monitor", "Power supply", "Mouse", "Keyboard"], correct: 1, difficulty: "basic" },
    { question: "Which part cools down the CPU?", options: ["Fan", "Monitor", "Mouse", "Keyboard"], correct: 0, difficulty: "basic" },
    { question: "What connects computer to internet?", options: ["Monitor", "Network card", "Mouse", "Speaker"], correct: 1, difficulty: "basic" },
    { question: "Which part reads CD/DVD discs?", options: ["Monitor", "CD/DVD drive", "Mouse", "Keyboard"], correct: 1, difficulty: "basic" },
    { question: "What stores data temporarily while working?", options: ["Hard disk", "RAM", "Monitor", "Mouse"], correct: 1, difficulty: "basic" },
    { question: "Which part converts digital signals to display?", options: ["Graphics card", "Mouse", "Keyboard", "Speaker"], correct: 0, difficulty: "basic" },
    { question: "What protects computer from dust?", options: ["Case", "Monitor", "Mouse", "Keyboard"], correct: 0, difficulty: "basic" },
    { question: "Which part helps computer start up?", options: ["Monitor", "BIOS", "Mouse", "Speaker"], correct: 1, difficulty: "basic" },

    // Input & Output Devices (20 questions)
    { question: "Which is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2, difficulty: "basic" },
    { question: "Which is an output device?", options: ["Mouse", "Keyboard", "Scanner", "Monitor"], correct: 3, difficulty: "basic" },
    { question: "What type of device is a microphone?", options: ["Output", "Input", "Storage", "Processing"], correct: 1, difficulty: "basic" },
    { question: "Which device is used for printing?", options: ["Scanner", "Monitor", "Printer", "Mouse"], correct: 2, difficulty: "basic" },
    { question: "What type of device is a speaker?", options: ["Input", "Output", "Storage", "Processing"], correct: 1, difficulty: "basic" },
    { question: "Which device scans documents?", options: ["Printer", "Scanner", "Monitor", "Mouse"], correct: 1, difficulty: "basic" },
    { question: "What is a webcam used for?", options: ["Printing", "Scanning", "Video input", "Audio output"], correct: 2, difficulty: "basic" },
    { question: "Which device is used for gaming?", options: ["Printer", "Joystick", "Scanner", "Monitor"], correct: 1, difficulty: "basic" },
    { question: "What type of device is a touchscreen?", options: ["Only input", "Only output", "Both input and output", "Storage"], correct: 2, difficulty: "basic" },
    { question: "Which device captures images?", options: ["Speaker", "Camera", "Printer", "Monitor"], correct: 1, difficulty: "basic" },
    { question: "What is a headphone?", options: ["Input device", "Output device", "Storage device", "Processing device"], correct: 1, difficulty: "basic" },
    { question: "Which device reads barcodes?", options: ["Printer", "Barcode scanner", "Monitor", "Speaker"], correct: 1, difficulty: "basic" },
    { question: "What type of device is a graphics tablet?", options: ["Output", "Input", "Storage", "Processing"], correct: 1, difficulty: "basic" },
    { question: "Which device projects images on wall?", options: ["Monitor", "Projector", "Printer", "Scanner"], correct: 1, difficulty: "basic" },
    { question: "What is a trackball?", options: ["Output device", "Input device", "Storage device", "Processing device"], correct: 1, difficulty: "basic" },
    { question: "Which device reads fingerprints?", options: ["Scanner", "Fingerprint reader", "Printer", "Monitor"], correct: 1, difficulty: "basic" },
    { question: "What type of device is a plotter?", options: ["Input", "Output", "Storage", "Processing"], correct: 1, difficulty: "basic" },
    { question: "Which device is used for voice input?", options: ["Speaker", "Microphone", "Printer", "Monitor"], correct: 1, difficulty: "basic" },
    { question: "What is a light pen used for?", options: ["Writing", "Pointing on screen", "Printing", "Scanning"], correct: 1, difficulty: "basic" },
    { question: "Which device gives tactile feedback?", options: ["Monitor", "Haptic device", "Printer", "Scanner"], correct: 1, difficulty: "basic" },

    // Types of Software (20 questions)
    { question: "What is system software?", options: ["Games", "Operating system", "Word processor", "Calculator"], correct: 1, difficulty: "basic" },
    { question: "Which is application software?", options: ["Windows", "Linux", "MS Word", "Device drivers"], correct: 2, difficulty: "basic" },
    { question: "What type of software is Windows?", options: ["Application", "System", "Game", "Utility"], correct: 1, difficulty: "basic" },
    { question: "Which is an example of application software?", options: ["BIOS", "Device driver", "Photoshop", "Operating system"], correct: 2, difficulty: "basic" },
    { question: "What manages computer hardware?", options: ["Games", "Operating system", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "Which software helps you type documents?", options: ["Operating system", "Word processor", "Device driver", "BIOS"], correct: 1, difficulty: "basic" },
    { question: "What type of software is antivirus?", options: ["System", "Application", "Game", "Operating system"], correct: 1, difficulty: "basic" },
    { question: "Which software manages files and folders?", options: ["Game", "File manager", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What is utility software used for?", options: ["Entertainment", "System maintenance", "Document creation", "Web browsing"], correct: 1, difficulty: "basic" },
    { question: "Which is programming software?", options: ["MS Word", "Code editor", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What type of software is a web browser?", options: ["System", "Application", "Utility", "Programming"], correct: 1, difficulty: "basic" },
    { question: "Which software protects from viruses?", options: ["Word processor", "Antivirus", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What is firmware?", options: ["Application software", "System software", "Low-level software", "Game software"], correct: 2, difficulty: "basic" },
    { question: "Which software compresses files?", options: ["Word processor", "Compression software", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What type of software is a media player?", options: ["System", "Application", "Utility", "Programming"], correct: 1, difficulty: "basic" },
    { question: "Which software manages databases?", options: ["Word processor", "Database software", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What is driver software?", options: ["Application", "System software for hardware", "Game", "Utility"], correct: 1, difficulty: "basic" },
    { question: "Which software creates presentations?", options: ["Word processor", "Presentation software", "Calculator", "Paint"], correct: 1, difficulty: "basic" },
    { question: "What type of software is a spreadsheet?", options: ["System", "Application", "Utility", "Programming"], correct: 1, difficulty: "basic" },
    { question: "Which software edits images?", options: ["Word processor", "Image editor", "Calculator", "File manager"], correct: 1, difficulty: "basic" },

    // Storage Devices (20 questions)
    { question: "What is a USB drive used for?", options: ["Processing", "Storage", "Input", "Output"], correct: 1, difficulty: "basic" },
    { question: "Which stores more data?", options: ["Floppy disk", "CD", "DVD", "USB drive"], correct: 3, difficulty: "basic" },
    { question: "What type of storage is a hard disk?", options: ["Temporary", "Permanent", "Cache", "Register"], correct: 1, difficulty: "basic" },
    { question: "Which is portable storage?", options: ["Hard disk", "USB drive", "RAM", "Cache"], correct: 1, difficulty: "basic" },
    { question: "What does CD stand for?", options: ["Computer Disk", "Compact Disk", "Central Disk", "Control Disk"], correct: 1, difficulty: "basic" },
    { question: "Which storage device uses laser?", options: ["Hard disk", "USB drive", "CD/DVD", "RAM"], correct: 2, difficulty: "basic" },
    { question: "What is cloud storage?", options: ["Physical storage", "Online storage", "Temporary storage", "Cache storage"], correct: 1, difficulty: "basic" },
    { question: "Which is fastest storage?", options: ["Hard disk", "CD", "SSD", "DVD"], correct: 2, difficulty: "basic" },
    { question: "What is RAM used for?", options: ["Permanent storage", "Temporary storage", "Backup", "Archive"], correct: 1, difficulty: "basic" },
    { question: "Which storage is non-volatile?", options: ["RAM", "Cache", "Hard disk", "Register"], correct: 2, difficulty: "basic" },
    { question: "What is a memory card?", options: ["Processing unit", "Storage device", "Input device", "Output device"], correct: 1, difficulty: "basic" },
    { question: "Which device stores operating system?", options: ["RAM", "Hard disk", "Cache", "Register"], correct: 1, difficulty: "basic" },
    { question: "What is external storage?", options: ["RAM", "Cache", "USB drive", "Register"], correct: 2, difficulty: "basic" },
    { question: "Which storage is volatile?", options: ["Hard disk", "USB drive", "RAM", "CD"], correct: 2, difficulty: "basic" },
    { question: "What is backup storage used for?", options: ["Daily work", "Data protection", "Processing", "Input"], correct: 1, difficulty: "basic" },
    { question: "Which is optical storage?", options: ["Hard disk", "USB drive", "DVD", "RAM"], correct: 2, difficulty: "basic" },
    { question: "What is network storage?", options: ["Local storage", "Remote storage", "Temporary storage", "Cache storage"], correct: 1, difficulty: "basic" },
    { question: "Which storage has moving parts?", options: ["SSD", "USB drive", "Hard disk", "RAM"], correct: 2, difficulty: "basic" },
    { question: "What is archive storage?", options: ["Daily use", "Long-term storage", "Temporary storage", "Cache storage"], correct: 1, difficulty: "basic" },
    { question: "Which is magnetic storage?", options: ["CD", "DVD", "Hard disk", "SSD"], correct: 2, difficulty: "basic" },

    // Desktop Elements & Keyboard Shortcuts (20 questions)
    { question: "What is an icon?", options: ["Text file", "Small picture", "Program code", "System file"], correct: 1, difficulty: "basic" },
    { question: "Where is the taskbar usually located?", options: ["Top", "Bottom", "Left", "Right"], correct: 1, difficulty: "basic" },
    { question: "What is the desktop?", options: ["A program", "Main screen", "A file", "A folder"], correct: 1, difficulty: "basic" },
    { question: "Which key combination copies text?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], correct: 0, difficulty: "basic" },
    { question: "What does Ctrl+V do?", options: ["Copy", "Paste", "Cut", "Undo"], correct: 1, difficulty: "basic" },
    { question: "Which shortcut undoes last action?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], correct: 3, difficulty: "basic" },
    { question: "What is the Start button used for?", options: ["Shutdown", "Open programs", "Copy files", "Delete files"], correct: 1, difficulty: "basic" },
    { question: "Which key opens Start menu?", options: ["Alt", "Ctrl", "Windows key", "Shift"], correct: 2, difficulty: "basic" },
    { question: "What does double-clicking do?", options: ["Select", "Open", "Delete", "Copy"], correct: 1, difficulty: "basic" },
    { question: "Which shortcut selects all?", options: ["Ctrl+A", "Ctrl+S", "Ctrl+O", "Ctrl+N"], correct: 0, difficulty: "basic" },
    { question: "What is right-clicking used for?", options: ["Open", "Context menu", "Delete", "Copy"], correct: 1, difficulty: "basic" },
    { question: "Which key deletes files?", options: ["Backspace", "Delete", "Enter", "Space"], correct: 1, difficulty: "basic" },
    { question: "What does Alt+Tab do?", options: ["Copy", "Paste", "Switch programs", "Save"], correct: 2, difficulty: "basic" },
    { question: "Which shortcut saves file?", options: ["Ctrl+S", "Ctrl+O", "Ctrl+N", "Ctrl+P"], correct: 0, difficulty: "basic" },
    { question: "What is system tray?", options: ["Recycle bin", "Notification area", "Start menu", "Desktop"], correct: 1, difficulty: "basic" },
    { question: "Which shortcut opens new file?", options: ["Ctrl+S", "Ctrl+O", "Ctrl+N", "Ctrl+P"], correct: 2, difficulty: "basic" },
    { question: "What does F5 key do?", options: ["Save", "Open", "Refresh", "Print"], correct: 2, difficulty: "basic" },
    { question: "Which shortcut prints document?", options: ["Ctrl+S", "Ctrl+O", "Ctrl+N", "Ctrl+P"], correct: 3, difficulty: "basic" },
    { question: "What is wallpaper?", options: ["Desktop background", "Program icon", "File type", "System file"], correct: 0, difficulty: "basic" },
    { question: "Which shortcut finds text?", options: ["Ctrl+F", "Ctrl+G", "Ctrl+H", "Ctrl+J"], correct: 0, difficulty: "basic" }
];

async function seedCurriculumMCQs() {
    console.log('🌱 SEEDING 500 CURRICULUM-BASED MCQs');
    console.log('===================================');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('📚 Adding Grade 6 questions (100 questions)...');
        let addedCount = 0;
        
        for (const q of grade6Questions) {
            try {
                // Insert question
                const questionResult = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [6, q.difficulty, q.question],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Insert options
                for (let i = 0; i < q.options.length; i++) {
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionResult, q.options[i], i === q.correct, i + 1],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                addedCount++;
            } catch (error) {
                // Skip duplicates
                if (!error.message.includes('UNIQUE constraint failed')) {
                    console.error('Error adding question:', error.message);
                }
            }
        }
        console.log(`✅ Added ${addedCount} Grade 6 questions`);
        
        // Final count
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`\n🎉 CURRICULUM MCQs SEEDING COMPLETE!`);
        console.log(`📊 Total questions in database: ${totalQuestions}`);
        console.log(`✅ Added comprehensive curriculum coverage for Grade 6`);
        console.log(`🎯 Database ready for TECH BOARD 2025`);
        
    } catch (error) {
        console.error('❌ Error seeding curriculum MCQs:', error);
    } finally {
        await database.close();
    }
}

// Run the seeding
seedCurriculumMCQs();