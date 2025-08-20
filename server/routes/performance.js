// Performance monitoring API routes for TECH BOARD 2025 MCQ System
// Provides real-time performance metrics, monitoring, and alerting

const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const { performanceMonitor } = require('../middleware/performance');
const { dbOptimizer } = require('../utils/database-optimizer');

const router = express.Router();

// In-memory storage for performance metrics (in production, use Redis or database)
const performanceMetrics = {
    apiMetrics: new Map(),
    databaseMetrics: new Map(),
    systemMetrics: new Map(),
    userMetrics: new Map(),
    alerts: []
};

// Performance thresholds for alerting
const PERFORMANCE_THRESHOLDS = {
    apiResponseTime: 1000, // ms
    databaseQueryTime: 200, // ms
    memoryUsage: 512, // MB
    cpuUsage: 80, // %
    errorRate: 5 // %
};

// Collect client-side performance metrics
router.post('/metrics', (req, res) => {
    try {
        const {
            timestamp,
            url,
            userAgent,
            viewport,
            connection,
            coreWebVitals,
            pageLoadMetrics,
            resourceSummary,
            seoScore,
            customMetrics,
            memoryInfo
        } = req.body;

        // Store metrics with timestamp
        const metricId = `${Date.now()}-${Math.random()}`;
        const metric = {
            id: metricId,
            timestamp: new Date(timestamp),
            url,
            userAgent,
            viewport,
            connection,
            coreWebVitals,
            pageLoadMetrics,
            resourceSummary,
            seoScore,
            customMetrics,
            memoryInfo,
            serverTimestamp: new Date()
        };

        performanceMetrics.userMetrics.set(metricId, metric);

        // Check for performance issues and create alerts
        checkPerformanceThresholds(metric);

        // Clean up old metrics (keep last 1000 entries)
        if (performanceMetrics.userMetrics.size > 1000) {
            const oldestKey = performanceMetrics.userMetrics.keys().next().value;
            performanceMetrics.userMetrics.delete(oldestKey);
        }

        res.json({ success: true, metricId });
    } catch (error) {
        console.error('Error storing performance metrics:', error);
        res.status(500).json({ error: 'Failed to store metrics' });
    }
});

// Get performance dashboard data
router.get('/dashboard', requireAdmin, (req, res) => {
    try {
        const { timeRange = '1h' } = req.query;
        const now = new Date();
        let startTime;

        // Calculate time range
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
        const filteredMetrics = Array.from(performanceMetrics.userMetrics.values())
            .filter(metric => metric.timestamp >= startTime);

        // Calculate aggregated statistics
        const stats = calculatePerformanceStats(filteredMetrics);

        // Get system metrics
        const systemStats = getSystemMetrics();

        // Get database performance
        const dbStats = dbOptimizer.getQueryStats();

        // Get recent alerts
        const recentAlerts = performanceMetrics.alerts
            .filter(alert => alert.timestamp >= startTime)
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 50);

        res.json({
            timeRange,
            startTime,
            endTime: now,
            totalMetrics: filteredMetrics.length,
            performanceStats: stats,
            systemMetrics: systemStats,
            databaseStats: dbStats,
            alerts: recentAlerts,
            thresholds: PERFORMANCE_THRESHOLDS
        });
    } catch (error) {
        console.error('Error getting performance dashboard:', error);
        res.status(500).json({ error: 'Failed to get dashboard data' });
    }
});

// Get real-time performance metrics
router.get('/realtime', requireAdmin, (req, res) => {
    try {
        // Get last 10 minutes of metrics
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const recentMetrics = Array.from(performanceMetrics.userMetrics.values())
            .filter(metric => metric.timestamp >= tenMinutesAgo)
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 100);

        // Get current system status
        const systemStatus = getCurrentSystemStatus();

        // Get active alerts
        const activeAlerts = performanceMetrics.alerts
            .filter(alert => !alert.resolved && alert.timestamp >= tenMinutesAgo);

        res.json({
            timestamp: new Date(),
            recentMetrics,
            systemStatus,
            activeAlerts,
            metricsCount: performanceMetrics.userMetrics.size
        });
    } catch (error) {
        console.error('Error getting realtime metrics:', error);
        res.status(500).json({ error: 'Failed to get realtime data' });
    }
});

// Get performance trends
router.get('/trends', requireAdmin, (req, res) => {
    try {
        const { metric = 'coreWebVitals', period = '24h' } = req.query;
        
        const trends = calculatePerformanceTrends(metric, period);
        
        res.json({
            metric,
            period,
            trends,
            recommendations: getPerformanceRecommendations(trends)
        });
    } catch (error) {
        console.error('Error getting performance trends:', error);
        res.status(500).json({ error: 'Failed to get trends' });
    }
});

