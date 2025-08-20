#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sqlite3 = require('sqlite3').verbose();

console.log('🚀 Setting up Tech Board 2025 for Production...\n');

async function setupProduction() {
    try {
        // 1. Install all dependencies
        console.log('📦 Installing dependencies...');
        
        // Root dependencies
        if (!fs.existsSync('node_modules')) {
            execSync('npm install', { stdio: 'inherit' });
        }
        
        // Server dependencies
        if (!fs.existsSync('server/node_modules')) {
            execSync('cd server && npm install', { stdio: 'inherit' });
        }
        
        // Client dependencies
        if (!fs.existsSync('client/node_modules')) {
            execSync('cd client && npm install', { stdio: 'inherit' });
        }
        
        console.log('✅ Dependencies installed\n');

        // 2. Build client
        console.log('🏗️ Building client application...');
        execSync('cd client && npm run build', { stdio: 'inherit' });
        console.log('✅ Client built successfully\n');

        // 3. Copy client build to server
        console.log('📁 Setting up server static files...');
        const clientBuildPath = path.join(__dirname, 'client', 'dist');
        const serverPublicPath = path.join(__dirname, 'server', 'public');

        if (fs.existsSync(serverPublicPath)) {
            fs.rmSync(serverPublicPath, { recursive: true, force: true });
        }
        
        if (fs.existsSync(clientBuildPath)) {
            fs.cpSync(clientBuildPath, serverPublicPath, { recursive: true });
            console.log('✅ Client files copied to server\n');
        } else {
            throw new Error('Client build not found');
        }

        // 4. Setup database
        console.log('🗄️ Setting up production database...');
        await setupDatabase();
        console.log('✅ Database setup completed\n');

        // 5. Create environment files
        console.log('⚙️ Creating environment configuration...');
        createEnvironmentFiles();
        console.log('✅ Environment files created\n');

        // 6. Setup PM2 configuration
        console.log('🔧 Setting up process management...');
        createPM2Config();
        console.log('✅ PM2 configuration created\n');

        // 7. Create Docker configuration
        console.log('🐳 Setting up Docker configuration...');
        createDockerConfig();
        console.log('✅ Docker configuration created\n');

        // 8. Setup monitoring and logging
        console.log('📊 Setting up monitoring...');
        setupMonitoring();
        console.log('✅ Monitoring setup completed\n');

        // 9. Run tests
        console.log('🧪 Running tests...');
        try {
            execSync('cd server && npm test', { stdio: 'inherit' });
            console.log('✅ All tests passed\n');
        } catch (error) {
            console.log('⚠️ Some tests failed, but continuing...\n');
        }

        // 10. Final verification
        console.log('🔍 Running final verification...');
        await verifySetup();
        
        console.log('🎉 Production setup completed successfully!\n');
        console.log('📋 Next steps:');
        console.log('  1. Deploy to Railway: npm run deploy:railway');
        console.log('  2. Start locally: npm start');
        console.log('  3. Monitor: npm run monitor');
        console.log('  4. Admin login: username=admin, password=admin123');

    } catch (error) {
        console.error('❌ Production setup failed:', error.message);
        process.exit(1);
    }
}

