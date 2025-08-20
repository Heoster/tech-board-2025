import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
    navigationTiming: PerformanceNavigationTiming | null;
    paintTiming: PerformancePaintTiming[];
    resourceTiming: PerformanceResourceTiming[];
    memoryInfo: any;
    customMetrics: Record<string, number>;
    coreWebVitals: {
        fcp: number;
        lcp: number;
        fid: number;
        cls: number;
        ttfb: number;
    } | null;
}

interface CustomTimer {
    name: string;
    startTime: number;
}

export const usePerformance = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        navigationTiming: null,
        paintTiming: [],
        resourceTiming: [],
        memoryInfo: null,
        customMetrics: {},
        coreWebVitals: null
    });

    const timers = useRef<Map<string, CustomTimer>>(new Map());
    const observers = useRef<PerformanceObserver[]>([]);

    // Initialize performance monitoring
    useEffect(() => {
        if (typeof window === 'undefined' || !window.performance) {
            return;
        }

        // Collect navigation timing using modern API
        const collectNavigationTiming = () => {
            const navigationEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
                setMetrics(prev => ({
                    ...prev,
                    navigationTiming: navigationEntries[0]
                }));
            }
        };

        // Collect paint timing
        const collectPaintTiming = () => {
            const paintEntries = window.performance.getEntriesByType('paint') as PerformancePaintTiming[];
            setMetrics(prev => ({
                ...prev,
                paintTiming: paintEntries
            }));
        };

        // Collect resource timing
        const collectResourceTiming = () => {
            const resourceEntries = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
            setMetrics(prev => ({
                ...prev,
                resourceTiming: resourceEntries
            }));
        };

        // Collect memory info (Chrome only)
        const collectMemoryInfo = () => {
            if ('memory' in window.performance) {
                setMetrics(prev => ({
                    ...prev,
                    memoryInfo: (window.performance as any).memory
                }));
            }
        };

        // Collect Core Web Vitals using modern APIs
        const collectCoreWebVitals = () => {
            const navigationEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            const paintEntries = window.performance.getEntriesByType('paint') as PerformancePaintTiming[];

            if (navigationEntries.length === 0) return;

            const navigation = navigationEntries[0];
            const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
            const ttfb = navigation.responseStart - navigation.requestStart;

            setMetrics(prev => ({
                ...prev,
                coreWebVitals: {
                    fcp: Math.round(fcp),
                    lcp: 0, // Will be updated by LCP observer
                    fid: 0, // Will be updated by FID observer
                    cls: 0, // Will be updated by CLS observer
                    ttfb: Math.round(ttfb)
                }
            }));
        };

        // Set up Performance Observers for Core Web Vitals and other metrics
        if ('PerformanceObserver' in window) {
            try {
                // Observer for paint timing (FCP)
                const paintObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries() as PerformancePaintTiming[];
                    setMetrics(prev => ({
                        ...prev,
                        paintTiming: [...prev.paintTiming, ...entries]
                    }));

                    // Update FCP in Core Web Vitals
                    const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
                    if (fcp) {
                        setMetrics(prev => ({
                            ...prev,
                            coreWebVitals: prev.coreWebVitals ? {
                                ...prev.coreWebVitals,
                                fcp: Math.round(fcp.startTime)
                            } : null
                        }));
                    }
                });
                paintObserver.observe({ entryTypes: ['paint'] });
                observers.current.push(paintObserver);

                // Observer for Largest Contentful Paint (LCP)
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        setMetrics(prev => ({
                            ...prev,
                            coreWebVitals: prev.coreWebVitals ? {
                                ...prev.coreWebVitals,
                                lcp: Math.round(lastEntry.startTime)
                            } : null
                        }));
                    }
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                observers.current.push(lcpObserver);

                // Observer for First Input Delay (FID)
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry: any) => {
                        if (entry.processingStart && entry.startTime) {
                            const fid = entry.processingStart - entry.startTime;
                            setMetrics(prev => ({
                                ...prev,
                                coreWebVitals: prev.coreWebVitals ? {
                                    ...prev.coreWebVitals,
                                    fid: Math.round(fid)
                                } : null
                            }));
                        }
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                observers.current.push(fidObserver);

                // Observer for Cumulative Layout Shift (CLS)
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry: any) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            setMetrics(prev => ({
                                ...prev,
                                coreWebVitals: prev.coreWebVitals ? {
                                    ...prev.coreWebVitals,
                                    cls: Math.round(clsValue * 1000) / 1000
                                } : null
                            }));
                        }
                    });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                observers.current.push(clsObserver);

                // Observer for navigation timing
                const navigationObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    if (entries.length > 0) {
                        collectNavigationTiming();
                        collectCoreWebVitals();
                    }
                });
                navigationObserver.observe({ entryTypes: ['navigation'] });
                observers.current.push(navigationObserver);

                // Observer for resource timing
                const resourceObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries() as PerformanceResourceTiming[];
                    setMetrics(prev => ({
                        ...prev,
                        resourceTiming: [...prev.resourceTiming, ...entries]
                    }));
                });
                resourceObserver.observe({ entryTypes: ['resource'] });
                observers.current.push(resourceObserver);

            } catch (error) {
                console.warn('Performance Observer not supported:', error);
            }
        }

        // Initial collection
        setTimeout(() => {
            collectNavigationTiming();
            collectPaintTiming();
            collectResourceTiming();
            collectMemoryInfo();
            collectCoreWebVitals();
        }, 1000);

        // Periodic memory collection
        const memoryInterval = setInterval(collectMemoryInfo, 30000);

        return () => {
            clearInterval(memoryInterval);
            observers.current.forEach(observer => observer.disconnect());
            observers.current = [];
        };
    }, []);

    // Start a custom timer
    const startTimer = (name: string) => {
        const startTime = performance.now();
        timers.current.set(name, { name, startTime });

        // Also mark in Performance API
        if (window.performance.mark) {
            window.performance.mark(`${name}-start`);
        }
    };

    // End a custom timer and record the duration
    const endTimer = (name: string) => {
        const timer = timers.current.get(name);
        if (!timer) {
            console.warn(`Timer "${name}" was not started`);
            return 0;
        }

        const endTime = performance.now();
        const duration = endTime - timer.startTime;

        // Mark end and measure
        if (window.performance.mark && window.performance.measure) {
            window.performance.mark(`${name}-end`);
            window.performance.measure(name, `${name}-start`, `${name}-end`);
        }

        // Update custom metrics
        setMetrics(prev => ({
            ...prev,
            customMetrics: {
                ...prev.customMetrics,
                [name]: duration
            }
        }));

        timers.current.delete(name);
        return duration;
    };

    // Measure a function execution time
    const measureFunction = async <T>(name: string, fn: () => T | Promise<T>): Promise<T> => {
        startTimer(name);
        try {
            const result = await fn();
            endTimer(name);
            return result;
        } catch (error) {
            endTimer(name);
            throw error;
        }
    };

    // Get Core Web Vitals (now collected in real-time)
    const getCoreWebVitals = () => {
        return metrics.coreWebVitals;
    };

    // Get page load metrics using modern Navigation Timing API
    const getPageLoadMetrics = () => {
        const navigation = metrics.navigationTiming;
        if (!navigation) return null;

        return {
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
            domInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
            firstByte: Math.round(navigation.responseStart - navigation.requestStart),
            domProcessing: Math.round(navigation.domComplete - navigation.domInteractive),
            dnsLookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcpConnect: Math.round(navigation.connectEnd - navigation.connectStart),
            serverResponse: Math.round(navigation.responseEnd - navigation.responseStart)
        };
    };

    // Get resource performance summary
    const getResourceSummary = () => {
        const resources = metrics.resourceTiming;

        const summary = {
            totalResources: resources.length,
            totalSize: 0,
            totalDuration: 0,
            slowResources: [] as PerformanceResourceTiming[],
            resourceTypes: {} as Record<string, number>
        };

        resources.forEach(resource => {
            summary.totalDuration += resource.duration;

            if (resource.transferSize) {
                summary.totalSize += resource.transferSize;
            }

            if (resource.duration > 1000) { // Slow resources (>1s)
                summary.slowResources.push(resource);
            }

            // Count by type
            const extension = resource.name.split('.').pop()?.toLowerCase() || 'other';
            summary.resourceTypes[extension] = (summary.resourceTypes[extension] || 0) + 1;
        });

        return summary;
    };

    // Get SEO performance score based on Core Web Vitals
    const getSEOPerformanceScore = () => {
        const vitals = getCoreWebVitals();
        if (!vitals) return null;

        // Google's thresholds for good performance
        const scores = {
            fcp: vitals.fcp <= 1800 ? 100 : vitals.fcp <= 3000 ? 50 : 0,
            lcp: vitals.lcp <= 2500 ? 100 : vitals.lcp <= 4000 ? 50 : 0,
            fid: vitals.fid <= 100 ? 100 : vitals.fid <= 300 ? 50 : 0,
            cls: vitals.cls <= 0.1 ? 100 : vitals.cls <= 0.25 ? 50 : 0,
            ttfb: vitals.ttfb <= 800 ? 100 : vitals.ttfb <= 1800 ? 50 : 0
        };

        const overallScore = Math.round(
            (scores.fcp + scores.lcp + scores.fid + scores.cls + scores.ttfb) / 5
        );

        return {
            overall: overallScore,
            breakdown: scores,
            vitals,
            grade: overallScore >= 90 ? 'A' : overallScore >= 75 ? 'B' : overallScore >= 50 ? 'C' : 'D'
        };
    };

    // Send metrics to server with SEO context
    const sendMetricsToServer = async () => {
        try {
            const coreWebVitals = getCoreWebVitals();
            const pageLoadMetrics = getPageLoadMetrics();
            const resourceSummary = getResourceSummary();
            const seoScore = getSEOPerformanceScore();

            const payload = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                connection: (navigator as any).connection ? {
                    effectiveType: (navigator as any).connection.effectiveType,
                    downlink: (navigator as any).connection.downlink,
                    rtt: (navigator as any).connection.rtt
                } : null,
                coreWebVitals,
                pageLoadMetrics,
                resourceSummary,
                seoScore,
                customMetrics: metrics.customMetrics,
                memoryInfo: metrics.memoryInfo
            };

            // Send to performance endpoint
            await fetch('/api/performance/metrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.warn('Failed to send performance metrics:', error);
        }
    };

    return {
        metrics,
        startTimer,
        endTimer,
        measureFunction,
        getCoreWebVitals,
        getPageLoadMetrics,
        getResourceSummary,
        getSEOPerformanceScore,
        sendMetricsToServer
    };
};

// Hook for component-level performance tracking
export const useComponentPerformance = (componentName: string) => {
    const { startTimer, endTimer, measureFunction } = usePerformance();
    const renderCount = useRef(0);
    const mountTime = useRef<number>(0);

    useEffect(() => {
        // Track component mount time
        mountTime.current = performance.now();
        startTimer(`${componentName}-mount`);

        return () => {
            // Track component unmount
            endTimer(`${componentName}-mount`);
        };
    }, [componentName, startTimer, endTimer]);

    useEffect(() => {
        // Track renders
        renderCount.current += 1;

        if (renderCount.current > 1) {
            // Track re-render performance
            const renderTimer = `${componentName}-render-${renderCount.current}`;
            startTimer(renderTimer);

            // End timer on next tick
            setTimeout(() => endTimer(renderTimer), 0);
        }
    });

    const trackAsyncOperation = (operationName: string, operation: () => Promise<any>) => {
        return measureFunction(`${componentName}-${operationName}`, operation);
    };

    return {
        renderCount: renderCount.current,
        trackAsyncOperation
    };
};