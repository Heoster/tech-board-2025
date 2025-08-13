import React, { useState, useEffect } from 'react';
import { usePerformance } from '../hooks/usePerformance';

interface PerformanceAlert {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: Date;
    metric: string;
    value: number;
    threshold: number;
}

interface PerformanceThresholds {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    memoryUsage: number;
    responseTime: number;
}

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
    fcp: 1800, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
    ttfb: 800, // Time to First Byte (ms)
    memoryUsage: 100, // Memory usage (MB)
    responseTime: 500 // API response time (ms)
};

export const PerformanceDashboard: React.FC = () => {
    const {
        getCoreWebVitals,
        getPageLoadMetrics,
        getResourceSummary,
        getSEOPerformanceScore,
        metrics
    } = usePerformance();

    const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
    const [thresholds, setThresholds] = useState<PerformanceThresholds>(DEFAULT_THRESHOLDS);
    const [historicalData, setHistoricalData] = useState<any[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(true);

    // Real-time performance monitoring
    useEffect(() => {
        if (!isMonitoring) return;

        const checkPerformance = () => {
            const vitals = getCoreWebVitals();
            const seoScore = getSEOPerformanceScore();
            const resourceSummary = getResourceSummary();

            if (vitals) {
                checkThresholds(vitals, seoScore, resourceSummary);
                
                // Add to historical data
                const dataPoint = {
                    timestamp: new Date(),
                    vitals,
                    seoScore: seoScore?.overall || 0,
                    resourceCount: resourceSummary?.totalResources || 0,
                    memoryUsage: metrics.memoryInfo?.usedJSHeapSize ? 
                        Math.round(metrics.memoryInfo.usedJSHeapSize / 1024 / 1024) : 0
                };

                setHistoricalData(prev => {
                    const updated = [...prev, dataPoint];
                    return updated.slice(-50); // Keep last 50 data points
                });
            }
        };

        const interval = setInterval(checkPerformance, 5000); // Check every 5 seconds
        checkPerformance(); // Initial check

        return () => clearInterval(interval);
    }, [isMonitoring, getCoreWebVitals, getSEOPerformanceScore, getResourceSummary, metrics.memoryInfo, thresholds]);

    const checkThresholds = (vitals: any, seoScore: any, resourceSummary: any) => {
        const newAlerts: PerformanceAlert[] = [];

        // Check Core Web Vitals thresholds
        if (vitals.fcp > thresholds.fcp) {
            newAlerts.push(createAlert('warning', 'First Contentful Paint is slow', 'fcp', vitals.fcp, thresholds.fcp));
        }
        if (vitals.lcp > thresholds.lcp) {
            newAlerts.push(createAlert('error', 'Largest Contentful Paint is too slow', 'lcp', vitals.lcp, thresholds.lcp));
        }
        if (vitals.fid > thresholds.fid) {
            newAlerts.push(createAlert('warning', 'First Input Delay is high', 'fid', vitals.fid, thresholds.fid));
        }
        if (vitals.cls > thresholds.cls) {
            newAlerts.push(createAlert('error', 'Cumulative Layout Shift is too high', 'cls', vitals.cls, thresholds.cls));
        }
        if (vitals.ttfb > thresholds.ttfb) {
            newAlerts.push(createAlert('warning', 'Time to First Byte is slow', 'ttfb', vitals.ttfb, thresholds.ttfb));
        }

        // Check memory usage
        if (metrics.memoryInfo?.usedJSHeapSize) {
            const memoryMB = Math.round(metrics.memoryInfo.usedJSHeapSize / 1024 / 1024);
            if (memoryMB > thresholds.memoryUsage) {
                newAlerts.push(createAlert('warning', 'High memory usage detected', 'memory', memoryMB, thresholds.memoryUsage));
            }
        }

        // Check for slow resources
        if (resourceSummary?.slowResources?.length > 0) {
            newAlerts.push(createAlert('info', `${resourceSummary.slowResources.length} slow resources detected`, 'resources', resourceSummary.slowResources.length, 0));
        }

        // Update alerts (keep only recent ones)
        setAlerts(prev => {
            const combined = [...prev, ...newAlerts];
            const recent = combined.filter(alert => 
                Date.now() - alert.timestamp.getTime() < 60000 // Last minute
            );
            return recent.slice(-10); // Keep last 10 alerts
        });
    };

    const createAlert = (type: PerformanceAlert['type'], message: string, metric: string, value: number, threshold: number): PerformanceAlert => ({
        id: `${metric}-${Date.now()}-${Math.random()}`,
        type,
        message,
        timestamp: new Date(),
        metric,
        value,
        threshold
    });

    const clearAlerts = () => setAlerts([]);

    const getPerformanceGrade = (score: number) => {
        if (score >= 90) return { grade: 'A', color: '#22c55e' };
        if (score >= 75) return { grade: 'B', color: '#84cc16' };
        if (score >= 50) return { grade: 'C', color: '#f59e0b' };
        return { grade: 'D', color: '#ef4444' };
    };

    const vitals = getCoreWebVitals();
    const seoScore = getSEOPerformanceScore();
    const pageLoadMetrics = getPageLoadMetrics();
    const resourceSummary = getResourceSummary();

    return (
        <div className="performance-dashboard" style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8fafc',
            minHeight: '100vh'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, color: '#1e293b' }}>Performance Dashboard</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={isMonitoring}
                            onChange={(e) => setIsMonitoring(e.target.checked)}
                        />
                        Real-time Monitoring
                    </label>
                    <button 
                        onClick={clearAlerts}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#64748b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Alerts
                    </button>
                </div>
            </div>

            {/* Alerts Section */}
            {alerts.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>Performance Alerts</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {alerts.map(alert => (
                            <div
                                key={alert.id}
                                style={{
                                    padding: '12px',
                                    borderRadius: '6px',
                                    backgroundColor: alert.type === 'error' ? '#fef2f2' : 
                                                   alert.type === 'warning' ? '#fffbeb' : '#f0f9ff',
                                    borderLeft: `4px solid ${alert.type === 'error' ? '#ef4444' : 
                                                            alert.type === 'warning' ? '#f59e0b' : '#3b82f6'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <strong>{alert.message}</strong>
                                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                        {alert.metric}: {alert.value} (threshold: {alert.threshold})
                                    </div>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>
                                    {alert.timestamp.toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Core Metrics Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px',
                marginBottom: '20px'
            }}>
                {/* Core Web Vitals */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Core Web Vitals</h3>
                    {vitals ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>First Contentful Paint:</span>
                                <span style={{ 
                                    color: vitals.fcp <= 1800 ? '#22c55e' : vitals.fcp <= 3000 ? '#f59e0b' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {vitals.fcp}ms
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Largest Contentful Paint:</span>
                                <span style={{ 
                                    color: vitals.lcp <= 2500 ? '#22c55e' : vitals.lcp <= 4000 ? '#f59e0b' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {vitals.lcp}ms
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>First Input Delay:</span>
                                <span style={{ 
                                    color: vitals.fid <= 100 ? '#22c55e' : vitals.fid <= 300 ? '#f59e0b' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {vitals.fid}ms
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Cumulative Layout Shift:</span>
                                <span style={{ 
                                    color: vitals.cls <= 0.1 ? '#22c55e' : vitals.cls <= 0.25 ? '#f59e0b' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {vitals.cls}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Time to First Byte:</span>
                                <span style={{ 
                                    color: vitals.ttfb <= 800 ? '#22c55e' : vitals.ttfb <= 1800 ? '#f59e0b' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {vitals.ttfb}ms
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#64748b' }}>Loading metrics...</p>
                    )}
                </div>

                {/* SEO Performance Score */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>SEO Performance Score</h3>
                    {seoScore ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '48px', 
                                fontWeight: 'bold', 
                                color: getPerformanceGrade(seoScore.overall).color,
                                marginBottom: '10px'
                            }}>
                                {getPerformanceGrade(seoScore.overall).grade}
                            </div>
                            <div style={{ fontSize: '24px', color: '#64748b', marginBottom: '15px' }}>
                                {seoScore.overall}%
                            </div>
                            <div style={{ fontSize: '14px', color: '#64748b' }}>
                                Based on Core Web Vitals performance
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#64748b' }}>Calculating score...</p>
                    )}
                </div>

                {/* Resource Summary */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Resource Summary</h3>
                    {resourceSummary ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total Resources:</span>
                                <span style={{ fontWeight: 'bold' }}>{resourceSummary.totalResources}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total Size:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {Math.round(resourceSummary.totalSize / 1024)}KB
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Slow Resources:</span>
                                <span style={{ 
                                    fontWeight: 'bold',
                                    color: resourceSummary.slowResources.length > 0 ? '#f59e0b' : '#22c55e'
                                }}>
                                    {resourceSummary.slowResources.length}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Avg Load Time:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {Math.round(resourceSummary.totalDuration / resourceSummary.totalResources)}ms
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#64748b' }}>Loading resource data...</p>
                    )}
                </div>

                {/* Memory Usage */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Memory Usage</h3>
                    {metrics.memoryInfo ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Used Heap:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {Math.round(metrics.memoryInfo.usedJSHeapSize / 1024 / 1024)}MB
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total Heap:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {Math.round(metrics.memoryInfo.totalJSHeapSize / 1024 / 1024)}MB
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Heap Limit:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {Math.round(metrics.memoryInfo.jsHeapSizeLimit / 1024 / 1024)}MB
                                </span>
                            </div>
                            <div style={{ 
                                marginTop: '10px',
                                height: '8px',
                                backgroundColor: '#e2e8f0',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    backgroundColor: '#3b82f6',
                                    width: `${(metrics.memoryInfo.usedJSHeapSize / metrics.memoryInfo.jsHeapSizeLimit) * 100}%`,
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#64748b' }}>Memory info not available</p>
                    )}
                </div>
            </div>

            {/* Historical Performance Chart */}
            {historicalData.length > 0 && (
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Performance Trends</h3>
                    <div style={{ 
                        height: '200px', 
                        display: 'flex', 
                        alignItems: 'end', 
                        gap: '2px',
                        padding: '10px 0'
                    }}>
                        {historicalData.slice(-20).map((data, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: 1,
                                    backgroundColor: getPerformanceGrade(data.seoScore).color,
                                    height: `${(data.seoScore / 100) * 180}px`,
                                    minHeight: '10px',
                                    borderRadius: '2px',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease'
                                }}
                                title={`Score: ${data.seoScore}% at ${data.timestamp.toLocaleTimeString()}`}
                            />
                        ))}
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        fontSize: '12px', 
                        color: '#64748b',
                        marginTop: '10px'
                    }}>
                        <span>20 data points ago</span>
                        <span>Current</span>
                    </div>
                </div>
            )}

            {/* Page Load Metrics */}
            {pageLoadMetrics && (
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Page Load Breakdown</h3>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '15px' 
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>DNS Lookup</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pageLoadMetrics.dnsLookup}ms</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>TCP Connect</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pageLoadMetrics.tcpConnect}ms</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Server Response</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pageLoadMetrics.serverResponse}ms</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>DOM Processing</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pageLoadMetrics.domProcessing}ms</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Load Complete</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{pageLoadMetrics.loadComplete}ms</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerformanceDashboard;