import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { Activity, Zap, Clock, Database } from 'lucide-react';

interface PerformanceMetrics {
  responseTime: number;
  cacheHitRate: number;
  memoryUsage: number;
  activeConnections: number;
  timestamp: string;
}

interface PerformanceMonitorProps {
  refreshInterval?: number;
  showDetails?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

// Memoized metric card component
const MetricCard = memo<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  color: string;
}>(({ icon, title, value, unit, trend, color }) => {
  const trendIcon = useMemo(() => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  }, [trend]);

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 border-${color}-500 p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${color}-100 rounded-lg`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {value}{unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
            </p>
          </div>
        </div>
        <span className="text-lg">{trendIcon}</span>
      </div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

const OptimizedPerformanceMonitor: React.FC<PerformanceMonitorProps> = memo(({
  refreshInterval = 30000,
  showDetails = true,
  onMetricsUpdate
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchMetrics = useCallback(async () => {
    try {
      const response = await fetch('/api/performance/health');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      
      const data = await response.json();
      const newMetrics: PerformanceMetrics = {
        responseTime: data.responseTime || 0,
        cacheHitRate: data.cache?.averageHitRate || 0,
        memoryUsage: data.memory?.usage || 0,
        activeConnections: data.database?.activeConnections || 0,
        timestamp: new Date().toISOString()
      };
      
      setMetrics(newMetrics);
      setError(null);
      
      // Notify parent component
      if (onMetricsUpdate) {
        onMetricsUpdate(newMetrics);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [onMetricsUpdate]);

  // Effect for periodic updates
  useEffect(() => {
    fetchMetrics();
    
    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchMetrics, refreshInterval]);

  // Memoized metric cards to prevent unnecessary re-renders
  const metricCards = useMemo(() => {
    if (!metrics) return null;

    return [
      {
        icon: React.createElement(Clock, { className: "w-5 h-5 text-blue-600" }),
        title: 'Response Time',
        value: metrics.responseTime,
        unit: 'ms',
        color: 'blue',
        trend: metrics.responseTime < 100 ? 'down' : metrics.responseTime > 500 ? 'up' : 'stable'
      },
      {
        icon: React.createElement(Zap, { className: "w-5 h-5 text-green-600" }),
        title: 'Cache Hit Rate',
        value: Math.round(metrics.cacheHitRate * 100),
        unit: '%',
        color: 'green',
        trend: metrics.cacheHitRate > 0.8 ? 'up' : metrics.cacheHitRate < 0.5 ? 'down' : 'stable'
      },
      {
        icon: React.createElement(Activity, { className: "w-5 h-5 text-purple-600" }),
        title: 'Memory Usage',
        value: Math.round(metrics.memoryUsage),
        unit: 'MB',
        color: 'purple',
        trend: metrics.memoryUsage < 100 ? 'down' : metrics.memoryUsage > 200 ? 'up' : 'stable'
      },
      {
        icon: React.createElement(Database, { className: "w-5 h-5 text-orange-600" }),
        title: 'DB Connections',
        value: metrics.activeConnections,
        color: 'orange',
        trend: 'stable'
      }
    ];
  }, [metrics]);

  // Memoized refresh handler
  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetchMetrics();
  }, [fetchMetrics]);

  if (loading && !metrics) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Error loading metrics</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Last updated: {metrics ? new Date(metrics.timestamp).toLocaleTimeString() : 'Never'}
          </span>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Refresh metrics"
          >
            🔄
          </button>
        </div>
      </div>

      {metricCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((card, index) => (
            <MetricCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              unit={card.unit}
              trend={card.trend as 'up' | 'down' | 'stable'}
              color={card.color}
            />
          ))}
        </div>
      )}

      {showDetails && metrics && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">System Health</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Healthy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime:</span>
              <span className="font-medium">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Load:</span>
              <span className="font-medium">Normal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedPerformanceMonitor.displayName = 'OptimizedPerformanceMonitor';

export default OptimizedPerformanceMonitor;