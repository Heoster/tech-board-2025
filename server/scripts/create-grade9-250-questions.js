const database = require('../config/database');

// Grade 9: 250+ Comprehensive Computer Questions
const generateGrade9Questions = () => {
    const questions = [];

    // SECTION 1: Computer Fundamentals (40 questions)
    const fundamentalsQuestions = [
        { q: 'What is a computer?', opts: ['Electronic device that processes data', 'Only a calculator', 'Only a gaming device', 'Only a communication tool'], correct: 0, diff: 'basic' },
        { q: 'What does CPU stand for?', opts: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'], correct: 0, diff: 'basic' },
        { q: 'What is the main function of ALU?', opts: ['Performs arithmetic and logical operations', 'Controls program execution', 'Stores temporary data', 'Manages input/output'], correct: 0, diff: 'basic' },
        { q: 'What does ALU stand for?', opts: ['Arithmetic Logic Unit', 'Advanced Logic Unit', 'Automatic Logic Unit', 'Applied Logic Unit'], correct: 0, diff: 'basic' },
        { q: 'What is the function of Control Unit?', opts: ['Controls and coordinates computer operations', 'Performs calculations', 'Stores data permanently', 'Displays output'], correct: 0, diff: 'basic' },
        { q: 'What are registers in CPU?', opts: ['High-speed storage locations in CPU', 'External storage devices', 'Input devices', 'Output devices'], correct: 0, diff: 'basic' },
        { q: 'What is cache memory?', opts: ['High-speed memory between CPU and RAM', 'Permanent storage memory', 'External storage device', 'Input memory device'], correct: 0, diff: 'basic' },
        { q: 'What does RAM stand for?', opts: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Remote Access Memory'], correct: 0, diff: 'basic' },
        { q: 'What does ROM stand for?', opts: ['Read Only Memory', 'Random Only Memory', 'Rapid Only Memory', 'Remote Only Memory'], correct: 0, diff: 'basic' },
        { q: 'Which memory is volatile?', opts: ['RAM', 'ROM', 'Hard Disk', 'CD-ROM'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of secondary storage?', opts: ['Hard Disk', 'RAM', 'Cache', 'Registers'], correct: 0, diff: 'basic' },
        { q: 'What is the motherboard?', opts: ['Main circuit board connecting all components', 'External storage device', 'Input device', 'Output device'], correct: 0, diff: 'basic' },
        { q: 'What is BIOS?', opts: ['Basic Input Output System', 'Binary Input Output System', 'Basic Internal Operating System', 'Binary Internal Operating System'], correct: 0, diff: 'basic' },
        { q: 'What is a bus in computer architecture?', opts: ['Pathway for data transfer between components', 'Type of storage device', 'Input device', 'Output device'], correct: 0, diff: 'medium' },
        { q: 'What is the difference between primary and secondary memory?', opts: ['Primary is directly accessible by CPU, secondary is not', 'Primary is slower than secondary', 'Primary is permanent, secondary is temporary', 'Primary is external, secondary is internal'], correct: 0, diff: 'medium' },
        { q: 'Why is cache memory faster than RAM?', opts: ['Located closer to CPU and uses faster technology', 'Has more storage capacity than RAM', 'Is permanent storage unlike RAM', 'Uses magnetic storage technology'], correct: 0, diff: 'medium' },
        { q: 'What is the boot process?', opts: ['Starting up the computer and loading OS', 'Shutting down the computer', 'Installing new software', 'Deleting files'], correct: 0, diff: 'medium' },
        { q: 'What is firmware?', opts: ['Software stored in ROM that controls hardware', 'Application software', 'System software', 'Utility software'], correct: 0, diff: 'medium' },
        { q: 'What is a heat sink?', opts: ['Device that dissipates heat from CPU', 'Storage device', 'Input device', 'Network device'], correct: 0, diff: 'medium' },
        { q: 'What is overclocking?', opts: ['Running CPU faster than designed speed', 'Slowing down CPU', 'Adding more memory', 'Installing new software'], correct: 0, diff: 'advanced' },
        { q: 'In memory hierarchy, what is the optimal arrangement from fastest to slowest?', opts: ['Registers → Cache → RAM → Secondary Storage', 'RAM → Cache → Registers → Secondary Storage', 'Secondary Storage → RAM → Cache → Registers', 'Cache → RAM → Registers → Secondary Storage'], correct: 0, diff: 'advanced' },
        { q: 'What is pipelining in CPU?', opts: ['Technique to execute multiple instructions simultaneously', 'Method to store data', 'Way to connect devices', 'Type of memory'], correct: 0, diff: 'advanced' },
        { q: 'What is virtual memory?', opts: ['Using hard disk space as additional RAM', 'Type of cache memory', 'Special type of ROM', 'Network storage'], correct: 0, diff: 'advanced' },
        { q: 'What is a chipset?', opts: ['Group of chips that control data flow', 'Single processing chip', 'Memory chip', 'Storage chip'], correct: 0, diff: 'advanced' },
        { q: 'What is the difference between SRAM and DRAM?', opts: ['SRAM is faster but more expensive than DRAM', 'DRAM is faster than SRAM', 'SRAM is permanent, DRAM is temporary', 'No difference between them'], correct: 0, diff: 'advanced' },
        { q: 'What is a graphics card?', opts: ['Hardware that processes visual data', 'Storage device', 'Input device', 'Network device'], correct: 0, diff: 'basic' },
        { q: 'What is a sound card?', opts: ['Hardware that processes audio data', 'Storage device', 'Input device', 'Display device'], correct: 0, diff: 'basic' },
        { q: 'What is a network card?', opts: ['Hardware that enables network connectivity', 'Storage device', 'Processing device', 'Display device'], correct: 0, diff: 'basic' },
        { q: 'What is USB?', opts: ['Universal Serial Bus for connecting devices', 'Type of memory', 'Type of processor', 'Type of storage'], correct: 0, diff: 'basic' },
        { q: 'What is HDMI?', opts: ['High Definition Multimedia Interface', 'Hard Disk Memory Interface', 'High Data Memory Interface', 'Hardware Device Memory Interface'], correct: 0, diff: 'basic' },
        { q: 'What is Bluetooth?', opts: ['Wireless communication technology', 'Type of cable', 'Type of memory', 'Type of processor'], correct: 0, diff: 'basic' },
        { q: 'What is Wi-Fi?', opts: ['Wireless networking technology', 'Type of cable', 'Type of memory', 'Type of storage'], correct: 0, diff: 'basic' },
        { q: 'What is a port in computer hardware?', opts: ['Connection point for external devices', 'Type of memory', 'Type of processor', 'Type of software'], correct: 0, diff: 'basic' },
        { q: 'What is a driver?', opts: ['Software that controls hardware devices', 'Hardware component', 'Type of memory', 'Type of storage'], correct: 0, diff: 'medium' },
        { q: 'What is plug and play?', opts: ['Automatic device recognition and configuration', 'Manual device installation', 'Type of connector', 'Type of software'], correct: 0, diff: 'medium' },
        { q: 'What is backward compatibility?', opts: ['Ability to work with older versions', 'Ability to work only with new versions', 'Type of memory', 'Type of storage'], correct: 0, diff: 'medium' },
        { q: 'What is form factor in computers?', opts: ['Physical size and shape specification', 'Processing speed', 'Memory capacity', 'Storage capacity'], correct: 0, diff: 'medium' },
        { q: 'What is thermal throttling?', opts: ['Reducing performance to prevent overheating', 'Increasing performance', 'Adding more memory', 'Installing new software'], correct: 0, diff: 'advanced' },
        { q: 'What is ECC memory?', opts: ['Error Correcting Code memory', 'Extended Cache Code memory', 'Enhanced Computer Code memory', 'Electronic Circuit Code memory'], correct: 0, diff: 'advanced' },
        { q: 'What is RAID?', opts: ['Redundant Array of Independent Disks', 'Random Access Independent Disks', 'Rapid Array of Internal Disks', 'Remote Access Independent Disks'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 2: Number Systems (30 questions)
    const numberSystemQuestions = [
        { q: 'How many digits are used in binary number system?', opts: ['2 (0 and 1)', '8 (0 to 7)', '10 (0 to 9)', '16 (0 to F)'], correct: 0, diff: 'basic' },
        { q: 'What is the base of decimal number system?', opts: ['10', '2', '8', '16'], correct: 0, diff: 'basic' },
        { q: 'What is the base of binary number system?', opts: ['2', '8', '10', '16'], correct: 0, diff: 'basic' },
        { q: 'What is the base of octal number system?', opts: ['8', '2', '10', '16'], correct: 0, diff: 'basic' },
        { q: 'What is the base of hexadecimal number system?', opts: ['16', '2', '8', '10'], correct: 0, diff: 'basic' },
        { q: 'Which digits are used in octal system?', opts: ['0 to 7', '0 to 9', '0 and 1', '0 to F'], correct: 0, diff: 'basic' },
        { q: 'Which symbols are used in hexadecimal system?', opts: ['0-9 and A-F', '0-9 only', '0 and 1 only', '0-7 only'], correct: 0, diff: 'basic' },
        { q: 'What does A represent in hexadecimal?', opts: ['10', '11', '12', '15'], correct: 0, diff: 'basic' },
        { q: 'What does F represent in hexadecimal?', opts: ['15', '10', '14', '16'], correct: 0, diff: 'basic' },
        { q: 'Convert binary 101 to decimal:', opts: ['5', '3', '7', '4'], correct: 0, diff: 'medium' },
        { q: 'Convert binary 1010 to decimal:', opts: ['10', '8', '12', '14'], correct: 0, diff: 'medium' },
        { q: 'Convert binary 1111 to decimal:', opts: ['15', '16', '14', '17'], correct: 0, diff: 'medium' },
        { q: 'Convert decimal 8 to binary:', opts: ['1000', '1010', '1100', '1001'], correct: 0, diff: 'medium' },
        { q: 'Convert decimal 15 to binary:', opts: ['1111', '1110', '1101', '1010'], correct: 0, diff: 'medium' },
        { q: 'Convert decimal 7 to binary:', opts: ['111', '110', '101', '100'], correct: 0, diff: 'medium' },
        { q: 'Convert octal 17 to decimal:', opts: ['15', '17', '23', '25'], correct: 0, diff: 'medium' },
        { q: 'Convert decimal 64 to octal:', opts: ['100', '80', '70', '110'], correct: 0, diff: 'medium' },
        { q: 'Convert hexadecimal A to decimal:', opts: ['10', '11', '12', '15'], correct: 0, diff: 'medium' },
        { q: 'Convert hexadecimal FF to decimal:', opts: ['255', '256', '240', '250'], correct: 0, diff: 'advanced' },
        { q: 'Convert decimal 255 to hexadecimal:', opts: ['FF', 'FE', 'EF', 'EE'], correct: 0, diff: 'advanced' },
        { q: 'What is binary addition of 1 + 1?', opts: ['10', '11', '01', '00'], correct: 0, diff: 'medium' },
        { q: 'What is binary addition of 101 + 11?', opts: ['1000', '1001', '1010', '1100'], correct: 0, diff: 'advanced' },
        { q: 'Why do computers use binary system?', opts: ['Electronic switches have two states: on/off', 'Binary is faster than decimal', 'Binary uses less memory', 'Binary is easier for humans'], correct: 0, diff: 'medium' },
        { q: 'What is a bit?', opts: ['Single binary digit (0 or 1)', 'Group of 8 binary digits', 'Decimal number', 'Hexadecimal number'], correct: 0, diff: 'basic' },
        { q: 'What is a byte?', opts: ['Group of 8 bits', 'Single bit', 'Group of 4 bits', 'Group of 16 bits'], correct: 0, diff: 'basic' },
        { q: 'What is a nibble?', opts: ['Group of 4 bits', 'Group of 8 bits', 'Single bit', 'Group of 16 bits'], correct: 0, diff: 'medium' },
        { q: 'How many different values can 1 byte represent?', opts: ['256', '128', '512', '1024'], correct: 0, diff: 'medium' },
        { q: 'What is the largest decimal number that can be represented with 4 bits?', opts: ['15', '16', '8', '31'], correct: 0, diff: 'advanced' },
        { q: 'Convert binary 11010110 to hexadecimal:', opts: ['D6', 'C6', 'E6', 'F6'], correct: 0, diff: 'advanced' },
        { q: 'What is two\'s complement?', opts: ['Method to represent negative numbers in binary', 'Method to add binary numbers', 'Method to convert to decimal', 'Method to multiply binary numbers'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 3: Boolean Logic & Gates (25 questions)
    const booleanLogicQuestions = [
        { q: 'What is the output of AND gate when both inputs are 1?', opts: ['1', '0', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'What is the output of AND gate when both inputs are 0?', opts: ['0', '1', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'What is the output of OR gate when both inputs are 0?', opts: ['0', '1', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'What is the output of OR gate when both inputs are 1?', opts: ['1', '0', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'What does NOT gate do?', opts: ['Inverts the input', 'Adds inputs', 'Multiplies inputs', 'Stores input'], correct: 0, diff: 'basic' },
        { q: 'What is the output of NOT gate when input is 1?', opts: ['0', '1', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'What is the output of NOT gate when input is 0?', opts: ['1', '0', 'Undefined', 'Error'], correct: 0, diff: 'basic' },
        { q: 'In AND gate, what is the output when inputs are A=1, B=0?', opts: ['0', '1', 'A', 'B'], correct: 0, diff: 'medium' },
        { q: 'In OR gate, what is the output when inputs are A=1, B=0?', opts: ['1', '0', 'A', 'B'], correct: 0, diff: 'medium' },
        { q: 'What is a truth table?', opts: ['Table showing all possible input-output combinations', 'Table showing only true values', 'Table showing only false values', 'Table showing mathematical operations'], correct: 0, diff: 'medium' },
        { q: 'What is NAND gate?', opts: ['NOT AND gate (inverted AND)', 'New AND gate', 'Normal AND gate', 'Negative AND gate'], correct: 0, diff: 'medium' },
        { q: 'What is NOR gate?', opts: ['NOT OR gate (inverted OR)', 'New OR gate', 'Normal OR gate', 'Negative OR gate'], correct: 0, diff: 'medium' },
        { q: 'What is XOR gate?', opts: ['Exclusive OR gate', 'Extended OR gate', 'Extra OR gate', 'Extreme OR gate'], correct: 0, diff: 'medium' },
        { q: 'What is the output of XOR gate when inputs are same?', opts: ['0', '1', 'Undefined', 'Error'], correct: 0, diff: 'medium' },
        { q: 'What is the output of XOR gate when inputs are different?', opts: ['1', '0', 'Undefined', 'Error'], correct: 0, diff: 'medium' },
        { q: 'What is Boolean algebra?', opts: ['Mathematical system for logic operations', 'Regular algebra with numbers', 'Geometry calculations', 'Statistical analysis'], correct: 0, diff: 'basic' },
        { q: 'Who developed Boolean algebra?', opts: ['George Boole', 'Charles Darwin', 'Isaac Newton', 'Albert Einstein'], correct: 0, diff: 'basic' },
        { q: 'What are the basic Boolean operations?', opts: ['AND, OR, NOT', 'ADD, SUBTRACT, MULTIPLY', 'INPUT, OUTPUT, PROCESS', 'READ, WRITE, DELETE'], correct: 0, diff: 'basic' },
        { q: 'In Boolean algebra, what does 1 represent?', opts: ['True', 'False', 'Maybe', 'Unknown'], correct: 0, diff: 'basic' },
        { q: 'In Boolean algebra, what does 0 represent?', opts: ['False', 'True', 'Maybe', 'Unknown'], correct: 0, diff: 'basic' },
        { q: 'What is De Morgan\'s Law?', opts: ['Rules for converting between AND/OR operations', 'Rules for addition', 'Rules for multiplication', 'Rules for division'], correct: 0, diff: 'advanced' },
        { q: 'What is a logic circuit?', opts: ['Electronic circuit that performs logical operations', 'Circuit for power supply', 'Circuit for display', 'Circuit for storage'], correct: 0, diff: 'medium' },
        { q: 'What is a half adder?', opts: ['Circuit that adds two single bits', 'Circuit that adds two bytes', 'Circuit that subtracts bits', 'Circuit that multiplies bits'], correct: 0, diff: 'advanced' },
        { q: 'What is a full adder?', opts: ['Circuit that adds two bits plus carry', 'Circuit that adds multiple bytes', 'Circuit that performs full calculations', 'Circuit that stores results'], correct: 0, diff: 'advanced' },
        { q: 'For OR gate with inputs A=1, B=1, what is the output and why?', opts: ['1, because OR gate outputs 1 when at least one input is 1', '0, because both inputs are the same', '2, because it adds both inputs', 'Undefined, because both inputs cannot be 1'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 4: Operating Systems (35 questions)
    const osQuestions = [
        { q: 'What is an operating system?', opts: ['Software that manages computer hardware and software', 'Hardware component of computer', 'Application software for games', 'Input device for computer'], correct: 0, diff: 'basic' },
        { q: 'What are the main functions of an operating system?', opts: ['Manage hardware, software, and user interface', 'Only run applications', 'Only store files', 'Only connect to internet'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of operating system?', opts: ['Windows', 'Microsoft Word', 'Google Chrome', 'Adobe Photoshop'], correct: 0, diff: 'basic' },
        { q: 'What is a single-user operating system?', opts: ['OS that allows only one user at a time', 'OS that has only one application', 'OS that uses one processor', 'OS that has one file'], correct: 0, diff: 'basic' },
        { q: 'What is a multi-user operating system?', opts: ['OS that allows multiple users simultaneously', 'OS that has multiple applications', 'OS that uses multiple processors', 'OS that has multiple files'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of single-user OS?', opts: ['MS-DOS', 'UNIX', 'Linux Server', 'Windows Server'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of multi-user OS?', opts: ['UNIX', 'MS-DOS', 'Windows 95', 'Personal Windows'], correct: 0, diff: 'basic' },
        { q: 'What is multitasking?', opts: ['Running multiple programs simultaneously', 'Using multiple computers', 'Having multiple users', 'Storing multiple files'], correct: 0, diff: 'basic' },
        { q: 'What is a process in OS?', opts: ['Running instance of a program', 'Stored program on disk', 'User interface element', 'Hardware component'], correct: 0, diff: 'medium' },
        { q: 'What is process scheduling?', opts: ['Determining which process runs when', 'Installing new processes', 'Deleting old processes', 'Copying processes'], correct: 0, diff: 'medium' },
        { q: 'What is memory management?', opts: ['Controlling how memory is allocated and used', 'Installing more memory', 'Cleaning memory', 'Counting memory'], correct: 0, diff: 'medium' },
        { q: 'What is file management?', opts: ['Organizing and controlling access to files', 'Creating new files only', 'Deleting files only', 'Copying files only'], correct: 0, diff: 'basic' },
        { q: 'What is device management?', opts: ['Controlling and coordinating hardware devices', 'Buying new devices', 'Repairing devices', 'Cleaning devices'], correct: 0, diff: 'medium' },
        { q: 'What is a device driver?', opts: ['Software that controls specific hardware', 'Person who operates device', 'Hardware component', 'Network connection'], correct: 0, diff: 'medium' },
        { q: 'What is the kernel?', opts: ['Core part of operating system', 'User interface', 'Application program', 'Hardware component'], correct: 0, diff: 'medium' },
        { q: 'What is a shell?', opts: ['User interface to interact with OS', 'Hardware covering', 'Storage device', 'Network protocol'], correct: 0, diff: 'medium' },
        { q: 'What is virtual memory?', opts: ['Using disk space as additional RAM', 'Memory that doesn\'t exist', 'Special type of RAM', 'Network storage'], correct: 0, diff: 'advanced' },
        { q: 'What is paging?', opts: ['Dividing memory into fixed-size blocks', 'Turning pages in a book', 'Calling someone', 'Printing pages'], correct: 0, diff: 'advanced' },
        { q: 'What is swapping?', opts: ['Moving processes between RAM and disk', 'Exchanging two files', 'Trading computers', 'Changing users'], correct: 0, diff: 'advanced' },
        { q: 'What is a thread?', opts: ['Lightweight process within a program', 'String of text', 'Network connection', 'File path'], correct: 0, diff: 'advanced' },
        { q: 'What is deadlock?', opts: ['Situation where processes wait for each other indefinitely', 'When computer stops working', 'When files are locked', 'When network is down'], correct: 0, diff: 'advanced' },
        { q: 'What is the difference between program and process?', opts: ['Program is stored code, process is running program', 'No difference between them', 'Program is faster than process', 'Process is stored, program is running'], correct: 0, diff: 'medium' },
        { q: 'What is system call?', opts: ['Request from program to OS for service', 'Phone call to technical support', 'Emergency shutdown', 'User login'], correct: 0, diff: 'advanced' },
        { q: 'What is interrupt?', opts: ['Signal that stops current process temporarily', 'Permanent stop of program', 'User input', 'Network message'], correct: 0, diff: 'advanced' },
        { q: 'What is spooling?', opts: ['Storing print jobs in queue', 'Winding up cables', 'Backing up files', 'Installing software'], correct: 0, diff: 'medium' },
        { q: 'What is buffering?', opts: ['Temporary storage of data during transfer', 'Permanent storage of data', 'Deleting data', 'Copying data'], correct: 0, diff: 'medium' },
        { q: 'What is caching?', opts: ['Storing frequently used data in fast memory', 'Hiding data from users', 'Deleting old data', 'Encrypting data'], correct: 0, diff: 'medium' },
        { q: 'What is fragmentation?', opts: ['Scattered storage of files on disk', 'Breaking files into pieces', 'Deleting parts of files', 'Copying file fragments'], correct: 0, diff: 'medium' },
        { q: 'What is defragmentation?', opts: ['Reorganizing files for better performance', 'Breaking files apart', 'Deleting fragmented files', 'Creating file fragments'], correct: 0, diff: 'medium' },
        { q: 'What is a file system?', opts: ['Method of organizing files on storage', 'Collection of files', 'Hardware for storage', 'Software for editing files'], correct: 0, diff: 'basic' },
        { q: 'What is FAT file system?', opts: ['File Allocation Table system', 'Fast Access Table system', 'File Access Tool system', 'Fixed Allocation Table system'], correct: 0, diff: 'medium' },
        { q: 'What is NTFS?', opts: ['New Technology File System', 'Network Transfer File System', 'New Transfer File System', 'Network Technology File System'], correct: 0, diff: 'medium' },
        { q: 'What is the main difference between single-user and multi-user OS?', opts: ['Multi-user allows multiple users simultaneously, single-user allows only one', 'Single-user is faster than multi-user', 'Multi-user has less security than single-user', 'Single-user can run more programs than multi-user'], correct: 0, diff: 'medium' },
        { q: 'Why would a company choose multi-user OS over single-user OS?', opts: ['Allows multiple employees to access resources simultaneously with proper security', 'Multi-user OS is always cheaper', 'Single-user OS cannot connect to internet', 'Multi-user OS uses less memory'], correct: 0, diff: 'advanced' },
        { q: 'What is real-time operating system?', opts: ['OS that responds to inputs within guaranteed time', 'OS that shows current time', 'OS that works only during day', 'OS that updates automatically'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 5: Software Classification (30 questions)
    const softwareQuestions = [
        { q: 'What is software?', opts: ['Set of instructions that tell computer what to do', 'Physical parts of computer', 'Only games and entertainment', 'Only internet browsers'], correct: 0, diff: 'basic' },
        { q: 'What is system software?', opts: ['Software that manages and controls computer hardware', 'Software for entertainment', 'Software for creating documents', 'Software for playing games'], correct: 0, diff: 'basic' },
        { q: 'What is application software?', opts: ['Software designed for end-users to accomplish specific tasks', 'Software that controls hardware', 'Software that manages memory', 'Software that controls CPU'], correct: 0, diff: 'basic' },
        { q: 'What are utility programs?', opts: ['Programs that perform maintenance tasks for computer', 'Programs for creating presentations', 'Programs for playing music', 'Programs for browsing internet'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of system software?', opts: ['Operating System', 'Microsoft Word', 'Google Chrome', 'Adobe Photoshop'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of application software?', opts: ['Microsoft Word', 'Windows OS', 'Device drivers', 'BIOS'], correct: 0, diff: 'basic' },
        { q: 'Which is an example of utility program?', opts: ['Antivirus software', 'Microsoft Word', 'Google Chrome', 'Adobe Photoshop'], correct: 0, diff: 'basic' },
        { q: 'What is programming software?', opts: ['Tools used to create other software', 'Software for end users', 'Software for entertainment', 'Software for communication'], correct: 0, diff: 'medium' },
        { q: 'What is a compiler?', opts: ['Translates source code into machine code', 'Runs programs directly', 'Edits source code', 'Deletes programs'], correct: 0, diff: 'medium' },
        { q: 'What is an interpreter?', opts: ['Executes code line by line', 'Compiles entire program first', 'Only checks syntax', 'Only formats code'], correct: 0, diff: 'medium' },
        { q: 'What is a text editor?', opts: ['Program for creating and editing text files', 'Program for viewing images', 'Program for playing videos', 'Program for browsing internet'], correct: 0, diff: 'basic' },
        { q: 'What is an IDE?', opts: ['Integrated Development Environment for programming', 'Internet Development Environment', 'Internal Development Environment', 'Interactive Development Environment'], correct: 0, diff: 'medium' },
        { q: 'What is firmware?', opts: ['Software stored in ROM that controls hardware', 'Application software', 'System software', 'Programming software'], correct: 0, diff: 'medium' },
        { q: 'What is open source software?', opts: ['Software with freely available source code', 'Software that costs money', 'Software that is closed', 'Software that is secret'], correct: 0, diff: 'basic' },
        { q: 'What is proprietary software?', opts: ['Software owned by a company with restricted access', 'Software that is free', 'Software with open source code', 'Software that anyone can modify'], correct: 0, diff: 'basic' },
        { q: 'What is freeware?', opts: ['Software available for free but source code is not available', 'Software that costs money', 'Software with open source', 'Software that is illegal'], correct: 0, diff: 'basic' },
        { q: 'What is shareware?', opts: ['Software distributed for trial use with payment required later', 'Software that is always free', 'Software that is shared illegally', 'Software that cannot be copied'], correct: 0, diff: 'basic' },
        { q: 'What is malware?', opts: ['Malicious software designed to harm computer', 'Helpful software for maintenance', 'Software for entertainment', 'Software for productivity'], correct: 0, diff: 'basic' },
        { q: 'What is a virus?', opts: ['Malicious program that replicates itself', 'Helpful program for cleaning', 'Program for antivirus protection', 'Program for system maintenance'], correct: 0, diff: 'basic' },
        { q: 'What is antivirus software?', opts: ['Program that detects and removes malicious software', 'Program that creates viruses', 'Program for system maintenance', 'Program for file management'], correct: 0, diff: 'basic' },
        { q: 'What is a device driver?', opts: ['Software that allows OS to communicate with hardware', 'Hardware component', 'Application program', 'Utility for file management'], correct: 0, diff: 'medium' },
        { q: 'What is middleware?', opts: ['Software that connects different applications or services', 'Software in the middle of hard disk', 'Software for middle-level users', 'Software with medium features'], correct: 0, diff: 'advanced' },
        { q: 'What is a software license?', opts: ['Legal agreement defining how software can be used', 'Physical certificate', 'Hardware component', 'Network protocol'], correct: 0, diff: 'medium' },
        { q: 'What is software piracy?', opts: ['Illegal copying and distribution of software', 'Legal software sharing', 'Software development', 'Software testing'], correct: 0, diff: 'basic' },
        { q: 'What is version control?', opts: ['System for tracking changes in software', 'Controlling software versions illegally', 'Deleting old software versions', 'Installing multiple versions'], correct: 0, diff: 'medium' },
        { q: 'What is beta software?', opts: ['Pre-release version for testing', 'Final released version', 'Outdated version', 'Illegal version'], correct: 0, diff: 'medium' },
        { q: 'What is alpha software?', opts: ['Early development version with limited features', 'Final version', 'Beta version', 'Stable version'], correct: 0, diff: 'medium' },
        { q: 'What is a software patch?', opts: ['Update to fix bugs or add features', 'Physical repair', 'New software installation', 'Software removal'], correct: 0, diff: 'basic' },
        { q: 'How do system software, application software, and utility programs work together?', opts: ['System software provides platform, utilities maintain system, applications serve users', 'All three work independently without interaction', 'Application software controls both system and utility programs', 'Utility programs control both system and application software'], correct: 0, diff: 'advanced' },
        { q: 'What is the difference between compiler and interpreter?', opts: ['Compiler translates entire program, interpreter executes line by line', 'No difference between them', 'Compiler is slower than interpreter', 'Interpreter creates executable files'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 6: Networking Fundamentals (40 questions)
    const networkingQuestions = [
        { q: 'What is a computer network?', opts: ['Group of connected computers that can share resources', 'Single computer with internet', 'Collection of software programs', 'Group of printers'], correct: 0, diff: 'basic' },
        { q: 'What does LAN stand for?', opts: ['Local Area Network', 'Large Area Network', 'Long Area Network', 'Limited Area Network'], correct: 0, diff: 'basic' },
        { q: 'What does WAN stand for?', opts: ['Wide Area Network', 'World Area Network', 'Wireless Area Network', 'Web Area Network'], correct: 0, diff: 'basic' },
        { q: 'What does PAN stand for?', opts: ['Personal Area Network', 'Public Area Network', 'Private Area Network', 'Protected Area Network'], correct: 0, diff: 'basic' },
        { q: 'What does MAN stand for?', opts: ['Metropolitan Area Network', 'Multiple Area Network', 'Major Area Network', 'Managed Area Network'], correct: 0, diff: 'basic' },
        { q: 'What is the internet?', opts: ['Global network of interconnected computers', 'Single large computer', 'Software program', 'Hardware device'], correct: 0, diff: 'basic' },
        { q: 'What is an intranet?', opts: ['Private network within an organization', 'Public internet', 'External network', 'Wireless network'], correct: 0, diff: 'basic' },
        { q: 'What is an extranet?', opts: ['Private network extended to selected external users', 'Public internet', 'Internal network only', 'Wireless network'], correct: 0, diff: 'medium' },
        { q: 'What is TCP/IP?', opts: ['Set of protocols for internet communication', 'Type of computer hardware', 'Programming language', 'Web browser'], correct: 0, diff: 'basic' },
        { q: 'What is an IP address?', opts: ['Unique identifier for devices on a network', 'Internet Protocol address for websites only', 'Internal Program address for software', 'Input Port address for hardware'], correct: 0, diff: 'basic' },
        { q: 'What is a MAC address?', opts: ['Unique hardware identifier for network devices', 'Software address', 'Website address', 'Email address'], correct: 0, diff: 'medium' },
        { q: 'What is a router?', opts: ['Device that forwards data between networks', 'Software for web browsing', 'Type of computer', 'Programming tool'], correct: 0, diff: 'basic' },
        { q: 'What is a switch?', opts: ['Device that connects devices within a network', 'On/off button', 'Software program', 'Storage device'], correct: 0, diff: 'basic' },
        { q: 'What is a hub?', opts: ['Simple device that connects multiple devices', 'Central computer', 'Software program', 'Storage location'], correct: 0, diff: 'basic' },
        { q: 'What is a modem?', opts: ['Device that converts digital signals to analog and vice versa', 'Type of computer', 'Software program', 'Storage device'], correct: 0, diff: 'basic' },
        { q: 'What is bandwidth?', opts: ['Amount of data that can be transmitted in given time', 'Width of computer screen', 'Size of hard disk', 'Speed of processor'], correct: 0, diff: 'medium' },
        { q: 'What is latency?', opts: ['Delay in data transmission', 'Amount of data sent', 'Network security level', 'Number of connected devices'], correct: 0, diff: 'medium' },
        { q: 'What is a protocol?', opts: ['Set of rules for communication between devices', 'Type of computer', 'Programming language', 'Web browser'], correct: 0, diff: 'basic' },
        { q: 'What does HTTP stand for?', opts: ['HyperText Transfer Protocol', 'High Tech Transfer Protocol', 'Home Text Transfer Protocol', 'Hyperlink Text Protocol'], correct: 0, diff: 'basic' },
        { q: 'What does HTTPS stand for?', opts: ['HyperText Transfer Protocol Secure', 'HyperText Transfer Protocol System', 'HyperText Transfer Protocol Standard', 'HyperText Transfer Protocol Service'], correct: 0, diff: 'basic' },
        { q: 'What does FTP stand for?', opts: ['File Transfer Protocol', 'Fast Transfer Protocol', 'Free Transfer Protocol', 'Full Transfer Protocol'], correct: 0, diff: 'basic' },
        { q: 'What does SMTP stand for?', opts: ['Simple Mail Transfer Protocol', 'Secure Mail Transfer Protocol', 'Standard Mail Transfer Protocol', 'Special Mail Transfer Protocol'], correct: 0, diff: 'medium' },
        { q: 'What is a firewall?', opts: ['Security system that controls network traffic', 'Physical barrier around computers', 'Type of antivirus software', 'Network cable'], correct: 0, diff: 'basic' },
        { q: 'What is network topology?', opts: ['Physical or logical arrangement of network devices', 'Type of network cable', 'Network software', 'Network security'], correct: 0, diff: 'medium' },
        { q: 'What is star topology?', opts: ['All devices connected to central hub', 'Devices connected in a line', 'Devices connected in a circle', 'Devices connected randomly'], correct: 0, diff: 'medium' },
        { q: 'What is bus topology?', opts: ['All devices connected to single cable', 'Devices connected to central hub', 'Devices connected in a circle', 'Devices connected in pairs'], correct: 0, diff: 'medium' },
        { q: 'What is ring topology?', opts: ['Devices connected in a circular arrangement', 'Devices connected to central hub', 'Devices connected to single cable', 'Devices connected randomly'], correct: 0, diff: 'medium' },
        { q: 'What is mesh topology?', opts: ['Every device connected to every other device', 'Devices connected to central hub', 'Devices connected in a line', 'Devices connected in a circle'], correct: 0, diff: 'advanced' },
        { q: 'What is Ethernet?', opts: ['Common networking technology for LANs', 'Type of internet connection', 'Web browser', 'Email protocol'], correct: 0, diff: 'basic' },
        { q: 'What is Wi-Fi?', opts: ['Wireless networking technology', 'Type of cable', 'Type of memory', 'Type of storage'], correct: 0, diff: 'basic' },
        { q: 'What is Bluetooth?', opts: ['Short-range wireless communication technology', 'Type of cable', 'Type of memory', 'Type of processor'], correct: 0, diff: 'basic' },
        { q: 'What is a server?', opts: ['Computer that provides services to other computers', 'Programming language', 'Web browser', 'Database'], correct: 0, diff: 'basic' },
        { q: 'What is a client?', opts: ['Computer that requests services from server', 'Person using computer', 'Network administrator', 'Internet provider'], correct: 0, diff: 'basic' },
        { q: 'What is client-server architecture?', opts: ['Model where clients request services from servers', 'Type of computer building', 'Programming pattern', 'Database design'], correct: 0, diff: 'medium' },
        { q: 'What is peer-to-peer network?', opts: ['Network where all computers can act as both client and server', 'Network with only servers', 'Network with only clients', 'Network with no connections'], correct: 0, diff: 'medium' },
        { q: 'What is the main difference between LAN and WAN?', opts: ['LAN covers small area like building, WAN covers large area like cities', 'LAN is always wireless, WAN is always wired', 'LAN is faster, WAN is always slower', 'LAN uses TCP/IP, WAN does not'], correct: 0, diff: 'medium' },
        { q: 'Why are protocols like TCP/IP important in networking?', opts: ['They provide standard rules for devices to communicate', 'They make networks faster automatically', 'They prevent all network security issues', 'They eliminate the need for IP addresses'], correct: 0, diff: 'medium' },
        { q: 'What is network security?', opts: ['Protection of network and data from unauthorized access', 'Speed of network connection', 'Number of devices in network', 'Type of network cable'], correct: 0, diff: 'basic' },
        { q: 'What is encryption in networking?', opts: ['Converting data into coded form for security', 'Speeding up data transmission', 'Compressing data', 'Storing data'], correct: 0, diff: 'medium' },
        { q: 'In a company network setup, how would LAN, WAN, and PAN be used together?', opts: ['PAN for personal devices, LAN for office network, WAN to connect multiple offices', 'All three networks work independently without connection', 'Only WAN is needed for all networking requirements', 'PAN replaces both LAN and WAN in modern networks'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 7: Internet & Web Technologies (30 questions)
    const webTechQuestions = [
        { q: 'What is the World Wide Web?', opts: ['System of interlinked hypertext documents accessed via internet', 'Same as internet', 'Type of computer', 'Programming language'], correct: 0, diff: 'basic' },
        { q: 'What is a web browser?', opts: ['Software used to access and view websites', 'Hardware device for internet connection', 'Type of computer network', 'Programming language for web'], correct: 0, diff: 'basic' },
        { q: 'What does URL stand for?', opts: ['Uniform Resource Locator', 'Universal Resource Locator', 'Uniform Resource Link', 'Universal Resource Link'], correct: 0, diff: 'basic' },
        { q: 'What does HTML stand for?', opts: ['HyperText Markup Language', 'High Tech Markup Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'], correct: 0, diff: 'basic' },
        { q: 'What is HTML used for?', opts: ['Creating structure and content of web pages', 'Styling web pages', 'Programming web functionality', 'Managing databases'], correct: 0, diff: 'basic' },
        { q: 'What does CSS stand for?', opts: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], correct: 0, diff: 'basic' },
        { q: 'What is CSS used for?', opts: ['Styling and layout of web pages', 'Creating web page structure', 'Programming web functionality', 'Managing databases'], correct: 0, diff: 'basic' },
        { q: 'What is JavaScript?', opts: ['Programming language for web interactivity', 'Markup language for web structure', 'Styling language for web design', 'Database query language'], correct: 0, diff: 'basic' },
        { q: 'What is a website?', opts: ['Collection of related web pages', 'Single web page', 'Web browser', 'Internet connection'], correct: 0, diff: 'basic' },
        { q: 'What is a web page?', opts: ['Single document on the web', 'Collection of websites', 'Web browser', 'Internet protocol'], correct: 0, diff: 'basic' },
        { q: 'What is a hyperlink?', opts: ['Clickable element that connects to another page or resource', 'Type of web page', 'Web browser feature', 'Internet protocol'], correct: 0, diff: 'basic' },
        { q: 'What is a domain name?', opts: ['Human-readable address for websites', 'Type of computer network', 'Programming variable', 'Database table'], correct: 0, diff: 'basic' },
        { q: 'What is DNS?', opts: ['Domain Name System that translates domain names to IP addresses', 'Data Network System', 'Digital Network Service', 'Database Network System'], correct: 0, diff: 'medium' },
        { q: 'What is web hosting?', opts: ['Service that stores website files on servers', 'Creating websites', 'Designing websites', 'Programming websites'], correct: 0, diff: 'basic' },
        { q: 'What is a web server?', opts: ['Computer that stores and serves web pages', 'Software for browsing web', 'Person who manages websites', 'Internet connection'], correct: 0, diff: 'basic' },
        { q: 'What is the main difference between HTTP and HTTPS?', opts: ['HTTPS is secure and encrypted, HTTP is not', 'HTTP is faster than HTTPS', 'HTTPS works only with certain browsers', 'HTTP is newer version of HTTPS'], correct: 0, diff: 'medium' },
        { q: 'What is a search engine?', opts: ['System that finds information on the web', 'Type of web browser', 'Web hosting service', 'Programming language'], correct: 0, diff: 'basic' },
        { q: 'What is SEO?', opts: ['Search Engine Optimization', 'Secure Email Operation', 'System Error Operation', 'Software Enhancement Operation'], correct: 0, diff: 'medium' },
        { q: 'What is responsive web design?', opts: ['Design that adapts to different screen sizes', 'Design that responds to user clicks', 'Design that loads quickly', 'Design with animations'], correct: 0, diff: 'medium' },
        { q: 'What is a cookie in web technology?', opts: ['Small data file stored by browser', 'Type of web page', 'Programming language', 'Network protocol'], correct: 0, diff: 'medium' },
        { q: 'What is web development?', opts: ['Process of creating websites and web applications', 'Using websites', 'Browsing the internet', 'Installing web browsers'], correct: 0, diff: 'basic' },
        { q: 'What is front-end development?', opts: ['Creating user interface and user experience', 'Server-side programming', 'Database management', 'Network configuration'], correct: 0, diff: 'medium' },
        { q: 'What is back-end development?', opts: ['Server-side logic and database management', 'User interface design', 'Website graphics', 'Network setup'], correct: 0, diff: 'medium' },
        { q: 'What is an API?', opts: ['Application Programming Interface for software communication', 'Advanced Programming Interface', 'Automated Programming Interface', 'Application Protocol Interface'], correct: 0, diff: 'advanced' },
        { q: 'What is cloud computing?', opts: ['Delivering computing services over internet', 'Computing with weather data', 'Storing data in sky', 'Using multiple computers'], correct: 0, diff: 'basic' },
        { q: 'What is e-commerce?', opts: ['Buying and selling goods/services online', 'Electronic communication', 'Email marketing', 'Electronic books'], correct: 0, diff: 'basic' },
        { q: 'What is social media?', opts: ['Online platforms for social interaction and content sharing', 'Traditional media', 'Print media', 'Television media'], correct: 0, diff: 'basic' },
        { q: 'What is cybersecurity?', opts: ['Protection of digital systems from threats', 'Type of computer virus', 'Internet connection method', 'Programming language'], correct: 0, diff: 'basic' },
        { q: 'What is digital literacy?', opts: ['Ability to use digital technology effectively', 'Ability to read books', 'Ability to write letters', 'Ability to do math'], correct: 0, diff: 'basic' },
        { q: 'What is the difference between internet and World Wide Web?', opts: ['Internet is the network infrastructure, Web is the information system built on it', 'They are exactly the same thing', 'Internet is newer than Web', 'Web is the hardware, Internet is the software'], correct: 0, diff: 'advanced' }
    ];

    // SECTION 8: Data & Information (20 questions)
    const dataQuestions = [
        { q: 'What is data?', opts: ['Raw facts and figures without context', 'Processed information', 'Final results', 'Computer programs'], correct: 0, diff: 'basic' },
        { q: 'What is information?', opts: ['Processed data that has meaning', 'Raw facts and figures', 'Computer hardware', 'Software programs'], correct: 0, diff: 'basic' },
        { q: 'What is the difference between data and information?', opts: ['Data is raw, information is processed and meaningful', 'Data and information are the same', 'Information is raw, data is processed', 'Data is digital, information is analog'], correct: 0, diff: 'medium' },
        { q: 'What is a database?', opts: ['Organized collection of data', 'Programming language', 'Computer component', 'Web browser'], correct: 0, diff: 'basic' },
        { q: 'What does DBMS stand for?', opts: ['Database Management System', 'Data Base Management Software', 'Database Management Software', 'Data Base Management Service'], correct: 0, diff: 'basic' },
        { q: 'What is a record in database?', opts: ['Complete set of data about one item', 'Single piece of data', 'Database software', 'Storage device'], correct: 0, diff: 'basic' },
        { q: 'What is a field in database?', opts: ['Single piece of data in a record', 'Complete record', 'Database table', 'Database software'], correct: 0, diff: 'basic' },
        { q: 'What is a table in database?', opts: ['Collection of related records', 'Single record', 'Single field', 'Database software'], correct: 0, diff: 'basic' },
        { q: 'What is a primary key?', opts: ['Unique identifier for each record', 'Password for database', 'Main table in database', 'First field in record'], correct: 0, diff: 'medium' },
        { q: 'What is SQL?', opts: ['Structured Query Language for databases', 'Programming language for games', 'Web development framework', 'Computer operating system'], correct: 0, diff: 'basic' },
        { q: 'What is data processing?', opts: ['Converting raw data into useful information', 'Storing data only', 'Deleting old data', 'Copying data'], correct: 0, diff: 'basic' },
        { q: 'What are the stages of data processing?', opts: ['Input, Processing, Output', 'Start, Middle, End', 'Create, Edit, Delete', 'Read, Write, Execute'], correct: 0, diff: 'medium' },
        { q: 'What is data validation?', opts: ['Checking if data meets certain criteria', 'Storing data permanently', 'Deleting invalid data', 'Copying data'], correct: 0, diff: 'medium' },
        { q: 'What is data verification?', opts: ['Checking if data was entered correctly', 'Changing data values', 'Deleting data', 'Storing data'], correct: 0, diff: 'medium' },
        { q: 'What is backup?', opts: ['Copy of data stored separately for safety', 'Original data', 'Deleted data', 'Temporary data'], correct: 0, diff: 'basic' },
        { q: 'What is data security?', opts: ['Protection of data from unauthorized access', 'Speed of data access', 'Amount of data stored', 'Type of data'], correct: 0, diff: 'basic' },
        { q: 'What is data integrity?', opts: ['Accuracy and consistency of data', 'Speed of data processing', 'Amount of data', 'Location of data'], correct: 0, diff: 'medium' },
        { q: 'What is data redundancy?', opts: ['Unnecessary duplication of data', 'Lack of data', 'Speed of data', 'Security of data'], correct: 0, diff: 'medium' },
        { q: 'What is big data?', opts: ['Extremely large datasets that require special tools', 'Small amount of data', 'Regular database', 'Single file'], correct: 0, diff: 'advanced' },
        { q: 'What is data mining?', opts: ['Process of discovering patterns in large datasets', 'Digging for physical data', 'Deleting old data', 'Storing data underground'], correct: 0, diff: 'advanced' }
    ];

    // Add all question arrays to main questions array
    questions.push(...fundamentalsQuestions);
    questions.push(...numberSystemQuestions);
    questions.push(...booleanLogicQuestions);
    questions.push(...osQuestions);
    questions.push(...softwareQuestions);
    questions.push(...networkingQuestions);
    questions.push(...webTechQuestions);
    questions.push(...dataQuestions);

    // Add grade to all questions
    return questions.map(q => ({
        ...q,
        grade: 9,
        difficulty: q.diff,
        question_text: q.q,
        options: q.opts.map((opt, index) => ({
            text: opt,
            is_correct: index === q.correct
        }))
    }));
};

async function createGrade9Comprehensive() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 CREATING GRADE 9: 250+ COMPREHENSIVE COMPUTER QUESTIONS');
        console.log('=========================================================');
        console.log('📚 Topics: Fundamentals, Number Systems, Boolean Logic, OS, Software, Networking, Web Tech, Data');
        console.log('🎯 Target: 250+ questions with Basic, Medium, Advanced levels');

        // Clear existing Grade 9 questions first
        console.log('\n🧹 Clearing existing Grade 9 questions...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE grade = 9)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions WHERE grade = 9', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Cleared existing Grade 9 questions');

        // Generate and add new questions
        const grade9Questions = generateGrade9Questions();

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        console.log(`\n📝 Adding ${grade9Questions.length} questions...`);

        for (const question of grade9Questions) {
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

            // Count by difficulty
            if (question.difficulty === 'basic') basicCount++;
            else if (question.difficulty === 'medium') mediumCount++;
            else if (question.difficulty === 'advanced') advancedCount++;

            addedCount++;
        }

        console.log(`\n✅ Successfully added ${addedCount} Grade 9 questions:`);
        console.log(`   📘 Basic: ${basicCount} questions (${Math.round(basicCount / addedCount * 100)}%)`);
        console.log(`   📙 Medium: ${mediumCount} questions (${Math.round(mediumCount / addedCount * 100)}%)`);
        console.log(`   📕 Advanced: ${advancedCount} questions (${Math.round(advancedCount / addedCount * 100)}%)`);

        // Verify final count
        const finalCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = 9', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`\n📊 Final Grade 9 count: ${finalCount} questions`);

        if (finalCount >= 250) {
            console.log(`🎉 SUCCESS: Grade 9 now has ${finalCount} questions (target: 250+)`);
        } else {
            console.log(`⚠️  WARNING: Grade 9 has only ${finalCount} questions (target: 250+)`);
        }

        console.log(`\n🎓 GRADE 9 COMPREHENSIVE TOPICS COMPLETED!`);
        console.log(`✅ Computer Fundamentals (40 questions)`);
        console.log(`✅ Number Systems & Conversions (30 questions)`);
        console.log(`✅ Boolean Logic & Gates (25 questions)`);
        console.log(`✅ Operating Systems (35 questions)`);
        console.log(`✅ Software Classification (30 questions)`);
        console.log(`✅ Networking Fundamentals (40 questions)`);
        console.log(`✅ Internet & Web Technologies (30 questions)`);
        console.log(`✅ Data & Information Processing (20 questions)`);

    } catch (error) {
        console.error('❌ Error adding Grade 9 questions:', error);
    } finally {
        await database.close();
    }
}

createGrade9Comprehensive();