#!/usr/bin/env node

/**
 * Grade 7 Comprehensive Seeding - 300+ Questions
 * Topics: Internet basics, file handling, digital safety, and programming introduction
 * Focus: Intermediate Understanding
 */

const database = require('../config/database');

const grade7Questions = {
    basic: [
        // Types of Computers - 20 questions
        { q: "Which type of computer is portable?", opts: ["Desktop", "Laptop", "Supercomputer", "Mainframe"], correct: 1 },
        { q: "What is a supercomputer used for?", opts: ["Basic tasks", "Complex calculations", "Gaming", "Word processing"], correct: 1 },
        { q: "Which computer is most powerful?", opts: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2 },
        { q: "What type of computer fits on a desk?", opts: ["Laptop", "Desktop", "Supercomputer", "Mainframe"], correct: 1 },
        { q: "Which computer can be carried easily?", opts: ["Desktop", "Supercomputer", "Laptop", "Mainframe"], correct: 2 },
        { q: "What is a mainframe computer?", opts: ["Small computer", "Large multi-user computer", "Gaming computer", "Mobile computer"], correct: 1 },
        { q: "Which computer is used in weather forecasting?", opts: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2 },
        { q: "What type of computer is a tablet?", opts: ["Desktop", "Laptop", "Mobile device", "Supercomputer"], correct: 2 },
        { q: "Which computer has built-in battery?", opts: ["Desktop", "Laptop", "Supercomputer", "Mainframe"], correct: 1 },
        { q: "What is a workstation computer?", opts: ["Gaming computer", "High-performance desktop", "Mobile computer", "Simple computer"], correct: 1 },
        { q: "Which computer is used by many users simultaneously?", opts: ["Laptop", "Desktop", "Mainframe", "Tablet"], correct: 2 },
        { q: "What type of computer is a smartphone?", opts: ["Desktop", "Laptop", "Mobile computer", "Supercomputer"], correct: 2 },
        { q: "Which computer is best for scientific research?", opts: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2 },
        { q: "What is an embedded computer?", opts: ["Standalone computer", "Computer inside other devices", "Gaming computer", "Office computer"], correct: 1 },
        { q: "Which computer type is most common in homes?", opts: ["Supercomputer", "Mainframe", "Desktop/Laptop", "Server"], correct: 2 },
        { q: "What is a server computer?", opts: ["Personal computer", "Computer serving other computers", "Gaming computer", "Mobile computer"], correct: 1 },
        { q: "Which computer is designed for mobility?", opts: ["Desktop", "Supercomputer", "Laptop", "Mainframe"], correct: 2 },
        { q: "What type of computer processes big data?", opts: ["Laptop", "Desktop", "Supercomputer", "Tablet"], correct: 2 },
        { q: "Which computer has the smallest size?", opts: ["Desktop", "Laptop", "Smartphone", "Supercomputer"], correct: 2 },
        { q: "What is a hybrid computer?", opts: ["Only digital", "Only analog", "Both digital and analog", "Neither digital nor analog"], correct: 2 },

        // Operating Systems - 20 questions
        { q: "What is an operating system?", opts: ["Hardware", "System software", "Application software", "Storage device"], correct: 1 },
        { q: "Which is a popular operating system?", opts: ["MS Word", "Windows", "Chrome", "Excel"], correct: 1 },
        { q: "What does Windows operating system do?", opts: ["Only games", "Manages computer resources", "Only internet", "Only documents"], correct: 1 },
        { q: "Which operating system is open source?", opts: ["Windows", "Linux", "macOS", "iOS"], correct: 1 },
        { q: "What is the main function of OS?", opts: ["Play games", "Manage hardware and software", "Browse internet", "Edit documents"], correct: 1 },
        { q: "Which OS is made by Apple?", opts: ["Windows", "Linux", "macOS", "Android"], correct: 2 },
        { q: "What is Android?", opts: ["Desktop OS", "Mobile OS", "Web browser", "Application"], correct: 1 },
        { q: "Which OS is used in most smartphones?", opts: ["Windows", "Linux", "Android/iOS", "macOS"], correct: 2 },
        { q: "What does OS stand for?", opts: ["Open System", "Operating System", "Online Service", "Office Software"], correct: 1 },
        { q: "Which OS component manages files?", opts: ["Calculator", "File manager", "Games", "Browser"], correct: 1 },
        { q: "What is a device driver?", opts: ["Hardware", "Software for hardware communication", "Application", "Game"], correct: 1 },
        { q: "Which OS is free to use?", opts: ["Windows", "macOS", "Linux", "iOS"], correct: 2 },
        { q: "What is multitasking in OS?", opts: ["Single task", "Multiple tasks simultaneously", "No tasks", "Task deletion"], correct: 1 },
        { q: "Which OS feature protects against viruses?", opts: ["Calculator", "Security system", "Games", "Music player"], correct: 1 },
        { q: "What is user interface in OS?", opts: ["Hardware connection", "User interaction method", "Storage system", "Network connection"], correct: 1 },
        { q: "Which OS is command-line based?", opts: ["Windows GUI", "macOS GUI", "DOS", "Android"], correct: 2 },
        { q: "What manages computer memory?", opts: ["User", "Operating System", "Applications", "Hardware only"], correct: 1 },
        { q: "Which OS feature allows user accounts?", opts: ["Calculator", "User management", "Games", "Browser"], correct: 1 },
        { q: "What is system update?", opts: ["Hardware change", "OS improvement", "Application installation", "File deletion"], correct: 1 },
        { q: "Which OS component handles printing?", opts: ["Games", "Print spooler", "Calculator", "Browser"], correct: 1 },

        // Internet & Web Browsers - 20 questions
        { q: "What is the Internet?", opts: ["Single computer", "Global network of computers", "Software program", "Hardware device"], correct: 1 },
        { q: "What is a web browser?", opts: ["Hardware device", "Software for accessing websites", "Storage device", "Input device"], correct: 1 },
        { q: "Which is a web browser?", opts: ["Windows", "Chrome", "Excel", "Photoshop"], correct: 1 },
        { q: "What does WWW stand for?", opts: ["World Wide Web", "World Web Window", "Wide World Web", "Web World Wide"], correct: 0 },
        { q: "What is a website?", opts: ["Computer hardware", "Collection of web pages", "Software program", "Storage device"], correct: 1 },
        { q: "What is a URL?", opts: ["User name", "Web address", "Password", "File name"], correct: 1 },
        { q: "Which protocol is used for web pages?", opts: ["FTP", "HTTP", "SMTP", "POP"], correct: 1 },
        { q: "What is a search engine?", opts: ["Hardware", "Tool to find information", "Storage device", "Input method"], correct: 1 },
        { q: "Which is a popular search engine?", opts: ["Windows", "Google", "Excel", "Word"], correct: 1 },
        { q: "What is downloading?", opts: ["Uploading files", "Getting files from internet", "Deleting files", "Creating files"], correct: 1 },
        { q: "What is uploading?", opts: ["Getting files", "Sending files to internet", "Deleting files", "Creating files"], correct: 1 },
        { q: "Which is secure web protocol?", opts: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1 },
        { q: "What is a hyperlink?", opts: ["Text only", "Clickable connection to other pages", "Image only", "Video only"], correct: 1 },
        { q: "What is a home page?", opts: ["Any page", "Main page of website", "Last page", "Error page"], correct: 1 },
        { q: "Which stores web page data temporarily?", opts: ["Hard disk", "Browser cache", "RAM only", "ROM"], correct: 1 },
        { q: "What is bookmarking?", opts: ["Deleting pages", "Saving favorite pages", "Printing pages", "Copying pages"], correct: 1 },
        { q: "What is browsing history?", opts: ["Future pages", "Record of visited pages", "Deleted pages", "Favorite pages"], correct: 1 },
        { q: "Which allows private browsing?", opts: ["Normal mode", "Incognito mode", "Safe mode", "Game mode"], correct: 1 },
        { q: "What is a web server?", opts: ["Client computer", "Computer hosting websites", "Browser software", "Search engine"], correct: 1 },
        { q: "What is bandwidth?", opts: ["Web page width", "Data transfer capacity", "Screen size", "Memory size"], correct: 1 },

        // Email Basics - 20 questions
        { q: "What is email?", opts: ["Electronic mail", "Emergency mail", "Express mail", "External mail"], correct: 0 },
        { q: "Which symbol is used in email addresses?", opts: ["#", "@", "&", "%"], correct: 1 },
        { q: "What is an email address?", opts: ["Home address", "Unique email identifier", "Phone number", "Name only"], correct: 1 },
        { q: "Which part comes after @ in email?", opts: ["Username", "Domain name", "Password", "Subject"], correct: 1 },
        { q: "What is the subject line in email?", opts: ["Sender name", "Brief description of email", "Receiver name", "Date"], correct: 1 },
        { q: "What does CC mean in email?", opts: ["Copy Cat", "Carbon Copy", "Computer Code", "Create Copy"], correct: 1 },
        { q: "What does BCC mean?", opts: ["Big Carbon Copy", "Blind Carbon Copy", "Basic Computer Code", "Best Copy Created"], correct: 1 },
        { q: "What is email attachment?", opts: ["Email address", "File sent with email", "Subject line", "Sender name"], correct: 1 },
        { q: "Which is an email service provider?", opts: ["Windows", "Gmail", "Excel", "Photoshop"], correct: 1 },
        { q: "What is inbox in email?", opts: ["Sent emails", "Received emails", "Deleted emails", "Draft emails"], correct: 1 },
        { q: "What is spam email?", opts: ["Important emails", "Unwanted emails", "Personal emails", "Work emails"], correct: 1 },
        { q: "What is email forwarding?", opts: ["Deleting email", "Sending received email to others", "Creating new email", "Replying to email"], correct: 1 },
        { q: "What is reply in email?", opts: ["New email", "Response to received email", "Forwarded email", "Deleted email"], correct: 1 },
        { q: "What is draft in email?", opts: ["Sent email", "Unsent email", "Received email", "Deleted email"], correct: 1 },
        { q: "Which folder contains sent emails?", opts: ["Inbox", "Sent", "Draft", "Trash"], correct: 1 },
        { q: "What is email signature?", opts: ["Password", "Automatic text at email end", "Subject line", "Attachment"], correct: 1 },
        { q: "What is POP in email?", opts: ["Popular Protocol", "Post Office Protocol", "Personal Online Protocol", "Public Open Protocol"], correct: 1 },
        { q: "What is IMAP?", opts: ["Internet Mail Access Protocol", "Internal Mail Access Protocol", "International Mail Access Protocol", "Instant Mail Access Protocol"], correct: 0 },
        { q: "What is email client?", opts: ["Email sender", "Email software", "Email receiver", "Email server"], correct: 1 },
        { q: "Which is good email practice?", opts: ["Send spam", "Use clear subjects", "Share passwords", "Forward everything"], correct: 1 },

        // File Extensions - 20 questions
        { q: "What is a file extension?", opts: ["File size", "File type indicator", "File location", "File date"], correct: 1 },
        { q: "Which extension indicates image file?", opts: [".txt", ".jpg", ".exe", ".doc"], correct: 1 },
        { q: "What does .mp3 extension mean?", opts: ["Image file", "Audio file", "Video file", "Text file"], correct: 1 },
        { q: "Which extension is for text files?", opts: [".jpg", ".mp3", ".txt", ".exe"], correct: 2 },
        { q: "What does .doc extension indicate?", opts: ["Image", "Document", "Audio", "Video"], correct: 1 },
        { q: "Which extension is for video files?", opts: [".txt", ".jpg", ".mp4", ".exe"], correct: 2 },
        { q: "What does .pdf stand for?", opts: ["Personal Document Format", "Portable Document Format", "Public Document Format", "Private Document Format"], correct: 1 },
        { q: "Which extension indicates executable file?", opts: [".txt", ".jpg", ".exe", ".mp3"], correct: 2 },
        { q: "What does .zip extension mean?", opts: ["Image file", "Compressed file", "Audio file", "Text file"], correct: 1 },
        { q: "Which extension is for spreadsheet?", opts: [".doc", ".xls", ".jpg", ".mp3"], correct: 1 },
        { q: "What does .ppt extension indicate?", opts: ["Text document", "Presentation", "Image", "Audio"], correct: 1 },
        { q: "Which extension is for web pages?", opts: [".doc", ".txt", ".html", ".exe"], correct: 2 },
        { q: "What does .png extension mean?", opts: ["Audio file", "Image file", "Text file", "Video file"], correct: 1 },
        { q: "Which extension indicates database file?", opts: [".txt", ".db", ".jpg", ".mp3"], correct: 1 },
        { q: "What does .rar extension mean?", opts: ["Image file", "Compressed file", "Text file", "Audio file"], correct: 1 },
        { q: "Which extension is for Adobe files?", opts: [".doc", ".pdf", ".txt", ".exe"], correct: 1 },
        { q: "What does .gif extension indicate?", opts: ["Text file", "Animated image", "Audio file", "Video file"], correct: 1 },
        { q: "Which extension is for email files?", opts: [".txt", ".eml", ".jpg", ".exe"], correct: 1 },
        { q: "What does .csv extension mean?", opts: ["Image file", "Data file", "Audio file", "Video file"], correct: 1 },
        { q: "Which extension indicates font file?", opts: [".doc", ".ttf", ".jpg", ".mp3"], correct: 1 },

        // Cyber Safety - 20 questions
        { q: "What is cyber safety?", opts: ["Physical safety", "Online safety practices", "Car safety", "Home safety"], correct: 1 },
        { q: "What makes a strong password?", opts: ["Simple words", "Mix of characters and numbers", "Personal info", "Short length"], correct: 1 },
        { q: "What is phishing?", opts: ["Catching fish", "Stealing personal information online", "Playing games", "Sending emails"], correct: 1 },
        { q: "Which information should be kept private?", opts: ["Favorite color", "Personal address and phone", "Favorite food", "Hobby"], correct: 1 },
        { q: "What should you do with suspicious emails?", opts: ["Open immediately", "Delete without opening", "Forward to friends", "Reply quickly"], correct: 1 },
        { q: "What is cyberbullying?", opts: ["Online gaming", "Online harassment", "Online shopping", "Online learning"], correct: 1 },
        { q: "Which website connection is secure?", opts: ["http://", "https://", "ftp://", "file://"], correct: 1 },
        { q: "What is malware?", opts: ["Good software", "Harmful software", "Free software", "System software"], correct: 1 },
        { q: "Which protects against viruses?", opts: ["Sharing files", "Antivirus software", "Opening all emails", "No protection"], correct: 1 },
        { q: "What is identity theft?", opts: ["Stealing objects", "Stealing personal information", "Stealing food", "Stealing books"], correct: 1 },
        { q: "Which is safe internet practice?", opts: ["Sharing passwords", "Using strong passwords", "Meeting strangers", "Clicking all links"], correct: 1 },
        { q: "What should you do if cyberbullied?", opts: ["Ignore completely", "Tell trusted adult", "Respond angrily", "Share with everyone"], correct: 1 },
        { q: "Which is appropriate online behavior?", opts: ["Being rude", "Being respectful", "Sharing secrets", "Bullying others"], correct: 1 },
        { q: "What is two-factor authentication?", opts: ["One password", "Extra security step", "No security", "Weak security"], correct: 1 },
        { q: "Which should you verify before downloading?", opts: ["File size only", "Source reliability", "File name only", "Download speed"], correct: 1 },
        { q: "What is digital footprint?", opts: ["Foot size", "Online activity trace", "Computer size", "Internet speed"], correct: 1 },
        { q: "Which is good password practice?", opts: ["Same password everywhere", "Different passwords for accounts", "No passwords", "Simple passwords"], correct: 1 },
        { q: "What should you do with pop-up ads?", opts: ["Click immediately", "Close carefully", "Share with friends", "Download content"], correct: 1 },
        { q: "Which information is safe to share?", opts: ["Home address", "Phone number", "Favorite book", "Bank details"], correct: 2 },
        { q: "What is appropriate screen time?", opts: ["24 hours daily", "Balanced with other activities", "Only at night", "Never"], correct: 1 },

        // Introduction to Programming - 20 questions
        { q: "What is programming?", opts: ["Playing games", "Writing instructions for computer", "Using internet", "Typing documents"], correct: 1 },
        { q: "What is a program?", opts: ["Hardware", "Set of instructions", "Storage device", "Input device"], correct: 1 },
        { q: "Which is a programming language?", opts: ["Windows", "Python", "Excel", "Chrome"], correct: 1 },
        { q: "What is Scratch?", opts: ["Hardware", "Visual programming language", "Web browser", "Game"], correct: 1 },
        { q: "What is an algorithm?", opts: ["Computer hardware", "Step-by-step solution", "Software application", "Storage device"], correct: 1 },
        { q: "What is debugging?", opts: ["Writing code", "Finding and fixing errors", "Running programs", "Designing interfaces"], correct: 1 },
        { q: "What is a variable in programming?", opts: ["Fixed value", "Storage location with name", "Program instruction", "Output device"], correct: 1 },
        { q: "What is a loop in programming?", opts: ["Single instruction", "Repeated instructions", "Final instruction", "First instruction"], correct: 1 },
        { q: "What is input in programming?", opts: ["Program output", "Data given to program", "Program code", "Program error"], correct: 1 },
        { q: "What is output in programming?", opts: ["Program input", "Result from program", "Program code", "Program error"], correct: 1 },
        { q: "What is a condition in programming?", opts: ["Always true", "Decision point", "Program end", "Program start"], correct: 1 },
        { q: "What is sequence in programming?", opts: ["Random order", "Step-by-step order", "No order", "Reverse order"], correct: 1 },
        { q: "What is selection in programming?", opts: ["Choosing all options", "Making decisions", "No choices", "Random selection"], correct: 1 },
        { q: "What is iteration in programming?", opts: ["Single execution", "Repetition", "Program end", "Program start"], correct: 1 },
        { q: "What is a function in programming?", opts: ["Program error", "Reusable code block", "Program input", "Program output"], correct: 1 },
        { q: "What is syntax in programming?", opts: ["Program meaning", "Language rules", "Program output", "Program input"], correct: 1 },
        { q: "What is a bug in programming?", opts: ["Feature", "Error in code", "Program output", "Program input"], correct: 1 },
        { q: "What is coding?", opts: ["Using computer", "Writing program instructions", "Playing games", "Browsing internet"], correct: 1 },
        { q: "What is a programmer?", opts: ["Computer user", "Person who writes code", "Computer hardware", "Software application"], correct: 1 },
        { q: "What is execution in programming?", opts: ["Writing code", "Running program", "Debugging code", "Designing program"], correct: 1 },

        // Binary Numbers - 20 questions
        { q: "What is binary number system?", opts: ["Base 10", "Base 2", "Base 8", "Base 16"], correct: 1 },
        { q: "Which digits are used in binary?", opts: ["0-9", "0,1", "0-7", "0-15"], correct: 1 },
        { q: "What is decimal number system?", opts: ["Base 2", "Base 10", "Base 8", "Base 16"], correct: 1 },
        { q: "How do computers understand data?", opts: ["Decimal numbers", "Binary numbers", "Letters only", "Pictures only"], correct: 1 },
        { q: "What does bit stand for?", opts: ["Big Integer", "Binary Digit", "Basic Information", "Byte Integer"], correct: 1 },
        { q: "How many bits make a byte?", opts: ["4", "8", "16", "32"], correct: 1 },
        { q: "What is the binary for decimal 1?", opts: ["0", "1", "10", "11"], correct: 1 },
        { q: "What is the binary for decimal 2?", opts: ["1", "10", "11", "100"], correct: 1 },
        { q: "What is the binary for decimal 3?", opts: ["10", "11", "100", "101"], correct: 1 },
        { q: "What is the binary for decimal 4?", opts: ["11", "100", "101", "110"], correct: 1 },
        { q: "What is the decimal for binary 101?", opts: ["3", "4", "5", "6"], correct: 2 },
        { q: "What is the decimal for binary 110?", opts: ["4", "5", "6", "7"], correct: 2 },
        { q: "Why do computers use binary?", opts: ["It's easier", "Electronic switches (on/off)", "It's faster", "It's smaller"], correct: 1 },
        { q: "What represents 'on' in binary?", opts: ["0", "1", "2", "10"], correct: 1 },
        { q: "What represents 'off' in binary?", opts: ["0", "1", "2", "10"], correct: 0 },
        { q: "What is the largest number with 3 bits?", opts: ["6", "7", "8", "9"], correct: 1 },
        { q: "What is the binary for decimal 8?", opts: ["111", "1000", "1001", "1010"], correct: 1 },
        { q: "How many different values can 4 bits represent?", opts: ["8", "12", "16", "20"], correct: 2 },
        { q: "What is hexadecimal number system?", opts: ["Base 8", "Base 10", "Base 16", "Base 2"], correct: 2 },
        { q: "What is octal number system?", opts: ["Base 2", "Base 8", "Base 10", "Base 16"], correct: 1 }
    ],

    medium: [
        // Advanced Internet and Networking - 30 questions
        { q: "What is an IP address?", opts: ["Internet Password", "Internet Protocol address", "Internet Program", "Internet Provider"], correct: 1 },
        { q: "What does DNS stand for?", opts: ["Domain Name System", "Data Network Service", "Digital Name Service", "Domain Network System"], correct: 0 },
        { q: "What is a router?", opts: ["Storage device", "Network traffic director", "Input device", "Output device"], correct: 1 },
        { q: "What is bandwidth?", opts: ["Web page width", "Data transfer capacity", "Screen resolution", "Memory size"], correct: 1 },
        { q: "What is a firewall?", opts: ["Physical wall", "Network security system", "Storage device", "Input device"], correct: 1 },
        { q: "What does ISP stand for?", opts: ["Internet Service Provider", "Internet Security Protocol", "Internet System Program", "Internet Service Program"], correct: 0 },
        { q: "What is Wi-Fi?", opts: ["Wired connection", "Wireless network technology", "Web interface", "Windows feature"], correct: 1 },
        { q: "What is a modem?", opts: ["Monitor device", "Modulator-demodulator", "Mouse device", "Memory device"], correct: 1 },
        { q: "What is LAN?", opts: ["Large Area Network", "Local Area Network", "Long Area Network", "Limited Area Network"], correct: 1 },
        { q: "What is WAN?", opts: ["Wide Area Network", "Wireless Area Network", "Web Area Network", "Windows Area Network"], correct: 0 },
        { q: "What is a MAC address?", opts: ["Machine Access Code", "Media Access Control", "Main Access Code", "Memory Access Control"], correct: 1 },
        { q: "What is TCP/IP?", opts: ["Text Control Protocol", "Transmission Control Protocol", "Transfer Control Protocol", "Terminal Control Protocol"], correct: 1 },
        { q: "What is a subnet?", opts: ["Super network", "Sub-network", "Secure network", "Simple network"], correct: 1 },
        { q: "What is DHCP?", opts: ["Dynamic Host Configuration Protocol", "Data Host Configuration Protocol", "Digital Host Configuration Protocol", "Direct Host Configuration Protocol"], correct: 0 },
        { q: "What is a gateway?", opts: ["Network entrance point", "Storage device", "Input device", "Output device"], correct: 0 },
        { q: "What is network topology?", opts: ["Network speed", "Network arrangement", "Network security", "Network protocol"], correct: 1 },
        { q: "What is a hub in networking?", opts: ["Central connection point", "Storage device", "Input device", "Output device"], correct: 0 },
        { q: "What is a switch in networking?", opts: ["On/off device", "Intelligent hub", "Storage device", "Input device"], correct: 1 },
        { q: "What is packet switching?", opts: ["Hardware switching", "Data transmission method", "Software switching", "Network switching"], correct: 1 },
        { q: "What is latency?", opts: ["Network speed", "Network delay", "Network security", "Network protocol"], correct: 1 },
        { q: "What is a proxy server?", opts: ["Direct server", "Intermediary server", "Storage server", "Input server"], correct: 1 },
        { q: "What is VPN?", opts: ["Virtual Private Network", "Very Private Network", "Visual Private Network", "Verified Private Network"], correct: 0 },
        { q: "What is cloud computing?", opts: ["Weather computing", "Internet-based computing", "Local computing", "Mobile computing"], correct: 1 },
        { q: "What is FTP?", opts: ["File Transfer Protocol", "Fast Transfer Protocol", "Free Transfer Protocol", "Full Transfer Protocol"], correct: 0 },
        { q: "What is SMTP?", opts: ["Simple Mail Transfer Protocol", "Secure Mail Transfer Protocol", "Standard Mail Transfer Protocol", "Special Mail Transfer Protocol"], correct: 0 },
        { q: "What is POP3?", opts: ["Post Office Protocol 3", "Private Office Protocol 3", "Public Office Protocol 3", "Personal Office Protocol 3"], correct: 0 },
        { q: "What is HTTP status code 404?", opts: ["Success", "Not Found", "Server Error", "Unauthorized"], correct: 1 },
        { q: "What is SSL?", opts: ["Secure Socket Layer", "Simple Socket Layer", "Standard Socket Layer", "Special Socket Layer"], correct: 0 },
        { q: "What is a cookie in web browsing?", opts: ["Food item", "Small data file", "Large file", "Program file"], correct: 1 },
        { q: "What is caching in web browsing?", opts: ["Deleting data", "Storing data temporarily", "Sending data", "Receiving data"], correct: 1 },

        // Programming Concepts - 30 questions
        { q: "What is a variable in programming?", opts: ["Fixed value", "Storage location with name", "Program instruction", "Output device"], correct: 1 },
        { q: "Which data type stores whole numbers?", opts: ["float", "string", "integer", "boolean"], correct: 2 },
        { q: "What data type stores text?", opts: ["int", "float", "string", "boolean"], correct: 2 },
        { q: "What is a boolean data type?", opts: ["Numbers", "Text", "True/False values", "Decimal numbers"], correct: 2 },
        { q: "What is a loop in programming?", opts: ["Single instruction", "Repeated instructions", "Final instruction", "Error instruction"], correct: 1 },
        { q: "Which loop executes at least once?", opts: ["for loop", "while loop", "do-while loop", "if statement"], correct: 2 },
        { q: "What is an if statement?", opts: ["Loop structure", "Decision structure", "Variable declaration", "Function definition"], correct: 1 },
        { q: "What is an else statement?", opts: ["Primary condition", "Alternative condition", "Loop condition", "Variable condition"], correct: 1 },
        { q: "What is a for loop used for?", opts: ["Single execution", "Known repetitions", "Unknown repetitions", "No execution"], correct: 1 },
        { q: "What is a while loop used for?", opts: ["Known repetitions", "Unknown repetitions", "Single execution", "No execution"], correct: 1 },
        { q: "What is an array?", opts: ["Single value", "Collection of values", "Program instruction", "Output device"], correct: 1 },
        { q: "What is a function in programming?", opts: ["Variable", "Reusable code block", "Data type", "Loop structure"], correct: 1 },
        { q: "What is a parameter in function?", opts: ["Function output", "Function input", "Function name", "Function error"], correct: 1 },
        { q: "What is return value?", opts: ["Function input", "Function output", "Function name", "Function parameter"], correct: 1 },
        { q: "What is scope in programming?", opts: ["Variable visibility", "Variable type", "Variable value", "Variable name"], correct: 0 },
        { q: "What is local variable?", opts: ["Global access", "Limited access", "No access", "Full access"], correct: 1 },
        { q: "What is global variable?", opts: ["Limited access", "Full program access", "No access", "Function access only"], correct: 1 },
        { q: "What is concatenation?", opts: ["String separation", "String joining", "String deletion", "String creation"], correct: 1 },
        { q: "What is string length?", opts: ["String width", "Number of characters", "String height", "String depth"], correct: 1 },
        { q: "What is indexing in strings?", opts: ["String creation", "Character position access", "String deletion", "String modification"], correct: 1 },
        { q: "What is comparison operator?", opts: ["Assignment", "Value comparison", "Arithmetic operation", "Logical operation"], correct: 1 },
        { q: "What does == operator do?", opts: ["Assignment", "Equality check", "Addition", "Subtraction"], correct: 1 },
        { q: "What does != operator mean?", opts: ["Equal to", "Not equal to", "Greater than", "Less than"], correct: 1 },
        { q: "What is logical AND operator?", opts: ["||", "&&", "!", "=="], correct: 1 },
        { q: "What is logical OR operator?", opts: ["&&", "||", "!", "=="], correct: 1 },
        { q: "What is logical NOT operator?", opts: ["&&", "||", "!", "=="], correct: 2 },
        { q: "What is increment operator?", opts: ["--", "++", "==", "!="], correct: 1 },
        { q: "What is decrement operator?", opts: ["++", "--", "==", "!="], correct: 1 },
        { q: "What is modulus operator?", opts: ["+", "-", "*", "%"], correct: 3 },
        { q: "What is assignment operator?", opts: ["==", "=", "!=", ">="], correct: 1 },

        // HTML and Web Development - 30 questions
        { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"], correct: 0 },
        { q: "What is HTML used for?", opts: ["Programming", "Creating web pages", "Database management", "Image editing"], correct: 1 },
        { q: "Which tag starts an HTML document?", opts: ["<head>", "<body>", "<html>", "<title>"], correct: 2 },
        { q: "Which tag contains page content?", opts: ["<head>", "<body>", "<title>", "<html>"], correct: 1 },
        { q: "Which tag is used for headings?", opts: ["<p>", "<h1>", "<div>", "<span>"], correct: 1 },
        { q: "Which tag is used for paragraphs?", opts: ["<h1>", "<p>", "<div>", "<span>"], correct: 1 },
        { q: "Which tag creates a hyperlink?", opts: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
        { q: "Which attribute specifies link destination?", opts: ["src", "href", "alt", "title"], correct: 1 },
        { q: "Which tag displays images?", opts: ["<image>", "<img>", "<pic>", "<photo>"], correct: 1 },
        { q: "Which attribute specifies image source?", opts: ["href", "src", "alt", "title"], correct: 1 },
        { q: "Which tag creates line break?", opts: ["<break>", "<br>", "<lb>", "<newline>"], correct: 1 },
        { q: "Which tag creates horizontal rule?", opts: ["<line>", "<hr>", "<rule>", "<horizontal>"], correct: 1 },
        { q: "Which tag creates unordered list?", opts: ["<ol>", "<ul>", "<list>", "<li>"], correct: 1 },
        { q: "Which tag creates list items?", opts: ["<item>", "<li>", "<list>", "<ul>"], correct: 1 },
        { q: "Which tag creates ordered list?", opts: ["<ul>", "<ol>", "<list>", "<li>"], correct: 1 },
        { q: "Which tag creates table?", opts: ["<tab>", "<table>", "<tbl>", "<grid>"], correct: 1 },
        { q: "Which tag creates table row?", opts: ["<row>", "<tr>", "<td>", "<th>"], correct: 1 },
        { q: "Which tag creates table data cell?", opts: ["<cell>", "<td>", "<tr>", "<th>"], correct: 1 },
        { q: "Which tag creates table header?", opts: ["<header>", "<th>", "<td>", "<tr>"], correct: 1 },
        { q: "Which tag creates form?", opts: ["<input>", "<form>", "<field>", "<submit>"], correct: 1 },
        { q: "Which tag creates text input?", opts: ["<text>", "<input>", "<field>", "<textbox>"], correct: 1 },
        { q: "Which tag creates button?", opts: ["<btn>", "<button>", "<click>", "<submit>"], correct: 1 },
        { q: "Which tag makes text bold?", opts: ["<bold>", "<b>", "<strong>", "Both <b> and <strong>"], correct: 3 },
        { q: "Which tag makes text italic?", opts: ["<italic>", "<i>", "<em>", "Both <i> and <em>"], correct: 3 },
        { q: "Which tag creates division?", opts: ["<section>", "<div>", "<part>", "<block>"], correct: 1 },
        { q: "Which tag creates span?", opts: ["<inline>", "<span>", "<text>", "<word>"], correct: 1 },
        { q: "What is HTML attribute?", opts: ["Tag content", "Tag property", "Tag name", "Tag value"], correct: 1 },
        { q: "Which attribute provides alternative text?", opts: ["title", "alt", "desc", "text"], correct: 1 },
        { q: "What is HTML element?", opts: ["Attribute only", "Tag with content", "Content only", "Property only"], correct: 1 },
        { q: "Which tag contains metadata?", opts: ["<body>", "<head>", "<html>", "<title>"], correct: 1 },

        // File Management and Organization - 30 questions
        { q: "What is file management?", opts: ["Creating files only", "Organizing and maintaining files", "Deleting files only", "Copying files only"], correct: 1 },
        { q: "What is a folder hierarchy?", opts: ["Random organization", "Structured organization", "Alphabetical only", "Size-based only"], correct: 1 },
        { q: "Which operation moves file to new location?", opts: ["Copy", "Cut", "Paste", "Delete"], correct: 1 },
        { q: "What happens when you copy a file?", opts: ["Original is deleted", "Duplicate is created", "File is moved", "File is renamed"], correct: 1 },
        { q: "What is file compression?", opts: ["Making files larger", "Reducing file size", "Changing file type", "Deleting files"], correct: 1 },
        { q: "Which file format is compressed?", opts: [".txt", ".zip", ".doc", ".exe"], correct: 1 },
        { q: "What is file backup?", opts: ["Deleting files", "Creating safety copies", "Moving files", "Renaming files"], correct: 1 },
        { q: "What is file synchronization?", opts: ["Deleting files", "Matching file versions", "Creating files", "Renaming files"], correct: 1 },
        { q: "What is file versioning?", opts: ["File size", "Tracking file changes", "File type", "File location"], correct: 1 },
        { q: "What is file attribute?", opts: ["File content", "File properties", "File name", "File size"], correct: 1 },
        { q: "Which attribute makes file read-only?", opts: ["Hidden", "Read-only", "System", "Archive"], correct: 1 },
        { q: "What is file path?", opts: ["File content", "File location address", "File size", "File type"], correct: 1 },
        { q: "What is absolute path?", opts: ["Relative location", "Complete location from root", "Partial location", "No location"], correct: 1 },
        { q: "What is relative path?", opts: ["Complete location", "Location from current position", "No location", "Random location"], correct: 1 },
        { q: "What is root directory?", opts: ["Last folder", "Top-level folder", "Middle folder", "Hidden folder"], correct: 1 },
        { q: "What is parent directory?", opts: ["Child folder", "Folder containing current folder", "Same level folder", "Random folder"], correct: 1 },
        { q: "What is subdirectory?", opts: ["Parent folder", "Folder inside another folder", "Same level folder", "Root folder"], correct: 1 },
        { q: "What is file recovery?", opts: ["Creating files", "Restoring deleted files", "Moving files", "Copying files"], correct: 1 },
        { q: "What is recycle bin?", opts: ["Storage for deleted files", "Active files location", "System files location", "Program files location"], correct: 0 },
        { q: "What is file search?", opts: ["Creating files", "Finding specific files", "Deleting files", "Moving files"], correct: 1 },
        { q: "What is wildcard in search?", opts: ["Specific character", "Pattern matching character", "Number only", "Letter only"], correct: 1 },
        { q: "What does * wildcard represent?", opts: ["Single character", "Multiple characters", "No characters", "Specific character"], correct: 1 },
        { q: "What does ? wildcard represent?", opts: ["Multiple characters", "Single character", "No characters", "All characters"], correct: 1 },
        { q: "What is file sorting?", opts: ["Random arrangement", "Organized arrangement", "No arrangement", "Hidden arrangement"], correct: 1 },
        { q: "Which is a sorting criteria?", opts: ["Name", "Size", "Date", "All of the above"], correct: 3 },
        { q: "What is file filtering?", opts: ["Showing all files", "Showing specific files", "Hiding all files", "Deleting files"], correct: 1 },
        { q: "What is file association?", opts: ["File relationship", "Program linked to file type", "File location", "File size"], correct: 1 },
        { q: "What is default program?", opts: ["Any program", "Program that opens file type", "System program", "Hidden program"], correct: 1 },
        { q: "What is file properties dialog?", opts: ["File content", "File information display", "File editor", "File creator"], correct: 1 },
        { q: "What is disk cleanup?", opts: ["Adding files", "Removing unnecessary files", "Moving files", "Copying files"], correct: 1 }
    ],

    advanced: [
        // Advanced Programming Logic - 50 questions
        { q: "What is recursion in programming?", opts: ["Loop structure", "Function calling itself", "Variable declaration", "Conditional statement"], correct: 1 },
        { q: "What is the base case in recursion?", opts: ["First call", "Stopping condition", "Error condition", "Loop condition"], correct: 1 },
        { q: "Which data structure uses LIFO principle?", opts: ["Queue", "Stack", "Array", "Tree"], correct: 1 },
        { q: "Which data structure uses FIFO principle?", opts: ["Stack", "Queue", "Array", "Tree"], correct: 1 },
        { q: "What is time complexity?", opts: ["Program execution time", "Algorithm efficiency measure", "Memory usage", "Code length"], correct: 1 },
        { q: "What is space complexity?", opts: ["Program size", "Memory usage measure", "Execution time", "Code complexity"], correct: 1 },
        { q: "Which sorting algorithm is most efficient?", opts: ["Bubble sort", "Selection sort", "Quick sort", "Insertion sort"], correct: 2 },
        { q: "What is Big O notation?", opts: ["Program size", "Algorithm complexity measure", "Memory size", "Code length"], correct: 1 },
        { q: "What is binary search?", opts: ["Linear search", "Divide and conquer search", "Random search", "Sequential search"], correct: 1 },
        { q: "What is linear search?", opts: ["Binary search", "Sequential search", "Random search", "Divide search"], correct: 1 },
        { q: "What is a hash table?", opts: ["Sequential storage", "Key-value storage", "Stack storage", "Queue storage"], correct: 1 },
        { q: "What is collision in hashing?", opts: ["No conflict", "Same hash value conflict", "Different values", "Hash function error"], correct: 1 },
        { q: "What is a linked list?", opts: ["Array structure", "Node-based structure", "Stack structure", "Queue structure"], correct: 1 },
        { q: "What is a binary tree?", opts: ["Linear structure", "Hierarchical structure", "Sequential structure", "Random structure"], correct: 1 },
        { q: "What is tree traversal?", opts: ["Tree creation", "Visiting tree nodes", "Tree deletion", "Tree modification"], correct: 1 },
        { q: "What is depth-first search?", opts: ["Breadth exploration", "Deep exploration first", "Random exploration", "Sequential exploration"], correct: 1 },
        { q: "What is breadth-first search?", opts: ["Deep exploration", "Level-wise exploration", "Random exploration", "Sequential exploration"], correct: 1 },
        { q: "What is dynamic programming?", opts: ["Static programming", "Optimization technique", "Simple programming", "Random programming"], correct: 1 },
        { q: "What is memoization?", opts: ["Memory deletion", "Storing computed results", "Memory allocation", "Memory deallocation"], correct: 1 },
        { q: "What is greedy algorithm?", opts: ["Global optimization", "Local optimization", "No optimization", "Random optimization"], correct: 1 },
        { q: "What is divide and conquer?", opts: ["Single problem solving", "Problem division strategy", "Problem multiplication", "Problem addition"], correct: 1 },
        { q: "What is backtracking?", opts: ["Forward only", "Trial and error with undo", "Random approach", "Linear approach"], correct: 1 },
        { q: "What is graph in data structure?", opts: ["Linear structure", "Network of nodes", "Sequential structure", "Stack structure"], correct: 1 },
        { q: "What is vertex in graph?", opts: ["Edge", "Node", "Path", "Weight"], correct: 1 },
        { q: "What is edge in graph?", opts: ["Node", "Connection between nodes", "Path", "Weight"], correct: 1 },
        { q: "What is directed graph?", opts: ["No direction", "One-way connections", "Two-way connections", "Random connections"], correct: 1 },
        { q: "What is undirected graph?", opts: ["One-way connections", "Two-way connections", "No connections", "Random connections"], correct: 1 },
        { q: "What is weighted graph?", opts: ["No weights", "Edges have values", "Nodes have values", "Random values"], correct: 1 },
        { q: "What is shortest path algorithm?", opts: ["Longest path", "Minimum distance path", "Random path", "Maximum path"], correct: 1 },
        { q: "What is Dijkstra's algorithm?", opts: ["Sorting algorithm", "Shortest path algorithm", "Search algorithm", "Tree algorithm"], correct: 1 },
        { q: "What is minimum spanning tree?", opts: ["Maximum tree", "Minimum connected tree", "Random tree", "Disconnected tree"], correct: 1 },
        { q: "What is Kruskal's algorithm?", opts: ["Sorting algorithm", "MST algorithm", "Search algorithm", "Path algorithm"], correct: 1 },
        { q: "What is Prim's algorithm?", opts: ["Sorting algorithm", "MST algorithm", "Search algorithm", "Path algorithm"], correct: 1 },
        { q: "What is topological sorting?", opts: ["Random sorting", "Dependency-based ordering", "Alphabetical sorting", "Numerical sorting"], correct: 1 },
        { q: "What is strongly connected component?", opts: ["Weakly connected", "Mutually reachable nodes", "Disconnected nodes", "Single node"], correct: 1 },
        { q: "What is heap data structure?", opts: ["Linear structure", "Complete binary tree", "Random structure", "Sequential structure"], correct: 1 },
        { q: "What is max heap?", opts: ["Minimum at root", "Maximum at root", "Random at root", "Average at root"], correct: 1 },
        { q: "What is min heap?", opts: ["Maximum at root", "Minimum at root", "Random at root", "Average at root"], correct: 1 },
        { q: "What is heap sort?", opts: ["Linear sort", "Heap-based sorting", "Random sort", "Sequential sort"], correct: 1 },
        { q: "What is priority queue?", opts: ["FIFO queue", "Priority-based queue", "LIFO queue", "Random queue"], correct: 1 },
        { q: "What is trie data structure?", opts: ["Number storage", "String storage tree", "Random storage", "Sequential storage"], correct: 1 },
        { q: "What is suffix tree?", opts: ["Prefix tree", "Substring tree", "Random tree", "Number tree"], correct: 1 },
        { q: "What is B-tree?", opts: ["Binary tree", "Multi-way tree", "Linear tree", "Random tree"], correct: 1 },
        { q: "What is AVL tree?", opts: ["Unbalanced tree", "Self-balancing tree", "Random tree", "Linear tree"], correct: 1 },
        { q: "What is red-black tree?", opts: ["Color-based balanced tree", "Random tree", "Linear tree", "Unbalanced tree"], correct: 0 },
        { q: "What is segment tree?", opts: ["Linear structure", "Range query tree", "Random tree", "Simple tree"], correct: 1 },
        { q: "What is fenwick tree?", opts: ["Random tree", "Binary indexed tree", "Linear tree", "Simple tree"], correct: 1 },
        { q: "What is union-find?", opts: ["Separation structure", "Disjoint set structure", "Linear structure", "Random structure"], correct: 1 },
        { q: "What is bloom filter?", opts: ["Exact membership", "Probabilistic membership", "Random filter", "Linear filter"], correct: 1 },
        { q: "What is skip list?", opts: ["Linear list", "Probabilistic data structure", "Random list", "Simple list"], correct: 1 }
    ]
};

async function seedGrade7Questions() {
    console.log('🌱 SEEDING GRADE 7 COMPREHENSIVE QUESTIONS');
    console.log('==========================================');
    console.log('Topics: Internet basics, file handling, digital safety, and programming introduction');
    console.log('Target: 300+ questions (150 basic, 100 medium, 50 advanced)');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        let totalAdded = 0;
        const grade = 7;

        // Add basic questions (150)
        console.log('📗 Adding basic questions...');
        for (let i = 0; i < grade7Questions.basic.length; i++) {
            const q = grade7Questions.basic[i];
            
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

        // Add medium questions (120)
        console.log('📙 Adding medium questions...');
        for (let i = 0; i < grade7Questions.medium.length; i++) {
            const q = grade7Questions.medium[i];
            
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
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add advanced questions (50)
        console.log('📕 Adding advanced questions...');
        for (let i = 0; i < grade7Questions.advanced.length; i++) {
            const q = grade7Questions.advanced[i];
            
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
        console.log('✅ GRADE 7 SEEDING COMPLETED!');
        console.log('============================');
        console.log(`📊 Total questions added: ${totalAdded}`);
        console.log(`📗 Basic questions: ${grade7Questions.basic.length}`);
        console.log(`📙 Medium questions: ${grade7Questions.medium.length}`);
        console.log(`📕 Advanced questions: ${grade7Questions.advanced.length}`);
        console.log('');
        console.log('Topics covered:');
        console.log('• Types of Computers (Laptop, Supercomputer)');
        console.log('• Operating Systems (Windows, Linux)');
        console.log('• Internet & Web Browsers');
        console.log('• Email Basics');
        console.log('• File Extensions (.jpg, .mp3)');
        console.log('• Cyber Safety (Passwords, Phishing)');
        console.log('• Introduction to Programming (Scratch, Python)');
        console.log('• Binary Numbers');
        console.log('• Python Basics: Intro to programming concepts, variables, and logic');
        console.log('• HTML Tags & Structure: Basic awareness of web pages and tags');
        console.log('• Networking: Intro to LAN/WAN and IP concepts');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Grade 7 questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedGrade7Questions();
}

module.exports = { seedGrade7Questions, grade7Questions };