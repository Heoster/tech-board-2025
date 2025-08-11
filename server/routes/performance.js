const express = require('express');
const router = express.Router();
const { getMetrics, generateReport } = require('../middleware/performance');
const { collectClientMetrics, generateReport: generateDetailedReport } = require('../utils/performanceCollector');

// Get current server performance metrics
router.get('/metrics', (req, res) => {
  try {
    const metrics = getMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve performance metrics'
    });
  }
});

// Get performance report
router.get('/report', async (req, res) => {
  try {
    const timeRange = req.query.range || '1h';
    const report = await generateDetailedReport(timeRange);
    
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error generating performance report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate performance report'
    });
  }
});

// Receive client-side performance metrics
router.post('/metrics', (req, res) => {
  try {
    const clientMetrics = req.body;
    
    // Validate required fields
    if (!clientMetrics.timestamp || !clientMetrics.url) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: timestamp, url'
      });
    }
    
    // Collect the metrics
    collectClientMetrics(clientMetrics);
    
    res.json({
      success: true,
      message: 'Client metrics received'
    });
  } catch (error) {
    console.error('Error collecting client metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to collect client metrics'
    });
  }
});

// Get simple performance summary
router.get('/summary', (req, res) => {
  try {
    const report = generateReport();
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error getting performance summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get performance summary'
    });
  }
});

// Health check with performance info
router.get('/health', (req, res) => {
  try {
    const metrics = getMetrics();
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024)
      },
      performance: {
        averageResponseTime: metrics.averageResponseTime,
        totalRequests: metrics.requests,
        activeConnections: metrics.activeConnections,
        errorRate: metrics.errors / Math.max(metrics.requests, 1)
      }
    };
    
    // Determine health status based on metrics
    if (metrics.averageResponseTime > 1000) {
      health.status = 'degraded';
      health.warnings = health.warnings || [];
      health.warnings.push('High average response time');
    }
    
    if (memoryUsage.heapUsed / memoryUsage.heapTotal > 0.9) {
      health.status = 'degraded';
      health.warnings = health.warnings || [];
      health.warnings.push('High memory usage');
    }
    
    if (metrics.activeConnections > 100) {
      health.status = 'degraded';
      health.warnings = health.warnings || [];
      health.warnings.push('High number of active connections');
    }
    
    res.json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error('Error getting health status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get health status',
      status: 'unhealthy'
    });
  }
});

module.exports = router;