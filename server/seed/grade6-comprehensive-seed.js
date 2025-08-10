#!/usr/bin/env node

/**
 * Grade 6 Comprehensive Seeding - 300+ Questions
 * Topics: Basic computer parts, usage, and digital literacy
 * Focus: Foundational Awareness
 */

const database = require('../config/database');

const grade6Questions = {
    basic: [
        // Parts of a Computer (CPU, Monitor, Mouse) - 25 questions
        { q: "What does CPU stand for?", opts: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"], correct: 1 },
        { q: "Which part of the computer is called the 'brain'?", opts: ["Monitor", "CPU", "Mouse", "Keyboard"], correct: 1 },
        { q: "What is the main function of the CPU?", opts: ["Display images", "Process instructions", "Store data", "Print documents"], correct: 1 },
        { q: "Which device displays information from the computer?", opts: ["CPU", "Mouse", "Monitor", "Keyboard"], correct: 2 },
        { q: "What type of device is a mouse?", opts: ["Output device", "Input device", "Storage device", "Processing device"], correct: 1 },
        { q: "Which part of the computer case contains the CPU?", opts: ["Monitor", "Motherboard", "Keyboard", "Mouse"], correct: 1 },
        { q: "What is the screen of a computer called?", opts: ["CPU", "Monitor", "Mouse", "Speaker"], correct: 1 },
        { q: "Which device is used to point and click?", opts: ["Keyboard", "Monitor", "Mouse", "CPU"], correct: 2 },
        { q: "What connects all the parts inside a computer?", opts: ["Mouse", "Monitor", "Motherboard", "Keyboard"], correct: 2 },
        { q: "Which part processes all the calculations?", opts: ["Monitor", "Mouse", "Keyboard", "CPU"], correct: 3 },
        { q: "What is the main circuit board called?", opts: ["CPU", "Motherboard", "Monitor", "Mouse"], correct: 1 },
        { q: "Which device shows the output of computer work?", opts: ["Mouse", "Keyboard", "Monitor", "CPU"], correct: 2 },
        { q: "What does the CPU do with instructions?", opts: ["Stores them", "Displays them", "Processes them", "Prints them"], correct: 2 },
        { q: "Which part of computer is visible outside the case?", opts: ["CPU", "Motherboard", "Monitor", "RAM"], correct: 2 },
        { q: "What is used to move the cursor on screen?", opts: ["CPU", "Monitor", "Mouse", "Motherboard"], correct: 2 },
        { q: "Which component is essential for computer to work?", opts: ["Mouse", "Monitor", "CPU", "Speaker"], correct: 2 },
        { q: "What type of component is a monitor?", opts: ["Input", "Output", "Processing", "Storage"], correct: 1 },
        { q: "Which device helps in selecting items on screen?", opts: ["CPU", "Mouse", "Monitor", "Motherboard"], correct: 1 },
        { q: "What is the function of computer monitor?", opts: ["Process data", "Store data", "Display data", "Input data"], correct: 2 },
        { q: "Which part contains electronic circuits?", opts: ["Mouse", "Monitor screen", "CPU chip", "Keyboard keys"], correct: 2 },
        { q: "What makes the cursor move on screen?", opts: ["CPU", "Monitor", "Mouse movement", "Keyboard"], correct: 2 },
        { q: "Which component is called the processor?", opts: ["Mouse", "Monitor", "CPU", "Keyboard"], correct: 2 },
        { q: "What displays text and images?", opts: ["CPU", "Mouse", "Monitor", "Motherboard"], correct: 2 },
        { q: "Which device has buttons for clicking?", opts: ["Monitor", "CPU", "Mouse", "Motherboard"], correct: 2 },
        { q: "What is the main processing component?", opts: ["Mouse", "Monitor", "Keyboard", "CPU"], correct: 3 },

        // Input & Output Devices - 25 questions
        { q: "Which is an input device?", opts: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2 },
        { q: "Which is an output device?", opts: ["Mouse", "Keyboard", "Scanner", "Monitor"], correct: 3 },
        { q: "What type of device is a printer?", opts: ["Input device", "Output device", "Storage device", "Processing device"], correct: 1 },
        { q: "Which device is used to type text?", opts: ["Mouse", "Monitor", "Keyboard", "Speaker"], correct: 2 },
        { q: "What type of device is a microphone?", opts: ["Output device", "Input device", "Storage device", "Display device"], correct: 1 },
        { q: "Which device produces sound?", opts: ["Keyboard", "Mouse", "Scanner", "Speaker"], correct: 3 },
        { q: "What is a scanner used for?", opts: ["Printing documents", "Inputting images", "Playing music", "Displaying text"], correct: 1 },
        { q: "Which device is used to hear computer sounds?", opts: ["Monitor", "Keyboard", "Speaker", "Mouse"], correct: 2 },
        { q: "What type of device is a webcam?", opts: ["Output device", "Input device", "Storage device", "Processing device"], correct: 1 },
        { q: "Which device prints documents on paper?", opts: ["Monitor", "Scanner", "Printer", "Speaker"], correct: 2 },
        { q: "What is used to input voice into computer?", opts: ["Speaker", "Monitor", "Microphone", "Printer"], correct: 2 },
        { q: "Which device captures images for computer?", opts: ["Printer", "Speaker", "Scanner", "Monitor"], correct: 2 },
        { q: "What type of device is a joystick?", opts: ["Output device", "Input device", "Storage device", "Display device"], correct: 1 },
        { q: "Which device displays computer output visually?", opts: ["Speaker", "Microphone", "Monitor", "Scanner"], correct: 2 },
        { q: "What is used to input drawings into computer?", opts: ["Speaker", "Monitor", "Graphics tablet", "Printer"], correct: 2 },
        { q: "Which device converts sound to digital signals?", opts: ["Speaker", "Microphone", "Monitor", "Printer"], correct: 1 },
        { q: "What type of device is a touchscreen?", opts: ["Only input", "Only output", "Both input and output", "Storage device"], correct: 2 },
        { q: "Which device is used for gaming input?", opts: ["Printer", "Monitor", "Joystick", "Speaker"], correct: 2 },
        { q: "What converts digital signals to sound?", opts: ["Microphone", "Scanner", "Speaker", "Monitor"], correct: 2 },
        { q: "Which device reads printed text into computer?", opts: ["Printer", "Speaker", "Scanner", "Monitor"], correct: 2 },
        { q: "What is used to input handwritten text?", opts: ["Keyboard", "Graphics tablet", "Monitor", "Speaker"], correct: 1 },
        { q: "Which device produces hard copy output?", opts: ["Monitor", "Speaker", "Printer", "Scanner"], correct: 2 },
        { q: "What type of device is a digital camera?", opts: ["Output device", "Input device", "Storage device", "Processing device"], correct: 1 },
        { q: "Which device is used to input coordinates?", opts: ["Speaker", "Mouse", "Monitor", "Printer"], correct: 1 },
        { q: "What produces visual output on screen?", opts: ["Keyboard", "Mouse", "Monitor", "Microphone"], correct: 2 },

        // Types of Software (System vs Application) - 25 questions
        { q: "What is software?", opts: ["Physical parts", "Programs and instructions", "Hardware components", "Storage devices"], correct: 1 },
        { q: "Which is system software?", opts: ["MS Word", "Operating System", "Games", "Calculator"], correct: 1 },
        { q: "What is application software?", opts: ["Operating system", "Device drivers", "MS Word", "BIOS"], correct: 2 },
        { q: "Which manages computer hardware?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What type of software is Windows?", opts: ["Application software", "System software", "Game software", "Utility software"], correct: 1 },
        { q: "Which is an example of application software?", opts: ["Windows", "Linux", "MS Paint", "Device driver"], correct: 2 },
        { q: "What controls computer resources?", opts: ["Games", "MS Word", "Operating System", "Calculator"], correct: 2 },
        { q: "Which software helps run other programs?", opts: ["MS Word", "System software", "Games", "Calculator"], correct: 1 },
        { q: "What type of software is a game?", opts: ["System software", "Application software", "Operating system", "Device driver"], correct: 1 },
        { q: "Which software manages files and folders?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What is the main difference between system and application software?", opts: ["No difference", "System manages hardware, application performs tasks", "Application is faster", "System is smaller"], correct: 1 },
        { q: "Which software is loaded first when computer starts?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What type of software is an antivirus program?", opts: ["Game software", "System software", "Application software", "Hardware"], correct: 1 },
        { q: "Which software provides platform for other software?", opts: ["MS Word", "System software", "Games", "Calculator"], correct: 1 },
        { q: "What is used to create documents?", opts: ["Operating system", "Device driver", "Word processor", "System software"], correct: 2 },
        { q: "Which software manages computer memory?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What type of software is a web browser?", opts: ["System software", "Application software", "Operating system", "Device driver"], correct: 1 },
        { q: "Which software controls input/output operations?", opts: ["Games", "MS Word", "Operating System", "Calculator"], correct: 2 },
        { q: "What is used for entertainment on computer?", opts: ["Operating system", "Device driver", "Games", "System software"], correct: 2 },
        { q: "Which software manages computer security?", opts: ["Games", "MS Word", "Operating System", "Calculator"], correct: 2 },
        { q: "What type of software is a media player?", opts: ["System software", "Application software", "Operating system", "Device driver"], correct: 1 },
        { q: "Which software allocates computer resources?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What is used to edit photos?", opts: ["Operating system", "Device driver", "Photo editor", "System software"], correct: 2 },
        { q: "Which software provides user interface?", opts: ["Games", "MS Word", "Operating System", "Calculator"], correct: 2 },
        { q: "What type of software is a spreadsheet program?", opts: ["System software", "Application software", "Operating system", "Device driver"], correct: 1 },

        // Storage Devices (USB, CD/DVD) - 25 questions
        { q: "Which stores data permanently?", opts: ["RAM", "Cache", "Hard disk", "Register"], correct: 2 },
        { q: "What does USB stand for?", opts: ["Universal Serial Bus", "United System Bus", "Universal System Bus", "United Serial Bus"], correct: 0 },
        { q: "Which is a portable storage device?", opts: ["RAM", "CPU", "USB drive", "Monitor"], correct: 2 },
        { q: "What type of storage is a CD?", opts: ["Magnetic", "Optical", "Electronic", "Mechanical"], correct: 1 },
        { q: "Which device can store more data?", opts: ["Floppy disk", "CD", "DVD", "USB drive"], correct: 3 },
        { q: "What is the main advantage of USB drives?", opts: ["Very cheap", "Portable and reusable", "Very large", "Very fast"], correct: 1 },
        { q: "Which storage device uses laser to read data?", opts: ["Hard disk", "USB drive", "CD/DVD", "RAM"], correct: 2 },
        { q: "What type of storage is a hard disk?", opts: ["Optical", "Magnetic", "Electronic", "Mechanical"], correct: 1 },
        { q: "Which is removable storage?", opts: ["Hard disk", "RAM", "USB drive", "CPU"], correct: 2 },
        { q: "What can you do with a USB drive?", opts: ["Only read data", "Only write data", "Both read and write", "Neither read nor write"], correct: 2 },
        { q: "Which storage device is inside the computer?", opts: ["USB drive", "CD", "Hard disk", "DVD"], correct: 2 },
        { q: "What is the capacity unit for storage devices?", opts: ["Hertz", "Watts", "Bytes", "Volts"], correct: 2 },
        { q: "Which device stores the operating system?", opts: ["USB drive", "CD", "Hard disk", "RAM"], correct: 2 },
        { q: "What type of data can be stored on CD?", opts: ["Only music", "Only pictures", "Only text", "All types of data"], correct: 3 },
        { q: "Which is faster for data access?", opts: ["CD", "DVD", "Hard disk", "Floppy disk"], correct: 2 },
        { q: "What is the main use of DVD?", opts: ["Only music", "Movies and large data", "Only text", "Only pictures"], correct: 1 },
        { q: "Which storage device connects via USB port?", opts: ["Hard disk", "CD", "USB drive", "RAM"], correct: 2 },
        { q: "What happens to data when computer is turned off?", opts: ["All data is lost", "Only RAM data is lost", "Only hard disk data is lost", "No data is lost"], correct: 1 },
        { q: "Which device can be written to multiple times?", opts: ["CD-R", "DVD-R", "USB drive", "CD-ROM"], correct: 2 },
        { q: "What is the smallest storage unit?", opts: ["Bit", "Byte", "Kilobyte", "Megabyte"], correct: 0 },
        { q: "Which device is best for backing up data?", opts: ["RAM", "CPU", "External hard disk", "Monitor"], correct: 2 },
        { q: "What type of storage is flash memory?", opts: ["Magnetic", "Optical", "Electronic", "Mechanical"], correct: 2 },
        { q: "Which device can store data without power?", opts: ["RAM", "Cache", "Hard disk", "Register"], correct: 2 },
        { q: "What is the advantage of optical storage?", opts: ["Very fast", "Cannot be damaged", "Long-lasting", "Very cheap"], correct: 2 },
        { q: "Which storage device is most portable?", opts: ["Hard disk", "CD", "USB drive", "DVD"], correct: 2 },

        // Desktop Elements (Icons, Taskbar) - 25 questions
        { q: "What is the desktop?", opts: ["Computer hardware", "Main screen background", "A software program", "Storage device"], correct: 1 },
        { q: "What are icons?", opts: ["Small pictures representing programs", "Computer parts", "Storage devices", "Input devices"], correct: 0 },
        { q: "Where is the taskbar usually located?", opts: ["Top of screen", "Bottom of screen", "Left side", "Right side"], correct: 1 },
        { q: "What does double-clicking an icon do?", opts: ["Deletes it", "Opens the program", "Moves it", "Copies it"], correct: 1 },
        { q: "Which button is used to minimize windows?", opts: ["X button", "- button", "□ button", "Start button"], correct: 1 },
        { q: "What is the Start button used for?", opts: ["Turn off computer", "Access programs and settings", "Close programs", "Delete files"], correct: 1 },
        { q: "Where can you see running programs?", opts: ["Desktop", "Taskbar", "Start menu", "Recycle bin"], correct: 1 },
        { q: "What happens when you right-click on desktop?", opts: ["Computer shuts down", "Context menu appears", "All programs close", "Screen goes black"], correct: 1 },
        { q: "Which icon is used for deleted files?", opts: ["My Computer", "Start button", "Recycle Bin", "My Documents"], correct: 2 },
        { q: "What is a shortcut icon?", opts: ["Original program file", "Quick access to program", "Deleted program", "System file"], correct: 1 },
        { q: "How do you arrange icons on desktop?", opts: ["Cannot be arranged", "Drag and drop", "Only automatically", "Use keyboard only"], correct: 1 },
        { q: "What shows the current time?", opts: ["Start button", "Desktop", "System tray", "Recycle bin"], correct: 2 },
        { q: "Which area shows system notifications?", opts: ["Desktop", "Start menu", "System tray", "Taskbar buttons"], correct: 2 },
        { q: "What is wallpaper?", opts: ["Computer part", "Desktop background image", "Software program", "Hardware component"], correct: 1 },
        { q: "How do you select multiple icons?", opts: ["Click each one", "Hold Ctrl and click", "Double-click", "Right-click"], correct: 1 },
        { q: "What does the maximize button do?", opts: ["Closes window", "Makes window full screen", "Minimizes window", "Deletes window"], correct: 1 },
        { q: "Where are program shortcuts usually placed?", opts: ["Taskbar only", "Desktop only", "Both desktop and start menu", "System tray only"], correct: 2 },
        { q: "What is the purpose of window title bar?", opts: ["Shows window content", "Shows window name and controls", "Shows desktop", "Shows taskbar"], correct: 1 },
        { q: "How do you close a window?", opts: ["Click minimize", "Click maximize", "Click X button", "Click start button"], correct: 2 },
        { q: "What shows which programs are running?", opts: ["Desktop icons", "Taskbar buttons", "Start menu", "System tray"], correct: 1 },
        { q: "Which key combination shows desktop?", opts: ["Ctrl+Alt", "Alt+Tab", "Windows+D", "Ctrl+Shift"], correct: 2 },
        { q: "What is a window?", opts: ["Computer screen", "Rectangular area showing program", "Desktop background", "Taskbar area"], correct: 1 },
        { q: "How do you rename an icon?", opts: ["Double-click", "Right-click and rename", "Left-click", "Drag and drop"], correct: 1 },
        { q: "What shows system status information?", opts: ["Desktop", "Start menu", "System tray", "Window title"], correct: 2 },
        { q: "Which button opens the Start menu?", opts: ["X button", "- button", "Start button", "□ button"], correct: 2 },

        // Keyboard Shortcuts - 25 questions
        { q: "Which key is used to delete?", opts: ["Ctrl", "Alt", "Delete", "Shift"], correct: 2 },
        { q: "What does Ctrl+C do?", opts: ["Cut", "Copy", "Paste", "Delete"], correct: 1 },
        { q: "Which shortcut is used to paste?", opts: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], correct: 1 },
        { q: "What does Ctrl+X do?", opts: ["Copy", "Paste", "Cut", "Undo"], correct: 2 },
        { q: "Which key combination undoes last action?", opts: ["Ctrl+Y", "Ctrl+Z", "Ctrl+A", "Ctrl+S"], correct: 1 },
        { q: "What does Ctrl+A do?", opts: ["Select all", "Copy all", "Delete all", "Save all"], correct: 0 },
        { q: "Which shortcut saves a file?", opts: ["Ctrl+A", "Ctrl+S", "Ctrl+O", "Ctrl+N"], correct: 1 },
        { q: "What does Alt+Tab do?", opts: ["Close program", "Switch between programs", "Open new program", "Save file"], correct: 1 },
        { q: "Which key combination opens new document?", opts: ["Ctrl+N", "Ctrl+O", "Ctrl+S", "Ctrl+P"], correct: 0 },
        { q: "What does Ctrl+P do?", opts: ["Paste", "Print", "Play", "Program"], correct: 1 },
        { q: "Which shortcut opens a file?", opts: ["Ctrl+N", "Ctrl+O", "Ctrl+S", "Ctrl+C"], correct: 1 },
        { q: "What does F1 key usually do?", opts: ["Save file", "Print", "Help", "Exit"], correct: 2 },
        { q: "Which key combination selects all text?", opts: ["Ctrl+C", "Ctrl+V", "Ctrl+A", "Ctrl+X"], correct: 2 },
        { q: "What does Ctrl+F do?", opts: ["File menu", "Find/Search", "Font", "Format"], correct: 1 },
        { q: "Which shortcut closes current window?", opts: ["Alt+F4", "Ctrl+F4", "Shift+F4", "F4"], correct: 0 },
        { q: "What does Windows key do?", opts: ["Closes windows", "Opens Start menu", "Minimizes windows", "Maximizes windows"], correct: 1 },
        { q: "Which key combination refreshes page?", opts: ["F4", "F5", "F6", "F7"], correct: 1 },
        { q: "What does Ctrl+Home do?", opts: ["Go to end", "Go to beginning", "Go to middle", "Go to next page"], correct: 1 },
        { q: "Which shortcut goes to end of document?", opts: ["Ctrl+Home", "Ctrl+End", "Ctrl+Up", "Ctrl+Down"], correct: 1 },
        { q: "What does Tab key do?", opts: ["Delete text", "Move to next field", "Copy text", "Save file"], correct: 1 },
        { q: "Which key combination makes text bold?", opts: ["Ctrl+B", "Ctrl+I", "Ctrl+U", "Ctrl+T"], correct: 0 },
        { q: "What does Ctrl+I do?", opts: ["Bold text", "Italic text", "Underline text", "Insert text"], correct: 1 },
        { q: "Which shortcut underlines text?", opts: ["Ctrl+B", "Ctrl+I", "Ctrl+U", "Ctrl+T"], correct: 2 },
        { q: "What does Escape key do?", opts: ["Save file", "Cancel operation", "Delete file", "Open file"], correct: 1 },
        { q: "Which key combination redoes last action?", opts: ["Ctrl+Z", "Ctrl+Y", "Ctrl+R", "Ctrl+D"], correct: 1 },

        // Uses of Computers in Daily Life - 25 questions
        { q: "How are computers used in schools?", opts: ["Only for games", "Teaching and learning", "Only for storage", "Only for printing"], correct: 1 },
        { q: "Which field uses computers for patient records?", opts: ["Agriculture", "Healthcare", "Sports", "Cooking"], correct: 1 },
        { q: "How do banks use computers?", opts: ["Only for decoration", "Managing accounts and transactions", "Only for printing", "Only for games"], correct: 1 },
        { q: "What do computers help with in shopping?", opts: ["Only payment", "Inventory and billing", "Only decoration", "Only security"], correct: 1 },
        { q: "How are computers used in entertainment?", opts: ["Only for work", "Games, movies, and music", "Only for storage", "Only for printing"], correct: 1 },
        { q: "Which transportation system uses computers?", opts: ["Only cars", "Traffic lights and navigation", "Only bicycles", "Only walking"], correct: 1 },
        { q: "How do computers help in communication?", opts: ["Only phone calls", "Email, chat, and video calls", "Only letters", "Only face-to-face"], correct: 1 },
        { q: "What role do computers play in weather forecasting?", opts: ["No role", "Analyzing weather data", "Only displaying", "Only storing"], correct: 1 },
        { q: "How are computers used in agriculture?", opts: ["Only for decoration", "Crop monitoring and planning", "Only for storage", "Only for games"], correct: 1 },
        { q: "Which home appliance uses computer technology?", opts: ["Only furniture", "Smart TV and washing machine", "Only decorations", "Only manual tools"], correct: 1 },
        { q: "How do computers help in education?", opts: ["Only for games", "Online learning and research", "Only for printing", "Only for storage"], correct: 1 },
        { q: "What is the use of computers in libraries?", opts: ["Only decoration", "Book cataloging and search", "Only storage", "Only games"], correct: 1 },
        { q: "How are computers used in manufacturing?", opts: ["Only for decoration", "Automation and quality control", "Only for storage", "Only for games"], correct: 1 },
        { q: "Which service uses computers for reservations?", opts: ["Only restaurants", "Airlines and hotels", "Only shops", "Only schools"], correct: 1 },
        { q: "How do computers help in scientific research?", opts: ["Only for games", "Data analysis and simulation", "Only for printing", "Only for storage"], correct: 1 },
        { q: "What is the role of computers in space exploration?", opts: ["No role", "Navigation and data collection", "Only decoration", "Only storage"], correct: 1 },
        { q: "How are computers used in art and design?", opts: ["Only for storage", "Digital drawing and modeling", "Only for games", "Only for printing"], correct: 1 },
        { q: "Which emergency service uses computers?", opts: ["Only fire department", "Police, ambulance, and fire", "Only hospitals", "Only schools"], correct: 1 },
        { q: "How do computers help in sports?", opts: ["Only for decoration", "Score tracking and analysis", "Only for storage", "Only for games"], correct: 1 },
        { q: "What is the use of computers in journalism?", opts: ["Only for games", "Writing and publishing news", "Only for storage", "Only for decoration"], correct: 1 },
        { q: "How are computers used in music?", opts: ["Only for storage", "Recording and editing", "Only for games", "Only for decoration"], correct: 1 },
        { q: "Which government service uses computers?", opts: ["Only decoration", "Record keeping and services", "Only games", "Only storage"], correct: 1 },
        { q: "How do computers help in photography?", opts: ["Only for storage", "Editing and enhancement", "Only for games", "Only for decoration"], correct: 1 },
        { q: "What is the role of computers in architecture?", opts: ["Only for games", "Building design and planning", "Only for storage", "Only for decoration"], correct: 1 },
        { q: "How are computers used in social media?", opts: ["Only for storage", "Connecting and sharing", "Only for games", "Only for decoration"], correct: 1 }
    ],

    medium: [
        // Advanced Computer Parts Understanding - 30 questions
        { q: "What is the function of motherboard?", opts: ["Store data", "Connect all components", "Process data", "Display information"], correct: 1 },
        { q: "Which memory is volatile?", opts: ["Hard disk", "RAM", "ROM", "Flash drive"], correct: 1 },
        { q: "What is the difference between RAM and ROM?", opts: ["RAM is permanent, ROM is temporary", "RAM is temporary, ROM is permanent", "Both are permanent", "Both are temporary"], correct: 1 },
        { q: "Which component controls all computer operations?", opts: ["ALU", "Control Unit", "Memory", "Input devices"], correct: 1 },
        { q: "What is cache memory used for?", opts: ["Permanent storage", "Temporary fast storage", "Input processing", "Output display"], correct: 1 },
        { q: "Which bus carries data between components?", opts: ["Address bus", "Control bus", "Data bus", "System bus"], correct: 2 },
        { q: "What is the function of ALU?", opts: ["Store data", "Perform calculations", "Control operations", "Display output"], correct: 1 },
        { q: "Which memory is fastest?", opts: ["Hard disk", "RAM", "Cache", "ROM"], correct: 2 },
        { q: "What is virtual memory?", opts: ["Physical RAM", "Hard disk space used as RAM", "Cache memory", "ROM space"], correct: 1 },
        { q: "Which component manages input/output operations?", opts: ["CPU", "RAM", "I/O Controller", "Hard disk"], correct: 2 },
        { q: "What is the purpose of heat sink?", opts: ["Store data", "Cool CPU", "Process instructions", "Display output"], correct: 1 },
        { q: "Which memory stores BIOS?", opts: ["RAM", "Hard disk", "ROM", "Cache"], correct: 2 },
        { q: "What is the function of power supply unit?", opts: ["Process data", "Provide electricity", "Store data", "Display output"], correct: 1 },
        { q: "Which component determines computer speed?", opts: ["Hard disk size", "RAM size", "CPU speed", "Monitor size"], correct: 2 },
        { q: "What is the purpose of expansion slots?", opts: ["Store data", "Add new components", "Cool system", "Process data"], correct: 1 },
        { q: "Which memory is non-volatile?", opts: ["RAM", "Cache", "Hard disk", "Register"], correct: 2 },
        { q: "What is the function of graphics card?", opts: ["Store data", "Process visual data", "Control system", "Input data"], correct: 1 },
        { q: "Which component connects to internet?", opts: ["CPU", "RAM", "Network card", "Hard disk"], correct: 2 },
        { q: "What is the purpose of sound card?", opts: ["Display images", "Process audio", "Store data", "Control system"], correct: 1 },
        { q: "Which memory hierarchy is correct?", opts: ["Cache > RAM > Hard disk", "RAM > Cache > Hard disk", "Hard disk > RAM > Cache", "Cache > Hard disk > RAM"], correct: 0 },
        { q: "What is the function of BIOS?", opts: ["Run applications", "Start computer", "Store files", "Display output"], correct: 1 },
        { q: "Which component stores operating system?", opts: ["RAM", "Cache", "Hard disk", "ROM"], correct: 2 },
        { q: "What is the purpose of CPU fan?", opts: ["Make noise", "Cool processor", "Store data", "Process instructions"], correct: 1 },
        { q: "Which memory is directly accessible by CPU?", opts: ["Hard disk", "CD-ROM", "RAM", "USB drive"], correct: 2 },
        { q: "What is the function of chipset?", opts: ["Store data", "Manage data flow", "Display output", "Input data"], correct: 1 },
        { q: "Which component determines graphics quality?", opts: ["CPU", "RAM", "Graphics card", "Hard disk"], correct: 2 },
        { q: "What is the purpose of optical drive?", opts: ["Store data permanently", "Read CDs/DVDs", "Process data", "Display output"], correct: 1 },
        { q: "Which memory retains data without power?", opts: ["RAM", "Cache", "Flash memory", "Register"], correct: 2 },
        { q: "What is the function of USB controller?", opts: ["Display output", "Manage USB devices", "Store data", "Process instructions"], correct: 1 },
        { q: "Which component affects multitasking ability?", opts: ["Monitor size", "Keyboard type", "RAM amount", "Mouse speed"], correct: 2 },

        // Software Categories and Functions - 30 questions
        { q: "What is utility software?", opts: ["Games", "System maintenance tools", "Word processors", "Web browsers"], correct: 1 },
        { q: "Which software manages computer resources?", opts: ["MS Word", "Games", "Operating System", "Calculator"], correct: 2 },
        { q: "What is device driver software?", opts: ["Games", "Hardware communication programs", "Text editors", "Web browsers"], correct: 1 },
        { q: "Which type of software is antivirus?", opts: ["Application", "System", "Utility", "Game"], correct: 2 },
        { q: "What is firmware?", opts: ["Application software", "Software stored in hardware", "System software", "Utility software"], correct: 1 },
        { q: "Which software translates high-level code?", opts: ["Games", "Compiler", "Word processor", "Media player"], correct: 1 },
        { q: "What is open source software?", opts: ["Expensive software", "Free and modifiable software", "Closed software", "System software only"], correct: 1 },
        { q: "Which software manages files and folders?", opts: ["Games", "File manager", "Calculator", "Media player"], correct: 1 },
        { q: "What is proprietary software?", opts: ["Free software", "Owned by company", "Open source", "System software"], correct: 1 },
        { q: "Which software creates presentations?", opts: ["Text editor", "Spreadsheet", "Presentation software", "Database"], correct: 2 },
        { q: "What is database software used for?", opts: ["Games", "Data storage and management", "Text editing", "Image editing"], correct: 1 },
        { q: "Which software edits images?", opts: ["Text editor", "Spreadsheet", "Graphics software", "Calculator"], correct: 2 },
        { q: "What is spreadsheet software used for?", opts: ["Text editing", "Calculations and data", "Games", "Image editing"], correct: 1 },
        { q: "Which software browses internet?", opts: ["Text editor", "Web browser", "Calculator", "Media player"], correct: 1 },
        { q: "What is multimedia software?", opts: ["Text only", "Audio, video, and graphics", "Numbers only", "System management"], correct: 1 },
        { q: "Which software compresses files?", opts: ["Text editor", "Compression utility", "Calculator", "Games"], correct: 1 },
        { q: "What is educational software?", opts: ["Games only", "Learning and teaching tools", "System tools", "Office tools"], correct: 1 },
        { q: "Which software manages email?", opts: ["Text editor", "Email client", "Calculator", "Games"], correct: 1 },
        { q: "What is CAD software used for?", opts: ["Games", "Computer-aided design", "Text editing", "Calculations"], correct: 1 },
        { q: "Which software creates music?", opts: ["Text editor", "Audio software", "Calculator", "Spreadsheet"], correct: 1 },
        { q: "What is simulation software?", opts: ["Games only", "Real-world modeling", "Text editing", "File management"], correct: 1 },
        { q: "Which software manages projects?", opts: ["Games", "Project management software", "Calculator", "Text editor"], correct: 1 },
        { q: "What is accounting software used for?", opts: ["Games", "Financial management", "Text editing", "Image editing"], correct: 1 },
        { q: "Which software creates websites?", opts: ["Calculator", "Web development tools", "Games", "Media player"], correct: 1 },
        { q: "What is backup software?", opts: ["Games", "Data protection tools", "Text editors", "Calculators"], correct: 1 },
        { q: "Which software manages inventory?", opts: ["Games", "Inventory management system", "Text editor", "Calculator"], correct: 1 },
        { q: "What is communication software?", opts: ["Games only", "Messaging and calling tools", "Text editing", "File management"], correct: 1 },
        { q: "Which software creates animations?", opts: ["Text editor", "Animation software", "Calculator", "Spreadsheet"], correct: 1 },
        { q: "What is security software?", opts: ["Games", "Protection tools", "Text editors", "Media players"], correct: 1 },
        { q: "Which software manages networks?", opts: ["Games", "Network management tools", "Text editor", "Calculator"], correct: 1 },

        // Storage and File Management - 30 questions
        { q: "What is file extension?", opts: ["File size", "File type identifier", "File location", "File date"], correct: 1 },
        { q: "Which extension indicates image file?", opts: [".txt", ".jpg", ".exe", ".doc"], correct: 1 },
        { q: "What does .mp3 extension indicate?", opts: ["Image file", "Audio file", "Video file", "Text file"], correct: 1 },
        { q: "Which is larger storage unit?", opts: ["Byte", "Kilobyte", "Megabyte", "Gigabyte"], correct: 3 },
        { q: "What is file compression?", opts: ["Making files larger", "Reducing file size", "Changing file type", "Deleting files"], correct: 1 },
        { q: "Which file format is for documents?", opts: [".jpg", ".mp3", ".doc", ".exe"], correct: 2 },
        { q: "What is folder hierarchy?", opts: ["Random organization", "Organized structure", "File size order", "Date order"], correct: 1 },
        { q: "Which operation copies file to new location?", opts: ["Cut", "Copy", "Move", "Delete"], correct: 1 },
        { q: "What happens when you cut a file?", opts: ["File is copied", "File is moved", "File is deleted", "File is renamed"], correct: 1 },
        { q: "Which storage has fastest access?", opts: ["Hard disk", "CD-ROM", "SSD", "USB drive"], correct: 2 },
        { q: "What is file backup?", opts: ["Deleting files", "Creating file copies", "Moving files", "Renaming files"], correct: 1 },
        { q: "Which file type contains executable code?", opts: [".txt", ".jpg", ".exe", ".mp3"], correct: 2 },
        { q: "What is file fragmentation?", opts: ["File corruption", "File scattered on disk", "File compression", "File encryption"], correct: 1 },
        { q: "Which tool organizes fragmented files?", opts: ["Antivirus", "Defragmenter", "Compressor", "Editor"], correct: 1 },
        { q: "What is file attribute?", opts: ["File content", "File properties", "File location", "File name"], correct: 1 },
        { q: "Which attribute makes file unchangeable?", opts: ["Hidden", "Read-only", "System", "Archive"], correct: 1 },
        { q: "What is file path?", opts: ["File size", "File location address", "File type", "File date"], correct: 1 },
        { q: "Which character separates folders in path?", opts: [".", ",", "\\", ";"], correct: 2 },
        { q: "What is root directory?", opts: ["Last folder", "Top-level folder", "Hidden folder", "System folder"], correct: 1 },
        { q: "Which operation permanently removes file?", opts: ["Cut", "Copy", "Delete", "Move"], correct: 2 },
        { q: "What is file recovery?", opts: ["Creating files", "Restoring deleted files", "Moving files", "Copying files"], correct: 1 },
        { q: "Which storage is most reliable?", opts: ["Floppy disk", "Hard disk", "Cloud storage", "RAM"], correct: 2 },
        { q: "What is file synchronization?", opts: ["Deleting files", "Matching file versions", "Moving files", "Renaming files"], correct: 1 },
        { q: "Which file system is used by Windows?", opts: ["FAT", "NTFS", "EXT", "HFS"], correct: 1 },
        { q: "What is file allocation table?", opts: ["File content", "File location record", "File type list", "File size chart"], correct: 1 },
        { q: "Which operation creates file shortcut?", opts: ["Copy", "Cut", "Link", "Move"], correct: 2 },
        { q: "What is file encryption?", opts: ["File compression", "File protection", "File copying", "File moving"], correct: 1 },
        { q: "Which tool checks file integrity?", opts: ["Editor", "Checksum", "Compressor", "Viewer"], correct: 1 },
        { q: "What is file versioning?", opts: ["File copying", "Tracking file changes", "File moving", "File deleting"], correct: 1 },
        { q: "Which storage method is most secure?", opts: ["Local storage", "Cloud storage", "Encrypted storage", "Network storage"], correct: 2 },

        // Digital Literacy and Safety - 30 questions
        { q: "What is digital literacy?", opts: ["Reading books", "Using technology effectively", "Writing letters", "Drawing pictures"], correct: 1 },
        { q: "Which is a strong password?", opts: ["123456", "password", "MyP@ssw0rd123", "abc"], correct: 2 },
        { q: "What should you do with suspicious emails?", opts: ["Open immediately", "Delete without opening", "Forward to friends", "Reply quickly"], correct: 1 },
        { q: "Which information should be kept private?", opts: ["Favorite color", "Personal address", "Favorite food", "Hobby"], correct: 1 },
        { q: "What is cyberbullying?", opts: ["Online gaming", "Online harassment", "Online shopping", "Online learning"], correct: 1 },
        { q: "Which website connection is secure?", opts: ["http://", "https://", "ftp://", "file://"], correct: 1 },
        { q: "What is phishing?", opts: ["Catching fish", "Stealing personal information", "Playing games", "Sending emails"], correct: 1 },
        { q: "Which action protects your computer?", opts: ["Sharing passwords", "Installing antivirus", "Opening all emails", "Downloading everything"], correct: 1 },
        { q: "What is malware?", opts: ["Good software", "Harmful software", "Free software", "System software"], correct: 1 },
        { q: "Which is safe internet practice?", opts: ["Sharing personal info", "Meeting online strangers", "Using strong passwords", "Clicking all links"], correct: 2 },
        { q: "What is spam email?", opts: ["Important messages", "Unwanted messages", "Personal messages", "Work messages"], correct: 1 },
        { q: "Which should you verify before downloading?", opts: ["File size only", "Source reliability", "File name only", "Download speed"], correct: 1 },
        { q: "What is two-factor authentication?", opts: ["One password", "Two passwords", "Extra security step", "No security"], correct: 2 },
        { q: "Which is appropriate online behavior?", opts: ["Being rude", "Being respectful", "Sharing secrets", "Bullying others"], correct: 1 },
        { q: "What should you do if cyberbullied?", opts: ["Ignore completely", "Tell trusted adult", "Respond angrily", "Share with everyone"], correct: 1 },
        { q: "Which information is safe to share online?", opts: ["Home address", "Phone number", "Favorite book", "Bank details"], correct: 2 },
        { q: "What is digital footprint?", opts: ["Foot size", "Online activity trace", "Computer size", "Internet speed"], correct: 1 },
        { q: "Which is good password practice?", opts: ["Same password everywhere", "Different passwords", "No passwords", "Simple passwords"], correct: 1 },
        { q: "What should you do with pop-up ads?", opts: ["Click immediately", "Close carefully", "Share with friends", "Download content"], correct: 1 },
        { q: "Which is safe social media practice?", opts: ["Accept all friend requests", "Share everything", "Check privacy settings", "Post personal details"], correct: 2 },
        { q: "What is identity theft?", opts: ["Stealing objects", "Stealing personal information", "Stealing food", "Stealing books"], correct: 1 },
        { q: "Which should you do before posting?", opts: ["Post immediately", "Think about consequences", "Share with everyone", "Use real name always"], correct: 1 },
        { q: "What is appropriate screen time?", opts: ["24 hours daily", "Balanced with other activities", "Only at night", "Never"], correct: 1 },
        { q: "Which is reliable information source?", opts: ["Any website", "Verified sources", "Social media only", "Anonymous posts"], correct: 1 },
        { q: "What should you do with personal photos?", opts: ["Share publicly", "Keep private", "Send to strangers", "Post everywhere"], correct: 1 },
        { q: "Which is good digital citizenship?", opts: ["Breaking rules", "Following guidelines", "Ignoring others", "Being mean"], correct: 1 },
        { q: "What is copyright?", opts: ["Right to copy", "Legal protection of work", "Free use of anything", "No restrictions"], correct: 1 },
        { q: "Which is ethical computer use?", opts: ["Stealing software", "Using licensed software", "Sharing passwords", "Hacking systems"], correct: 1 },
        { q: "What should you do with software updates?", opts: ["Ignore them", "Install promptly", "Delete them", "Share them"], correct: 1 },
        { q: "Which protects against viruses?", opts: ["Sharing files", "Antivirus software", "Opening all emails", "No protection needed"], correct: 1 }
    ],

    advanced: [
        // Computer Architecture and Advanced Concepts - 50 questions
        { q: "What is the Von Neumann architecture?", opts: ["Separate instruction and data memory", "Shared memory for instructions and data", "No memory system", "Only instruction memory"], correct: 1 },
        { q: "Which component executes arithmetic operations?", opts: ["Control Unit", "ALU", "Memory", "Input Unit"], correct: 1 },
        { q: "What is instruction pipelining?", opts: ["Sequential instruction execution", "Parallel instruction processing", "Memory management", "Data storage"], correct: 1 },
        { q: "Which memory level is closest to CPU?", opts: ["RAM", "Hard disk", "Cache", "ROM"], correct: 2 },
        { q: "What is the purpose of program counter?", opts: ["Count programs", "Track next instruction address", "Count data", "Track memory usage"], correct: 1 },
        { q: "Which bus carries memory addresses?", opts: ["Data bus", "Address bus", "Control bus", "System bus"], correct: 1 },
        { q: "What is interrupt handling?", opts: ["Error processing", "Priority-based task switching", "Memory allocation", "Data transfer"], correct: 1 },
        { q: "Which architecture uses separate instruction and data paths?", opts: ["Von Neumann", "Harvard", "RISC", "CISC"], correct: 1 },
        { q: "What is branch prediction?", opts: ["Memory prediction", "Instruction flow prediction", "Data prediction", "Cache prediction"], correct: 1 },
        { q: "Which technique improves CPU performance?", opts: ["Caching", "Pipelining", "Superscalar execution", "All of the above"], correct: 3 },
        { q: "What is memory hierarchy principle?", opts: ["Random organization", "Speed and cost optimization", "Size only matters", "Location based"], correct: 1 },
        { q: "Which cache replacement policy is most effective?", opts: ["FIFO", "LRU", "Random", "LIFO"], correct: 1 },
        { q: "What is virtual memory management?", opts: ["Physical memory only", "Disk space as extended memory", "Cache management", "ROM usage"], correct: 1 },
        { q: "Which instruction set has simpler instructions?", opts: ["CISC", "RISC", "Both same", "Neither"], correct: 1 },
        { q: "What is superscalar execution?", opts: ["Single instruction per cycle", "Multiple instructions per cycle", "No instruction execution", "Slow execution"], correct: 1 },
        { q: "Which component manages memory allocation?", opts: ["ALU", "Control Unit", "MMU", "Cache"], correct: 2 },
        { q: "What is out-of-order execution?", opts: ["Sequential execution", "Instructions executed as ready", "No execution", "Random execution"], correct: 1 },
        { q: "Which memory has the highest bandwidth?", opts: ["Hard disk", "RAM", "Cache", "ROM"], correct: 2 },
        { q: "What is instruction-level parallelism?", opts: ["Sequential processing", "Concurrent instruction execution", "Memory parallelism", "No parallelism"], correct: 1 },
        { q: "Which component predicts branch outcomes?", opts: ["ALU", "Branch predictor", "Cache", "Memory"], correct: 1 },
        { q: "What is write-through cache policy?", opts: ["Write to cache only", "Write to cache and memory", "Write to memory only", "No writing"], correct: 1 },
        { q: "Which addressing mode uses register content?", opts: ["Immediate", "Direct", "Indirect", "Register"], correct: 3 },
        { q: "What is temporal locality?", opts: ["Nearby data access", "Recent data reuse", "Random access", "Sequential access"], correct: 1 },
        { q: "Which component handles floating-point operations?", opts: ["ALU", "FPU", "Control Unit", "Memory"], correct: 1 },
        { q: "What is spatial locality?", opts: ["Recent data reuse", "Nearby data access", "Random access", "No pattern"], correct: 1 },
        { q: "Which technique reduces memory access time?", opts: ["Slower memory", "Caching", "More memory", "Less memory"], correct: 1 },
        { q: "What is write-back cache policy?", opts: ["Immediate memory write", "Delayed memory write", "No memory write", "Continuous writing"], correct: 1 },
        { q: "Which component manages I/O operations?", opts: ["CPU only", "I/O controller", "Memory", "Cache"], correct: 1 },
        { q: "What is instruction fetch stage?", opts: ["Execute instruction", "Get instruction from memory", "Store result", "Decode instruction"], correct: 1 },
        { q: "Which memory type retains data without power?", opts: ["SRAM", "DRAM", "Flash", "Cache"], correct: 2 },
        { q: "What is hazard in pipelining?", opts: ["No problem", "Conflict between instructions", "Fast execution", "Memory issue"], correct: 1 },
        { q: "Which component decodes instructions?", opts: ["ALU", "Control Unit", "Memory", "Cache"], correct: 1 },
        { q: "What is register renaming?", opts: ["Changing register names", "Avoiding register conflicts", "Deleting registers", "Adding registers"], correct: 1 },
        { q: "Which memory has lowest latency?", opts: ["Hard disk", "RAM", "Cache", "ROM"], correct: 2 },
        { q: "What is speculative execution?", opts: ["Certain execution", "Predicted path execution", "No execution", "Slow execution"], correct: 1 },
        { q: "Which component stores frequently used data?", opts: ["Hard disk", "RAM", "Cache", "ROM"], correct: 2 },
        { q: "What is instruction decode stage?", opts: ["Fetch instruction", "Understand instruction", "Execute instruction", "Store result"], correct: 1 },
        { q: "Which technique handles data dependencies?", opts: ["Ignoring them", "Forwarding", "Stopping pipeline", "Random handling"], correct: 1 },
        { q: "What is write buffer?", opts: ["Read buffer", "Temporary write storage", "Permanent storage", "No buffer"], correct: 1 },
        { q: "Which component manages virtual memory?", opts: ["CPU", "MMU", "Cache", "Hard disk"], correct: 1 },
        { q: "What is instruction retirement?", opts: ["Instruction deletion", "Instruction completion", "Instruction start", "Instruction fetch"], correct: 1 },
        { q: "Which memory level has highest capacity?", opts: ["Cache", "RAM", "Hard disk", "ROM"], correct: 2 },
        { q: "What is load-store architecture?", opts: ["Any memory access", "Memory access only through load/store", "No memory access", "Direct memory access"], correct: 1 },
        { q: "Which component handles exceptions?", opts: ["ALU", "Control Unit", "Memory", "Cache"], correct: 1 },
        { q: "What is instruction window?", opts: ["Single instruction", "Multiple instructions ready", "No instructions", "Completed instructions"], correct: 1 },
        { q: "Which technique improves memory bandwidth?", opts: ["Slower memory", "Memory interleaving", "Less memory", "Single memory"], correct: 1 },
        { q: "What is reservation station?", opts: ["Memory location", "Instruction waiting area", "Cache location", "Register file"], correct: 1 },
        { q: "Which component reorders instructions?", opts: ["Fetch unit", "Reorder buffer", "Cache", "Memory"], correct: 1 },
        { q: "What is memory consistency model?", opts: ["Memory size", "Memory access ordering rules", "Memory speed", "Memory type"], correct: 1 },
        { q: "Which technique reduces power consumption?", opts: ["Higher frequency", "Clock gating", "More transistors", "Larger cache"], correct: 1 }
    ]
};

