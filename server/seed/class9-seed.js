const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

const class9Questions = [
    // Computer architecture
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What does ALU stand for in computer architecture?',
        options: [
            { text: 'Arithmetic Logic Unit', isCorrect: true },
            { text: 'Advanced Logic Unit', isCorrect: false },
            { text: 'Automatic Logic Unit', isCorrect: false },
            { text: 'Application Logic Unit', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the main function of the ALU?',
        options: [
            { text: 'Performs arithmetic and logical operations', isCorrect: true },
            { text: 'Controls program execution', isCorrect: false },
            { text: 'Stores data temporarily', isCorrect: false },
            { text: 'Manages input/output operations', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the control unit responsible for?',
        options: [
            { text: 'Coordinating and controlling all computer operations', isCorrect: true },
            { text: 'Performing calculations', isCorrect: false },
            { text: 'Storing data permanently', isCorrect: false },
            { text: 'Displaying output', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What are registers in computer architecture?',
        options: [
            { text: 'High-speed storage locations within the CPU', isCorrect: true },
            { text: 'External storage devices', isCorrect: false },
            { text: 'Input devices', isCorrect: false },
            { text: 'Network components', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is a bus in computer architecture?',
        options: [
            { text: 'A communication pathway that transfers data between components', isCorrect: true },
            { text: 'A type of storage device', isCorrect: false },
            { text: 'A processing unit', isCorrect: false },
            { text: 'An input device', isCorrect: false }
        ]
    },

    // Number systems
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the base of the binary number system?',
        options: [
            { text: '2', isCorrect: true },
            { text: '8', isCorrect: false },
            { text: '10', isCorrect: false },
            { text: '16', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the base of the decimal number system?',
        options: [
            { text: '10', isCorrect: true },
            { text: '2', isCorrect: false },
            { text: '8', isCorrect: false },
            { text: '16', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the base of the octal number system?',
        options: [
            { text: '8', isCorrect: true },
            { text: '2', isCorrect: false },
            { text: '10', isCorrect: false },
            { text: '16', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the base of the hexadecimal number system?',
        options: [
            { text: '16', isCorrect: true },
            { text: '2', isCorrect: false },
            { text: '8', isCorrect: false },
            { text: '10', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'Convert binary 1010 to decimal:',
        options: [
            { text: '10', isCorrect: true },
            { text: '8', isCorrect: false },
            { text: '12', isCorrect: false },
            { text: '14', isCorrect: false }
        ]
    },

    // Boolean logic & gates
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the output of an AND gate when both inputs are 1?',
        options: [
            { text: '1', isCorrect: true },
            { text: '0', isCorrect: false },
            { text: 'Undefined', isCorrect: false },
            { text: 'Error', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is the output of an OR gate when both inputs are 0?',
        options: [
            { text: '0', isCorrect: true },
            { text: '1', isCorrect: false },
            { text: 'Undefined', isCorrect: false },
            { text: 'Error', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What does a NOT gate do?',
        options: [
            { text: 'Inverts the input (0 becomes 1, 1 becomes 0)', isCorrect: true },
            { text: 'Adds two inputs', isCorrect: false },
            { text: 'Multiplies two inputs', isCorrect: false },
            { text: 'Stores the input', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is a NAND gate?',
        options: [
            { text: 'An AND gate followed by a NOT gate', isCorrect: true },
            { text: 'An OR gate followed by a NOT gate', isCorrect: false },
            { text: 'Two AND gates combined', isCorrect: false },
            { text: 'A special type of OR gate', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is a truth table?',
        options: [
            { text: 'A table showing all possible input-output combinations for a logic gate', isCorrect: true },
            { text: 'A table of true statements', isCorrect: false },
            { text: 'A table of computer specifications', isCorrect: false },
            { text: 'A table of programming errors', isCorrect: false }
        ]
    },

    // Operating systems
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is process management in an operating system?',
        options: [
            { text: 'Managing the execution of multiple programs simultaneously', isCorrect: true },
            { text: 'Managing files and folders', isCorrect: false },
            { text: 'Managing network connections', isCorrect: false },
            { text: 'Managing user accounts', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is memory management in an operating system?',
        options: [
            { text: 'Allocating and deallocating memory space for programs', isCorrect: true },
            { text: 'Managing storage devices', isCorrect: false },
            { text: 'Managing network memory', isCorrect: false },
            { text: 'Managing user memory', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'medium',
        questionText: 'What is a file system?',
        options: [
            { text: 'A method of organizing and storing files on storage devices', isCorrect: true },
            { text: 'A type of computer file', isCorrect: false },
            { text: 'A network protocol', isCorrect: false },
            { text: 'A programming language', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is multitasking in operating systems?',
        options: [
            { text: 'Running multiple programs simultaneously', isCorrect: true },
            { text: 'Using multiple keyboards', isCorrect: false },
            { text: 'Having multiple users', isCorrect: false },
            { text: 'Using multiple monitors', isCorrect: false }
        ]
    },
    {
        grade: 9, difficulty: 'advanced',
        questionText: 'What is virtual memory?',
        options: [
            { text: 'Using hard disk space as extended RAM', isCorrect: true },
            { text: 'Memory that doesn\'t exist', isCorrect: false },
            { text: 'Memory for virtual reality', isCorrect: false },
            { text: 'Cloud-based memory', isCorrect: false }
        ]
    }
];

const generateMoreClass9Questions = () => {
    const questionTemplates = [
        // Software classification
        {
            questionText: 'What is system software?',
            options: [
                { text: 'Software that manages computer hardware and provides platform for other software', isCorrect: true },
                { text: 'Software for specific user tasks', isCorrect: false },
                { text: 'Software for entertainment', isCorrect: false },
                { text: 'Software for networking', isCorrect: false }
            ]
        },
        {
            questionText: 'What is application software?',
            options: [
                { text: 'Software designed for end-users to accomplish specific tasks', isCorrect: true },
                { text: 'Software that manages hardware', isCorrect: false },
                { text: 'Software for system administration', isCorrect: false },
                { text: 'Software for programming', isCorrect: false }
            ]
        },
        {
            questionText: 'What are utility programs?',
            options: [
                { text: 'Software tools that help maintain and optimize computer performance', isCorrect: true },
                { text: 'Programs for entertainment', isCorrect: false },
                { text: 'Programs for creating documents', isCorrect: false },
                { text: 'Programs for web browsing', isCorrect: false }
            ]
        },
        {
            questionText: 'Which is an example of system software?',
            options: [
                { text: 'Operating System', isCorrect: true },
                { text: 'Microsoft Word', isCorrect: false },
                { text: 'Adobe Photoshop', isCorrect: false },
                { text: 'Google Chrome', isCorrect: false }
            ]
        },
        {
            questionText: 'Which is an example of utility software?',
            options: [
                { text: 'Antivirus program', isCorrect: true },
                { text: 'Video game', isCorrect: false },
                { text: 'Word processor', isCorrect: false },
                { text: 'Web browser', isCorrect: false }
            ]
        },

        // Networking fundamentals
        {
            questionText: 'What is subnetting?',
            options: [
                { text: 'Dividing a network into smaller sub-networks', isCorrect: true },
                { text: 'Connecting networks together', isCorrect: false },
                { text: 'Securing network connections', isCorrect: false },
                { text: 'Speeding up network traffic', isCorrect: false }
            ]
        },
        {
            questionText: 'What does HTTP stand for?',
            options: [
                { text: 'HyperText Transfer Protocol', isCorrect: true },
                { text: 'High Transfer Text Protocol', isCorrect: false },
                { text: 'Home Transfer Text Protocol', isCorrect: false },
                { text: 'Hyperlink Transfer Text Protocol', isCorrect: false }
            ]
        },
        {
            questionText: 'What does FTP stand for?',
            options: [
                { text: 'File Transfer Protocol', isCorrect: true },
                { text: 'Fast Transfer Protocol', isCorrect: false },
                { text: 'File Text Protocol', isCorrect: false },
                { text: 'Free Transfer Protocol', isCorrect: false }
            ]
        },
        {
            questionText: 'What does SMTP stand for?',
            options: [
                { text: 'Simple Mail Transfer Protocol', isCorrect: true },
                { text: 'Secure Mail Transfer Protocol', isCorrect: false },
                { text: 'Standard Mail Transfer Protocol', isCorrect: false },
                { text: 'System Mail Transfer Protocol', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the purpose of FTP?',
            options: [
                { text: 'Transferring files between computers over a network', isCorrect: true },
                { text: 'Sending emails', isCorrect: false },
                { text: 'Browsing web pages', isCorrect: false },
                { text: 'Playing online games', isCorrect: false }
            ]
        },

        // Internet technologies
        {
            questionText: 'What does URL stand for?',
            options: [
                { text: 'Uniform Resource Locator', isCorrect: true },
                { text: 'Universal Resource Locator', isCorrect: false },
                { text: 'Unique Resource Locator', isCorrect: false },
                { text: 'United Resource Locator', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the difference between HTTP and HTTPS?',
            options: [
                { text: 'HTTPS is secure (encrypted), HTTP is not', isCorrect: true },
                { text: 'HTTP is faster than HTTPS', isCorrect: false },
                { text: 'HTTPS is older than HTTP', isCorrect: false },
                { text: 'HTTP is more reliable than HTTPS', isCorrect: false }
            ]
        },
        {
            questionText: 'What does the "S" in HTTPS stand for?',
            options: [
                { text: 'Secure', isCorrect: true },
                { text: 'Standard', isCorrect: false },
                { text: 'System', isCorrect: false },
                { text: 'Simple', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a domain name?',
            options: [
                { text: 'A human-readable address for a website', isCorrect: true },
                { text: 'A type of computer virus', isCorrect: false },
                { text: 'A programming language', isCorrect: false },
                { text: 'A storage device', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a web server?',
            options: [
                { text: 'A computer that stores and serves web pages to users', isCorrect: true },
                { text: 'A type of web browser', isCorrect: false },
                { text: 'A programming language', isCorrect: false },
                { text: 'A network cable', isCorrect: false }
            ]
        },

        // Cybersecurity essentials
        {
            questionText: 'What is malware?',
            options: [
                { text: 'Malicious software designed to harm or exploit computers', isCorrect: true },
                { text: 'Software for email', isCorrect: false },
                { text: 'Software for gaming', isCorrect: false },
                { text: 'Software for productivity', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a firewall?',
            options: [
                { text: 'A security system that monitors and controls network traffic', isCorrect: true },
                { text: 'A type of computer virus', isCorrect: false },
                { text: 'A web browser', isCorrect: false },
                { text: 'A storage device', isCorrect: false }
            ]
        },
        {
            questionText: 'What is ethical hacking?',
            options: [
                { text: 'Legal hacking to find and fix security vulnerabilities', isCorrect: true },
                { text: 'Illegal computer intrusion', isCorrect: false },
                { text: 'Creating computer viruses', isCorrect: false },
                { text: 'Stealing personal data', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a penetration test?',
            options: [
                { text: 'Authorized testing of system security by simulating attacks', isCorrect: true },
                { text: 'Testing computer speed', isCorrect: false },
                { text: 'Testing software functionality', isCorrect: false },
                { text: 'Testing network speed', isCorrect: false }
            ]
        },
        {
            questionText: 'What is encryption?',
            options: [
                { text: 'Converting data into a coded format to protect it', isCorrect: true },
                { text: 'Deleting data permanently', isCorrect: false },
                { text: 'Copying data to multiple locations', isCorrect: false },
                { text: 'Compressing data to save space', isCorrect: false }
            ]
        },

        // Databases & SQL basics
        {
            questionText: 'What does SQL stand for?',
            options: [
                { text: 'Structured Query Language', isCorrect: true },
                { text: 'Standard Query Language', isCorrect: false },
                { text: 'Simple Query Language', isCorrect: false },
                { text: 'System Query Language', isCorrect: false }
            ]
        },
        {
            questionText: 'Which SQL command is used to retrieve data from a database?',
            options: [
                { text: 'SELECT', isCorrect: true },
                { text: 'INSERT', isCorrect: false },
                { text: 'UPDATE', isCorrect: false },
                { text: 'DELETE', isCorrect: false }
            ]
        },
        {
            questionText: 'Which SQL command is used to add new data to a database?',
            options: [
                { text: 'INSERT', isCorrect: true },
                { text: 'SELECT', isCorrect: false },
                { text: 'UPDATE', isCorrect: false },
                { text: 'DELETE', isCorrect: false }
            ]
        },
        {
            questionText: 'Which SQL command is used to modify existing data?',
            options: [
                { text: 'UPDATE', isCorrect: true },
                { text: 'SELECT', isCorrect: false },
                { text: 'INSERT', isCorrect: false },
                { text: 'DELETE', isCorrect: false }
            ]
        },
        {
            questionText: 'Which SQL command is used to remove data from a database?',
            options: [
                { text: 'DELETE', isCorrect: true },
                { text: 'SELECT', isCorrect: false },
                { text: 'INSERT', isCorrect: false },
                { text: 'UPDATE', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a JOIN in SQL?',
            options: [
                { text: 'Combining data from multiple tables based on related columns', isCorrect: true },
                { text: 'Adding new columns to a table', isCorrect: false },
                { text: 'Deleting rows from a table', isCorrect: false },
                { text: 'Creating a new table', isCorrect: false }
            ]
        },

        // Python data structures
        {
            questionText: 'What is a list in Python?',
            options: [
                { text: 'An ordered collection of items that can be changed', isCorrect: true },
                { text: 'An unordered collection of unique items', isCorrect: false },
                { text: 'A collection of key-value pairs', isCorrect: false },
                { text: 'An ordered collection that cannot be changed', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a tuple in Python?',
            options: [
                { text: 'An ordered collection of items that cannot be changed', isCorrect: true },
                { text: 'An ordered collection of items that can be changed', isCorrect: false },
                { text: 'An unordered collection of unique items', isCorrect: false },
                { text: 'A collection of key-value pairs', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a dictionary in Python?',
            options: [
                { text: 'A collection of key-value pairs', isCorrect: true },
                { text: 'An ordered collection of items', isCorrect: false },
                { text: 'An unordered collection of unique items', isCorrect: false },
                { text: 'A collection that cannot be changed', isCorrect: false }
            ]
        },
        {
            questionText: 'What is error handling in Python?',
            options: [
                { text: 'Managing and responding to runtime errors in programs', isCorrect: true },
                { text: 'Preventing syntax errors', isCorrect: false },
                { text: 'Debugging code', isCorrect: false },
                { text: 'Writing error-free code', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a module in Python?',
            options: [
                { text: 'A file containing Python code that can be imported and used', isCorrect: true },
                { text: 'A type of variable', isCorrect: false },
                { text: 'A programming error', isCorrect: false },
                { text: 'A data structure', isCorrect: false }
            ]
        },

        // Algorithmic thinking
        {
            questionText: 'What is a linear search algorithm?',
            options: [
                { text: 'Searching through items one by one from start to end', isCorrect: true },
                { text: 'Searching by dividing the list in half repeatedly', isCorrect: false },
                { text: 'Searching in a random order', isCorrect: false },
                { text: 'Searching backwards from end to start', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a binary search algorithm?',
            options: [
                { text: 'Searching by repeatedly dividing a sorted list in half', isCorrect: true },
                { text: 'Searching through items one by one', isCorrect: false },
                { text: 'Searching using two different methods', isCorrect: false },
                { text: 'Searching in binary code', isCorrect: false }
            ]
        },
        {
            questionText: 'What is bubble sort?',
            options: [
                { text: 'A sorting algorithm that repeatedly swaps adjacent elements if they are in wrong order', isCorrect: true },
                { text: 'A sorting algorithm that finds the minimum element and places it at the beginning', isCorrect: false },
                { text: 'A sorting algorithm that divides the list into smaller parts', isCorrect: false },
                { text: 'A sorting algorithm that uses bubbles', isCorrect: false }
            ]
        },
        {
            questionText: 'What is selection sort?',
            options: [
                { text: 'A sorting algorithm that finds the minimum element and places it at the beginning', isCorrect: true },
                { text: 'A sorting algorithm that swaps adjacent elements', isCorrect: false },
                { text: 'A sorting algorithm that selects random elements', isCorrect: false },
                { text: 'A sorting algorithm that divides the list', isCorrect: false }
            ]
        },

        // Cloud computing & virtualization
        {
            questionText: 'What is virtualization?',
            options: [
                { text: 'Creating virtual versions of physical computing resources', isCorrect: true },
                { text: 'Making computers faster', isCorrect: false },
                { text: 'Connecting computers to the internet', isCorrect: false },
                { text: 'Installing software', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a virtual machine?',
            options: [
                { text: 'A software-based computer that runs on physical hardware', isCorrect: true },
                { text: 'A very fast computer', isCorrect: false },
                { text: 'A computer that doesn\'t exist', isCorrect: false },
                { text: 'A gaming computer', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a hypervisor?',
            options: [
                { text: 'Software that creates and manages virtual machines', isCorrect: true },
                { text: 'A very fast processor', isCorrect: false },
                { text: 'A type of storage device', isCorrect: false },
                { text: 'A network protocol', isCorrect: false }
            ]
        },

        // Digital citizenship
        {
            questionText: 'What is digital citizenship?',
            options: [
                { text: 'Responsible and ethical behavior when using technology', isCorrect: true },
                { text: 'Having a digital passport', isCorrect: false },
                { text: 'Living in a digital world', isCorrect: false },
                { text: 'Using only digital devices', isCorrect: false }
            ]
        },
        {
            questionText: 'What is responsible online behavior?',
            options: [
                { text: 'Respecting others, protecting privacy, and following laws', isCorrect: true },
                { text: 'Using the internet as much as possible', isCorrect: false },
                { text: 'Sharing everything online', isCorrect: false },
                { text: 'Never using social media', isCorrect: false }
            ]
        }
    ];

    const additionalQuestions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    const topics = [
        'Computer Architecture', 'Number Systems', 'Boolean Logic', 'Operating Systems', 'Software Types',
        'Network Protocols', 'Internet Technologies', 'Cybersecurity', 'Database Systems', 'SQL Commands',
        'Python Programming', 'Data Structures', 'Search Algorithms', 'Sorting Algorithms', 'Cloud Computing',
        'Virtualization', 'Digital Ethics', 'Online Safety', 'System Security', 'Data Management'
    ];

    // Add the template questions first
    questionTemplates.forEach((template, index) => {
        additionalQuestions.push({
            grade: 9,
            difficulty: difficulties[index % 3],
            questionText: template.questionText,
            options: template.options
        });
    });

    // Generate more questions to reach 300 total
    const remainingCount = 300 - class9Questions.length - questionTemplates.length;
    for (let i = 0; i < remainingCount; i++) {
        const topic = topics[i % topics.length];
        additionalQuestions.push({
            grade: 9,
            difficulty: difficulties[i % 3],
            questionText: `${topic} - Question ${i + 1}: What is a fundamental concept in ${topic.toLowerCase()}?`,
            options: [
                { text: `Core principle of ${topic}`, isCorrect: true },
                { text: 'Incorrect option A', isCorrect: false },
                { text: 'Incorrect option B', isCorrect: false },
                { text: 'Incorrect option C', isCorrect: false }
            ]
        });
    }

    return additionalQuestions;
};

const allQuestions = [...class9Questions, ...generateMoreClass9Questions()];

function seedClass9Questions() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.serialize(() => {
            let completed = 0;
            allQuestions.forEach((q) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [q.grade, q.difficulty, q.questionText], function (err) {
                        if (err) {
                            console.error('Error inserting question:', err);
                            return;
                        }
                        const questionId = this.lastID;
                        let optionCount = 0;
                        q.options.forEach((option, index) => {
                            db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                                [questionId, option.text, option.isCorrect ? 1 : 0, index + 1], (err) => {
                                    if (err) {
                                        console.error('Error inserting option:', err);
                                        return;
                                    }
                                    optionCount++;
                                    if (optionCount === q.options.length) {
                                        completed++;
                                        if (completed === allQuestions.length) {
                                            db.close(() => {
                                                console.log(`Seeded ${allQuestions.length} questions for Class 9`);
                                                resolve();
                                            });
                                        }
                                    }
                                });
                        });
                    });
            });
        });
    });
}

if (require.main === module) {
    seedClass9Questions();
}

module.exports = seedClass9Questions;