// Get performance alerts
router.get('/alerts', requireAdmin, (req, res) => {
    try {
        const { status = 'all', limit = 50 } = req.query;
        
        let alerts = performanceMetrics.alerts;
        
        if (status !== 'all') {
            alerts = alerts.filter(alert => 
                status === 'active' ? !alert.resolved : alert.resolved
            );
        }
        
        alerts = alerts
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, parseInt(limit));
        
        res.json({
            alerts,
            totalCount: performanceMetrics.alerts.length,
            activeCount: performanceMetrics.alerts.filter(a => !a.resolved).length
        });
    } catch (error) {
        console.error('Error getting alerts:', error);
        res.status(500).json({ error: 'Failed to get alerts' });
    }
});

// Resolve performance alert
router.post('/alerts/:alertId/resolve', requireAdmin, (req, res) => {
    try {
        const { alertId } = req.params;
        const { resolution } = req.body;
        
        const alertIndex = performanceMetrics.alerts.findIndex(a => a.id === alertId);
        
        if (alertIndex === -1) {
            return res.status(404).json({ error: 'Alert not found' });
        }
        
        performanceMetrics.alerts[alertIndex].resolved = true;
        performanceMetrics.alerts[alertIndex].resolvedAt = new Date();
        performanceMetrics.alerts[alertIndex].resolution = resolution;
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error resolving alert:', error);
        res.status(500).json({ error: 'Failed to resolve alert' });
    }
});

// Get system health check
router.get('/health', (req, res) => {
    try {
        const health = {
            status: 'healthy',
            timestamp: new Date(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            database: 'unknown',
            cache: {
                userMetrics: performanceMetrics.userMetrics.size,
                alerts: performanceMetrics.alerts.length
            }
        };
        
        // Check database health
        dbOptimizer.healthCheck()
            .then(dbHealth => {
                health.database = dbHealth.status;
                res.json(health);
            })
            .catch(() => {
                health.database = 'unhealthy';
                health.status = 'degraded';
                res.json(health);
            });
    } catch (error) {
        res.status(500).json({
            status: 'unhealthy',
            error: error.message,
            timestamp: new Date()
        });
    }
});

// Performance optimization suggestions
router.get('/suggestions', requireAdmin, (req, res) => {
    try {
        const suggestions = generateOptimizationSuggestions();
        res.json({ suggestions });
    } catch (error) {
        console.error('Error getting suggestions:', error);
        res.status(500).json({ error: 'Failed to get suggestions' });
    }
});

// Helper functions

function calculatePerformanceStats(metrics) {
    if (metrics.length === 0) {
        return {
            coreWebVitals: null,
            pageLoad: null,
            seoScore: null,
            resourceSummary: null
        };
    }

    // Calculate Core Web Vitals averages
    const coreWebVitals = {
        fcp: calculateAverage(metrics, 'coreWebVitals.fcp'),
        lcp: calculateAverage(metrics, 'coreWebVitals.lcp'),
        fid: calculateAverage(metrics, 'coreWebVitals.fid'),
        cls: calculateAverage(metrics, 'coreWebVitals.cls'),
        ttfb: calculateAverage(metrics, 'coreWebVitals.ttfb')
    };

    // Calculate page load metrics
    const pageLoad = {
        domContentLoaded: calculateAverage(metrics, 'pageLoadMetrics.domContentLoaded'),
        loadComplete: calculateAverage(metrics, 'pageLoadMetrics.loadComplete'),
        firstByte: calculateAverage(metrics, 'pageLoadMetrics.firstByte')
    };

    // Calculate SEO score average
    const seoScore = calculateAverage(metrics, 'seoScore.overall');

    // Calculate resource summary
    const resourceSummary = {
        totalResources: calculateAverage(metrics, 'resourceSummary.totalResources'),
        totalSize: calculateAverage(metrics, 'resourceSummary.totalSize'),
        slowResources: calculateAverage(metrics, 'resourceSummary.slowResources.length')
    };

    return {
        coreWebVitals,
        pageLoad,
        seoScore,
        resourceSummary,
        sampleSize: metrics.length
    };
}

function calculateAverage(metrics, path) {
    const values = metrics
        .map(metric => getNestedValue(metric, path))
        .filter(value => value !== null && value !== undefined && !isNaN(value));
    
    if (values.length === 0) return null;
    
    return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

function checkPerformanceThresholds(metric) {
    const alerts = [];

    // Check Core Web Vitals
    if (metric.coreWebVitals) {
        if (metric.coreWebVitals.lcp > 2500) {
            alerts.push(createAlert('warning', 'Slow LCP detected', `LCP: ${metric.coreWebVitals.lcp}ms`, metric));
        }
        if (metric.coreWebVitals.fid > 100) {
            alerts.push(createAlert('warning', 'High FID detected', `FID: ${metric.coreWebVitals.fid}ms`, metric));
        }
        if (metric.coreWebVitals.cls > 0.1) {
            alerts.push(createAlert('error', 'High CLS detected', `CLS: ${metric.coreWebVitals.cls}`, metric));
        }
    }

    // Check memory usage
    if (metric.memoryInfo && metric.memoryInfo.usedJSHeapSize) {
        const memoryMB = metric.memoryInfo.usedJSHeapSize / 1024 / 1024;
        if (memoryMB > PERFORMANCE_THRESHOLDS.memoryUsage) {
            alerts.push(createAlert('warning', 'High memory usage', `Memory: ${Math.round(memoryMB)}MB`, metric));
        }
    }

    // Check slow resources
    if (metric.resourceSummary && metric.resourceSummary.slowResources && metric.resourceSummary.slowResources.length > 5) {
        alerts.push(createAlert('info', 'Multiple slow resources', `${metric.resourceSummary.slowResources.length} slow resources`, metric));
    }

    // Store alerts
    alerts.forEach(alert => {
        performanceMetrics.alerts.push(alert);
    });

    // Keep only last 500 alerts
    if (performanceMetrics.alerts.length > 500) {
        performanceMetrics.alerts = performanceMetrics.alerts.slice(-500);
    }
}

function createAlert(severity, title, description, metric) {
    return {
        id: `alert-${Date.now()}-${Math.random()}`,
        severity,
        title,
        description,
        timestamp: new Date(),
        url: metric.url,
        userAgent: metric.userAgent,
        resolved: false,
        metricId: metric.id
    };
}

function getSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
        memory: {
            rss: Math.round(memUsage.rss / 1024 / 1024), // MB
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
            external: Math.round(memUsage.external / 1024 / 1024) // MB
        },
        cpu: {
            user: cpuUsage.user,
            system: cpuUsage.system
        },
        uptime: Math.round(process.uptime()),
        nodeVersion: process.version,
        platform: process.platform
    };
}

