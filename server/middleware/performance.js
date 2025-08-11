const os = require('os');

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      totalResponseTime: 0,
      averageResponseTime: 0,
      slowQueries: [],
      memoryUsage: [],
      activeConnections: 0,
      errors: 0
    };
    
    this.startTime = Date.now();
    this.requestTimes = [];
    this.systemMetricsInterval = null;
    
    // Only start system metrics collection in non-test environment
    if (process.env.NODE_ENV !== 'test') {
      this.systemMetricsInterval = setInterval(() => {
        this.collectSystemMetrics();
      }, 30000);
    }
  }

  // Clean up timers (useful for testing)
  cleanup() {
    if (this.systemMetricsInterval) {
      clearInterval(this.systemMetricsInterval);
      this.systemMetricsInterval = null;
    }
  }

  // Middleware to track request performance
  trackRequest() {
    return (req, res, next) => {
      const startTime = process.hrtime.bigint();
      const startMemory = process.memoryUsage();
      
      // Track active connections
      this.metrics.activeConnections++;
      
      // Override res.end to capture response time
      const originalEnd = res.end;
      res.end = (...args) => {
        const endTime = process.hrtime.bigint();
        const responseTime = Number(endTime - startTime) / 1000000; // Convert to milliseconds
        
        // Update metrics
        this.metrics.requests++;
        this.metrics.totalResponseTime += responseTime;
        this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.requests;
        this.metrics.activeConnections--;
        
        // Track slow requests (>500ms)
        if (responseTime > 500) {
          this.metrics.slowQueries.push({
            url: req.originalUrl,
            method: req.method,
            responseTime,
            timestamp: new Date().toISOString(),
            statusCode: res.statusCode
          });
          
          // Keep only last 100 slow queries
          if (this.metrics.slowQueries.length > 100) {
            this.metrics.slowQueries = this.metrics.slowQueries.slice(-100);
          }
        }
        
        // Track errors
        if (res.statusCode >= 400) {
          this.metrics.errors++;
        }
        
        // Log performance data
        if (process.env.NODE_ENV !== 'production' || responseTime > 1000) {
          console.log(`${req.method} ${req.originalUrl} - ${responseTime.toFixed(2)}ms - ${res.statusCode}`);
        }
        
        // Add performance headers
        res.setHeader('X-Response-Time', `${responseTime.toFixed(2)}ms`);
        res.setHeader('X-Memory-Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);
        
        originalEnd.apply(res, args);
      };
      
      next();
    };
  }

  // Collect system-level metrics
  collectSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    const systemMetrics = {
      timestamp: new Date().toISOString(),
      memory: {
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
        external: Math.round(memUsage.external / 1024 / 1024), // MB
        rss: Math.round(memUsage.rss / 1024 / 1024) // MB
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      system: {
        loadAverage: os.loadavg(),
        freeMemory: Math.round(os.freemem() / 1024 / 1024), // MB
        totalMemory: Math.round(os.totalmem() / 1024 / 1024), // MB
        uptime: os.uptime()
      }
    };
    
    this.metrics.memoryUsage.push(systemMetrics);
    
    // Keep only last 100 memory snapshots
    if (this.metrics.memoryUsage.length > 100) {
      this.metrics.memoryUsage = this.metrics.memoryUsage.slice(-100);
    }
  }

  // Get current performance metrics
  getMetrics() {
    const uptime = Date.now() - this.startTime;
    const currentMemory = process.memoryUsage();
    
    return {
      ...this.metrics,
      uptime: Math.round(uptime / 1000), // seconds
      requestsPerSecond: this.metrics.requests / (uptime / 1000),
      currentMemory: {
        heapUsed: Math.round(currentMemory.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(currentMemory.heapTotal / 1024 / 1024), // MB
        external: Math.round(currentMemory.external / 1024 / 1024), // MB
        rss: Math.round(currentMemory.rss / 1024 / 1024) // MB
      },
      timestamp: new Date().toISOString()
    };
  }

  // Track database query performance
  trackQuery(query, executionTime) {
    if (executionTime > 100) { // Log slow queries (>100ms)
      console.warn(`Slow query detected: ${query} - ${executionTime}ms`);
      this.metrics.slowQueries.push({
        query: query.substring(0, 200), // Truncate long queries
        executionTime,
        timestamp: new Date().toISOString(),
        type: 'database'
      });
    }
  }

  // Reset metrics (useful for testing)
  reset() {
    this.metrics = {
      requests: 0,
      totalResponseTime: 0,
      averageResponseTime: 0,
      slowQueries: [],
      memoryUsage: [],
      activeConnections: 0,
      errors: 0
    };
    this.startTime = Date.now();
  }

  // Generate performance report
  generateReport() {
    const metrics = this.getMetrics();
    const report = {
      summary: {
        totalRequests: metrics.requests,
        averageResponseTime: `${metrics.averageResponseTime.toFixed(2)}ms`,
        requestsPerSecond: metrics.requestsPerSecond.toFixed(2),
        errorRate: `${((metrics.errors / metrics.requests) * 100).toFixed(2)}%`,
        uptime: `${Math.floor(metrics.uptime / 3600)}h ${Math.floor((metrics.uptime % 3600) / 60)}m`
      },
      performance: {
        slowRequestsCount: metrics.slowQueries.filter(q => q.type !== 'database').length,
        slowQueriesCount: metrics.slowQueries.filter(q => q.type === 'database').length,
        currentMemoryUsage: `${metrics.currentMemory.heapUsed}MB`,
        activeConnections: metrics.activeConnections
      },
      recentSlowOperations: metrics.slowQueries.slice(-10)
    };
    
    return report;
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

module.exports = {
  performanceMonitor,
  trackRequest: () => performanceMonitor.trackRequest(),
  getMetrics: () => performanceMonitor.getMetrics(),
  trackQuery: (query, time) => performanceMonitor.trackQuery(query, time),
  generateReport: () => performanceMonitor.generateReport()
};