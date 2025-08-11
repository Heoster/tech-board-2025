const fs = require('fs').promises;
const path = require('path');

class PerformanceCollector {
  constructor() {
    this.metricsBuffer = [];
    this.bufferSize = 100;
    this.flushIntervalMs = 60000; // 1 minute
    this.flushIntervalId = null;
    this.metricsFile = path.join(__dirname, '../logs/performance-metrics.json');
    
    // Ensure logs directory exists
    this.ensureLogsDirectory();
    
    // Start periodic flush
    this.startPeriodicFlush();
  }

  async ensureLogsDirectory() {
    const logsDir = path.join(__dirname, '../logs');
    try {
      await fs.access(logsDir);
    } catch (error) {
      await fs.mkdir(logsDir, { recursive: true });
    }
  }

  // Collect server-side metrics
  collectServerMetrics(req, res, responseTime) {
    const metrics = {
      timestamp: new Date().toISOString(),
      type: 'server',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    };

    this.addMetric(metrics);
  }

  // Collect client-side metrics
  collectClientMetrics(clientMetrics) {
    const metrics = {
      timestamp: new Date().toISOString(),
      type: 'client',
      ...clientMetrics
    };

    this.addMetric(metrics);
  }

  // Collect database metrics
  collectDatabaseMetrics(query, executionTime, rowCount = 0) {
    const metrics = {
      timestamp: new Date().toISOString(),
      type: 'database',
      query: query.substring(0, 200), // Truncate long queries
      executionTime,
      rowCount,
      memory: process.memoryUsage()
    };

    this.addMetric(metrics);
  }

  // Add metric to buffer
  addMetric(metric) {
    this.metricsBuffer.push(metric);
    
    // Flush if buffer is full
    if (this.metricsBuffer.length >= this.bufferSize) {
      this.flushMetrics();
    }
  }

  // Flush metrics to file
  async flushMetrics() {
    if (this.metricsBuffer.length === 0) return;

    try {
      const metricsToFlush = [...this.metricsBuffer];
      this.metricsBuffer = [];

      // Read existing metrics
      let existingMetrics = [];
      try {
        const data = await fs.readFile(this.metricsFile, 'utf8');
        existingMetrics = JSON.parse(data);
      } catch (error) {
        // File doesn't exist or is empty, start with empty array
        existingMetrics = [];
      }

      // Append new metrics
      const allMetrics = [...existingMetrics, ...metricsToFlush];
      
      // Keep only last 10000 metrics to prevent file from growing too large
      const trimmedMetrics = allMetrics.slice(-10000);

      // Write back to file
      await fs.writeFile(this.metricsFile, JSON.stringify(trimmedMetrics, null, 2));
      
      console.log(`Flushed ${metricsToFlush.length} performance metrics to file`);
    } catch (error) {
      console.error('Error flushing performance metrics:', error);
      // Put metrics back in buffer if write failed
      this.metricsBuffer.unshift(...this.metricsBuffer);
    }
  }

  // Start periodic flush
  startPeriodicFlush() {
    // Only start periodic flush in non-test environment
    if (process.env.NODE_ENV !== 'test') {
      this.flushIntervalId = setInterval(() => {
        this.flushMetrics();
      }, this.flushIntervalMs);
    }
  }

  // Clean up timers
  cleanup() {
    if (this.flushIntervalId) {
      clearInterval(this.flushIntervalId);
      this.flushIntervalId = null;
    }
  }

  // Get metrics from file
  async getStoredMetrics(limit = 1000, type = null) {
    try {
      const data = await fs.readFile(this.metricsFile, 'utf8');
      let metrics = JSON.parse(data);
      
      // Filter by type if specified
      if (type) {
        metrics = metrics.filter(metric => metric.type === type);
      }
      
      // Return last N metrics
      return metrics.slice(-limit);
    } catch (error) {
      console.error('Error reading stored metrics:', error);
      return [];
    }
  }

  // Generate performance report
  async generatePerformanceReport(timeRange = '1h') {
    const metrics = await this.getStoredMetrics(10000);
    const now = new Date();
    let startTime;

    // Calculate start time based on range
    switch (timeRange) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
    }

    // Filter metrics by time range
    const filteredMetrics = metrics.filter(metric => 
      new Date(metric.timestamp) >= startTime
    );