async function seedGrade6Questions() {
    console.log('🌱 SEEDING GRADE 6 COMPREHENSIVE QUESTIONS');
    console.log('==========================================');
    console.log('Topics: Basic computer parts, usage, and digital literacy');
    console.log('Target: 300+ questions (150 basic, 100 medium, 50 advanced)');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        let totalAdded = 0;
        const grade = 6;

        // Add basic questions (150)
        console.log('📗 Adding basic questions...');
        for (let i = 0; i < grade6Questions.basic.length; i++) {
            const q = grade6Questions.basic[i];
            
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

        // Add medium questions (100)
        console.log('📙 Adding medium questions...');
        for (let i = 0; i < grade6Questions.medium.length; i++) {
            const q = grade6Questions.medium[i];
            
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
        for (let i = 0; i < grade6Questions.advanced.length; i++) {
            const q = grade6Questions.advanced[i];
            
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
        console.log('✅ GRADE 6 SEEDING COMPLETED!');
        console.log('============================');
        console.log(`📊 Total questions added: ${totalAdded}`);
        console.log(`📗 Basic questions: ${grade6Questions.basic.length}`);
        console.log(`📙 Medium questions: ${grade6Questions.medium.length}`);
        console.log(`📕 Advanced questions: ${grade6Questions.advanced.length}`);
        console.log('');
        console.log('Topics covered:');
        console.log('• Parts of a Computer (CPU, Monitor, Mouse)');
        console.log('• Input & Output Devices');
        console.log('• Types of Software (System vs Application)');
        console.log('• Storage Devices (USB, CD/DVD)');
        console.log('• Desktop Elements (Icons, Taskbar)');
        console.log('• Keyboard Shortcuts');
        console.log('• Uses of Computers in Daily Life');
        console.log('• Digital Literacy and Safety');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Grade 6 questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedGrade6Questions();
}

module.exports = { seedGrade6Questions, grade6Questions };