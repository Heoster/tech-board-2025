#!/usr/bin/env node

const cluster = require('cluster');
const os = require('os');
const path = require('path');
const fs = require('fs');

// Production startup with clustering
if (cluster.isMaster) {
    console.log('🚀 Starting Tech Board 2025 in Production Mode\n');
    
    // Set production environment
    process.env.NODE_ENV = 'production';
    
    // Ensure required directories exist
    const requiredDirs = [
        'logs',
        'server/database',
        'server/public'
    ];
    
    requiredDirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`📁 Created directory: ${dir}`);
        }
    });
    
    // Check if production setup is complete
    const requiredFiles = [
        'server/public/index.html',
        'server/database/mcq_system_fixed.db',
        '.env.production'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));
    
    if (missingFiles.length > 0) {
        console.log('⚠️ Missing required files for production:');
        missingFiles.forEach(file => console.log(`  - ${file}`));
        console.log('\n🔧 Running production setup...');
        
        try {
            require('./production-ready-setup.js');
        } catch (error) {
            console.error('❌ Production setup failed:', error.message);
            process.exit(1);
        }
    }
    
    // Determine number of workers
    const numCPUs = os.cpus().length;
    const numWorkers = process.env.NODE_ENV === 'production' ? Math.min(numCPUs, 4) : 1;
    
    console.log(`🔧 Starting ${numWorkers} worker(s) on ${numCPUs} CPU(s)`);
    
    // Fork workers
    for (let i = 0; i < numWorkers; i++) {
        const worker = cluster.fork();
        console.log(`👷 Worker ${worker.process.pid} started`);
    }
    
    // Handle worker events
    cluster.on('exit', (worker, code, signal) => {
        console.log(`💀 Worker ${worker.process.pid} died (${signal || code})`);
        
        if (!worker.exitedAfterDisconnect) {
            console.log('🔄 Starting new worker...');
            const newWorker = cluster.fork();
            console.log(`👷 New worker ${newWorker.process.pid} started`);
        }
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('📴 SIGTERM received, shutting down gracefully...');
        
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }
        
        setTimeout(() => {
            console.log('🔴 Force shutdown');
            process.exit(0);
        }, 10000);
    });
    
    process.on('SIGINT', () => {
        console.log('📴 SIGINT received, shutting down gracefully...');
        
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }
        
        setTimeout(() => {
            console.log('🔴 Force shutdown');
            process.exit(0);
        }, 10000);
    });
    
    // Log cluster info
    console.log(`\n📊 Cluster Master PID: ${process.pid}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔌 Port: ${process.env.PORT || 8000}`);
    console.log(`💾 Memory Limit: ${process.env.NODE_OPTIONS || 'Default'}`);
    
    // Health monitoring
    setInterval(() => {
        const workers = Object.keys(cluster.workers).length;
        const memory = process.memoryUsage();
        
        console.log(`📈 Health Check - Workers: ${workers}, Memory: ${Math.round(memory.rss / 1024 / 1024)}MB`);
    }, 60000); // Every minute
    
} else {
    // Worker process - start the actual server
    console.log(`🏃 Worker ${process.pid} starting server...`);
    
    // Load environment variables
    require('dotenv').config({ path: '.env.production' });
    
    // Start the server
    require('./server/index.js');
}