function getCurrentSystemStatus() {
    const memUsage = process.memoryUsage();
    const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
    
    let status = 'healthy';
    const issues = [];
    
    if (heapUsedMB > PERFORMANCE_THRESHOLDS.memoryUsage) {
        status = 'warning';
        issues.push(`High memory usage: ${Math.round(heapUsedMB)}MB`);
    }
    
    if (performanceMetrics.alerts.filter(a => !a.resolved && Date.now() - a.timestamp.getTime() < 300000).length > 10) {
        status = 'critical';
        issues.push('Multiple active performance alerts');
    }
    
    return {
        status,
        issues,
        timestamp: new Date()
    };
}

function calculatePerformanceTrends(metric, period) {
    // Implementation for calculating performance trends over time
    // This would analyze historical data to show improvement/degradation
    return {
        trend: 'stable',
        change: 0,
        dataPoints: []
    };
}

function getPerformanceRecommendations(trends) {
    const recommendations = [];
    
    // Add recommendations based on current performance data
    const recentMetrics = Array.from(performanceMetrics.userMetrics.values())
        .slice(-100);
    
    if (recentMetrics.length > 0) {
        const avgLCP = calculateAverage(recentMetrics, 'coreWebVitals.lcp');
        if (avgLCP && avgLCP > 2500) {
            recommendations.push('Consider optimizing Largest Contentful Paint by compressing images and reducing server response times');
        }
        
        const avgFID = calculateAverage(recentMetrics, 'coreWebVitals.fid');
        if (avgFID && avgFID > 100) {
            recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time and using code splitting');
        }
        
        const avgCLS = calculateAverage(recentMetrics, 'coreWebVitals.cls');
        if (avgCLS && avgCLS > 0.1) {
            recommendations.push('Fix Cumulative Layout Shift by reserving space for dynamic content and avoiding layout-inducing changes');
        }
    }
    
    return recommendations;
}

function generateOptimizationSuggestions() {
    const suggestions = [];
    
    // Analyze current performance data and generate suggestions
    const dbStats = dbOptimizer.getQueryStats();
    
    Object.entries(dbStats).forEach(([queryName, stats]) => {
        if (stats.avgTime > 100) {
            suggestions.push({
                type: 'database',
                priority: 'high',
                title: `Optimize slow query: ${queryName}`,
                description: `Average execution time: ${stats.avgTime.toFixed(2)}ms`,
                recommendation: 'Consider adding indexes or optimizing query structure'
            });
        }
    });
    
    // Check for memory issues
    const memUsage = process.memoryUsage();
    const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
    
    if (heapUsedMB > 256) {
        suggestions.push({
            type: 'memory',
            priority: 'medium',
            title: 'High memory usage detected',
            description: `Current heap usage: ${Math.round(heapUsedMB)}MB`,
            recommendation: 'Review memory leaks and optimize data structures'
        });
    }
    
    return suggestions;
}

module.exports = router;