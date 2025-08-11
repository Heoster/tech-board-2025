import React, { useEffect, useState } from 'react';
import { usePerformance } from '../hooks/usePerformance';
import { getPerformanceSEORecommendations } from '../utils/seo';

interface PerformanceMonitorProps {
    showDebugInfo?: boolean;
    autoSendMetrics?: boolean;
    sendInterval?: number; // in milliseconds
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
    showDebugInfo = false,
    autoSendMetrics = true,
    sendInterval = 30000 // 30 seconds
}) => {
    const {
        getCoreWebVitals,
        getSEOPerformanceScore,
        sendMetricsToServer,
        getPageLoadMetrics
    } = usePerformance();

    const [performanceData, setPerformanceData] = useState<any>(null);
    const [seoRecommendations, setSeoRecommendations] = useState<string[]>([]);

    useEffect(() => {
        // Initial performance check after page load
        const checkPerformance = () => {
            const vitals = getCoreWebVitals();
            const score = getSEOPerformanceScore();
            const loadMetrics = getPageLoadMetrics();

            if (vitals) {
                setPerformanceData({ vitals, score, loadMetrics });
                setSeoRecommendations(getPerformanceSEORecommendations(vitals));
            }
        };

        // Check performance after initial load
        const timer = setTimeout(checkPerformance, 2000);

        // Set up periodic performance monitoring
        let interval: number;
        if (autoSendMetrics) {
            interval = setInterval(() => {
                checkPerformance();
                sendMetricsToServer();
            }, sendInterval);
        }

        return () => {
            clearTimeout(timer);
            if (interval) clearInterval(interval);
        };
    }, [getCoreWebVitals, getSEOPerformanceScore, sendMetricsToServer, autoSendMetrics, sendInterval]);

    // Send performance data when user leaves the page
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (navigator.sendBeacon) {
                // Use sendBeacon for reliable data transmission on page unload
                const vitals = getCoreWebVitals();
                if (vitals) {
                    const payload = JSON.stringify({
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        coreWebVitals: vitals,
                        type: 'page_unload'
                    });
                    navigator.sendBeacon('/api/performance/metrics', payload);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [getCoreWebVitals]);

    // Don't render anything in production unless debug mode is enabled
    if (!showDebugInfo) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            maxWidth: '300px',
            zIndex: 9999
        }}>
            <h4>Performance Monitor</h4>

            {performanceData?.vitals && (
                <div>
                    <h5>Core Web Vitals</h5>
                    <div>FCP: {performanceData.vitals.fcp}ms</div>
                    <div>LCP: {performanceData.vitals.lcp}ms</div>
                    <div>FID: {performanceData.vitals.fid}ms</div>
                    <div>CLS: {performanceData.vitals.cls}</div>
                    <div>TTFB: {performanceData.vitals.ttfb}ms</div>
                </div>
            )}

            {performanceData?.score && (
                <div>
                    <h5>SEO Score: {performanceData.score.grade} ({performanceData.score.overall}%)</h5>
                </div>
            )}

            {seoRecommendations.length > 0 && (
                <div>
                    <h5>SEO Recommendations:</h5>
                    <ul style={{ margin: 0, paddingLeft: '15px' }}>
                        {seoRecommendations.slice(0, 3).map((rec, index) => (
                            <li key={index} style={{ fontSize: '10px', marginBottom: '2px' }}>
                                {rec}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Hook for tracking specific user interactions for SEO insights
export const useSEOTracking = () => {
    const { startTimer, endTimer } = usePerformance();

    const trackQuizStart = (grade: string, subject: string) => {
        startTimer(`quiz-start-${grade}-${subject}`);

        // Track engagement for SEO insights
        if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'quiz_start', {
                event_category: 'engagement',
                event_label: `${grade}-${subject}`,
                value: 1
            });
        }
    };

    const trackQuizComplete = (grade: string, subject: string, score: number) => {
        const duration = endTimer(`quiz-start-${grade}-${subject}`);

        // Track completion for SEO insights
        if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'quiz_complete', {
                event_category: 'engagement',
                event_label: `${grade}-${subject}`,
                value: score,
                custom_parameter_1: duration
            });
        }

        return duration;
    };

    const trackPageEngagement = (pageName: string) => {
        startTimer(`page-engagement-${pageName}`);

        return () => {
            const duration = endTimer(`page-engagement-${pageName}`);

            // Track time on page for SEO insights
            if (typeof window !== 'undefined' && 'gtag' in window) {
                (window as any).gtag('event', 'page_engagement', {
                    event_category: 'engagement',
                    event_label: pageName,
                    value: Math.round(duration / 1000) // Convert to seconds
                });
            }

            return duration;
        };
    };

    return {
        trackQuizStart,
        trackQuizComplete,
        trackPageEngagement
    };
};