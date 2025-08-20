const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const bulkMCQs = {
  6: [
    // Computer Fundamentals (30 questions)
    { difficulty: 'basic', question_text: 'What is the brain of a computer?', options: [{ text: 'CPU', is_correct: true }, { text: 'RAM', is_correct: false }, { text: 'Hard Disk', is_correct: false }, { text: 'Monitor', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which device is used to type text?', options: [{ text: 'Keyboard', is_correct: true }, { text: 'Mouse', is_correct: false }, { text: 'Monitor', is_correct: false }, { text: 'Speaker', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What does RAM stand for?', options: [{ text: 'Random Access Memory', is_correct: true }, { text: 'Read Access Memory', is_correct: false }, { text: 'Rapid Access Memory', is_correct: false }, { text: 'Remote Access Memory', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which is an output device?', options: [{ text: 'Printer', is_correct: true }, { text: 'Keyboard', is_correct: false }, { text: 'Mouse', is_correct: false }, { text: 'Scanner', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What happens to RAM data when computer is turned off?', options: [{ text: 'Data is lost', is_correct: true }, { text: 'Data is saved', is_correct: false }, { text: 'Data moves to hard disk', is_correct: false }, { text: 'Nothing happens', is_correct: false }] },
    { difficulty: 'medium', question_text: 'Which storage device is fastest?', options: [{ text: 'SSD', is_correct: true }, { text: 'Hard Disk', is_correct: false }, { text: 'CD-ROM', is_correct: false }, { text: 'Floppy Disk', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is software?', options: [{ text: 'Programs and instructions', is_correct: true }, { text: 'Physical parts of computer', is_correct: false }, { text: 'Computer screen', is_correct: false }, { text: 'Computer case', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is hardware?', options: [{ text: 'Physical parts of computer', is_correct: true }, { text: 'Computer programs', is_correct: false }, { text: 'Internet connection', is_correct: false }, { text: 'Computer games', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which is a storage device?', options: [{ text: 'USB Drive', is_correct: true }, { text: 'Monitor', is_correct: false }, { text: 'Keyboard', is_correct: false }, { text: 'Speaker', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is an algorithm?', options: [{ text: 'Step-by-step instructions', is_correct: true }, { text: 'Computer hardware', is_correct: false }, { text: 'Software program', is_correct: false }, { text: 'Internet protocol', is_correct: false }] },
    
    // Input/Output Devices (25 questions)
    { difficulty: 'basic', question_text: 'Which device shows computer output?', options: [{ text: 'Monitor', is_correct: true }, { text: 'Keyboard', is_correct: false }, { text: 'Mouse', is_correct: false }, { text: 'Microphone', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What type of device is a mouse?', options: [{ text: 'Input device', is_correct: true }, { text: 'Output device', is_correct: false }, { text: 'Storage device', is_correct: false }, { text: 'Processing device', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which device produces sound output?', options: [{ text: 'Speaker', is_correct: true }, { text: 'Microphone', is_correct: false }, { text: 'Keyboard', is_correct: false }, { text: 'Mouse', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is used to input sound?', options: [{ text: 'Microphone', is_correct: true }, { text: 'Speaker', is_correct: false }, { text: 'Monitor', is_correct: false }, { text: 'Printer', is_correct: false }] },
    { difficulty: 'medium', question_text: 'Which device can be both input and output?', options: [{ text: 'Touchscreen', is_correct: true }, { text: 'Keyboard', is_correct: false }, { text: 'Monitor', is_correct: false }, { text: 'Printer', is_correct: false }] },
    
    // Algorithms (20 questions)
    { difficulty: 'basic', question_text: 'What is the first step to make tea?', options: [{ text: 'Boil water', is_correct: true }, { text: 'Add sugar', is_correct: false }, { text: 'Drink tea', is_correct: false }, { text: 'Wash cup', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Why is order important in algorithms?', options: [{ text: 'Wrong order gives wrong results', is_correct: true }, { text: 'Order does not matter', is_correct: false }, { text: 'Any order works', is_correct: false }, { text: 'Order is for decoration', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What makes a good algorithm?', options: [{ text: 'Clear and step-by-step', is_correct: true }, { text: 'Confusing steps', is_correct: false }, { text: 'No specific order', is_correct: false }, { text: 'Very long steps', is_correct: false }] },
    
    // Scratch Programming (15 questions)
    { difficulty: 'basic', question_text: 'What is Scratch?', options: [{ text: 'Visual programming language', is_correct: true }, { text: 'Text editor', is_correct: false }, { text: 'Web browser', is_correct: false }, { text: 'Operating system', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What are sprites in Scratch?', options: [{ text: 'Characters or objects', is_correct: true }, { text: 'Programming blocks', is_correct: false }, { text: 'Sound effects', is_correct: false }, { text: 'Background images', is_correct: false }] },
    { difficulty: 'basic', question_text: 'How do you make a sprite move in Scratch?', options: [{ text: 'Use motion blocks', is_correct: true }, { text: 'Use sound blocks', is_correct: false }, { text: 'Use pen blocks', is_correct: false }, { text: 'Use data blocks', is_correct: false }] },
    
    // MS Office (10 questions)
    { difficulty: 'basic', question_text: 'What is MS Word used for?', options: [{ text: 'Creating documents', is_correct: true }, { text: 'Playing games', is_correct: false }, { text: 'Browsing internet', is_correct: false }, { text: 'Editing photos', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which key saves a document in MS Word?', options: [{ text: 'Ctrl+S', is_correct: true }, { text: 'Ctrl+P', is_correct: false }, { text: 'Ctrl+C', is_correct: false }, { text: 'Ctrl+V', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What tool draws free lines in MS Paint?', options: [{ text: 'Pencil', is_correct: true }, { text: 'Rectangle', is_correct: false }, { text: 'Text', is_correct: false }, { text: 'Eraser', is_correct: false }] }
  ],

  7: [
    // Algorithms and Flowcharts (25 questions)
    { difficulty: 'basic', question_text: 'What shape starts a flowchart?', options: [{ text: 'Oval', is_correct: true }, { text: 'Rectangle', is_correct: false }, { text: 'Diamond', is_correct: false }, { text: 'Circle', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What shape shows a process in flowchart?', options: [{ text: 'Rectangle', is_correct: true }, { text: 'Diamond', is_correct: false }, { text: 'Oval', is_correct: false }, { text: 'Triangle', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What shape shows decision in flowchart?', options: [{ text: 'Diamond', is_correct: true }, { text: 'Rectangle', is_correct: false }, { text: 'Oval', is_correct: false }, { text: 'Circle', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is pseudocode?', options: [{ text: 'Algorithm in simple English', is_correct: true }, { text: 'Programming language', is_correct: false }, { text: 'Computer hardware', is_correct: false }, { text: 'Software application', is_correct: false }] },
    
    // Python Basics (30 questions)
    { difficulty: 'basic', question_text: 'Which function displays output in Python?', options: [{ text: 'print()', is_correct: true }, { text: 'display()', is_correct: false }, { text: 'show()', is_correct: false }, { text: 'output()', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which function gets user input in Python?', options: [{ text: 'input()', is_correct: true }, { text: 'get()', is_correct: false }, { text: 'read()', is_correct: false }, { text: 'scan()', is_correct: false }] },
    { difficulty: 'basic', question_text: 'How do you write comments in Python?', options: [{ text: 'Use # symbol', is_correct: true }, { text: 'Use // symbol', is_correct: false }, { text: 'Use /* */ symbols', is_correct: false }, { text: 'Use -- symbol', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is a variable in Python?', options: [{ text: 'Container to store data', is_correct: true }, { text: 'Type of loop', is_correct: false }, { text: 'Function name', is_correct: false }, { text: 'Error message', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which data type stores whole numbers?', options: [{ text: 'int', is_correct: true }, { text: 'float', is_correct: false }, { text: 'string', is_correct: false }, { text: 'boolean', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which data type stores text?', options: [{ text: 'string', is_correct: true }, { text: 'int', is_correct: false }, { text: 'float', is_correct: false }, { text: 'boolean', is_correct: false }] },
    
    // HTML Basics (20 questions)
    { difficulty: 'basic', question_text: 'What does HTML stand for?', options: [{ text: 'HyperText Markup Language', is_correct: true }, { text: 'High Tech Modern Language', is_correct: false }, { text: 'Home Tool Markup Language', is_correct: false }, { text: 'Hyperlink Text Markup Language', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which tag creates a heading?', options: [{ text: '<h1>', is_correct: true }, { text: '<head>', is_correct: false }, { text: '<header>', is_correct: false }, { text: '<title>', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which tag creates a paragraph?', options: [{ text: '<p>', is_correct: true }, { text: '<para>', is_correct: false }, { text: '<paragraph>', is_correct: false }, { text: '<text>', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which tag creates a line break?', options: [{ text: '<br>', is_correct: true }, { text: '<break>', is_correct: false }, { text: '<lb>', is_correct: false }, { text: '<newline>', is_correct: false }] },
    
    // Digital Safety (15 questions)
    { difficulty: 'basic', question_text: 'Should you share passwords with friends?', options: [{ text: 'No, never share passwords', is_correct: true }, { text: 'Yes, with close friends', is_correct: false }, { text: 'Only with family', is_correct: false }, { text: 'Only if they ask nicely', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What makes a strong password?', options: [{ text: 'Mix of letters, numbers, symbols', is_correct: true }, { text: 'Your name and birthday', is_correct: false }, { text: 'Simple words like "password"', is_correct: false }, { text: 'Same password everywhere', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is cyberbullying?', options: [{ text: 'Using technology to harass others', is_correct: true }, { text: 'Computer virus', is_correct: false }, { text: 'Programming technique', is_correct: false }, { text: 'Hardware problem', is_correct: false }] },
    
    // MS Office Advanced (10 questions)
    { difficulty: 'medium', question_text: 'What symbol starts a formula in Excel?', options: [{ text: '=', is_correct: true }, { text: '+', is_correct: false }, { text: '@', is_correct: false }, { text: '#', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What does SUM function do in Excel?', options: [{ text: 'Adds numbers in cells', is_correct: true }, { text: 'Multiplies numbers', is_correct: false }, { text: 'Finds average', is_correct: false }, { text: 'Counts cells', is_correct: false }] }
  ],

  8: [
    // Advanced Python (30 questions)
    { difficulty: 'medium', question_text: 'What is the correct for loop syntax?', options: [{ text: 'for i in range(5):', is_correct: true }, { text: 'for (i=0; i<5; i++)', is_correct: false }, { text: 'for i = 1 to 5', is_correct: false }, { text: 'loop i from 1 to 5', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What does range(3) return?', options: [{ text: '0, 1, 2', is_correct: true }, { text: '1, 2, 3', is_correct: false }, { text: '0, 1, 2, 3', is_correct: false }, { text: 'Just 3', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What keyword defines a function?', options: [{ text: 'def', is_correct: true }, { text: 'function', is_correct: false }, { text: 'define', is_correct: false }, { text: 'func', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What is a while loop used for?', options: [{ text: 'Repeat code while condition is true', is_correct: true }, { text: 'Run code once', is_correct: false }, { text: 'Define functions', is_correct: false }, { text: 'Import modules', is_correct: false }] },
    { difficulty: 'medium', question_text: 'How do you create an empty list?', options: [{ text: 'my_list = []', is_correct: true }, { text: 'my_list = ()', is_correct: false }, { text: 'my_list = {}', is_correct: false }, { text: 'my_list = new list()', is_correct: false }] },
    
    // Data Structures (20 questions)
    { difficulty: 'medium', question_text: 'What is a list in Python?', options: [{ text: 'Ordered collection of items', is_correct: true }, { text: 'Single value', is_correct: false }, { text: 'Type of loop', is_correct: false }, { text: 'Function definition', is_correct: false }] },
    { difficulty: 'medium', question_text: 'How do you access first item in list?', options: [{ text: 'list[0]', is_correct: true }, { text: 'list[1]', is_correct: false }, { text: 'list.first()', is_correct: false }, { text: 'first(list)', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is a dictionary in Python?', options: [{ text: 'Collection of key-value pairs', is_correct: true }, { text: 'List of words', is_correct: false }, { text: 'Type of loop', is_correct: false }, { text: 'Function type', is_correct: false }] },
    
    // CSS Basics (20 questions)
    { difficulty: 'basic', question_text: 'What does CSS stand for?', options: [{ text: 'Cascading Style Sheets', is_correct: true }, { text: 'Computer Style Sheets', is_correct: false }, { text: 'Creative Style Sheets', is_correct: false }, { text: 'Colorful Style Sheets', is_correct: false }] },
    { difficulty: 'medium', question_text: 'How do you select element with id "header"?', options: [{ text: '#header', is_correct: true }, { text: '.header', is_correct: false }, { text: 'header', is_correct: false }, { text: '@header', is_correct: false }] },
    { difficulty: 'basic', question_text: 'Which property changes text color?', options: [{ text: 'color', is_correct: true }, { text: 'text-color', is_correct: false }, { text: 'font-color', is_correct: false }, { text: 'background-color', is_correct: false }] },
    
    // Networking (15 questions)
    { difficulty: 'basic', question_text: 'What does LAN stand for?', options: [{ text: 'Local Area Network', is_correct: true }, { text: 'Large Area Network', is_correct: false }, { text: 'Long Area Network', is_correct: false }, { text: 'Limited Area Network', is_correct: false }] },
    { difficulty: 'basic', question_text: 'What does WAN stand for?', options: [{ text: 'Wide Area Network', is_correct: true }, { text: 'Wireless Area Network', is_correct: false }, { text: 'World Area Network', is_correct: false }, { text: 'Web Area Network', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is a protocol in networking?', options: [{ text: 'Set of rules for communication', is_correct: true }, { text: 'Type of cable', is_correct: false }, { text: 'Network device', is_correct: false }, { text: 'Software program', is_correct: false }] },
    
    // MS Excel (15 questions)
    { difficulty: 'medium', question_text: 'What does AVERAGE function calculate?', options: [{ text: 'Mean of selected numbers', is_correct: true }, { text: 'Sum of numbers', is_correct: false }, { text: 'Largest number', is_correct: false }, { text: 'Count of cells', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What does COUNTIF function do?', options: [{ text: 'Counts cells meeting condition', is_correct: true }, { text: 'Counts all cells', is_correct: false }, { text: 'Counts empty cells', is_correct: false }, { text: 'Counts formulas', is_correct: false }] }
  ],

  9: [
    // Object-Oriented Programming (25 questions)
    { difficulty: 'medium', question_text: 'What is a class in programming?', options: [{ text: 'Blueprint for creating objects', is_correct: true }, { text: 'Type of variable', is_correct: false }, { text: 'Loop structure', is_correct: false }, { text: 'Error message', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is an object in OOP?', options: [{ text: 'Instance of a class', is_correct: true }, { text: 'Function definition', is_correct: false }, { text: 'Variable type', is_correct: false }, { text: 'Loop iteration', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is inheritance in OOP?', options: [{ text: 'Class inherits properties from another class', is_correct: true }, { text: 'Objects inherit from functions', is_correct: false }, { text: 'Variables inherit from loops', is_correct: false }, { text: 'Functions inherit from classes', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is encapsulation?', options: [{ text: 'Hiding internal details of class', is_correct: true }, { text: 'Creating multiple objects', is_correct: false }, { text: 'Inheriting from parent', is_correct: false }, { text: 'Overriding methods', is_correct: false }] },
    
    // Web Development (25 questions)
    { difficulty: 'medium', question_text: 'What is HTML5?', options: [{ text: 'Latest version of HTML', is_correct: true }, { text: 'Programming language', is_correct: false }, { text: 'Database system', is_correct: false }, { text: 'Operating system', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is <nav> element for?', options: [{ text: 'Navigation links', is_correct: true }, { text: 'Page content', is_correct: false }, { text: 'Styling', is_correct: false }, { text: 'Scripts', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is CSS Flexbox?', options: [{ text: 'Layout method for flexible designs', is_correct: true }, { text: 'Animation technique', is_correct: false }, { text: 'Color system', is_correct: false }, { text: 'Font family', is_correct: false }] },
    
    // JavaScript (20 questions)
    { difficulty: 'basic', question_text: 'What is JavaScript?', options: [{ text: 'Programming language for web', is_correct: true }, { text: 'Markup language', is_correct: false }, { text: 'Styling language', is_correct: false }, { text: 'Database language', is_correct: false }] },
    { difficulty: 'medium', question_text: 'How do you declare variable in JavaScript?', options: [{ text: 'var myVar = 5;', is_correct: true }, { text: 'variable myVar = 5;', is_correct: false }, { text: 'int myVar = 5;', is_correct: false }, { text: 'declare myVar = 5;', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What does DOM stand for?', options: [{ text: 'Document Object Model', is_correct: true }, { text: 'Data Object Model', is_correct: false }, { text: 'Dynamic Object Model', is_correct: false }, { text: 'Display Object Model', is_correct: false }] },
    
    // Data Representation (15 questions)
    { difficulty: 'medium', question_text: 'What is binary number system?', options: [{ text: 'Base-2 number system', is_correct: true }, { text: 'Base-10 number system', is_correct: false }, { text: 'Base-16 number system', is_correct: false }, { text: 'Base-8 number system', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is decimal 5 in binary?', options: [{ text: '101', is_correct: true }, { text: '110', is_correct: false }, { text: '111', is_correct: false }, { text: '100', is_correct: false }] },
    
    // Cybersecurity (15 questions)
    { difficulty: 'basic', question_text: 'What is a firewall?', options: [{ text: 'Security system monitoring network', is_correct: true }, { text: 'Type of virus', is_correct: false }, { text: 'Programming language', is_correct: false }, { text: 'Hardware component', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What is two-factor authentication?', options: [{ text: 'Two methods to verify identity', is_correct: true }, { text: 'Two passwords', is_correct: false }, { text: 'Logging in twice', is_correct: false }, { text: 'Two computers', is_correct: false }] }
  ],

  11: [
    // Database Systems (30 questions)
    { difficulty: 'medium', question_text: 'What does SQL stand for?', options: [{ text: 'Structured Query Language', is_correct: true }, { text: 'Simple Query Language', is_correct: false }, { text: 'Standard Query Language', is_correct: false }, { text: 'System Query Language', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is a primary key?', options: [{ text: 'Unique identifier for each record', is_correct: true }, { text: 'First column in table', is_correct: false }, { text: 'Most important data', is_correct: false }, { text: 'Database password', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is normalization?', options: [{ text: 'Organizing data to reduce redundancy', is_correct: true }, { text: 'Adding more data', is_correct: false }, { text: 'Deleting data', is_correct: false }, { text: 'Backing up database', is_correct: false }] },
    { difficulty: 'medium', question_text: 'What does SELECT statement do?', options: [{ text: 'Retrieves data from tables', is_correct: true }, { text: 'Deletes data', is_correct: false }, { text: 'Creates tables', is_correct: false }, { text: 'Updates data', is_correct: false }] },
    
    // Data Structures (25 questions)
    { difficulty: 'advanced', question_text: 'What is a stack?', options: [{ text: 'Last-In-First-Out structure', is_correct: true }, { text: 'First-In-First-Out structure', is_correct: false }, { text: 'Random access structure', is_correct: false }, { text: 'Sorted structure', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is a queue?', options: [{ text: 'First-In-First-Out structure', is_correct: true }, { text: 'Last-In-First-Out structure', is_correct: false }, { text: 'Random access structure', is_correct: false }, { text: 'Sorted structure', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is time complexity of binary search?', options: [{ text: 'O(log n)', is_correct: true }, { text: 'O(n)', is_correct: false }, { text: 'O(n²)', is_correct: false }, { text: 'O(1)', is_correct: false }] },
    
    // Algorithm Analysis (20 questions)
    { difficulty: 'advanced', question_text: 'What does Big-O notation represent?', options: [{ text: 'Upper bound of algorithm complexity', is_correct: true }, { text: 'Exact running time', is_correct: false }, { text: 'Lower bound complexity', is_correct: false }, { text: 'Average case complexity', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is time complexity of linear search?', options: [{ text: 'O(n)', is_correct: true }, { text: 'O(log n)', is_correct: false }, { text: 'O(n²)', is_correct: false }, { text: 'O(1)', is_correct: false }] },
    
    // Web Frameworks (15 questions)
    { difficulty: 'advanced', question_text: 'What is MVC architecture?', options: [{ text: 'Model-View-Controller pattern', is_correct: true }, { text: 'Multiple-Variable-Control', is_correct: false }, { text: 'Master-View-Component', is_correct: false }, { text: 'Modern-Visual-Computing', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is Django?', options: [{ text: 'Python web framework', is_correct: true }, { text: 'JavaScript library', is_correct: false }, { text: 'Database system', is_correct: false }, { text: 'Programming language', is_correct: false }] },
    
    // Advanced MS Office (10 questions)
    { difficulty: 'advanced', question_text: 'What is a pivot table?', options: [{ text: 'Tool for summarizing data', is_correct: true }, { text: 'Type of chart', is_correct: false }, { text: 'Formula function', is_correct: false }, { text: 'Data validation tool', is_correct: false }] },
    { difficulty: 'advanced', question_text: 'What is a macro in Excel?', options: [{ text: 'Recorded sequence of commands', is_correct: true }, { text: 'Large spreadsheet', is_correct: false }, { text: 'Type of chart', is_correct: false }, { text: 'Formula function', is_correct: false }] }
  ]
};

async function addBulkMCQs() {
  const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
  
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
      console.log('🚀 Adding bulk MCQs...');
      
      let totalAdded = 0;
      let processed = 0;
      const totalQuestions = Object.values(bulkMCQs).reduce((sum, q) => sum + q.length, 0);

      Object.keys(bulkMCQs).forEach(grade => {
        const questions = bulkMCQs[grade];
        
        questions.forEach((q) => {
          db.get('SELECT id FROM questions WHERE grade = ? AND question_text = ?', 
            [parseInt(grade), q.question_text], (err, row) => {
            if (!row) {
              db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [parseInt(grade), q.difficulty, q.question_text], function(err) {
                if (!err) {
                  totalAdded++;
                  const questionId = this.lastID;
                  q.options.forEach((opt, idx) => {
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                      [questionId, opt.text, opt.is_correct ? 1 : 0, idx + 1]);
                  });
                }
              });
            }
            processed++;
            if (processed === totalQuestions) {
              setTimeout(() => {
                db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade', (err, rows) => {
                  console.log(`✅ Added ${totalAdded} new questions`);
                  rows.forEach(row => console.log(`Grade ${row.grade}: ${row.count} total questions`));
                  db.close();
                  resolve({ totalAdded, gradeBreakdown: rows });
                });
              }, 1000);
            }
          });
        });
      });
    });
  });
}

if (require.main === module) {
  addBulkMCQs().then(() => process.exit(0)).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

module.exports = { addBulkMCQs };