// Grade 6 Questions - Final Part (Security, AI, Programming)

const grade6FinalQuestions = [
  // Computer Safety & Security - Basic (8 questions)
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is cyberstalking?',
    options: [
      { text: 'Following or harassing someone online', is_correct: true },
      { text: 'A computer game', is_correct: false },
      { text: 'A type of software', is_correct: false },
      { text: 'A computer virus', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is a phishing attack?',
    options: [
      { text: 'Tricking people into giving personal information online', is_correct: true },
      { text: 'Catching fish with computers', is_correct: false },
      { text: 'A computer game', is_correct: false },
      { text: 'A type of printer', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is malware?',
    options: [
      { text: 'Harmful software that damages computers', is_correct: true },
      { text: 'Good software that helps computers', is_correct: false },
      { text: 'A type of hardware', is_correct: false },
      { text: 'A computer game', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is a computer virus?',
    options: [
      { text: 'A program that can damage or corrupt files', is_correct: true },
      { text: 'A disease that computers catch', is_correct: false },
      { text: 'A helpful program', is_correct: false },
      { text: 'A type of hardware', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is antivirus software?',
    options: [
      { text: 'Programs that protect computers from viruses and malware', is_correct: true },
      { text: 'Software that creates viruses', is_correct: false },
      { text: 'A type of game', is_correct: false },
      { text: 'Hardware that protects computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is adware?',
    options: [
      { text: 'Software that displays unwanted advertisements', is_correct: true },
      { text: 'Software that blocks all advertisements', is_correct: false },
      { text: 'A type of hardware', is_correct: false },
      { text: 'A computer game', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is a safe internet practice?',
    options: [
      { text: 'Not sharing personal information with strangers online', is_correct: true },
      { text: 'Sharing passwords with everyone', is_correct: false },
      { text: 'Clicking on all pop-up advertisements', is_correct: false },
      { text: 'Downloading software from unknown sources', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'Why should you not share personal information online?',
    options: [
      { text: 'It can be used by criminals for harmful purposes', is_correct: true },
      { text: 'Personal information is not important', is_correct: false },
      { text: 'Everyone online is trustworthy', is_correct: false },
      { text: 'Sharing information makes computers faster', is_correct: false }
    ]
  },

  // Computer Safety & Security - Medium (9 questions)
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How can you identify a phishing email?',
    options: [
      { text: 'It asks for personal information and has suspicious links', is_correct: true },
      { text: 'All emails are phishing emails', is_correct: false },
      { text: 'Phishing emails are always from friends', is_correct: false },
      { text: 'Phishing emails cannot be identified', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What should you do if you receive a suspicious email?',
    options: [
      { text: 'Delete it without clicking any links', is_correct: true },
      { text: 'Click all the links to investigate', is_correct: false },
      { text: 'Forward it to all your friends', is_correct: false },
      { text: 'Reply with your personal information', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How does antivirus software protect computers?',
    options: [
      { text: 'It scans for and removes harmful programs', is_correct: true },
      { text: 'It makes computers run faster', is_correct: false },
      { text: 'It creates viruses to test the computer', is_correct: false },
      { text: 'It only protects expensive computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'Why is it important to keep software updated?',
    options: [
      { text: 'Updates fix security vulnerabilities and bugs', is_correct: true },
      { text: 'Updates make software worse', is_correct: false },
      { text: 'Updates are not necessary', is_correct: false },
      { text: 'Updates only change the appearance', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What makes a strong password?',
    options: [
      { text: 'Long length with mix of letters, numbers, and symbols', is_correct: true },
      { text: 'Using only your name', is_correct: false },
      { text: 'Using only numbers', is_correct: false },
      { text: 'Using the same password everywhere', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How can cyberbullying be prevented?',
    options: [
      { text: 'Report inappropriate behavior and block harmful users', is_correct: true },
      { text: 'Ignore all online communication', is_correct: false },
      { text: 'Respond to bullies with more bullying', is_correct: false },
      { text: 'Cyberbullying cannot be prevented', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What information should never be shared online?',
    options: [
      { text: 'Full name, address, phone number, and passwords', is_correct: true },
      { text: 'Only passwords should be kept secret', is_correct: false },
      { text: 'All information can be shared safely', is_correct: false },
      { text: 'Only address should be kept secret', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How do firewalls help protect computers?',
    options: [
      { text: 'They block unauthorized access to the computer', is_correct: true },
      { text: 'They put out fires in computers', is_correct: false },
      { text: 'They make computers run faster', is_correct: false },
      { text: 'They are not useful for protection', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What should you do before downloading software?',
    options: [
      { text: 'Verify it comes from a trusted source', is_correct: true },
      { text: 'Download from any website', is_correct: false },
      { text: 'Never download any software', is_correct: false },
      { text: 'Download everything you find', is_correct: false }
    ]
  },

  // Computer Safety & Security - Advanced (8 questions)
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does understanding cybersecurity help in digital citizenship?',
    options: [
      { text: 'It enables responsible and safe participation in digital communities', is_correct: true },
      { text: 'Cybersecurity knowledge is not related to digital citizenship', is_correct: false },
      { text: 'Digital citizenship does not require security awareness', is_correct: false },
      { text: 'Security knowledge makes people less social online', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the relationship between privacy and security online?',
    options: [
      { text: 'Security measures help protect personal privacy', is_correct: true },
      { text: 'Privacy and security are unrelated', is_correct: false },
      { text: 'Privacy reduces security', is_correct: false },
      { text: 'Security eliminates the need for privacy', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How do social engineering attacks exploit human behavior?',
    options: [
      { text: 'They manipulate trust and emotions to trick people', is_correct: true },
      { text: 'They only target computer systems', is_correct: false },
      { text: 'They cannot affect human behavior', is_correct: false },
      { text: 'They only work on old computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What role does user education play in cybersecurity?',
    options: [
      { text: 'Educated users are the first line of defense against cyber threats', is_correct: true },
      { text: 'User education is not important for security', is_correct: false },
      { text: 'Only technical solutions matter for security', is_correct: false },
      { text: 'Education makes systems less secure', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does the concept of "defense in depth" apply to computer security?',
    options: [
      { text: 'Multiple layers of security provide better protection than single solutions', is_correct: true },
      { text: 'Only one security measure is needed', is_correct: false },
      { text: 'More security layers make systems slower', is_correct: false },
      { text: 'Defense in depth is not applicable to computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the impact of security awareness on online behavior?',
    options: [
      { text: 'It leads to more cautious and informed decision-making online', is_correct: true },
      { text: 'Security awareness makes people avoid computers', is_correct: false },
      { text: 'Awareness has no impact on behavior', is_correct: false },
      { text: 'Security awareness reduces computer functionality', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How do emerging threats challenge traditional security approaches?',
    options: [
      { text: 'New threats require adaptive and updated security strategies', is_correct: true },
      { text: 'Traditional security always works against new threats', is_correct: false },
      { text: 'New threats are not a concern', is_correct: false },
      { text: 'Security approaches never need updating', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the significance of teaching cybersecurity to young students?',
    options: [
      { text: 'Early education builds lifelong safe computing habits', is_correct: true },
      { text: 'Young students do not need security education', is_correct: false },
      { text: 'Security education should only be for adults', is_correct: false },
      { text: 'Cybersecurity is too complex for students', is_correct: false }
    ]
  },

  // Introduction to AI & Technology Ethics - Basic (7 questions)
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is Artificial Intelligence (AI)?',
    options: [
      { text: 'Computer systems that can perform tasks that typically require human intelligence', is_correct: true },
      { text: 'A type of computer virus', is_correct: false },
      { text: 'A computer game', is_correct: false },
      { text: 'A type of hardware', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'Which is an example of AI in daily life?',
    options: [
      { text: 'Siri or Alexa voice assistants', is_correct: true },
      { text: 'A regular calculator', is_correct: false },
      { text: 'A printed book', is_correct: false },
      { text: 'A pencil', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What can voice assistants like Siri do?',
    options: [
      { text: 'Answer questions and perform tasks using voice commands', is_correct: true },
      { text: 'Only play music', is_correct: false },
      { text: 'Only tell time', is_correct: false },
      { text: 'Nothing useful', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is technology ethics?',
    options: [
      { text: 'Rules about right and wrong ways to use technology', is_correct: true },
      { text: 'How to repair computers', is_correct: false },
      { text: 'The cost of technology', is_correct: false },
      { text: 'The speed of computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What does responsible technology use mean?',
    options: [
      { text: 'Using technology in ways that do not harm others', is_correct: true },
      { text: 'Using technology as much as possible', is_correct: false },
      { text: 'Never using technology', is_correct: false },
      { text: 'Only using expensive technology', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is a project planning cycle?',
    options: [
      { text: 'Steps to plan, execute, and complete a project', is_correct: true },
      { text: 'A type of computer program', is_correct: false },
      { text: 'A bicycle for projects', is_correct: false },
      { text: 'A computer game', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'Why is it important to plan before starting a project?',
    options: [
      { text: 'Planning helps organize tasks and achieve better results', is_correct: true },
      { text: 'Planning wastes time', is_correct: false },
      { text: 'Projects work better without planning', is_correct: false },
      { text: 'Planning is only for adults', is_correct: false }
    ]
  },

  // Introduction to AI & Technology Ethics - Medium (7 questions)
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How does AI learn to perform tasks?',
    options: [
      { text: 'By processing large amounts of data and finding patterns', is_correct: true },
      { text: 'AI is born knowing everything', is_correct: false },
      { text: 'AI cannot learn new things', is_correct: false },
      { text: 'AI learns by watching TV', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What are some benefits of AI in everyday life?',
    options: [
      { text: 'Makes tasks easier, provides personalized recommendations, saves time', is_correct: true },
      { text: 'AI has no benefits', is_correct: false },
      { text: 'AI only makes life more complicated', is_correct: false },
      { text: 'AI only works for scientists', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'Why is it important to consider ethics when developing technology?',
    options: [
      { text: 'To ensure technology benefits society and does not cause harm', is_correct: true },
      { text: 'Ethics are not important for technology', is_correct: false },
      { text: 'Technology is always ethical', is_correct: false },
      { text: 'Ethics slow down technology development', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How can students use technology responsibly?',
    options: [
      { text: 'By respecting others online, not cheating, and using technology for learning', is_correct: true },
      { text: 'By using technology as much as possible', is_correct: false },
      { text: 'By avoiding all technology', is_correct: false },
      { text: 'Responsibility is not important for students', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What role does planning play in successful projects?',
    options: [
      { text: 'It helps identify goals, resources needed, and potential problems', is_correct: true },
      { text: 'Planning guarantees project success', is_correct: false },
      { text: 'Planning is only needed for big projects', is_correct: false },
      { text: 'Good projects never need planning', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How might AI change the way we work in the future?',
    options: [
      { text: 'AI may automate routine tasks, allowing humans to focus on creative work', is_correct: true },
      { text: 'AI will eliminate all jobs', is_correct: false },
      { text: 'AI will not change how we work', is_correct: false },
      { text: 'AI will make work impossible', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What questions should we ask about new technology?',
    options: [
      { text: 'Is it safe? Is it fair? Does it help people?', is_correct: true },
      { text: 'Is it expensive? Is it popular?', is_correct: false },
      { text: 'We should not question new technology', is_correct: false },
      { text: 'Only experts should ask questions about technology', is_correct: false }
    ]
  },

  // Introduction to AI & Technology Ethics - Advanced (6 questions)
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does AI decision-making differ from human decision-making?',
    options: [
      { text: 'AI uses data and algorithms while humans use emotions and intuition', is_correct: true },
      { text: 'AI and human decision-making are identical', is_correct: false },
      { text: 'AI decisions are always better than human decisions', is_correct: false },
      { text: 'Human decisions are always better than AI decisions', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What ethical concerns arise from AI development?',
    options: [
      { text: 'Privacy, fairness, job displacement, and decision transparency', is_correct: true },
      { text: 'AI has no ethical concerns', is_correct: false },
      { text: 'Only the cost of AI is a concern', is_correct: false },
      { text: 'Ethical concerns only affect AI developers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How can young people prepare for a future with AI?',
    options: [
      { text: 'Develop critical thinking, creativity, and adaptability skills', is_correct: true },
      { text: 'Avoid learning about AI completely', is_correct: false },
      { text: 'Only focus on technical AI skills', is_correct: false },
      { text: 'Preparation is not necessary', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the importance of human oversight in AI systems?',
    options: [
      { text: 'Humans ensure AI decisions align with human values and ethics', is_correct: true },
      { text: 'Human oversight is not necessary for AI', is_correct: false },
      { text: 'AI systems work better without human involvement', is_correct: false },
      { text: 'Oversight slows down AI performance', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does technology ethics education benefit society?',
    options: [
      { text: 'Creates informed citizens who can make responsible technology choices', is_correct: true },
      { text: 'Ethics education slows down technology progress', is_correct: false },
      { text: 'Society does not benefit from ethics education', is_correct: false },
      { text: 'Only technology experts need ethics education', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What role should students play in shaping the future of technology?',
    options: [
      { text: 'Active participants who question, learn, and contribute to ethical technology development', is_correct: true },
      { text: 'Students should not be involved in technology decisions', is_correct: false },
      { text: 'Students should only use technology, not shape it', is_correct: false },
      { text: 'Technology development should be left to adults only', is_correct: false }
    ]
  },

  // Programming Concepts & Computational Thinking - Basic (10 questions)
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is computational thinking?',
    options: [
      { text: 'A way of solving problems by breaking them into smaller parts', is_correct: true },
      { text: 'Thinking only about computers', is_correct: false },
      { text: 'A type of computer program', is_correct: false },
      { text: 'Using calculators for math', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is an algorithm?',
    options: [
      { text: 'A step-by-step set of instructions to solve a problem', is_correct: true },
      { text: 'A type of computer', is_correct: false },
      { text: 'A computer game', is_correct: false },
      { text: 'A mathematical equation', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is a flowchart?',
    options: [
      { text: 'A visual diagram showing steps in a process', is_correct: true },
      { text: 'A type of flower', is_correct: false },
      { text: 'A water flow diagram', is_correct: false },
      { text: 'A computer program', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is programming?',
    options: [
      { text: 'Writing instructions for computers to follow', is_correct: true },
      { text: 'Watching TV programs', is_correct: false },
      { text: 'Planning a schedule', is_correct: false },
      { text: 'Playing computer games', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is problem decomposition?',
    options: [
      { text: 'Breaking a big problem into smaller, manageable parts', is_correct: true },
      { text: 'Making problems more complicated', is_correct: false },
      { text: 'Ignoring problems', is_correct: false },
      { text: 'Solving problems randomly', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'Why are algorithms important?',
    options: [
      { text: 'They provide clear steps to solve problems consistently', is_correct: true },
      { text: 'They make problems more difficult', is_correct: false },
      { text: 'They are only used by computers', is_correct: false },
      { text: 'They are not useful', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is visual programming?',
    options: [
      { text: 'Programming using pictures and blocks instead of text', is_correct: true },
      { text: 'Programming that creates visual art', is_correct: false },
      { text: 'Programming only for graphics', is_correct: false },
      { text: 'Programming that cannot be seen', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'Can you use computational thinking without a computer?',
    options: [
      { text: 'Yes, it is a problem-solving approach that works anywhere', is_correct: true },
      { text: 'No, it only works with computers', is_correct: false },
      { text: 'Only sometimes', is_correct: false },
      { text: 'It is impossible without computers', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'What is pattern recognition in computational thinking?',
    options: [
      { text: 'Finding similarities and trends in data or problems', is_correct: true },
      { text: 'Recognizing shapes only', is_correct: false },
      { text: 'Memorizing patterns', is_correct: false },
      { text: 'Drawing patterns', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'basic',
    question_text: 'How do flowcharts help in problem solving?',
    options: [
      { text: 'They show the logical flow of steps visually', is_correct: true },
      { text: 'They make problems more confusing', is_correct: false },
      { text: 'They are only for decoration', is_correct: false },
      { text: 'They slow down problem solving', is_correct: false }
    ]
  },

  // Programming Concepts & Computational Thinking - Medium (10 questions)
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How does computational thinking help in everyday problem solving?',
    options: [
      { text: 'It provides a systematic approach to tackle complex problems', is_correct: true },
      { text: 'It only works for computer problems', is_correct: false },
      { text: 'It makes problems more complicated', is_correct: false },
      { text: 'It is not useful for everyday problems', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What makes a good algorithm?',
    options: [
      { text: 'Clear, precise, and produces correct results', is_correct: true },
      { text: 'Long and complicated', is_correct: false },
      { text: 'Confusing and unclear', is_correct: false },
      { text: 'Works only sometimes', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How does breaking down problems help solve them?',
    options: [
      { text: 'Smaller problems are easier to understand and solve', is_correct: true },
      { text: 'Breaking down problems makes them harder', is_correct: false },
      { text: 'It creates more problems', is_correct: false },
      { text: 'It is not helpful', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What is abstraction in computational thinking?',
    options: [
      { text: 'Focusing on important details while ignoring unnecessary ones', is_correct: true },
      { text: 'Making everything more complex', is_correct: false },
      { text: 'Abstract art creation', is_correct: false },
      { text: 'Avoiding all details', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How do patterns help in problem solving?',
    options: [
      { text: 'Recognizing patterns allows us to apply known solutions to similar problems', is_correct: true },
      { text: 'Patterns make problems more difficult', is_correct: false },
      { text: 'Patterns are not useful in problem solving', is_correct: false },
      { text: 'Patterns only work in mathematics', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What is the relationship between algorithms and programming?',
    options: [
      { text: 'Algorithms are the logic that programs implement', is_correct: true },
      { text: 'Algorithms and programming are unrelated', is_correct: false },
      { text: 'Programming replaces the need for algorithms', is_correct: false },
      { text: 'Algorithms are only used after programming', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How does visual programming help beginners?',
    options: [
      { text: 'It makes programming concepts easier to understand and learn', is_correct: true },
      { text: 'Visual programming is harder than text programming', is_correct: false },
      { text: 'It is only for advanced programmers', is_correct: false },
      { text: 'Visual programming is not useful', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What skills does computational thinking develop?',
    options: [
      { text: 'Logical reasoning, problem-solving, and analytical thinking', is_correct: true },
      { text: 'Only computer skills', is_correct: false },
      { text: 'Only mathematical skills', is_correct: false },
      { text: 'No useful skills', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'How can students practice computational thinking?',
    options: [
      { text: 'Through puzzles, games, and step-by-step problem solving', is_correct: true },
      { text: 'Only through computer programming', is_correct: false },
      { text: 'Only in math class', is_correct: false },
      { text: 'Computational thinking cannot be practiced', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'medium',
    question_text: 'What is the importance of testing algorithms?',
    options: [
      { text: 'Testing ensures algorithms work correctly and produce expected results', is_correct: true },
      { text: 'Testing is not necessary for algorithms', is_correct: false },
      { text: 'Testing makes algorithms slower', is_correct: false },
      { text: 'Algorithms always work without testing', is_correct: false }
    ]
  },

  // Programming Concepts & Computational Thinking - Advanced (10 questions)
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does computational thinking prepare students for future careers?',
    options: [
      { text: 'It develops problem-solving skills valuable in many fields, not just technology', is_correct: true },
      { text: 'It only prepares students for programming jobs', is_correct: false },
      { text: 'It is not relevant to future careers', is_correct: false },
      { text: 'Only technology careers need computational thinking', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the relationship between computational thinking and creativity?',
    options: [
      { text: 'Computational thinking provides structure for creative problem-solving', is_correct: true },
      { text: 'Computational thinking eliminates creativity', is_correct: false },
      { text: 'Creativity and computational thinking are opposites', is_correct: false },
      { text: 'Creative people do not need computational thinking', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does algorithmic thinking influence decision-making?',
    options: [
      { text: 'It encourages systematic evaluation of options and consequences', is_correct: true },
      { text: 'It makes decision-making more random', is_correct: false },
      { text: 'It eliminates the need for human judgment', is_correct: false },
      { text: 'Algorithmic thinking slows down decisions', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What role does computational thinking play in interdisciplinary learning?',
    options: [
      { text: 'It provides common problem-solving approaches across different subjects', is_correct: true },
      { text: 'It only applies to computer science', is_correct: false },
      { text: 'It prevents learning in other subjects', is_correct: false },
      { text: 'Interdisciplinary learning does not need computational thinking', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does understanding algorithms help in evaluating information?',
    options: [
      { text: 'It helps recognize how information is processed and potentially biased', is_correct: true },
      { text: 'Algorithms make information evaluation unnecessary', is_correct: false },
      { text: 'Algorithm knowledge is not relevant to information evaluation', is_correct: false },
      { text: 'It makes information evaluation more difficult', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the significance of teaching programming concepts early?',
    options: [
      { text: 'Early exposure builds foundational thinking skills for digital literacy', is_correct: true },
      { text: 'Programming concepts are too difficult for young students', is_correct: false },
      { text: 'Early programming education is not beneficial', is_correct: false },
      { text: 'Programming should only be taught to older students', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does computational thinking contribute to scientific inquiry?',
    options: [
      { text: 'It provides systematic approaches for hypothesis testing and data analysis', is_correct: true },
      { text: 'Science does not benefit from computational thinking', is_correct: false },
      { text: 'It replaces the need for scientific methods', is_correct: false },
      { text: 'Computational thinking conflicts with scientific inquiry', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the impact of visual programming on learning programming concepts?',
    options: [
      { text: 'It reduces cognitive load and makes abstract concepts more concrete', is_correct: true },
      { text: 'Visual programming hinders learning', is_correct: false },
      { text: 'It is only useful for very young children', is_correct: false },
      { text: 'Text-based programming is always better for learning', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'How does problem decomposition relate to project management?',
    options: [
      { text: 'Breaking projects into tasks makes them more manageable and trackable', is_correct: true },
      { text: 'Project management does not use decomposition', is_correct: false },
      { text: 'Decomposition makes projects more complex', is_correct: false },
      { text: 'Projects should be handled as single units', is_correct: false }
    ]
  },
  {
    grade: 6,
    difficulty: 'advanced',
    question_text: 'What is the long-term value of computational thinking education?',
    options: [
      { text: 'It develops transferable skills for lifelong learning and adaptation', is_correct: true },
      { text: 'Its value is limited to school years', is_correct: false },
      { text: 'It only benefits students who become programmers', is_correct: false },
      { text: 'Computational thinking has no long-term value', is_correct: false }
    ]
  }
];

// Import all modules at top level
const grade6Part1 = require('./grade6');
const grade6Part2 = require('./grade6-part2');
const grade6Part3 = require('./grade6-part3');

// Combine all Grade 6 questions
const allGrade6Questions = [
  ...grade6Part1,
  ...grade6Part2,
  ...grade6Part3,
  ...grade6FinalQuestions
];

module.exports = { grade6FinalQuestions, allGrade6Questions };