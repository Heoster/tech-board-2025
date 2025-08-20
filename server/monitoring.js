const os = require('os');
const fs = require('fs');
const path = require('path');

// Production monitoring and alerting
class ServerMonitor {
    constructor() {
        this.metrics = {
            startTime: Date.now(),
            requests: 0,
            errors: 0,
            memoryUsage: [],
            cpuUsage: [],
            responseTime: []
        };
        
        this.thresholds = {
            memory: 0.8, // 80% memory usage
            cpu: 0.8,    // 80% CPU usage
            responseTime: 5000, // 5 seconds
            errorRate: 0.1 // 10% error rate
        };
        
        this.alerts = new Set();
        this.logFile = path.join(__dirname, 'logs', 'monitoring.log');
        this.intervals = []; // Track intervals for cleanup
        
        this.ensureLogDirectory();
        
        // Only start monitoring in production
        if (process.env.NODE_ENV === 'production' && !process.env.DISABLE_MONITORING) {
            this.startMonitoring();
        }
    }

    ensureLogDirectory() {
        const logDir = path.dirname(this.logFile);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    startMonitoring() {
        // Monitor every 30 seconds
        const monitorInterval = setInterval(() => {
            this.collectMetrics();
            this.checkThresholds();
            this.logMetrics();
        }, 30000);
        this.intervals.push(monitorInterval);

        // Cleanup old metrics every hour
        const cleanupInterval = setInterval(() => {
            this.cleanupMetrics();
        }, 3600000);
        this.intervals.push(cleanupInterval);
    }

    cleanup() {
        // Clear all intervals
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }

    collectMetrics() {
        const memUsage = process.memoryUsage();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        
        this.metrics.memoryUsage.push({
            timestamp: Date.now(),
            heap: memUsage.heapUsed / 1024 / 1024, // MB
            rss: memUsage.rss / 1024 / 1024, // MB
            system: usedMem / totalMem // Percentage
        });

        // CPU usage (simplified)
        const cpus = os.cpus();
        const avgLoad = os.loadavg()[0] / cpus.length;
        this.metrics.cpuUsage.push({
            timestamp: Date.now(),
            load: avgLoad
        });
    }

    checkThresholds() {
        const latest = this.getLatestMetrics();
        
        // Memory check
        if (latest.memory.system > this.thresholds.memory) {
            this.alert('HIGH_MEMORY', `Memory usage: ${(latest.memory.system * 100).toFixed(1)}%`);
        }
        
        // CPU check
        if (latest.cpu.load > this.thresholds.cpu) {
            this.alert('HIGH_CPU', `CPU load: ${(latest.cpu.load * 100).toFixed(1)}%`);
        }
        
        // Error rate check
        const errorRate = this.metrics.errors / Math.max(this.metrics.requests, 1);
        if (errorRate > this.thresholds.errorRate) {
            this.alert('HIGH_ERROR_RATE', `Error rate: ${(errorRate * 100).toFixed(1)}%`);
        }
    }

    alert(type, message) {
        const alertKey = `${type}_${Date.now()}`;
        
        if (!this.alerts.has(type)) {
            console.error(`🚨 ALERT [${type}]: ${message}`);
            this.alerts.add(type);
            
            // Log alert
            this.log(`ALERT [${type}]: ${message}`);
            
            // Clear alert after 5 minutes
            setTimeout(() => {
                this.alerts.delete(type);
            }, 300000);
        }
    }

    getLatestMetrics() {
        return {
            memory: this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1] || {},
            cpu: this.metrics.cpuUsage[this.metrics.cpuUsage.length - 1] || {}
        };
    }

    logMetrics() {
        const latest = this.getLatestMetrics();
        const uptime = Date.now() - this.metrics.startTime;
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            uptime: Math.floor(uptime / 1000),
            requests: this.metrics.requests,
            errors: this.metrics.errors,
            memory: latest.memory,
            cpu: latest.cpu
        };
        
        this.log(JSON.stringify(logEntry));
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${message}\n`;
        
        fs.appendFile(this.logFile, logLine, (err) => {
            if (err) console.error('Failed to write log:', err);
        });
    }

    cleanupMetrics() {
        const oneHourAgo = Date.now() - 3600000;
        
        this.metrics.memoryUsage = this.metrics.memoryUsage.filter(m => m.timestamp > oneHourAgo);
        this.metrics.cpuUsage = this.metrics.cpuUsage.filter(c => c.timestamp > oneHourAgo);
        this.metrics.responseTime = this.metrics.responseTime.filter(r => r.timestamp > oneHourAgo);
    }

    // Middleware for tracking requests
    middleware() {
        return (req, res, next) => {
            const startTime = Date.now();
            this.metrics.requests++;
            
            res.on('finish', () => {
                const responseTime = Date.now() - startTime;
                
                if (res.statusCode >= 400) {
                    this.metrics.errors++;
                }
                
                this.metrics.responseTime.push({
                    timestamp: Date.now(),
                    duration: responseTime,
                    status: res.statusCode
                });
                
                if (responseTime > this.thresholds.responseTime) {
                    this.alert('SLOW_RESPONSE', `Response time: ${responseTime}ms for ${req.path}`);
                }
            });
            
            next();
        };
    }

    getStats() {
        const latest = this.getLatestMetrics();
        const uptime = Date.now() - this.metrics.startTime;
        
        return {
            uptime: Math.floor(uptime / 1000),
            requests: this.metrics.requests,
            errors: this.metrics.errors,
            errorRate: this.metrics.errors / Math.max(this.metrics.requests, 1),
            memory: latest.memory,
            cpu: latest.cpu,
            activeAlerts: Array.from(this.alerts)
        };
    }
}

module.exports = new ServerMonitor();