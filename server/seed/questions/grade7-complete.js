// Grade 7 Complete Questions (remaining 210 questions)

const grade7CompleteQuestions = [
  // Operating Systems - Medium (15 questions)
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do different operating systems affect user experience?',
    options: [
      { text: 'Each OS has different interfaces, features, and software compatibility', is_correct: true },
      { text: 'All operating systems provide identical user experience', is_correct: false },
      { text: 'Operating systems do not affect user experience', is_correct: false },
      { text: 'Only hardware affects user experience', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What advantages does Linux offer over proprietary operating systems?',
    options: [
      { text: 'Open source, customizable, and often free to use', is_correct: true },
      { text: 'Linux is always faster than other systems', is_correct: false },
      { text: 'Linux has no advantages', is_correct: false },
      { text: 'Linux only works on expensive computers', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does file organization improve computer efficiency?',
    options: [
      { text: 'Organized files are faster to locate and access', is_correct: true },
      { text: 'File organization slows down computers', is_correct: false },
      { text: 'Organization has no impact on efficiency', is_correct: false },
      { text: 'Disorganized files work better', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the purpose of system updates?',
    options: [
      { text: 'Fix bugs, improve security, and add new features', is_correct: true },
      { text: 'Make systems slower', is_correct: false },
      { text: 'Remove useful features', is_correct: false },
      { text: 'Updates serve no purpose', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do mobile operating systems differ from desktop operating systems?',
    options: [
      { text: 'Mobile OS are optimized for touch interfaces and battery life', is_correct: true },
      { text: 'Mobile and desktop OS are identical', is_correct: false },
      { text: 'Mobile OS are always more powerful', is_correct: false },
      { text: 'Desktop OS cannot run on any device', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What role does the operating system play in security?',
    options: [
      { text: 'Controls access to system resources and manages user permissions', is_correct: true },
      { text: 'Operating systems provide no security features', is_correct: false },
      { text: 'Security is only handled by antivirus software', is_correct: false },
      { text: 'All programs have unlimited access to system resources', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does virtual memory help computer performance?',
    options: [
      { text: 'Allows running more programs than physical RAM would normally allow', is_correct: true },
      { text: 'Virtual memory slows down all programs', is_correct: false },
      { text: 'It has no impact on performance', is_correct: false },
      { text: 'Virtual memory only works with games', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is multitasking in operating systems?',
    options: [
      { text: 'Running multiple programs simultaneously', is_correct: true },
      { text: 'Using multiple computers at once', is_correct: false },
      { text: 'Having multiple users on one computer', is_correct: false },
      { text: 'Installing multiple operating systems', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do device drivers work with operating systems?',
    options: [
      { text: 'They translate OS commands into hardware-specific instructions', is_correct: true },
      { text: 'Drivers replace the need for operating systems', is_correct: false },
      { text: 'Operating systems do not use drivers', is_correct: false },
      { text: 'Drivers only work with old hardware', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the importance of regular system backups?',
    options: [
      { text: 'Protects against data loss from hardware failure or corruption', is_correct: true },
      { text: 'Backups slow down computer performance', is_correct: false },
      { text: 'Backups are not necessary', is_correct: false },
      { text: 'Only businesses need backups', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does file compression help in storage management?',
    options: [
      { text: 'Reduces file size to save storage space', is_correct: true },
      { text: 'Compression makes files larger', is_correct: false },
      { text: 'Compressed files cannot be opened', is_correct: false },
      { text: 'Compression has no benefits', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is system monitoring and why is it important?',
    options: [
      { text: 'Tracking system performance to identify and prevent problems', is_correct: true },
      { text: 'Monitoring slows down computer performance', is_correct: false },
      { text: 'System monitoring is not useful', is_correct: false },
      { text: 'Only experts can monitor systems', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do user accounts enhance system security?',
    options: [
      { text: 'Different users have different access levels and permissions', is_correct: true },
      { text: 'User accounts reduce system security', is_correct: false },
      { text: 'All users should have identical access', is_correct: false },
      { text: 'User accounts are not related to security', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the role of system registry in Windows?',
    options: [
      { text: 'Stores system and application configuration settings', is_correct: true },
      { text: 'Registry only stores user files', is_correct: false },
      { text: 'Registry is not important for system operation', is_correct: false },
      { text: 'Registry only works with old programs', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does automatic system maintenance benefit users?',
    options: [
      { text: 'Performs routine tasks without user intervention', is_correct: true },
      { text: 'Automatic maintenance damages the system', is_correct: false },
      { text: 'Users must perform all maintenance manually', is_correct: false },
      { text: 'Maintenance is not necessary for computers', is_correct: false }
    ]
  },

  // Operating Systems - Advanced (10 questions)
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does the kernel function as the core of an operating system?',
    options: [
      { text: 'It manages system resources and provides low-level services to other programs', is_correct: true },
      { text: 'The kernel only handles user interface', is_correct: false },
      { text: 'Kernels are not important in operating systems', is_correct: false },
      { text: 'The kernel only manages files', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the significance of process scheduling in operating systems?',
    options: [
      { text: 'It determines how CPU time is allocated among running programs', is_correct: true },
      { text: 'Process scheduling only affects file operations', is_correct: false },
      { text: 'Scheduling is not necessary in modern systems', is_correct: false },
      { text: 'All processes run simultaneously without scheduling', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How do operating systems handle memory management?',
    options: [
      { text: 'They allocate and deallocate memory for programs and prevent conflicts', is_correct: true },
      { text: 'Programs manage their own memory without OS involvement', is_correct: false },
      { text: 'Memory management is not an OS function', is_correct: false },
      { text: 'All programs share the same memory space', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What role does the file system play in operating system architecture?',
    options: [
      { text: 'It provides structured methods for storing and retrieving data', is_correct: true },
      { text: 'File systems only affect document creation', is_correct: false },
      { text: 'Operating systems do not need file systems', is_correct: false },
      { text: 'File systems only work with text files', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does virtualization technology relate to operating systems?',
    options: [
      { text: 'It allows multiple operating systems to run on the same hardware', is_correct: true },
      { text: 'Virtualization eliminates the need for operating systems', is_correct: false },
      { text: 'Only one OS can run on virtualized hardware', is_correct: false },
      { text: 'Virtualization is not related to operating systems', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the impact of operating system choice on software compatibility?',
    options: [
      { text: 'Different OS require software specifically designed for their architecture', is_correct: true },
      { text: 'All software works on any operating system', is_correct: false },
      { text: 'Operating system choice does not affect software', is_correct: false },
      { text: 'Compatibility is only determined by hardware', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How do distributed operating systems differ from traditional single-machine systems?',
    options: [
      { text: 'They coordinate resources across multiple connected computers', is_correct: true },
      { text: 'Distributed systems are slower than single-machine systems', is_correct: false },
      { text: 'There is no difference between distributed and single-machine systems', is_correct: false },
      { text: 'Distributed systems only work with old hardware', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What challenges do operating systems face with modern multi-core processors?',
    options: [
      { text: 'Efficiently distributing tasks across multiple cores while avoiding conflicts', is_correct: true },
      { text: 'Multi-core processors do not affect operating systems', is_correct: false },
      { text: 'Operating systems cannot use multiple cores', is_correct: false },
      { text: 'Multi-core processors make operating systems obsolete', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does real-time operating system design differ from general-purpose systems?',
    options: [
      { text: 'Real-time systems prioritize predictable response times over overall throughput', is_correct: true },
      { text: 'Real-time systems are always faster than general-purpose systems', is_correct: false },
      { text: 'There is no difference between real-time and general-purpose systems', is_correct: false },
      { text: 'Real-time systems cannot multitask', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the future direction of operating system development?',
    options: [
      { text: 'Greater integration with cloud services, AI, and IoT devices', is_correct: true },
      { text: 'Operating systems will become obsolete', is_correct: false },
      { text: 'Future systems will be identical to current ones', is_correct: false },
      { text: 'Operating system development has stopped', is_correct: false }
    ]
  },

  // Advanced Office Applications - Basic (12 questions)
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What are tables used for in Microsoft Word?',
    options: [
      { text: 'Organizing data in rows and columns', is_correct: true },
      { text: 'Creating pictures', is_correct: false },
      { text: 'Playing music', is_correct: false },
      { text: 'Connecting to internet', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a header in a Word document?',
    options: [
      { text: 'Text that appears at the top of every page', is_correct: true },
      { text: 'The title of the document', is_correct: false },
      { text: 'The first paragraph', is_correct: false },
      { text: 'A type of font', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a footer in a Word document?',
    options: [
      { text: 'Text that appears at the bottom of every page', is_correct: true },
      { text: 'The last paragraph', is_correct: false },
      { text: 'A footnote', is_correct: false },
      { text: 'The document signature', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a formula in Excel?',
    options: [
      { text: 'An equation that performs calculations on cell values', is_correct: true },
      { text: 'A type of chart', is_correct: false },
      { text: 'A cell color', is_correct: false },
      { text: 'A font style', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What does the SUM function do in Excel?',
    options: [
      { text: 'Adds up numbers in selected cells', is_correct: true },
      { text: 'Subtracts numbers', is_correct: false },
      { text: 'Multiplies numbers', is_correct: false },
      { text: 'Divides numbers', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is an animation in PowerPoint?',
    options: [
      { text: 'Movement effects applied to text or objects', is_correct: true },
      { text: 'A type of slide', is_correct: false },
      { text: 'A presentation template', is_correct: false },
      { text: 'A font style', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a transition in PowerPoint?',
    options: [
      { text: 'Effect used when moving from one slide to another', is_correct: true },
      { text: 'A type of animation', is_correct: false },
      { text: 'A slide layout', is_correct: false },
      { text: 'A presentation theme', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What are file formats?',
    options: [
      { text: 'Different ways to save and store files', is_correct: true },
      { text: 'File sizes', is_correct: false },
      { text: 'File colors', is_correct: false },
      { text: 'File locations', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What does .docx represent?',
    options: [
      { text: 'Microsoft Word document format', is_correct: true },
      { text: 'Excel spreadsheet format', is_correct: false },
      { text: 'PowerPoint presentation format', is_correct: false },
      { text: 'Image file format', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What does .xlsx represent?',
    options: [
      { text: 'Excel spreadsheet format', is_correct: true },
      { text: 'Word document format', is_correct: false },
      { text: 'PowerPoint presentation format', is_correct: false },
      { text: 'PDF format', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is file compatibility?',
    options: [
      { text: 'Whether a file can be opened by different programs', is_correct: true },
      { text: 'How fast a file opens', is_correct: false },
      { text: 'The size of a file', is_correct: false },
      { text: 'The color of a file icon', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'Why might you insert a table in a Word document?',
    options: [
      { text: 'To organize information in a structured format', is_correct: true },
      { text: 'To make the document longer', is_correct: false },
      { text: 'To change the font', is_correct: false },
      { text: 'To add pictures', is_correct: false }
    ]
  },

  // Advanced Office Applications - Medium (13 questions)
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do advanced Word features improve document professionalism?',
    options: [
      { text: 'They provide consistent formatting and professional layout options', is_correct: true },
      { text: 'Advanced features make documents harder to read', is_correct: false },
      { text: 'Professional appearance is not important', is_correct: false },
      { text: 'Basic features are always better than advanced ones', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the benefit of using Excel functions over manual calculations?',
    options: [
      { text: 'Functions are faster, more accurate, and automatically update', is_correct: true },
      { text: 'Manual calculations are always more accurate', is_correct: false },
      { text: 'Functions are slower than manual calculations', is_correct: false },
      { text: 'There is no difference between functions and manual calculations', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do PowerPoint animations enhance presentations?',
    options: [
      { text: 'They draw attention to key points and make content more engaging', is_correct: true },
      { text: 'Animations always distract from the content', is_correct: false },
      { text: 'Animations are not useful in presentations', is_correct: false },
      { text: 'Static presentations are always better', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'Why is understanding file formats important?',
    options: [
      { text: 'Different formats have different capabilities and compatibility', is_correct: true },
      { text: 'All file formats are identical', is_correct: false },
      { text: 'File formats do not matter', is_correct: false },
      { text: 'Only one file format should be used', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do headers and footers improve document organization?',
    options: [
      { text: 'They provide consistent information across all pages', is_correct: true },
      { text: 'Headers and footers make documents confusing', is_correct: false },
      { text: 'They are only decorative elements', is_correct: false },
      { text: 'Documents should not have headers or footers', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What makes Excel formulas powerful for data analysis?',
    options: [
      { text: 'They can perform complex calculations and reference multiple cells', is_correct: true },
      { text: 'Formulas only work with simple addition', is_correct: false },
      { text: 'Excel cannot perform data analysis', is_correct: false },
      { text: 'Manual analysis is always better than formulas', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do transitions affect the flow of a PowerPoint presentation?',
    options: [
      { text: 'They create smooth movement between slides and maintain audience attention', is_correct: true },
      { text: 'Transitions always interrupt the presentation flow', is_correct: false },
      { text: 'Presentations should never use transitions', is_correct: false },
      { text: 'Transitions have no effect on presentations', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the advantage of using styles in Word documents?',
    options: [
      { text: 'Consistent formatting and easy document-wide changes', is_correct: true },
      { text: 'Styles make documents look unprofessional', is_correct: false },
      { text: 'Manual formatting is always better than styles', is_correct: false },
      { text: 'Styles only work with certain fonts', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does understanding cell references improve Excel usage?',
    options: [
      { text: 'Enables creating dynamic formulas that adapt to data changes', is_correct: true },
      { text: 'Cell references make Excel more complicated', is_correct: false },
      { text: 'References are not useful in Excel', is_correct: false },
      { text: 'All Excel formulas should use fixed values', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What role do templates play in office productivity?',
    options: [
      { text: 'They provide pre-designed formats that save time and ensure consistency', is_correct: true },
      { text: 'Templates limit creativity', is_correct: false },
      { text: 'Creating documents from scratch is always better', is_correct: false },
      { text: 'Templates are only for beginners', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How do charts in Excel help communicate data?',
    options: [
      { text: 'They provide visual representation that makes data easier to understand', is_correct: true },
      { text: 'Charts make data more confusing', is_correct: false },
      { text: 'Numbers are always clearer than charts', is_correct: false },
      { text: 'Charts are only decorative', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'What is the benefit of using master slides in PowerPoint?',
    options: [
      { text: 'Ensures consistent design across all slides in a presentation', is_correct: true },
      { text: 'Master slides make presentations look boring', is_correct: false },
      { text: 'Each slide should have a different design', is_correct: false },
      { text: 'Master slides are not useful', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'medium',
    question_text: 'How does version control help in document management?',
    options: [
      { text: 'Tracks changes and allows reverting to previous versions', is_correct: true },
      { text: 'Version control makes documents more confusing', is_correct: false },
      { text: 'Only one version of a document should exist', is_correct: false },
      { text: 'Version control is not necessary', is_correct: false }
    ]
  },

  // Advanced Office Applications - Advanced (10 questions)
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does integration between office applications improve workflow efficiency?',
    options: [
      { text: 'Data can be shared seamlessly between applications without manual re-entry', is_correct: true },
      { text: 'Integration makes applications slower', is_correct: false },
      { text: 'Applications should never be integrated', is_correct: false },
      { text: 'Integration has no impact on workflow', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the significance of macro programming in office applications?',
    options: [
      { text: 'Automates repetitive tasks and extends application functionality', is_correct: true },
      { text: 'Macros make applications less secure', is_correct: false },
      { text: 'Macro programming is not useful', is_correct: false },
      { text: 'Only experts should use macros', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How do advanced Excel features support business decision-making?',
    options: [
      { text: 'Provide data analysis tools like pivot tables and statistical functions', is_correct: true },
      { text: 'Excel cannot support business decisions', is_correct: false },
      { text: 'Advanced features are only for entertainment', is_correct: false },
      { text: 'Simple calculations are sufficient for all business needs', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What role does collaborative editing play in modern office work?',
    options: [
      { text: 'Enables multiple people to work on documents simultaneously from different locations', is_correct: true },
      { text: 'Collaborative editing creates more conflicts', is_correct: false },
      { text: 'Only one person should work on a document at a time', is_correct: false },
      { text: 'Collaboration is not possible in office applications', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does understanding document structure improve accessibility?',
    options: [
      { text: 'Proper structure helps screen readers and assistive technologies', is_correct: true },
      { text: 'Document structure is only about appearance', is_correct: false },
      { text: 'Accessibility is not important in documents', is_correct: false },
      { text: 'Structure makes documents harder to access', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the impact of cloud-based office applications on productivity?',
    options: [
      { text: 'Enables access from anywhere and automatic synchronization across devices', is_correct: true },
      { text: 'Cloud applications are always slower than desktop versions', is_correct: false },
      { text: 'Cloud applications reduce productivity', is_correct: false },
      { text: 'Desktop applications are always better than cloud versions', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How do advanced formatting features support professional communication?',
    options: [
      { text: 'They ensure documents meet professional standards and enhance readability', is_correct: true },
      { text: 'Advanced formatting makes documents harder to read', is_correct: false },
      { text: 'Professional communication does not require formatting', is_correct: false },
      { text: 'Simple text is always more professional', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What is the relationship between data visualization and effective presentation?',
    options: [
      { text: 'Visual elements help audiences understand complex information more quickly', is_correct: true },
      { text: 'Text-only presentations are always more effective', is_correct: false },
      { text: 'Visualization distracts from the message', is_correct: false },
      { text: 'Data should never be visualized', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'How does mastery of office applications contribute to digital literacy?',
    options: [
      { text: 'Develops skills for creating, managing, and sharing digital content effectively', is_correct: true },
      { text: 'Office applications are not related to digital literacy', is_correct: false },
      { text: 'Digital literacy only involves internet skills', is_correct: false },
      { text: 'Office skills are becoming obsolete', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'advanced',
    question_text: 'What future trends are shaping the evolution of office applications?',
    options: [
      { text: 'AI integration, voice commands, and enhanced collaboration features', is_correct: true },
      { text: 'Office applications will not evolve further', is_correct: false },
      { text: 'Future applications will be less capable', is_correct: false },
      { text: 'Traditional features will be removed from future versions', is_correct: false }
    ]
  },

  // Internet and Web Technologies - Basic (15 questions)
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a web browser?',
    options: [
      { text: 'Software used to access and view websites', is_correct: true },
      { text: 'A type of website', is_correct: false },
      { text: 'A computer virus', is_correct: false },
      { text: 'An internet connection', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'Which is a popular web browser?',
    options: [
      { text: 'Google Chrome', is_correct: true },
      { text: 'Microsoft Word', is_correct: false },
      { text: 'Adobe Photoshop', is_correct: false },
      { text: 'Windows Media Player', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a search engine?',
    options: [
      { text: 'A tool that helps find information on the internet', is_correct: true },
      { text: 'A type of car engine', is_correct: false },
      { text: 'A computer program for games', is_correct: false },
      { text: 'A hardware component', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'Which is a popular search engine?',
    options: [
      { text: 'Google', is_correct: true },
      { text: 'Microsoft Excel', is_correct: false },
      { text: 'Adobe Reader', is_correct: false },
      { text: 'Windows Calculator', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is email?',
    options: [
      { text: 'Electronic messages sent over the internet', is_correct: true },
      { text: 'Physical mail delivered by post', is_correct: false },
      { text: 'A type of website', is_correct: false },
      { text: 'A computer program', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What does @ symbol represent in email addresses?',
    options: [
      { text: 'Separates username from domain name', is_correct: true },
      { text: 'Indicates the email is important', is_correct: false },
      { text: 'Shows the email is private', is_correct: false },
      { text: 'Means the email is spam', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is email etiquette?',
    options: [
      { text: 'Rules for polite and professional email communication', is_correct: true },
      { text: 'A type of email software', is_correct: false },
      { text: 'The speed of email delivery', is_correct: false },
      { text: 'Email security features', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is social media?',
    options: [
      { text: 'Online platforms for sharing content and connecting with others', is_correct: true },
      { text: 'Traditional television and radio', is_correct: false },
      { text: 'Printed newspapers and magazines', is_correct: false },
      { text: 'Face-to-face conversations', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'Which is an example of social media?',
    options: [
      { text: 'Facebook', is_correct: true },
      { text: 'Microsoft Word', is_correct: false },
      { text: 'Calculator', is_correct: false },
      { text: 'Notepad', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What are online collaboration tools?',
    options: [
      { text: 'Software that allows people to work together on projects over the internet', is_correct: true },
      { text: 'Tools for building websites', is_correct: false },
      { text: 'Games played online', is_correct: false },
      { text: 'Internet security software', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is Google Docs?',
    options: [
      { text: 'An online word processing tool', is_correct: true },
      { text: 'A search engine', is_correct: false },
      { text: 'An email service', is_correct: false },
      { text: 'A social media platform', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What does URL stand for?',
    options: [
      { text: 'Uniform Resource Locator', is_correct: true },
      { text: 'Universal Resource Link', is_correct: false },
      { text: 'United Resource Location', is_correct: false },
      { text: 'Unique Resource Locator', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is a website?',
    options: [
      { text: 'A collection of web pages accessible through the internet', is_correct: true },
      { text: 'A physical location', is_correct: false },
      { text: 'A computer program', is_correct: false },
      { text: 'A type of hardware', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is the purpose of bookmarks in web browsers?',
    options: [
      { text: 'To save and quickly access favorite websites', is_correct: true },
      { text: 'To mark pages in physical books', is_correct: false },
      { text: 'To delete websites', is_correct: false },
      { text: 'To print web pages', is_correct: false }
    ]
  },
  {
    grade: 7,
    difficulty: 'basic',
    question_text: 'What is online safety?',
    options: [
      { text: 'Practices to protect yourself while using the internet', is_correct: true },
      { text: 'Physical safety in computer labs', is_correct: false },
      { text: 'Safety features of computer hardware', is_correct: false },
      { text: 'Safety rules for electrical devices', is_correct: false }
    ]
  }
];

// Import at module level
const grade7BaseQuestions = require('./grade7');

// Combine with the first part
const allGrade7Questions = [
  ...grade7BaseQuestions,
  ...grade7CompleteQuestions
];

module.exports = { grade7CompleteQuestions, allGrade7Questions };