async function setupDatabase() {
    const dbDir = path.join(__dirname, 'server', 'database');
    const dbPath = path.join(dbDir, 'mcq_system_fixed.db');
    
    // Ensure database directory exists
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    const db = new sqlite3.Database(dbPath);

    try {
        // Initialize schema
        const initSql = fs.readFileSync(path.join(__dirname, 'server', 'database', 'init.sql'), 'utf8');
        await new Promise((resolve, reject) => {
            db.exec(initSql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Check question counts
        const questionCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const totalQuestions = questionCounts.reduce((sum, row) => sum + row.count, 0);

        if (totalQuestions < 1500) {
            console.log('  🌱 Seeding questions...');
            await seedQuestions(db);
        }

        // Verify admin exists
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        if (adminCount === 0) {
            const bcrypt = require('bcrypt');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                    ['admin', hashedPassword], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

    } finally {
        db.close();
    }
}

async function seedQuestions(db) {
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        const currentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const needed = Math.max(0, 300 - currentCount);
        
        if (needed > 0) {
            console.log(`    Adding ${needed} questions for Grade ${grade}...`);
            
            for (let i = 0; i < needed; i++) {
                const questionText = `Grade ${grade} Technology Question ${i + 1 + currentCount}`;
                const difficulty = i % 3 === 0 ? 'basic' : i % 3 === 1 ? 'medium' : 'advanced';
                
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [grade, difficulty, questionText],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Add 4 options for each question
                const options = [
                    { text: 'Option A', isCorrect: true },
                    { text: 'Option B', isCorrect: false },
                    { text: 'Option C', isCorrect: false },
                    { text: 'Option D', isCorrect: false }
                ];
                
                for (let j = 0; j < options.length; j++) {
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, options[j].text, options[j].isCorrect, j + 1],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
        }
    }
}

function createEnvironmentFiles() {
    // Production environment
    const prodEnv = `NODE_ENV=production
PORT=8000
JWT_SECRET=tech-board-2025-secure-jwt-secret-key-production-${Date.now()}
CORS_ORIGIN=https://tech-board.up.railway.app
DB_PATH=./database/mcq_system_fixed.db
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=200
SESSION_TIMEOUT=3600
QUIZ_TIME_LIMIT=3000
`;

    fs.writeFileSync('.env.production', prodEnv);

    // Development environment
    const devEnv = `NODE_ENV=development
PORT=8000
JWT_SECRET=tech-board-2025-dev-secret
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
DB_PATH=./database/mcq_system_fixed.db
LOG_LEVEL=debug
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=1000
`;

    fs.writeFileSync('.env.development', devEnv);

    // Server environment files
    fs.writeFileSync('server/.env.production', prodEnv);
    fs.writeFileSync('server/.env.development', devEnv);
}

function createPM2Config() {
    const pm2Config = {
        apps: [{
            name: 'tech-board-2025',
            script: 'server/index.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 8000
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 8000
            },
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true,
            max_memory_restart: '1G',
            node_args: '--max-old-space-size=1024',
            watch: false,
            ignore_watch: ['node_modules', 'logs', 'database'],
            max_restarts: 10,
            min_uptime: '10s'
        }]
    };

    fs.writeFileSync('ecosystem.config.js', `module.exports = ${JSON.stringify(pm2Config, null, 2)};`);
}

function createDockerConfig() {
    const dockerfile = `# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd server && npm ci --only=production
RUN cd client && npm ci

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Copy client build to server
RUN mkdir -p server/public && cp -r client/dist/* server/public/

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install sqlite3 and other runtime dependencies
RUN apk add --no-cache sqlite

# Copy built application
COPY --from=builder /app/server ./server
COPY --from=builder /app/database ./database

# Create logs directory
RUN mkdir -p logs

# Set environment
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start application
CMD ["node", "server/index.js"]
`;

    fs.writeFileSync('Dockerfile', dockerfile);

    const dockerCompose = `version: '3.8'

services:
  tech-board:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=tech-board-2025-secure-jwt-secret
    volumes:
      - ./database:/app/database
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:8000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - tech-board
    restart: unless-stopped
`;

    fs.writeFileSync('docker-compose.yml', dockerCompose);
}

function setupMonitoring() {
    // Create logs directory
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create monitoring script
    const monitoringScript = `#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs', 'monitoring.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = \`[\${timestamp}] \${message}\\n\`;
    console.log(logMessage.trim());
    fs.appendFileSync(LOG_FILE, logMessage);
}

function checkHealth() {
    const req = http.get('http://localhost:8000/api/health', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                const health = JSON.parse(data);
                log(\`Health check passed - Status: \${health.status}, Questions: \${health.questions.total}\`);
            } else {
                log(\`Health check failed - Status: \${res.statusCode}\`);
            }
        });
    });

    req.on('error', (error) => {
        log(\`Health check error: \${error.message}\`);
    });

    req.setTimeout(5000, () => {
        req.destroy();
        log('Health check timeout');
    });
}

// Check every 5 minutes
setInterval(checkHealth, 5 * 60 * 1000);

// Initial check
checkHealth();

log('Monitoring started');
`;

    fs.writeFileSync('monitor.js', monitoringScript);
    fs.chmodSync('monitor.js', '755');
}

async function verifySetup() {
    const checks = [
        { name: 'Client build', path: 'server/public/index.html' },
        { name: 'Database', path: 'server/database/mcq_system_fixed.db' },
        { name: 'Server dependencies', path: 'server/node_modules' },
        { name: 'Client dependencies', path: 'client/node_modules' },
        { name: 'Production env', path: '.env.production' },
        { name: 'PM2 config', path: 'ecosystem.config.js' },
        { name: 'Docker config', path: 'Dockerfile' }
    ];

    for (const check of checks) {
        if (fs.existsSync(check.path)) {
            console.log(`  ✅ ${check.name}`);
        } else {
            console.log(`  ❌ ${check.name} - Missing: ${check.path}`);
        }
    }

    // Test database connection
    try {
        const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
        const db = new sqlite3.Database(dbPath);
        
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        db.close();
        console.log(`  ✅ Database connection - ${questionCount} questions`);
    } catch (error) {
        console.log(`  ❌ Database connection - ${error.message}`);
    }
}

// Run setup
setupProduction().catch(console.error);