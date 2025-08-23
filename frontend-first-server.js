#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const net = require('net');

console.log('🎯 Tech Board 2025 - Frontend First Server');

// Function to check port availability
function checkPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
        server.on('error', () => resolve(false));
    });
}

async function findAvailablePort(startPort = 3000) {
    for (let port = startPort; port <= startPort + 100; port++) {
        if (await checkPort(port)) {
            return port;
        }
    }
    throw new Error('No available ports found');
}

async function buildFrontend() {
    console.log('🏗️ Building React Frontend First...');
    
    try {
        // Check if client exists
        if (!fs.existsSync('./client/package.json')) {
            throw new Error('Client directory not found');
        }
        
        // Install client dependencies if needed
        console.log('📦 Installing client dependencies...');
        execSync('npm install --prefix client', { stdio: 'inherit' });
        
        // Build the frontend
        console.log('🔨 Building React app...');
        execSync('npm run build --prefix client', { stdio: 'inherit' });
        
        // Verify build output
        const distPath = path.join(__dirname, 'client', 'dist');
        if (!fs.existsSync(path.join(distPath, 'index.html'))) {
            throw new Error('Frontend build failed - no index.html found');
        }
        
        console.log('✅ Frontend built successfully');
        return distPath;
        
    } catch (error) {
        console.error('❌ Frontend build failed:', error.message);
        return null;
    }
}

async function setupFrontendServer(frontendPath) {
    const app = express();
    
    // Basic middleware
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:5173', 'https://tech-board.up.railway.app'],
        credentials: true
    }));
    app.use(express.json());
    
    // Health check
    app.get('/health', (req, res) => {
        res.json({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            mode: 'frontend-first'
        });
    });
    
    // Serve frontend static files from multiple possible locations
    const staticPaths = [
        frontendPath,
        path.join(__dirname, 'server', 'public'),
        path.join(__dirname, 'client', 'dist'),
        path.join(__dirname, 'build')
    ].filter(p => p && fs.existsSync(p));
    
    if (staticPaths.length > 0) {
        staticPaths.forEach(staticPath => {
            app.use(express.static(staticPath));
            console.log(`📁 Serving static files from: ${staticPath}`);
        });
    } else {
        console.log('⚠️ No static files found, serving fallback');
    }
    
    // Basic API endpoints (minimal backend)
    app.get('/api', (req, res) => {
        res.json({
            message: 'Tech Board 2025 API',
            status: 'frontend-ready',
            backend: 'loading'
        });
    });
    
    // Fallback API routes
    app.use('/api/*', (req, res) => {
        res.json({
            message: 'Backend API loading...',
            endpoint: req.path,
            status: 'initializing'
        });
    });
    
    // Handle React Router (SPA)
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }
        
        // Try multiple possible frontend paths
        const possiblePaths = [
            frontendPath ? path.join(frontendPath, 'index.html') : null,
            path.join(__dirname, 'server', 'public', 'index.html'),
            path.join(__dirname, 'client', 'dist', 'index.html'),
            path.join(__dirname, 'build', 'index.html')
        ].filter(Boolean);
        
        for (const indexPath of possiblePaths) {
            if (fs.existsSync(indexPath)) {
                return res.sendFile(path.resolve(indexPath));
            }
        }
        
        // Fallback HTML for when frontend is not built
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Tech Board 2025</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <div id="root">
                    <h1>Tech Board 2025</h1>
                    <p>Frontend is building... Please refresh in a moment.</p>
                </div>
            </body>
            </html>
        `);
    });
    
    return app;
}

async function addBackendRoutes(app) {
    console.log('🔌 Adding backend API routes...');
    
    try {
        // Load backend routes if available
        const routes = [
            { path: '/api/auth', file: './server/routes/auth.js' },
            { path: '/api/admin', file: './server/routes/admin.js' },
            { path: '/api/quiz', file: './server/routes/quiz.js' },
            { path: '/api/students', file: './server/routes/students.js' }
        ];
        
        let routesLoaded = 0;
        for (const route of routes) {
            if (fs.existsSync(route.file)) {
                app.use(route.path, require(route.file));
                console.log(`✅ Loaded: ${route.path}`);
                routesLoaded++;
            }
        }
        
        if (routesLoaded > 0) {
            console.log(`✅ Backend API ready (${routesLoaded} routes)`);
        } else {
            console.log('⚠️ No backend routes found, using fallback API');
        }
        
    } catch (error) {
        console.warn('⚠️ Backend loading error:', error.message);
    }
}

async function startFrontendFirstServer() {
    try {
        // Step 1: Build frontend first
        const frontendPath = await buildFrontend();
        
        // Step 2: Setup server with frontend priority
        const app = await setupFrontendServer(frontendPath);
        
        // Step 3: Find available port
        const PORT = await findAvailablePort(3000);
        
        // Step 4: Start server
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🎉 Frontend-First Server Started!`);
            console.log(`🌐 Access your app: http://localhost:${PORT}`);
            console.log(`📱 Frontend: Ready and served first`);
            console.log(`🔌 Backend: Loading in background`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        });
        
        // Step 5: Add backend routes after server is running
        setTimeout(async () => {
            await addBackendRoutes(app);
            console.log('🚀 Full-stack application ready!');
        }, 2000);
        
        return server;
        
    } catch (error) {
        console.error('❌ Server startup failed:', error.message);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down frontend-first server...');
    process.exit(0);
});

// Start the frontend-first server
startFrontendFirstServer();

module.exports = { startFrontendFirstServer };
