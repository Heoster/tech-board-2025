const cluster = require('cluster');
const os = require('os');
const path = require('path');

// Production process manager for better stability
class ProcessManager {
    constructor() {
        this.workers = new Map();
        this.maxRestarts = 5;
        this.restartDelay = 5000;
        this.workerCount = process.env.NODE_ENV === 'production' ? Math.min(os.cpus().length, 4) : 1;
    }

    start() {
        if (cluster.isMaster) {
            console.log(`🚀 Master process ${process.pid} starting...`);
            console.log(`📊 Starting ${this.workerCount} worker(s)`);
            
            // Fork workers
            for (let i = 0; i < this.workerCount; i++) {
                this.forkWorker();
            }

            // Handle worker exit
            cluster.on('exit', (worker, code, signal) => {
                console.log(`⚠️ Worker ${worker.process.pid} died (${signal || code})`);
                
                const workerInfo = this.workers.get(worker.id);
                if (workerInfo) {
                    workerInfo.restarts++;
                    
                    if (workerInfo.restarts < this.maxRestarts) {
                        console.log(`🔄 Restarting worker (${workerInfo.restarts}/${this.maxRestarts})`);
                        setTimeout(() => this.forkWorker(), this.restartDelay);
                    } else {
                        console.error(`❌ Worker exceeded max restarts (${this.maxRestarts})`);
                        this.shutdown();
                    }
                    
                    this.workers.delete(worker.id);
                }
            });

            // Graceful shutdown
            process.on('SIGTERM', () => this.shutdown());
            process.on('SIGINT', () => this.shutdown());
            
            // Health monitoring
            setInterval(() => this.healthCheck(), 30000);
            
        } else {
            // Worker process
            require('./index.js');
        }
    }

    forkWorker() {
        const worker = cluster.fork();
        this.workers.set(worker.id, {
            worker,
            restarts: 0,
            startTime: Date.now()
        });
        
        console.log(`✅ Worker ${worker.process.pid} started`);
        return worker;
    }

    healthCheck() {
        const activeWorkers = Object.keys(cluster.workers).length;
        const totalWorkers = this.workers.size;
        
        console.log(`💓 Health check: ${activeWorkers}/${this.workerCount} workers active`);
        
        if (activeWorkers < this.workerCount) {
            console.log(`⚠️ Worker shortage detected, restarting...`);
            this.forkWorker();
        }
    }

    shutdown() {
        console.log('🛑 Shutting down master process...');
        
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }
        
        setTimeout(() => {
            console.log('✅ Shutdown complete');
            process.exit(0);
        }, 10000);
    }
}

// Start process manager
if (require.main === module) {
    const manager = new ProcessManager();
    manager.start();
}

module.exports = ProcessManager;