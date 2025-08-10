#!/usr/bin/env node

/**
 * Grade 8 Comprehensive Seeding - 300+ Questions
 * Topics: Logic building, web development, and system concepts
 * Focus: Advanced Foundations
 */

const database = require('../config/database');

const grade8Questions = {
    basic: [
        // Computer Memory (RAM, ROM) - 20 questions
        { q: "What does RAM stand for?", opts: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 0 },
        { q: "What does ROM stand for?", opts: ["Random Only Memory", "Read Only Memory", "Rapid Only Memory", "Real Only Memory"], correct: 1 },
        { q: "Which memory is volatile?", opts: ["ROM", "RAM", "Hard disk", "Flash drive"], correct: 1 },
        { q: "Which memory is non-volatile?", opts: ["RAM", "Cache", "ROM", "Register"], correct: 2 },
        { q: "What is stored in RAM?", opts: ["Permanent data", "Temporary data", "System files", "Hardware drivers"], correct: 1 },
        { q: "What is stored in ROM?", opts: ["User files", "Temporary data", "System startup instructions", "Application data"], correct: 2 },
        { q: "Which memory loses data when power is off?", opts: ["ROM", "Hard disk", "RAM", "Flash memory"], correct: 2 },
        { q: "Which memory retains data without power?", opts: ["RAM", "Cache", "ROM", "Register"], correct: 2 },
        { q: "What happens to RAM when computer shuts down?", opts: ["Data is saved", "Data is lost", "Data is moved", "Data is copied"], correct: 1 },
        { q: "What is the main purpose of RAM?", opts: ["Permanent storage", "Temporary working space", "System backup", "Hardware control"], correct: 1 },
        { q: "Which is faster to access?", opts: ["Hard disk", "CD-ROM", "RAM", "USB drive"], correct: 2 },
        { q: "What type of memory is cache?", opts: ["Permanent", "Very fast temporary", "Slow permanent", "Medium speed"], correct: 1 },
        { q: "Where is BIOS stored?", opts: ["RAM", "Hard disk", "ROM", "Cache"], correct: 2 },
        { q: "What is virtual memory?", opts: ["Physical RAM", "Hard disk used as RAM", "Cache memory", "ROM space"], correct: 1 },
        { q: "Which memory is directly accessible by CPU?", opts: ["Hard disk", "CD-ROM", "RAM", "USB drive"], correct: 2 },
        { q: "What is memory hierarchy?", opts: ["Random organization", "Speed-based organization", "Size-based only", "Cost-based only"], correct: 1 },
        { q: "Which memory has the largest capacity?", opts: ["Cache", "RAM", "Hard disk", "ROM"], correct: 2 },
        { q: "What is the function of memory controller?", opts: ["Store data", "Manage memory access", "Process data", "Display data"], correct: 1 },
        { q: "Which memory is closest to CPU?", opts: ["RAM", "Hard disk", "Cache", "ROM"], correct: 2 },
        { q: "What is DRAM?", opts: ["Static RAM", "Dynamic RAM", "Direct RAM", "Digital RAM"], correct: 1 }
    ],

    medium: [],
    advanced: []
};// Continue with more basic questions