    // Analyze server metrics
    const serverMetrics = filteredMetrics.filter(m => m.type === 'server');
    const serverAnalysis = this.analyzeServerMetrics(serverMetrics);

    // Analyze client metrics
    const clientMetrics = filteredMetrics.filter(m => m.type === 'client');
    const clientAnalysis = this.analyzeClientMetrics(clientMetrics);

    // Analyze database metrics
    const dbMetrics = filteredMetrics.filter(m => m.type === 'database');
    const dbAnalysis = this.analyzeDatabaseMetrics(dbMetrics);

    return {
      timeRange,
      totalMetrics: filteredMetrics.length,
      server: serverAnalysis,
      client: clientAnalysis,
      database: dbAnalysis,
      generatedAt: new Date().toISOString()
    };
  }

  // Analyze server metrics
  analyzeServerMetrics(metrics) {
    if (metrics.length === 0) return null;

    const responseTimes = metrics.map(m => m.responseTime);
    const statusCodes = metrics.reduce((acc, m) => {
      acc[m.statusCode] = (acc[m.statusCode] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRequests: metrics.length,
      averageResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
      minResponseTime: Math.min(...responseTimes),
      maxResponseTime: Math.max(...responseTimes),
      p95ResponseTime: this.calculatePercentile(responseTimes, 95),
      statusCodes,
      errorRate: ((statusCodes['4'] || 0) + (statusCodes['5'] || 0)) / metrics.length * 100,
      slowRequests: metrics.filter(m => m.responseTime > 1000).length
    };
  }

  // Analyze client metrics
  analyzeClientMetrics(metrics) {
    if (metrics.length === 0) return null;

    const pageLoads = metrics.filter(m => m.pageLoadMetrics);
    const coreWebVitals = metrics.filter(m => m.coreWebVitals);

    return {
      totalSessions: metrics.length,
      pageLoads: pageLoads.length,
      averageLoadTime: pageLoads.length > 0 
        ? pageLoads.reduce((sum, m) => sum + (m.pageLoadMetrics?.loadComplete || 0), 0) / pageLoads.length
        : 0,
      coreWebVitals: coreWebVitals.length > 0 ? {
        averageFCP: coreWebVitals.reduce((sum, m) => sum + (m.coreWebVitals?.fcp || 0), 0) / coreWebVitals.length,
        averageLCP: coreWebVitals.reduce((sum, m) => sum + (m.coreWebVitals?.lcp || 0), 0) / coreWebVitals.length
      } : null
    };
  }

  // Analyze database metrics
  analyzeDatabaseMetrics(metrics) {
    if (metrics.length === 0) return null;

    const executionTimes = metrics.map(m => m.executionTime);
    const slowQueries = metrics.filter(m => m.executionTime > 100);

    return {
      totalQueries: metrics.length,
      averageExecutionTime: executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length,
      slowQueries: slowQueries.length,
      slowestQuery: slowQueries.length > 0 
        ? slowQueries.reduce((prev, current) => 
            prev.executionTime > current.executionTime ? prev : current
          )
        : null
    };
  }

  // Calculate percentile
  calculatePercentile(values, percentile) {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  // Clean up old metrics
  async cleanupOldMetrics(daysToKeep = 30) {
    try {
      const metrics = await this.getStoredMetrics(50000);
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
      
      const filteredMetrics = metrics.filter(metric => 
        new Date(metric.timestamp) >= cutoffDate
      );

      await fs.writeFile(this.metricsFile, JSON.stringify(filteredMetrics, null, 2));
      
      console.log(`Cleaned up old metrics, kept ${filteredMetrics.length} metrics`);
    } catch (error) {
      console.error('Error cleaning up old metrics:', error);
    }
  }
}

// Create singleton instance
const performanceCollector = new PerformanceCollector();

module.exports = {
  performanceCollector,
  collectServerMetrics: (req, res, responseTime) => 
    performanceCollector.collectServerMetrics(req, res, responseTime),
  collectClientMetrics: (metrics) => 
    performanceCollector.collectClientMetrics(metrics),
  collectDatabaseMetrics: (query, time, rows) => 
    performanceCollector.collectDatabaseMetrics(query, time, rows),
  generateReport: (timeRange) => 
    performanceCollector.generatePerformanceReport(timeRange)
};