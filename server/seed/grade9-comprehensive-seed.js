#!/usr/bin/env node

/**
 * Grade 9 Comprehensive Seeding - 300+ Questions
 * Topics: Programming, logic, and data representation
 * Focus: Conceptual Depth
 */

const database = require('../config/database');

const grade9Questions = {
    basic: [
        // Computer Architecture (ALU, CU) - 15 questions
        { q: "What does ALU stand for?", opts: ["Arithmetic Logic Unit", "Advanced Logic Unit", "Automatic Logic Unit", "Applied Logic Unit"], correct: 0 },
        { q: "What does CU stand for?", opts: ["Computer Unit", "Control Unit", "Central Unit", "Command Unit"], correct: 1 },
        { q: "What is the main function of ALU?", opts: ["Control operations", "Perform calculations", "Store data", "Input data"], correct: 1 },
        { q: "What is the main function of Control Unit?", opts: ["Perform calculations", "Control and coordinate operations", "Store data", "Display data"], correct: 1 },
        { q: "Which component executes arithmetic operations?", opts: ["Control Unit", "ALU", "Memory", "Input Unit"], correct: 1 },
        { q: "Which component manages instruction execution?", opts: ["ALU", "Control Unit", "Memory", "Output Unit"], correct: 1 },
        { q: "What operations does ALU perform?", opts: ["Only arithmetic", "Only logical", "Both arithmetic and logical", "Only storage"], correct: 2 },
        { q: "Which unit decodes instructions?", opts: ["ALU", "Control Unit", "Memory Unit", "Input Unit"], correct: 1 },
        { q: "What is the relationship between ALU and CU?", opts: ["Independent", "CU controls ALU", "ALU controls CU", "No relationship"], correct: 1 },
        { q: "Which component is part of CPU?", opts: ["Only ALU", "Only CU", "Both ALU and CU", "Neither"], correct: 2 },
        { q: "What does ALU use for operations?", opts: ["Memory only", "Registers", "Hard disk", "Input devices"], correct: 1 },
        { q: "Which unit manages data flow?", opts: ["ALU", "Control Unit", "Memory", "Storage"], correct: 1 },
        { q: "What type of operations are logical operations?", opts: ["Addition, subtraction", "AND, OR, NOT", "Multiplication, division", "Input, output"], correct: 1 },
        { q: "Which component determines next instruction?", opts: ["ALU", "Control Unit", "Memory", "Register"], correct: 1 },
        { q: "What is the CPU composed of?", opts: ["Only ALU", "ALU and CU", "Only memory", "Only registers"], correct: 1 },

        // Number Systems (Binary, Hex) - 15 questions
        { q: "What is binary number system?", opts: ["Base 10", "Base 2", "Base 8", "Base 16"], correct: 1 },
        { q: "What is hexadecimal number system?", opts: ["Base 2", "Base 8", "Base 10", "Base 16"], correct: 3 },
        { q: "Which digits are used in binary?", opts: ["0-9", "0,1", "0-7", "0-15"], correct: 1 },
        { q: "Which symbols are used in hexadecimal?", opts: ["0-9", "0-9, A-F", "0-7", "0,1"], correct: 1 },
        { q: "What is decimal 10 in binary?", opts: ["1010", "1100", "1001", "1111"], correct: 0 },
        { q: "What is decimal 15 in hexadecimal?", opts: ["E", "F", "10", "A"], correct: 1 },
        { q: "What is binary 1111 in decimal?", opts: ["14", "15", "16", "17"], correct: 1 },
        { q: "What is hexadecimal A in decimal?", opts: ["9", "10", "11", "12"], correct: 1 },
        { q: "How many bits represent one hexadecimal digit?", opts: ["2", "3", "4", "8"], correct: 2 },
        { q: "What is the largest single digit in hexadecimal?", opts: ["9", "A", "E", "F"], correct: 3 },
        { q: "What is binary 101 in decimal?", opts: ["4", "5", "6", "7"], correct: 1 },
        { q: "What is decimal 8 in binary?", opts: ["1000", "1001", "1010", "1100"], correct: 0 },
        { q: "What is hexadecimal 1F in decimal?", opts: ["30", "31", "32", "33"], correct: 1 },
        { q: "Which number system do computers use internally?", opts: ["Decimal", "Binary", "Hexadecimal", "Octal"], correct: 1 },
        { q: "What is the advantage of hexadecimal?", opts: ["Easier for humans", "Compact representation", "Used in programming", "All of the above"], correct: 3 },

        // Boolean Logic & Gates - 15 questions
        { q: "What is Boolean logic?", opts: ["Complex mathematics", "True/False logic", "Number system", "Programming language"], correct: 1 },
        { q: "What are the basic Boolean values?", opts: ["0 and 1", "True and False", "Yes and No", "All of the above"], correct: 3 },
        { q: "What does AND gate do?", opts: ["Always true", "True if all inputs true", "True if any input true", "Always false"], correct: 1 },
        { q: "What does OR gate do?", opts: ["True if all inputs true", "True if any input true", "Always false", "Always true"], correct: 1 },
        { q: "What does NOT gate do?", opts: ["Same as input", "Opposite of input", "Always true", "Always false"], correct: 1 },
        { q: "What is the output of AND gate with inputs 1,1?", opts: ["0", "1", "True", "Both 1 and True"], correct: 3 },
        { q: "What is the output of OR gate with inputs 0,1?", opts: ["0", "1", "True", "Both 1 and True"], correct: 3 },
        { q: "What is the output of NOT gate with input 1?", opts: ["1", "0", "False", "Both 0 and False"], correct: 3 },
        { q: "Which gate is called inverter?", opts: ["AND", "OR", "NOT", "XOR"], correct: 2 },
        { q: "What does XOR gate do?", opts: ["Same as OR", "True if inputs different", "Same as AND", "Always false"], correct: 1 },
        { q: "What is truth table?", opts: ["Programming table", "Input-output combinations", "Data table", "Memory table"], correct: 1 },
        { q: "How many inputs can AND gate have?", opts: ["Only 2", "2 or more", "Only 1", "Unlimited"], correct: 1 },
        { q: "What is Boolean algebra?", opts: ["Normal algebra", "Logic operations algebra", "Number algebra", "Computer algebra"], correct: 1 },
        { q: "Which mathematician developed Boolean logic?", opts: ["Newton", "George Boole", "Einstein", "Turing"], correct: 1 },
        { q: "Where are Boolean gates used?", opts: ["Only computers", "Digital circuits", "Only calculators", "Only phones"], correct: 1 },

        // Operating Systems - 15 questions
        { q: "What is an operating system?", opts: ["Application software", "System software", "Hardware", "Programming language"], correct: 1 },
        { q: "What is the main function of OS?", opts: ["Run games", "Manage computer resources", "Browse internet", "Edit documents"], correct: 1 },
        { q: "Which is a popular desktop OS?", opts: ["Android", "Windows", "iOS", "Chrome"], correct: 1 },
        { q: "Which is a mobile OS?", opts: ["Windows 10", "Linux", "Android", "macOS"], correct: 2 },
        { q: "What is multitasking?", opts: ["Single task", "Multiple tasks simultaneously", "No tasks", "Sequential tasks"], correct: 1 },
        { q: "What is virtual memory?", opts: ["Physical memory", "Simulated memory using disk", "Cache memory", "Register memory"], correct: 1 },
        { q: "What is file system?", opts: ["Hardware system", "Data organization method", "Network system", "Security system"], correct: 1 },
        { q: "What is device driver?", opts: ["Hardware", "Software for hardware communication", "Application", "Operating system"], correct: 1 },
        { q: "What is user interface?", opts: ["Hardware interface", "User interaction method", "Network interface", "Storage interface"], correct: 1 },
        { q: "What is process in OS?", opts: ["Hardware component", "Running program", "Storage method", "Network connection"], correct: 1 },
        { q: "What is scheduling in OS?", opts: ["Time management", "Task management", "Memory management", "All of the above"], correct: 3 },
        { q: "What is kernel?", opts: ["Application program", "Core of operating system", "User interface", "Hardware component"], correct: 1 },
        { q: "What is system call?", opts: ["Phone call", "Request to OS services", "Error message", "User command"], correct: 1 },
        { q: "What is interrupt?", opts: ["Continuous operation", "Signal to CPU", "Memory operation", "Storage operation"], correct: 1 },
        { q: "What is deadlock?", opts: ["System speed", "Resource conflict", "Memory error", "Network error"], correct: 1 },

        // Software Classification - 15 questions
        { q: "What is system software?", opts: ["User applications", "OS and utilities", "Games", "Web browsers"], correct: 1 },
        { q: "What is application software?", opts: ["Operating system", "User programs", "Device drivers", "System utilities"], correct: 1 },
        { q: "Which is system software?", opts: ["MS Word", "Windows", "Games", "Web browser"], correct: 1 },
        { q: "Which is application software?", opts: ["Device driver", "MS Excel", "Operating system", "BIOS"], correct: 1 },
        { q: "What is utility software?", opts: ["Games", "System maintenance tools", "Word processors", "Web browsers"], correct: 1 },
        { q: "What is programming software?", opts: ["Games", "Development tools", "Office applications", "Media players"], correct: 1 },
        { q: "Which is a compiler?", opts: ["MS Word", "Visual Studio", "Chrome", "Photoshop"], correct: 1 },
        { q: "What is firmware?", opts: ["Application software", "Software in hardware", "System software", "User software"], correct: 1 },
        { q: "What is open source software?", opts: ["Expensive software", "Free modifiable software", "Closed software", "Commercial software"], correct: 1 },
        { q: "What is proprietary software?", opts: ["Free software", "Company-owned software", "Open source", "Public domain"], correct: 1 },
        { q: "What is freeware?", opts: ["Open source", "Free but closed source", "Expensive software", "System software"], correct: 1 },
        { q: "What is shareware?", opts: ["Free software", "Trial software", "Open source", "System software"], correct: 1 },
        { q: "What is malware?", opts: ["Good software", "Harmful software", "System software", "Free software"], correct: 1 },
        { q: "What is antivirus software?", opts: ["Creates viruses", "Protects against viruses", "System software", "Programming tool"], correct: 1 },
        { q: "What is middleware?", opts: ["Hardware", "Software between applications and OS", "User interface", "Database"], correct: 1 }
    ],

    medium: [],
    advanced: []
};// Continue with more basic questions
grade9Questions.basic.push(
    // Networking Fundamentals (TCP/IP, DNS) - 15 questions
    { q: "What does TCP/IP stand for?", opts: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Control Protocol", "Terminal Control Protocol"], correct: 1 },
    { q: "What does DNS stand for?", opts: ["Domain Name System", "Data Network Service", "Digital Name Service", "Domain Network System"], correct: 0 },
    { q: "What is the purpose of DNS?", opts: ["Store files", "Translate domain names to IP addresses", "Send emails", "Browse web"], correct: 1 },
    { q: "What is an IP address?", opts: ["Internet Password", "Internet Protocol address", "Internet Program", "Internet Provider"], correct: 1 },
    { q: "What is TCP?", opts: ["Unreliable protocol", "Reliable connection protocol", "Physical protocol", "Application protocol"], correct: 1 },
    { q: "What is UDP?", opts: ["Reliable protocol", "Unreliable fast protocol", "Physical protocol", "Session protocol"], correct: 1 },
    { q: "What is a packet?", opts: ["Physical container", "Data unit", "Network device", "Protocol type"], correct: 1 },
    { q: "What is routing?", opts: ["Local delivery", "Path determination", "Data storage", "User interface"], correct: 1 },
    { q: "What is a router?", opts: ["Storage device", "Network path director", "Input device", "Output device"], correct: 1 },
    { q: "What is a switch?", opts: ["On/off device", "Network connection device", "Storage device", "Input device"], correct: 1 },
    { q: "What is bandwidth?", opts: ["Network width", "Data transfer capacity", "Cable length", "Signal strength"], correct: 1 },
    { q: "What is latency?", opts: ["Network speed", "Network delay", "Network security", "Network protocol"], correct: 1 },
    { q: "What is a firewall?", opts: ["Physical wall", "Network security system", "Storage device", "Input device"], correct: 1 },
    { q: "What is HTTP?", opts: ["Hardware protocol", "Web transfer protocol", "Email protocol", "File protocol"], correct: 1 },
    { q: "What is HTTPS?", opts: ["Faster HTTP", "Secure HTTP", "Simple HTTP", "Heavy HTTP"], correct: 1 },

    // Internet Technologies (HTTP, URL) - 15 questions
    { q: "What does URL stand for?", opts: ["Universal Resource Locator", "Uniform Resource Locator", "United Resource Locator", "Unique Resource Locator"], correct: 1 },
    { q: "What is a web server?", opts: ["Client computer", "Computer hosting websites", "Web browser", "Search engine"], correct: 1 },
    { q: "What is a web browser?", opts: ["Web server", "Client software for web", "Website", "Web page"], correct: 1 },
    { q: "What is HTML?", opts: ["Programming language", "Markup language", "Database language", "Network protocol"], correct: 1 },
    { q: "What is CSS?", opts: ["Programming language", "Styling language", "Database language", "Network protocol"], correct: 1 },
    { q: "What is JavaScript?", opts: ["Markup language", "Programming language", "Styling language", "Database language"], correct: 1 },
    { q: "What is a cookie?", opts: ["Food item", "Small data file", "Large file", "Program file"], correct: 1 },
    { q: "What is caching?", opts: ["Deleting data", "Storing data temporarily", "Sending data", "Receiving data"], correct: 1 },
    { q: "What is a domain name?", opts: ["IP address", "Human-readable web address", "Email address", "File name"], correct: 1 },
    { q: "What is a web page?", opts: ["Web server", "Document on web", "Web browser", "Internet connection"], correct: 1 },
    { q: "What is a website?", opts: ["Single page", "Collection of web pages", "Web browser", "Web server"], correct: 1 },
    { q: "What is hyperlink?", opts: ["Text only", "Clickable connection", "Image only", "Video only"], correct: 1 },
    { q: "What is FTP?", opts: ["File Transfer Protocol", "Fast Transfer Protocol", "Free Transfer Protocol", "Full Transfer Protocol"], correct: 0 },
    { q: "What is email?", opts: ["Electronic mail", "Emergency mail", "Express mail", "External mail"], correct: 0 },
    { q: "What is WWW?", opts: ["World Wide Web", "World Web Window", "Wide World Web", "Web World Wide"], correct: 0 },

    // Cybersecurity - 15 questions
    { q: "What is cybersecurity?", opts: ["Physical security", "Digital security", "Building security", "Car security"], correct: 1 },
    { q: "What is a virus?", opts: ["Good program", "Harmful program", "System program", "User program"], correct: 1 },
    { q: "What is malware?", opts: ["Good software", "Malicious software", "System software", "Free software"], correct: 1 },
    { q: "What is phishing?", opts: ["Catching fish", "Stealing information online", "Playing games", "Sending emails"], correct: 1 },
    { q: "What is encryption?", opts: ["Data deletion", "Data protection", "Data copying", "Data viewing"], correct: 1 },
    { q: "What is a strong password?", opts: ["Simple word", "Complex combination", "Personal info", "Short text"], correct: 1 },
    { q: "What is two-factor authentication?", opts: ["One password", "Extra security step", "No security", "Weak security"], correct: 1 },
    { q: "What is a hacker?", opts: ["Good person", "Person who breaks into systems", "System administrator", "User"], correct: 1 },
    { q: "What is identity theft?", opts: ["Stealing objects", "Stealing personal information", "Stealing money", "Stealing food"], correct: 1 },
    { q: "What is spam?", opts: ["Good emails", "Unwanted emails", "Important emails", "Personal emails"], correct: 1 },
    { q: "What is antivirus?", opts: ["Creates viruses", "Protects against viruses", "Spreads viruses", "Ignores viruses"], correct: 1 },
    { q: "What is backup?", opts: ["Data deletion", "Data copy for safety", "Data modification", "Data viewing"], correct: 1 },
    { q: "What is social engineering?", opts: ["Building bridges", "Manipulating people for information", "Computer programming", "Network setup"], correct: 1 },
    { q: "What is a trojan?", opts: ["Good program", "Disguised harmful program", "System program", "User program"], correct: 1 },
    { q: "What is cyberbullying?", opts: ["Online gaming", "Online harassment", "Online learning", "Online shopping"], correct: 1 },

    // Database Concepts (Tables, SQL) - 15 questions
    { q: "What is a database?", opts: ["Single file", "Organized data collection", "Computer program", "Hardware device"], correct: 1 },
    { q: "What is SQL?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
    { q: "What is a table in database?", opts: ["Furniture", "Data in rows and columns", "Computer hardware", "Software program"], correct: 1 },
    { q: "What is a record?", opts: ["Music file", "Row of data", "Database software", "Computer memory"], correct: 1 },
    { q: "What is a field?", opts: ["Farm area", "Column of data", "Database table", "Computer screen"], correct: 1 },
    { q: "What is a primary key?", opts: ["Main door key", "Unique record identifier", "Database password", "Table name"], correct: 1 },
    { q: "What does SELECT do?", opts: ["Delete data", "Retrieve data", "Insert data", "Update data"], correct: 1 },
    { q: "What does INSERT do?", opts: ["Retrieve data", "Add new data", "Delete data", "Update data"], correct: 1 },
    { q: "What does UPDATE do?", opts: ["Add data", "Modify existing data", "Delete data", "Retrieve data"], correct: 1 },
    { q: "What does DELETE do?", opts: ["Add data", "Remove data", "Modify data", "Retrieve data"], correct: 1 },
    { q: "What is DBMS?", opts: ["Database Management System", "Data Base Memory System", "Digital Base Management System", "Data Binary Management System"], correct: 0 },
    { q: "What is a query?", opts: ["Database answer", "Database question", "Database storage", "Database security"], correct: 1 },
    { q: "What is normalization?", opts: ["Making data abnormal", "Organizing data efficiently", "Deleting data", "Copying data"], correct: 1 },
    { q: "What is a foreign key?", opts: ["International key", "Reference to another table", "Primary key copy", "Database password"], correct: 1 },
    { q: "What is data integrity?", opts: ["Data corruption", "Data accuracy", "Data speed", "Data size"], correct: 1 },

    // Programming Fundamentals (Python) - 15 questions
    { q: "What is Python?", opts: ["Snake", "Programming language", "Web browser", "Operating system"], correct: 1 },
    { q: "What is a variable?", opts: ["Fixed value", "Storage location with name", "Program instruction", "Output device"], correct: 1 },
    { q: "What is a string?", opts: ["Number", "Text data", "Boolean value", "List"], correct: 1 },
    { q: "What is an integer?", opts: ["Text", "Whole number", "Decimal number", "Boolean"], correct: 1 },
    { q: "What is a loop?", opts: ["Single instruction", "Repeated instructions", "Final instruction", "Error instruction"], correct: 1 },
    { q: "What is an if statement?", opts: ["Loop structure", "Decision structure", "Variable declaration", "Function definition"], correct: 1 },
    { q: "What is a function?", opts: ["Variable", "Reusable code block", "Data type", "Loop structure"], correct: 1 },
    { q: "What is a list?", opts: ["Single value", "Collection of values", "Program instruction", "Output device"], correct: 1 },
    { q: "What is debugging?", opts: ["Writing code", "Finding and fixing errors", "Running programs", "Designing interfaces"], correct: 1 },
    { q: "What is syntax?", opts: ["Program meaning", "Language rules", "Program output", "Program input"], correct: 1 },
    { q: "What is an algorithm?", opts: ["Computer hardware", "Step-by-step solution", "Software application", "Storage device"], correct: 1 },
    { q: "What is input?", opts: ["Program output", "Data given to program", "Program code", "Program error"], correct: 1 },
    { q: "What is output?", opts: ["Program input", "Result from program", "Program code", "Program error"], correct: 1 },
    { q: "What is a comment?", opts: ["Executed code", "Explanatory text", "Error message", "Output text"], correct: 1 },
    { q: "What is indentation in Python?", opts: ["Decoration", "Code structure", "Error", "Comment"], correct: 1 },

    // Flowcharts & Algorithms - 15 questions
    { q: "What is a flowchart?", opts: ["Text description", "Visual algorithm representation", "Computer program", "Hardware diagram"], correct: 1 },
    { q: "Which shape represents start/end?", opts: ["Rectangle", "Diamond", "Oval", "Circle"], correct: 2 },
    { q: "Which shape represents process?", opts: ["Oval", "Rectangle", "Diamond", "Circle"], correct: 1 },
    { q: "Which shape represents decision?", opts: ["Rectangle", "Oval", "Diamond", "Square"], correct: 2 },
    { q: "What connects flowchart symbols?", opts: ["Lines", "Arrows", "Dots", "Curves"], correct: 1 },
    { q: "What is pseudocode?", opts: ["Real code", "Algorithm in plain language", "Flowchart symbols", "Computer language"], correct: 1 },
    { q: "What is sequence?", opts: ["Random order", "Step-by-step order", "No order", "Reverse order"], correct: 1 },
    { q: "What is selection?", opts: ["Choosing all", "Making decisions", "No choices", "Random choice"], correct: 1 },
    { q: "What is iteration?", opts: ["Single step", "Repetition", "Final step", "First step"], correct: 1 },
    { q: "What is algorithm efficiency?", opts: ["Algorithm size", "Resource usage measure", "Algorithm complexity", "Algorithm speed only"], correct: 1 },
    { q: "What is trace table?", opts: ["Algorithm design", "Step-by-step execution record", "Flowchart type", "Programming language"], correct: 1 },
    { q: "What is top-down design?", opts: ["Bottom to top", "General to specific", "Random approach", "No approach"], correct: 1 },
    { q: "What is modular design?", opts: ["Single module", "Breaking into modules", "No modules", "Complex modules"], correct: 1 },
    { q: "What is testing?", opts: ["Writing code", "Verifying correctness", "Designing flowchart", "Creating pseudocode"], correct: 1 },
    { q: "What is optimization?", opts: ["Making worse", "Making better/efficient", "Making longer", "Making complex"], correct: 1 },

    // Cloud Computing - 15 questions
    { q: "What is cloud computing?", opts: ["Weather computing", "Internet-based computing", "Local computing", "Mobile computing"], correct: 1 },
    { q: "What is SaaS?", opts: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"], correct: 0 },
    { q: "What is PaaS?", opts: ["Program as a Service", "Platform as a Service", "Protocol as a Service", "Process as a Service"], correct: 1 },
    { q: "What is IaaS?", opts: ["Internet as a Service", "Infrastructure as a Service", "Information as a Service", "Interface as a Service"], correct: 1 },
    { q: "What is public cloud?", opts: ["Private use only", "Available to general public", "Government only", "Company only"], correct: 1 },
    { q: "What is private cloud?", opts: ["Public access", "Restricted to organization", "Free for all", "Government controlled"], correct: 1 },
    { q: "What is hybrid cloud?", opts: ["Only public", "Only private", "Mix of public and private", "No cloud"], correct: 2 },
    { q: "What is scalability?", opts: ["Fixed resources", "Adjustable resources", "No resources", "Limited resources"], correct: 1 },
    { q: "What is virtualization?", opts: ["Physical servers only", "Multiple virtual systems", "No servers", "Single system only"], correct: 1 },
    { q: "What is cloud storage?", opts: ["Local storage", "Online storage", "No storage", "Physical storage"], correct: 1 },
    { q: "What is cloud backup?", opts: ["Local backup", "Online backup", "No backup", "Physical backup"], correct: 1 },
    { q: "What is elasticity?", opts: ["Fixed capacity", "Dynamic adjustment", "No capacity", "Limited capacity"], correct: 1 },
    { q: "What is multi-tenancy?", opts: ["Single user", "Multiple users sharing", "No users", "Limited users"], correct: 1 },
    { q: "What is cloud migration?", opts: ["Staying local", "Moving to cloud", "Avoiding cloud", "Deleting data"], correct: 1 },
    { q: "What is cloud security?", opts: ["No security", "Protection of cloud data", "Local security only", "Physical security"], correct: 1 },

    // Digital Citizenship - 15 questions
    { q: "What is digital citizenship?", opts: ["Government ID", "Responsible technology use", "Computer ownership", "Internet subscription"], correct: 1 },
    { q: "What is digital literacy?", opts: ["Reading books", "Using technology effectively", "Writing letters", "Drawing pictures"], correct: 1 },
    { q: "What is netiquette?", opts: ["Internet rules", "Online etiquette", "Network setup", "Web design"], correct: 1 },
    { q: "What is digital footprint?", opts: ["Physical footprint", "Online activity trace", "Computer size", "Internet speed"], correct: 1 },
    { q: "What is online reputation?", opts: ["Computer brand", "Digital image of person", "Internet speed", "Website design"], correct: 1 },
    { q: "What is cyberbullying?", opts: ["Online gaming", "Online harassment", "Online learning", "Online shopping"], correct: 1 },
    { q: "What is appropriate online behavior?", opts: ["Being rude", "Being respectful", "Sharing personal info", "Bullying others"], correct: 1 },
    { q: "What is digital divide?", opts: ["Computer separation", "Technology access gap", "Internet division", "Software difference"], correct: 1 },
    { q: "What is privacy online?", opts: ["Public information", "Personal information protection", "Shared information", "Open information"], correct: 1 },
    { q: "What is copyright?", opts: ["Right to copy anything", "Legal protection of work", "Computer right", "Internet right"], correct: 1 },
    { q: "What is plagiarism?", opts: ["Original work", "Using others' work without credit", "Proper citation", "Legal copying"], correct: 1 },
    { q: "What is fair use?", opts: ["Unlimited copying", "Limited use for education", "Commercial use", "No restrictions"], correct: 1 },
    { q: "What should you do with personal information?", opts: ["Share freely", "Keep private", "Post everywhere", "Give to strangers"], correct: 1 },
    { q: "What is responsible sharing?", opts: ["Share everything", "Think before sharing", "Never share", "Share randomly"], correct: 1 },
    { q: "What is digital wellness?", opts: ["Computer health", "Healthy technology use", "Internet speed", "Software updates"], correct: 1 }
);// Add medium questions
grade9Questions.medium = [
    // Advanced Programming Concepts - 30 questions
    { q: "What is object-oriented programming?", opts: ["Procedural programming", "Programming with objects", "Functional programming", "Assembly programming"], correct: 1 },
    { q: "What is a class in programming?", opts: ["Object instance", "Object blueprint", "Variable type", "Function type"], correct: 1 },
    { q: "What is an object?", opts: ["Class blueprint", "Class instance", "Variable", "Function"], correct: 1 },
    { q: "What is inheritance?", opts: ["Creating new classes", "Class acquiring properties from another", "Deleting classes", "Modifying classes"], correct: 1 },
    { q: "What is encapsulation?", opts: ["Data exposure", "Data hiding", "Data deletion", "Data copying"], correct: 1 },
    { q: "What is polymorphism?", opts: ["Single form", "Multiple forms", "No form", "Fixed form"], correct: 1 },
    { q: "What is abstraction?", opts: ["Showing all details", "Hiding implementation details", "Adding details", "Removing details"], correct: 1 },
    { q: "What is method overloading?", opts: ["Single method", "Multiple methods same name", "Method deletion", "Method copying"], correct: 1 },
    { q: "What is method overriding?", opts: ["Creating new method", "Redefining inherited method", "Deleting method", "Copying method"], correct: 1 },
    { q: "What is constructor?", opts: ["Object destructor", "Object initializer", "Object modifier", "Object copier"], correct: 1 },
    { q: "What is destructor?", opts: ["Object creator", "Object cleaner", "Object modifier", "Object copier"], correct: 1 },
    { q: "What is static method?", opts: ["Instance method", "Class method", "Object method", "Dynamic method"], correct: 1 },
    { q: "What is instance variable?", opts: ["Class variable", "Object variable", "Static variable", "Global variable"], correct: 1 },
    { q: "What is access modifier?", opts: ["Data type", "Visibility controller", "Method type", "Variable type"], correct: 1 },
    { q: "What is private access?", opts: ["Public access", "Class-only access", "Global access", "No access"], correct: 1 },
    { q: "What is public access?", opts: ["Private access", "Global access", "Class-only access", "No access"], correct: 1 },
    { q: "What is protected access?", opts: ["Public access", "Inheritance access", "Private access", "No access"], correct: 1 },
    { q: "What is interface?", opts: ["Class implementation", "Contract specification", "Object instance", "Variable type"], correct: 1 },
    { q: "What is abstract class?", opts: ["Concrete class", "Incomplete class", "Interface", "Object"], correct: 1 },
    { q: "What is composition?", opts: ["Inheritance", "Object containing objects", "Object deletion", "Object copying"], correct: 1 },
    { q: "What is aggregation?", opts: ["Strong composition", "Weak composition", "Inheritance", "Polymorphism"], correct: 1 },
    { q: "What is association?", opts: ["No relationship", "Object relationship", "Inheritance", "Composition"], correct: 1 },
    { q: "What is dependency?", opts: ["Independence", "Object using another", "Inheritance", "Composition"], correct: 1 },
    { q: "What is coupling?", opts: ["No connection", "Object interdependence", "Object independence", "Object creation"], correct: 1 },
    { q: "What is cohesion?", opts: ["Object separation", "Object unity", "Object creation", "Object deletion"], correct: 1 },
    { q: "What is design pattern?", opts: ["Random design", "Reusable solution", "Specific code", "Hardware design"], correct: 1 },
    { q: "What is singleton pattern?", opts: ["Multiple instances", "Single instance", "No instances", "Random instances"], correct: 1 },
    { q: "What is factory pattern?", opts: ["Object destruction", "Object creation", "Object modification", "Object copying"], correct: 1 },
    { q: "What is observer pattern?", opts: ["No notification", "Change notification", "Object creation", "Object deletion"], correct: 1 },
    { q: "What is MVC pattern?", opts: ["Model-View-Controller", "Multiple-Variable-Control", "Manual-Visual-Code", "Modern-Virtual-Computing"], correct: 0 },

    // Advanced Database Concepts - 30 questions
    { q: "What is RDBMS?", opts: ["Random Database Management", "Relational Database Management", "Remote Database Management", "Real Database Management"], correct: 1 },
    { q: "What is normalization?", opts: ["Making data abnormal", "Organizing data efficiently", "Data deletion", "Data copying"], correct: 1 },
    { q: "What is 1NF?", opts: ["First Normal Form", "First Number Form", "First Name Form", "First New Form"], correct: 0 },
    { q: "What is 2NF?", opts: ["Second Normal Form", "Second Number Form", "Second Name Form", "Second New Form"], correct: 0 },
    { q: "What is 3NF?", opts: ["Third Normal Form", "Third Number Form", "Third Name Form", "Third New Form"], correct: 0 },
    { q: "What is BCNF?", opts: ["Basic Codd Normal Form", "Boyce-Codd Normal Form", "Binary Codd Normal Form", "Boolean Codd Normal Form"], correct: 1 },
    { q: "What is functional dependency?", opts: ["Random dependency", "Attribute dependency", "Table dependency", "Database dependency"], correct: 1 },
    { q: "What is partial dependency?", opts: ["Full dependency", "Dependency on part of key", "No dependency", "Complete dependency"], correct: 1 },
    { q: "What is transitive dependency?", opts: ["Direct dependency", "Indirect dependency", "No dependency", "Partial dependency"], correct: 1 },
    { q: "What is entity?", opts: ["Attribute", "Real-world object", "Relationship", "Table"], correct: 1 },
    { q: "What is relationship?", opts: ["Entity", "Association between entities", "Attribute", "Table"], correct: 1 },
    { q: "What is cardinality?", opts: ["Number of columns", "Number of relationships", "Number of tables", "Number of databases"], correct: 1 },
    { q: "What is one-to-one relationship?", opts: ["Multiple to multiple", "Single to single", "One to many", "Many to one"], correct: 1 },
    { q: "What is one-to-many relationship?", opts: ["Single to single", "Single to multiple", "Multiple to single", "Multiple to multiple"], correct: 1 },
    { q: "What is many-to-many relationship?", opts: ["Single to single", "Multiple to multiple", "One to many", "Many to one"], correct: 1 },
    { q: "What is ER diagram?", opts: ["Error diagram", "Entity-Relationship diagram", "Execution diagram", "Example diagram"], correct: 1 },
    { q: "What is join operation?", opts: ["Table separation", "Table combination", "Table deletion", "Table creation"], correct: 1 },
    { q: "What is inner join?", opts: ["All records", "Matching records only", "No records", "Random records"], correct: 1 },
    { q: "What is outer join?", opts: ["Matching only", "All records from one/both tables", "No records", "Random records"], correct: 1 },
    { q: "What is left join?", opts: ["Right table all", "Left table all", "No records", "Random records"], correct: 1 },
    { q: "What is right join?", opts: ["Left table all", "Right table all", "No records", "Random records"], correct: 1 },
    { q: "What is full join?", opts: ["No records", "All records from both", "Matching only", "Random records"], correct: 1 },
    { q: "What is index?", opts: ["Table content", "Fast access structure", "Database name", "Column name"], correct: 1 },
    { q: "What is clustered index?", opts: ["Separate structure", "Data storage order", "Random structure", "No structure"], correct: 1 },
    { q: "What is non-clustered index?", opts: ["Data storage order", "Separate pointer structure", "No structure", "Random structure"], correct: 1 },
    { q: "What is view?", opts: ["Physical table", "Virtual table", "Index", "Database"], correct: 1 },
    { q: "What is stored procedure?", opts: ["Single query", "Precompiled queries", "Table", "Index"], correct: 1 },
    { q: "What is trigger?", opts: ["Manual execution", "Automatic execution", "No execution", "Random execution"], correct: 1 },
    { q: "What is transaction?", opts: ["Single operation", "Group of operations", "Database", "Table"], correct: 1 },
    { q: "What is ACID properties?", opts: ["Database rules", "Transaction properties", "Table properties", "Column properties"], correct: 1 },

    // Advanced Networking - 30 questions
    { q: "What is OSI model?", opts: ["Hardware model", "7-layer network model", "Software model", "Database model"], correct: 1 },
    { q: "How many layers in OSI model?", opts: ["5", "6", "7", "8"], correct: 2 },
    { q: "What is physical layer?", opts: ["Software layer", "Hardware transmission", "Application layer", "Data layer"], correct: 1 },
    { q: "What is data link layer?", opts: ["Physical layer", "Node-to-node delivery", "Application layer", "Session layer"], correct: 1 },
    { q: "What is network layer?", opts: ["Physical layer", "End-to-end delivery", "Application layer", "Data layer"], correct: 1 },
    { q: "What is transport layer?", opts: ["Physical delivery", "Process-to-process delivery", "Application layer", "Data layer"], correct: 1 },
    { q: "What is session layer?", opts: ["Physical layer", "Session management", "Application layer", "Data layer"], correct: 1 },
    { q: "What is presentation layer?", opts: ["Physical layer", "Data formatting", "Application layer", "Session layer"], correct: 1 },
    { q: "What is application layer?", opts: ["Physical layer", "User interface", "Data layer", "Session layer"], correct: 1 },
    { q: "What is encapsulation?", opts: ["Data removal", "Adding headers", "Data extraction", "Data copying"], correct: 1 },
    { q: "What is decapsulation?", opts: ["Adding headers", "Removing headers", "Data copying", "Data creation"], correct: 1 },
    { q: "What is subnet mask?", opts: ["Network identifier", "Host identifier", "Both network and host", "No identifier"], correct: 2 },
    { q: "What is CIDR?", opts: ["Classless Inter-Domain Routing", "Class Inter-Domain Routing", "Computer Inter-Domain Routing", "Central Inter-Domain Routing"], correct: 0 },
    { q: "What is NAT?", opts: ["Network Address Translation", "Network Access Translation", "Network Address Transfer", "Network Access Transfer"], correct: 0 },
    { q: "What is DHCP?", opts: ["Dynamic Host Configuration Protocol", "Direct Host Configuration Protocol", "Digital Host Configuration Protocol", "Data Host Configuration Protocol"], correct: 0 },
    { q: "What is ARP?", opts: ["Address Resolution Protocol", "Access Resolution Protocol", "Address Routing Protocol", "Access Routing Protocol"], correct: 0 },
    { q: "What is ICMP?", opts: ["Internet Control Message Protocol", "Internet Connection Message Protocol", "Internet Control Management Protocol", "Internet Connection Management Protocol"], correct: 0 },
    { q: "What is VLAN?", opts: ["Virtual Local Area Network", "Very Local Area Network", "Visual Local Area Network", "Verified Local Area Network"], correct: 0 },
    { q: "What is VPN?", opts: ["Virtual Private Network", "Very Private Network", "Visual Private Network", "Verified Private Network"], correct: 0 },
    { q: "What is QoS?", opts: ["Quality of Service", "Quantity of Service", "Quick of Service", "Query of Service"], correct: 0 },
    { q: "What is load balancing?", opts: ["Single server", "Multiple servers sharing load", "No servers", "Server overload"], correct: 1 },
    { q: "What is redundancy?", opts: ["Single point", "Multiple backup systems", "No backup", "System failure"], correct: 1 },
    { q: "What is fault tolerance?", opts: ["System failure", "System continues despite failures", "No failures", "System stops"], correct: 1 },
    { q: "What is scalability?", opts: ["Fixed capacity", "Growth handling ability", "Shrinking capacity", "No capacity"], correct: 1 },
    { q: "What is bandwidth throttling?", opts: ["Increasing speed", "Limiting speed", "Maintaining speed", "No speed control"], correct: 1 },
    { q: "What is packet switching?", opts: ["Circuit switching", "Data in packets", "No switching", "Random switching"], correct: 1 },
    { q: "What is circuit switching?", opts: ["Packet switching", "Dedicated path", "No path", "Random path"], correct: 1 },
    { q: "What is congestion control?", opts: ["Increasing traffic", "Managing network traffic", "No control", "Random control"], correct: 1 },
    { q: "What is flow control?", opts: ["No control", "Data rate management", "Random flow", "Maximum flow"], correct: 1 },
    { q: "What is error detection?", opts: ["Creating errors", "Finding errors", "Ignoring errors", "Random errors"], correct: 1 },

    // Advanced Algorithms - 30 questions
    { q: "What is time complexity?", opts: ["Program time", "Algorithm efficiency measure", "Memory usage", "Code length"], correct: 1 },
    { q: "What is space complexity?", opts: ["Program size", "Memory usage measure", "Time usage", "Code complexity"], correct: 1 },
    { q: "What is Big O notation?", opts: ["Program size", "Algorithm complexity measure", "Memory size", "Code length"], correct: 1 },
    { q: "What is O(1) complexity?", opts: ["Linear time", "Constant time", "Quadratic time", "Exponential time"], correct: 1 },
    { q: "What is O(n) complexity?", opts: ["Constant time", "Linear time", "Quadratic time", "Exponential time"], correct: 1 },
    { q: "What is O(n²) complexity?", opts: ["Linear time", "Quadratic time", "Constant time", "Exponential time"], correct: 1 },
    { q: "What is binary search?", opts: ["Linear search", "Divide and conquer search", "Random search", "Sequential search"], correct: 1 },
    { q: "What is linear search?", opts: ["Binary search", "Sequential search", "Random search", "Divide search"], correct: 1 },
    { q: "What is bubble sort?", opts: ["Quick sort", "Adjacent element swapping", "Random sort", "No sorting"], correct: 1 },
    { q: "What is selection sort?", opts: ["Random selection", "Minimum element selection", "Maximum selection", "No selection"], correct: 1 },
    { q: "What is insertion sort?", opts: ["Random insertion", "Sorted position insertion", "No insertion", "Maximum insertion"], correct: 1 },
    { q: "What is merge sort?", opts: ["Single array", "Divide and merge", "Random merge", "No merge"], correct: 1 },
    { q: "What is quick sort?", opts: ["Slow sort", "Pivot-based sorting", "Random sort", "No sorting"], correct: 1 },
    { q: "What is heap sort?", opts: ["Linear sort", "Heap-based sorting", "Random sort", "No sorting"], correct: 1 },
    { q: "What is recursion?", opts: ["Loop structure", "Function calling itself", "Variable declaration", "Conditional statement"], correct: 1 },
    { q: "What is base case?", opts: ["First case", "Stopping condition", "Error case", "Loop case"], correct: 1 },
    { q: "What is dynamic programming?", opts: ["Static programming", "Optimization technique", "Simple programming", "Random programming"], correct: 1 },
    { q: "What is memoization?", opts: ["Memory deletion", "Storing computed results", "Memory allocation", "Memory deallocation"], correct: 1 },
    { q: "What is greedy algorithm?", opts: ["Global optimization", "Local optimization", "No optimization", "Random optimization"], correct: 1 },
    { q: "What is divide and conquer?", opts: ["Single problem", "Problem division strategy", "Problem multiplication", "Problem addition"], correct: 1 },
    { q: "What is backtracking?", opts: ["Forward only", "Trial and error with undo", "Random approach", "Linear approach"], correct: 1 },
    { q: "What is breadth-first search?", opts: ["Deep search", "Level-wise search", "Random search", "No search"], correct: 1 },
    { q: "What is depth-first search?", opts: ["Breadth search", "Deep exploration first", "Random search", "No search"], correct: 1 },
    { q: "What is graph traversal?", opts: ["Graph creation", "Visiting graph nodes", "Graph deletion", "Graph modification"], correct: 1 },
    { q: "What is shortest path?", opts: ["Longest path", "Minimum distance path", "Random path", "No path"], correct: 1 },
    { q: "What is minimum spanning tree?", opts: ["Maximum tree", "Minimum connected tree", "Random tree", "No tree"], correct: 1 },
    { q: "What is topological sorting?", opts: ["Random sorting", "Dependency-based ordering", "Alphabetical sorting", "No sorting"], correct: 1 },
    { q: "What is hashing?", opts: ["Random mapping", "Key to index mapping", "No mapping", "Sequential mapping"], correct: 1 },
    { q: "What is collision in hashing?", opts: ["No conflict", "Same hash value conflict", "Different values", "Hash function error"], correct: 1 },
    { q: "What is load factor?", opts: ["Hash table emptiness", "Hash table fullness", "Hash function speed", "Hash key length"], correct: 1 }
];// Add advanced questions
grade9Questions.advanced = [
    // Advanced Computer Science Theory - 50 questions
    { q: "What is computational complexity theory?", opts: ["Simple computing", "Study of algorithm efficiency", "Computer hardware", "Software design"], correct: 1 },
    { q: "What is P vs NP problem?", opts: ["Simple problem", "Famous unsolved problem", "Solved problem", "Hardware problem"], correct: 1 },
    { q: "What is NP-complete?", opts: ["Easy problems", "Hardest problems in NP", "Simple problems", "Unsolvable problems"], correct: 1 },
    { q: "What is Turing machine?", opts: ["Physical machine", "Theoretical computation model", "Real computer", "Gaming machine"], correct: 1 },
    { q: "What is Church-Turing thesis?", opts: ["Programming theory", "Computation equivalence hypothesis", "Hardware theory", "Software theory"], correct: 1 },
    { q: "What is decidability?", opts: ["Random decision", "Problem solvability", "No decision", "Wrong decision"], correct: 1 },
    { q: "What is halting problem?", opts: ["Solvable problem", "Undecidable problem", "Simple problem", "Hardware problem"], correct: 1 },
    { q: "What is formal language?", opts: ["Natural language", "Mathematical language definition", "Programming language", "Spoken language"], correct: 1 },
    { q: "What is automata theory?", opts: ["Car theory", "Abstract machine study", "Robot theory", "Computer theory"], correct: 1 },
    { q: "What is finite automaton?", opts: ["Infinite machine", "Limited state machine", "Complex machine", "No machine"], correct: 1 },
    { q: "What is regular expression?", opts: ["Math expression", "Pattern matching notation", "Programming expression", "No expression"], correct: 1 },
    { q: "What is context-free grammar?", opts: ["Context grammar", "Formal grammar type", "Natural grammar", "No grammar"], correct: 1 },
    { q: "What is parsing?", opts: ["Text writing", "Syntax analysis", "Text deletion", "Text copying"], correct: 1 },
    { q: "What is compiler theory?", opts: ["Simple theory", "Language translation study", "Hardware theory", "User theory"], correct: 1 },
    { q: "What is lexical analysis?", opts: ["Syntax analysis", "Token identification", "Semantic analysis", "Code generation"], correct: 1 },
    { q: "What is syntax analysis?", opts: ["Lexical analysis", "Grammar structure checking", "Semantic analysis", "Code generation"], correct: 1 },
    { q: "What is semantic analysis?", opts: ["Syntax analysis", "Meaning verification", "Lexical analysis", "Code generation"], correct: 1 },
    { q: "What is code optimization?", opts: ["Code worsening", "Code improvement", "Code deletion", "Code copying"], correct: 1 },
    { q: "What is machine learning?", opts: ["Manual learning", "Automated pattern learning", "No learning", "Simple learning"], correct: 1 },
    { q: "What is artificial intelligence?", opts: ["Human intelligence", "Machine intelligence", "No intelligence", "Simple intelligence"], correct: 1 },
    { q: "What is neural network?", opts: ["Computer network", "Brain-inspired model", "Simple network", "No network"], correct: 1 },
    { q: "What is deep learning?", opts: ["Shallow learning", "Multi-layer learning", "Simple learning", "No learning"], correct: 1 },
    { q: "What is supervised learning?", opts: ["Unsupervised learning", "Learning with examples", "No learning", "Random learning"], correct: 1 },
    { q: "What is unsupervised learning?", opts: ["Supervised learning", "Learning without examples", "No learning", "Simple learning"], correct: 1 },
    { q: "What is reinforcement learning?", opts: ["No learning", "Learning through rewards", "Simple learning", "Random learning"], correct: 1 },
    { q: "What is computer graphics?", opts: ["Text processing", "Visual content creation", "Audio processing", "No processing"], correct: 1 },
    { q: "What is computer vision?", opts: ["Human vision", "Machine visual understanding", "No vision", "Simple vision"], correct: 1 },
    { q: "What is natural language processing?", opts: ["Artificial language", "Human language understanding", "No language", "Simple language"], correct: 1 },
    { q: "What is cryptography?", opts: ["Open communication", "Secure communication", "No communication", "Simple communication"], correct: 1 },
    { q: "What is quantum computing?", opts: ["Classical computing", "Quantum mechanics computing", "Simple computing", "No computing"], correct: 1 },
    { q: "What is parallel computing?", opts: ["Sequential computing", "Simultaneous computing", "No computing", "Simple computing"], correct: 1 },
    { q: "What is distributed computing?", opts: ["Centralized computing", "Multiple machine computing", "Single computing", "No computing"], correct: 1 },
    { q: "What is cloud computing paradigm?", opts: ["Local computing", "Internet-based computing", "No computing", "Simple computing"], correct: 1 },
    { q: "What is edge computing?", opts: ["Center computing", "Near-source computing", "Far computing", "No computing"], correct: 1 },
    { q: "What is fog computing?", opts: ["Clear computing", "Intermediate layer computing", "No computing", "Simple computing"], correct: 1 },
    { q: "What is Internet of Things?", opts: ["Internet only", "Connected devices network", "No connection", "Simple connection"], correct: 1 },
    { q: "What is blockchain?", opts: ["Single block", "Distributed ledger", "No blocks", "Simple block"], correct: 1 },
    { q: "What is big data?", opts: ["Small data", "Large complex datasets", "No data", "Simple data"], correct: 1 },
    { q: "What is data mining?", opts: ["Data burial", "Pattern discovery", "Data deletion", "Data copying"], correct: 1 },
    { q: "What is data science?", opts: ["Data ignorance", "Data analysis discipline", "No science", "Simple science"], correct: 1 },
    { q: "What is bioinformatics?", opts: ["No informatics", "Biology and computing", "Simple informatics", "Random informatics"], correct: 1 },
    { q: "What is computational biology?", opts: ["Simple biology", "Computing in biology", "No biology", "Random biology"], correct: 1 },
    { q: "What is human-computer interaction?", opts: ["No interaction", "User interface study", "Simple interaction", "Random interaction"], correct: 1 },
    { q: "What is software engineering?", opts: ["Hardware engineering", "Software development discipline", "No engineering", "Simple engineering"], correct: 1 },
    { q: "What is system architecture?", opts: ["No architecture", "System design structure", "Simple architecture", "Random architecture"], correct: 1 },
    { q: "What is design patterns?", opts: ["Random design", "Reusable design solutions", "No design", "Simple design"], correct: 1 },
    { q: "What is software testing?", opts: ["No testing", "Software verification", "Simple testing", "Random testing"], correct: 1 },
    { q: "What is version control?", opts: ["No control", "Change management", "Simple control", "Random control"], correct: 1 },
    { q: "What is continuous integration?", opts: ["No integration", "Automated integration", "Simple integration", "Random integration"], correct: 1 },
    { q: "What is DevOps?", opts: ["Development only", "Development and Operations", "Operations only", "No operations"], correct: 1 }
];

async function seedGrade9Questions() {
    console.log('🌱 SEEDING GRADE 9 COMPREHENSIVE QUESTIONS');
    console.log('==========================================');
    console.log('Topics: Programming, logic, and data representation');
    console.log('Target: 300+ questions (150 basic, 120 medium, 50 advanced)');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        let totalAdded = 0;
        const grade = 9;

        // Add basic questions
        console.log('📗 Adding basic questions...');
        for (let i = 0; i < grade9Questions.basic.length; i++) {
            const q = grade9Questions.basic[i];
            
            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'basic', q.q], function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add medium questions
        console.log('📙 Adding medium questions...');
        for (let i = 0; i < grade9Questions.medium.length; i++) {
            const q = grade9Questions.medium[i];
            
            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'medium', q.q], function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                tionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add advanced questions
        console.log('📕 Adding advanced questions...');
        for (let i = 0; i < grade9Questions.advanced.length; i++) {
            const q = grade9Questions.advanced[i];
            
            const questionId = await new Promise((resolve, reject) => {
                db.run(`
                    INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [grade, 'advanced', q.q], function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            });

            // Insert options
            for (let j = 0; j < q.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        await database.close();
        
        console.log('');
        console.log('✅ GRADE 9 SEEDING COMPLETED!');
        console.log('============================');
        console.log(`📊 Total questions added: ${totalAdded}`);
        console.log(`📗 Basic questions: ${grade9Questions.basic.length}`);
        console.log(`📙 Medium questions: ${grade9Questions.medium.length}`);
        console.log(`📕 Advanced questions: ${grade9Questions.advanced.length}`);
        console.log('');
        console.log('Topics covered:');
        console.log('• Computer Architecture (ALU, CU)');
        console.log('• Number Systems (Binary, Hex)');
        console.log('• Boolean Logic & Gates');
        console.log('• Operating Systems');
        console.log('• Software Classification');
        console.log('• Networking Fundamentals (TCP/IP, DNS)');
        console.log('• Internet Technologies (HTTP, URL)');
        console.log('• Cybersecurity');
        console.log('• Database Concepts (Tables, SQL)');
        console.log('• Programming Fundamentals (Python)');
        console.log('• Flowcharts & Algorithms');
        console.log('• Cloud Computing');
        console.log('• Digital Citizenship');
        console.log('• Python Basics: Variables, loops, functions, error handling');
        console.log('• HTML Tags & Structure: Full page structure, forms, tables');
        console.log('• Networking: Protocols, IP addressing, DNS, topology');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Grade 9 questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedGrade9Questions();
}

module.exports = { seedGrade9Questions, grade9Questions };