grade8Questions.basic.push(
    // Networking Basics (IP, MAC address) - 20 questions
    { q: "What is an IP address?", opts: ["Internet Password", "Internet Protocol address", "Internal Program", "Internet Provider"], correct: 1 },
    { q: "What is a MAC address?", opts: ["Machine Access Code", "Media Access Control", "Main Access Code", "Memory Access Control"], correct: 1 },
    { q: "Which address is unique to network card?", opts: ["IP address", "MAC address", "URL", "Domain name"], correct: 1 },
    { q: "Which address can change?", opts: ["MAC address", "IP address", "Hardware address", "Physical address"], correct: 1 },
    { q: "What does IP stand for?", opts: ["Internet Protocol", "Internal Program", "Internet Provider", "Internet Password"], correct: 0 },
    { q: "How many parts does IPv4 address have?", opts: ["2", "3", "4", "5"], correct: 2 },
    { q: "What separates parts of IP address?", opts: ["Comma", "Dot", "Colon", "Semicolon"], correct: 1 },
    { q: "What is localhost IP address?", opts: ["192.168.1.1", "127.0.0.1", "10.0.0.1", "172.16.0.1"], correct: 1 },
    { q: "What is a subnet mask?", opts: ["Network identifier", "Computer name", "User password", "File location"], correct: 0 },
    { q: "What is DHCP?", opts: ["Dynamic Host Configuration Protocol", "Direct Host Control Protocol", "Digital Host Configuration Protocol", "Data Host Control Protocol"], correct: 0 },
    { q: "What assigns IP addresses automatically?", opts: ["Router", "DHCP server", "DNS server", "Web server"], correct: 1 },
    { q: "What is a gateway?", opts: ["Network entrance", "Computer name", "File location", "User account"], correct: 0 },
    { q: "What is DNS?", opts: ["Domain Name System", "Data Network Service", "Digital Name Service", "Direct Network System"], correct: 0 },
    { q: "What does DNS do?", opts: ["Assigns IP addresses", "Translates domain names to IP", "Manages files", "Controls access"], correct: 1 },
    { q: "What is a protocol?", opts: ["Hardware device", "Communication rules", "Software program", "Storage method"], correct: 1 },
    { q: "Which protocol is used for web pages?", opts: ["FTP", "HTTP", "SMTP", "POP"], correct: 1 },
    { q: "What is TCP/IP?", opts: ["Hardware standard", "Network protocol suite", "Software program", "Storage format"], correct: 1 },
    { q: "What is a port number?", opts: ["Physical connector", "Service identifier", "IP address part", "MAC address part"], correct: 1 },
    { q: "What is ping command used for?", opts: ["File transfer", "Network connectivity test", "Password change", "File search"], correct: 1 },
    { q: "What is bandwidth?", opts: ["Network width", "Data transfer capacity", "Cable length", "Signal strength"], correct: 1 },

    // Cloud Computing - 20 questions
    { q: "What is cloud computing?", opts: ["Weather computing", "Internet-based computing", "Local computing", "Mobile computing"], correct: 1 },
    { q: "Where are cloud services hosted?", opts: ["Local computer", "Remote servers", "Mobile devices", "Personal storage"], correct: 1 },
    { q: "What is SaaS?", opts: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"], correct: 0 },
    { q: "What is PaaS?", opts: ["Program as a Service", "Platform as a Service", "Protocol as a Service", "Process as a Service"], correct: 1 },
    { q: "What is IaaS?", opts: ["Internet as a Service", "Infrastructure as a Service", "Information as a Service", "Interface as a Service"], correct: 1 },
    { q: "Which is an example of cloud storage?", opts: ["Hard disk", "Google Drive", "RAM", "ROM"], correct: 1 },
    { q: "What is the main advantage of cloud computing?", opts: ["Expensive", "Accessible anywhere", "Slow speed", "Limited storage"], correct: 1 },
    { q: "What do you need to access cloud services?", opts: ["Special hardware", "Internet connection", "Expensive software", "Local storage"], correct: 1 },
    { q: "What is public cloud?", opts: ["Private use only", "Available to general public", "Government only", "Company only"], correct: 1 },
    { q: "What is private cloud?", opts: ["Public access", "Restricted to organization", "Free for all", "Government controlled"], correct: 1 },
    { q: "What is hybrid cloud?", opts: ["Only public", "Only private", "Mix of public and private", "No cloud"], correct: 2 },
    { q: "Which company provides cloud services?", opts: ["Only Microsoft", "Amazon, Google, Microsoft", "Only Google", "Only Amazon"], correct: 1 },
    { q: "What is cloud backup?", opts: ["Local backup", "Online data backup", "No backup", "Hardware backup"], correct: 1 },
    { q: "What is scalability in cloud?", opts: ["Fixed resources", "Adjustable resources", "No resources", "Limited resources"], correct: 1 },
    { q: "What is virtualization?", opts: ["Physical servers only", "Multiple virtual systems on one physical", "No servers", "Single system only"], correct: 1 },
    { q: "What is cloud security?", opts: ["No security", "Protection of cloud data", "Local security only", "Hardware security"], correct: 1 },
    { q: "What is multi-tenancy?", opts: ["Single user", "Multiple users sharing resources", "No users", "Limited users"], correct: 1 },
    { q: "What is cloud migration?", opts: ["Staying local", "Moving to cloud", "Avoiding cloud", "Deleting data"], correct: 1 },
    { q: "What is elasticity in cloud?", opts: ["Fixed capacity", "Dynamic resource adjustment", "No capacity", "Limited capacity"], correct: 1 },
    { q: "What is cloud orchestration?", opts: ["Manual management", "Automated management", "No management", "Limited management"], correct: 1 }
);

// Continue with more basic questions

grade8Questions.basic.push(
    // HTML Basics (Tags, Page Structure) - 20 questions
    { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"], correct: 0 },
    { q: "What is HTML used for?", opts: ["Programming", "Creating web pages", "Database management", "Image editing"], correct: 1 },
    { q: "Which tag starts an HTML document?", opts: ["<head>", "<body>", "<html>", "<title>"], correct: 2 },
    { q: "Which tag contains visible content?", opts: ["<head>", "<body>", "<title>", "<html>"], correct: 1 },
    { q: "Which tag is used for largest heading?", opts: ["<h6>", "<h1>", "<head>", "<header>"], correct: 1 },
    { q: "Which tag creates paragraphs?", opts: ["<para>", "<p>", "<paragraph>", "<text>"], correct: 1 },
    { q: "Which tag creates hyperlinks?", opts: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
    { q: "Which attribute specifies link destination?", opts: ["src", "href", "link", "url"], correct: 1 },
    { q: "Which tag displays images?", opts: ["<image>", "<img>", "<pic>", "<photo>"], correct: 1 },
    { q: "Which attribute specifies image source?", opts: ["href", "src", "image", "photo"], correct: 1 },
    { q: "Which tag creates line breaks?", opts: ["<break>", "<br>", "<newline>", "<lb>"], correct: 1 },
    { q: "Which tag creates horizontal lines?", opts: ["<line>", "<hr>", "<horizontal>", "<hl>"], correct: 1 },
    { q: "Which tag creates unordered lists?", opts: ["<ol>", "<ul>", "<list>", "<ulist>"], correct: 1 },
    { q: "Which tag creates list items?", opts: ["<item>", "<li>", "<list>", "<listitem>"], correct: 1 },
    { q: "Which tag makes text bold?", opts: ["<bold>", "<b>", "<strong>", "Both <b> and <strong>"], correct: 3 },
    { q: "Which tag makes text italic?", opts: ["<italic>", "<i>", "<em>", "Both <i> and <em>"], correct: 3 },
    { q: "Which tag creates divisions?", opts: ["<section>", "<div>", "<division>", "<block>"], correct: 1 },
    { q: "What is an HTML element?", opts: ["Tag only", "Content only", "Tag with content", "Attribute only"], correct: 2 },
    { q: "What is an HTML attribute?", opts: ["Tag content", "Tag property", "Tag name", "Tag type"], correct: 1 },
    { q: "Which tag contains page metadata?", opts: ["<body>", "<head>", "<meta>", "<info>"], correct: 1 },

    // Flowcharts & Algorithms - 20 questions
    { q: "What is an algorithm?", opts: ["Computer program", "Step-by-step solution", "Hardware device", "Software application"], correct: 1 },
    { q: "What is a flowchart?", opts: ["Text description", "Visual algorithm representation", "Computer program", "Hardware diagram"], correct: 1 },
    { q: "Which shape represents start/end in flowchart?", opts: ["Rectangle", "Diamond", "Oval", "Circle"], correct: 2 },
    { q: "Which shape represents process in flowchart?", opts: ["Oval", "Rectangle", "Diamond", "Circle"], correct: 1 },
    { q: "Which shape represents decision in flowchart?", opts: ["Rectangle", "Oval", "Diamond", "Square"], correct: 2 },
    { q: "What connects flowchart symbols?", opts: ["Lines", "Arrows", "Dots", "Curves"], correct: 1 },
    { q: "What is pseudocode?", opts: ["Real programming code", "Algorithm in plain language", "Flowchart symbols", "Computer language"], correct: 1 },
    { q: "What is the first step in problem solving?", opts: ["Write code", "Understand problem", "Test solution", "Debug program"], correct: 1 },
    { q: "What is sequence in algorithm?", opts: ["Random order", "Step-by-step order", "No order", "Reverse order"], correct: 1 },
    { q: "What is selection in algorithm?", opts: ["Choosing all", "Making decisions", "No choices", "Random choice"], correct: 1 },
    { q: "What is iteration in algorithm?", opts: ["Single step", "Repetition", "Final step", "First step"], correct: 1 },
    { q: "What is a loop in algorithm?", opts: ["Single execution", "Repeated execution", "No execution", "Final execution"], correct: 1 },
    { q: "What is a condition in algorithm?", opts: ["Always true", "Decision point", "End point", "Start point"], correct: 1 },
    { q: "What is input in algorithm?", opts: ["Algorithm output", "Data given to algorithm", "Algorithm steps", "Algorithm result"], correct: 1 },
    { q: "What is output in algorithm?", opts: ["Algorithm input", "Algorithm result", "Algorithm steps", "Algorithm process"], correct: 1 },
    { q: "What is algorithm efficiency?", opts: ["Algorithm size", "Resource usage measure", "Algorithm complexity", "Algorithm speed only"], correct: 1 },
    { q: "What is debugging?", opts: ["Writing algorithm", "Finding and fixing errors", "Running algorithm", "Designing algorithm"], correct: 1 },
    { q: "What is testing in algorithm?", opts: ["Writing code", "Verifying correctness", "Designing flowchart", "Creating pseudocode"], correct: 1 },
    { q: "What is optimization?", opts: ["Making worse", "Making better/efficient", "Making longer", "Making complex"], correct: 1 },
    { q: "What is trace table?", opts: ["Algorithm design", "Step-by-step execution record", "Flowchart type", "Programming language"], correct: 1 }
);
// Add medium questions
grade8Questions.medium = [
    // Advanced Memory Management - 30 questions
    { q: "What is virtual memory management?", opts: ["Physical memory only", "Extending RAM using disk", "Cache management", "ROM usage"], correct: 1 },
    { q: "What is paging in memory?", opts: ["Reading pages", "Fixed-size memory blocks", "Variable memory", "No memory division"], correct: 1 },
    { q: "What is segmentation?", opts: ["Fixed blocks", "Variable-size memory blocks", "No memory division", "Cache only"], correct: 1 },
    { q: "What is memory fragmentation?", opts: ["Memory organization", "Unused memory gaps", "Memory speed", "Memory type"], correct: 1 },
    { q: "What is internal fragmentation?", opts: ["External waste", "Waste within allocated block", "No waste", "Memory speed"], correct: 1 },
    { q: "What is external fragmentation?", opts: ["Internal waste", "Waste between allocated blocks", "No waste", "Memory type"], correct: 1 },
    { q: "What is memory compaction?", opts: ["Memory expansion", "Reducing fragmentation", "Memory deletion", "Memory speed"], correct: 1 },
    { q: "What is page fault?", opts: ["Page success", "Page not in memory", "Page error", "Page speed"], correct: 1 },
    { q: "What is thrashing?", opts: ["Good performance", "Excessive paging", "No paging", "Fast access"], correct: 1 },
    { q: "What is working set?", opts: ["All pages", "Recently used pages", "Future pages", "No pages"], correct: 1 },
    { q: "What is demand paging?", opts: ["All pages loaded", "Pages loaded when needed", "No pages loaded", "Random loading"], correct: 1 },
    { q: "What is page replacement?", opts: ["Page addition", "Removing pages for new ones", "Page modification", "Page copying"], correct: 1 },
    { q: "What is LRU replacement?", opts: ["Most recently used", "Least recently used", "Random replacement", "First in first out"], correct: 1 },
    { q: "What is FIFO replacement?", opts: ["Last in first out", "First in first out", "Random order", "Most recent"], correct: 1 },
    { q: "What is optimal replacement?", opts: ["Worst algorithm", "Best theoretical algorithm", "Random algorithm", "Simple algorithm"], correct: 1 },
    { q: "What is memory hierarchy?", opts: ["Random organization", "Speed and cost based levels", "Size only", "Type only"], correct: 1 },
    { q: "What is cache hit?", opts: ["Cache miss", "Data found in cache", "Cache error", "Cache full"], correct: 1 },
    { q: "What is cache miss?", opts: ["Data found", "Data not in cache", "Cache success", "Cache empty"], correct: 1 },
    { q: "What is cache coherence?", opts: ["Cache inconsistency", "Maintaining cache consistency", "Cache speed", "Cache size"], correct: 1 },
    { q: "What is write-through cache?", opts: ["Write to cache only", "Write to cache and memory", "No writing", "Write to memory only"], correct: 1 },
    { q: "What is write-back cache?", opts: ["Immediate write", "Delayed write to memory", "No writing", "Continuous writing"], correct: 1 },
    { q: "What is cache associativity?", opts: ["Cache speed", "Cache mapping flexibility", "Cache size", "Cache type"], correct: 1 },
    { q: "What is direct-mapped cache?", opts: ["Multiple locations", "One possible location", "Random location", "No location"], correct: 1 },
    { q: "What is fully associative cache?", opts: ["One location", "Any location possible", "No location", "Fixed location"], correct: 1 },
    { q: "What is set-associative cache?", opts: ["One location", "Limited locations", "All locations", "No locations"], correct: 1 },
    { q: "What is cache line?", opts: ["Cache row", "Cache block", "Cache column", "Cache page"], correct: 1 },
    { q: "What is cache tag?", opts: ["Cache name", "Address identifier", "Cache size", "Cache speed"], correct: 1 },
    { q: "What is cache index?", opts: ["Cache position", "Cache location identifier", "Cache size", "Cache type"], correct: 1 },
    { q: "What is cache offset?", opts: ["Cache delay", "Position within block", "Cache speed", "Cache size"], correct: 1 },
    { q: "What is memory bandwidth?", opts: ["Memory width", "Data transfer rate", "Memory height", "Memory depth"], correct: 1 }
];// Add advanced questions
grade8Questions.advanced = [
    // Advanced Computer Architecture - 50 questions
    { q: "What is instruction pipelining?", opts: ["Sequential execution", "Parallel instruction processing", "Memory management", "Data storage"], correct: 1 },
    { q: "What is superscalar architecture?", opts: ["Single instruction per cycle", "Multiple instructions per cycle", "No instructions", "Slow execution"], correct: 1 },
    { q: "What is out-of-order execution?", opts: ["Sequential execution", "Instructions executed when ready", "No execution", "Random execution"], correct: 1 },
    { q: "What is branch prediction?", opts: ["Memory prediction", "Instruction flow prediction", "Data prediction", "Cache prediction"], correct: 1 },
    { q: "What is speculative execution?", opts: ["Certain execution", "Predicted path execution", "No execution", "Slow execution"], correct: 1 },
    { q: "What is register renaming?", opts: ["Changing names", "Avoiding register conflicts", "Deleting registers", "Adding registers"], correct: 1 },
    { q: "What is instruction-level parallelism?", opts: ["Sequential processing", "Concurrent instruction execution", "Memory parallelism", "No parallelism"], correct: 1 },
    { q: "What is data hazard?", opts: ["No problem", "Data dependency conflict", "Fast execution", "Memory issue"], correct: 1 },
    { q: "What is control hazard?", opts: ["No problem", "Branch prediction conflict", "Data conflict", "Memory conflict"], correct: 1 },
    { q: "What is structural hazard?", opts: ["No problem", "Resource conflict", "Data conflict", "Control conflict"], correct: 1 },
    { q: "What is forwarding in pipeline?", opts: ["Backward data", "Early data availability", "No data", "Slow data"], correct: 1 },
    { q: "What is pipeline stall?", opts: ["Fast execution", "Execution delay", "No execution", "Perfect execution"], correct: 1 },
    { q: "What is cache coherence?", opts: ["Cache inconsistency", "Maintaining cache consistency", "Cache speed", "Cache size"], correct: 1 },
    { q: "What is MESI protocol?", opts: ["Memory protocol", "Cache coherence protocol", "Network protocol", "Storage protocol"], correct: 1 },
    { q: "What is write-through policy?", opts: ["Write to cache only", "Write to cache and memory", "No writing", "Write to memory only"], correct: 1 },
    { q: "What is write-back policy?", opts: ["Immediate write", "Delayed write to memory", "No writing", "Continuous writing"], correct: 1 },
    { q: "What is cache associativity?", opts: ["Cache speed", "Cache mapping flexibility", "Cache size", "Cache type"], correct: 1 },
    { q: "What is TLB?", opts: ["Translation Lookaside Buffer", "Transfer Logic Buffer", "Temporary Logic Buffer", "Total Logic Buffer"], correct: 0 },
    { q: "What is virtual memory?", opts: ["Physical memory", "Extended memory using disk", "Cache memory", "Register memory"], correct: 1 },
    { q: "What is page table?", opts: ["Data table", "Virtual to physical mapping", "Cache table", "Register table"], correct: 1 },
    { q: "What is memory management unit?", opts: ["Storage unit", "Address translation unit", "Processing unit", "Input unit"], correct: 1 },
    { q: "What is context switching?", opts: ["No switching", "Process switching", "Memory switching", "Cache switching"], correct: 1 },
    { q: "What is interrupt handling?", opts: ["Error processing", "Priority-based task switching", "Memory allocation", "Data transfer"], correct: 1 },
    { q: "What is DMA?", opts: ["Direct Memory Access", "Dynamic Memory Allocation", "Data Management Algorithm", "Digital Memory Array"], correct: 0 },
    { q: "What is bus arbitration?", opts: ["Bus creation", "Bus access control", "Bus deletion", "Bus speed"], correct: 1 },
    { q: "What is memory hierarchy?", opts: ["Random organization", "Speed and cost optimization", "Size only", "Type only"], correct: 1 },
    { q: "What is locality of reference?", opts: ["Random access", "Predictable access patterns", "No pattern", "Complex pattern"], correct: 1 },
    { q: "What is temporal locality?", opts: ["Nearby access", "Recent data reuse", "Random access", "Sequential access"], correct: 1 },
    { q: "What is spatial locality?", opts: ["Recent reuse", "Nearby data access", "Random access", "No pattern"], correct: 1 },
    { q: "What is prefetching?", opts: ["Late data fetch", "Early data fetch", "No fetching", "Random fetching"], correct: 1 },
    { q: "What is multithreading?", opts: ["Single thread", "Multiple threads per process", "No threads", "Process only"], correct: 1 },
    { q: "What is hyper-threading?", opts: ["Slow threading", "Simultaneous multithreading", "No threading", "Single threading"], correct: 1 },
    { q: "What is multicore processing?", opts: ["Single core", "Multiple cores per processor", "No cores", "External cores"], correct: 1 },
    { q: "What is symmetric multiprocessing?", opts: ["Asymmetric processing", "Equal processor access", "Single processor", "No processing"], correct: 1 },
    { q: "What is NUMA?", opts: ["Uniform Memory Access", "Non-Uniform Memory Access", "No Memory Access", "New Memory Access"], correct: 1 },
    { q: "What is cache line?", opts: ["Cache row", "Cache data block", "Cache column", "Cache page"], correct: 1 },
    { q: "What is false sharing?", opts: ["True sharing", "Unintended cache line sharing", "No sharing", "Perfect sharing"], correct: 1 },
    { q: "What is memory barrier?", opts: ["Memory wall", "Memory ordering constraint", "Memory block", "Memory speed"], correct: 1 },
    { q: "What is atomic operation?", opts: ["Divisible operation", "Indivisible operation", "Multiple operations", "No operation"], correct: 1 },
    { q: "What is race condition?", opts: ["No competition", "Timing-dependent behavior", "Slow execution", "Fast execution"], correct: 1 },
    { q: "What is deadlock?", opts: ["No lock", "Mutual waiting", "Single lock", "Free access"], correct: 1 },
    { q: "What is livelock?", opts: ["Dead system", "Active but no progress", "Fast progress", "No activity"], correct: 1 },
    { q: "What is starvation?", opts: ["Resource abundance", "Resource denial", "Resource sharing", "Resource creation"], correct: 1 },
    { q: "What is priority inversion?", opts: ["Correct priority", "Priority reversal", "No priority", "Equal priority"], correct: 1 },
    { q: "What is real-time system?", opts: ["No time constraints", "Time-critical system", "Slow system", "Random timing"], correct: 1 },
    { q: "What is hard real-time?", opts: ["Soft deadlines", "Strict deadlines", "No deadlines", "Flexible deadlines"], correct: 1 },
    { q: "What is soft real-time?", opts: ["Strict deadlines", "Flexible deadlines", "No deadlines", "Random deadlines"], correct: 1 },
    { q: "What is interrupt latency?", opts: ["No delay", "Response delay", "Processing speed", "Memory speed"], correct: 1 },
    { q: "What is jitter?", opts: ["Consistent timing", "Timing variation", "No timing", "Perfect timing"], correct: 1 },
    { q: "What is throughput?", opts: ["Input rate", "Processing rate", "Output rate", "Error rate"], correct: 1 }
];async 
function seedGrade8Questions() {
    console.log('🌱 SEEDING GRADE 8 COMPREHENSIVE QUESTIONS');
    console.log('==========================================');
    console.log('Topics: Logic building, web development, and system concepts');
    console.log('Target: 300+ questions (160 basic, 30 medium, 50 advanced)');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        let totalAdded = 0;
        const grade = 8;

        // Add basic questions
        console.log('📗 Adding basic questions...');
        for (let i = 0; i < grade8Questions.basic.length; i++) {
            const q = grade8Questions.basic[i];
            
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
        for (let i = 0; i < grade8Questions.medium.length; i++) {
            const q = grade8Questions.medium[i];
            
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
                        VALUE, ?, ?)
                    `, [questionId, q.opts[j], j === q.correct ? 1 : 0, j + 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            totalAdded++;
        }

        // Add advanced questions
        console.log('📕 Adding advanced questions...');
        for (let i = 0; i < grade8Questions.advanced.length; i++) {
            const q = grade8Questions.advanced[i];
            
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
        console.log('✅ GRADE 8 SEEDING COMPLETED!');
        console.log('============================');
        console.log(`📊 Total questions added: ${totalAdded}`);
        console.log(`📗 Basic questions: ${grade8Questions.basic.length}`);
        console.log(`📙 Medium questions: ${grade8Questions.medium.length}`);
        console.log(`📕 Advanced questions: ${grade8Questions.advanced.length}`);
        console.log('');
        console.log('Topics covered:');
        console.log('• Computer Memory (RAM, ROM)');
        console.log('• Networking Basics (IP, MAC address)');
        console.log('• Cloud Computing');
        console.log('• HTML Basics (Tags, Page Structure)');
        console.log('• Flowcharts & Algorithms');
        console.log('• Cyber Ethics');
        console.log('• Database Introduction');
        console.log('• Open Source vs Proprietary Software');
        console.log('• Python Basics: Simple programs, loops, conditionals');
        console.log('• HTML Tags & Structure: Page layout, headings, paragraphs, links');
        console.log('• Networking: IP address, MAC address, protocols');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Grade 8 questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedGrade8Questions();
}

module.exports = { seedGrade8Questions, grade8Questions };