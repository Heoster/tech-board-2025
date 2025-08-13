// Asset optimization utilities for TECH BOARD 2025 MCQ System
// Implements resource preloading, caching strategies, and performance optimization

interface AssetPreloadConfig {
    href: string;
    as: 'script' | 'style' | 'font' | 'image' | 'fetch';
    type?: string;
    crossorigin?: 'anonymous' | 'use-credentials';
    media?: string;
}

interface CacheConfig {
    name: string;
    version: string;
    assets: string[];
    strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
}

class AssetOptimizer {
    private preloadedAssets: Set<string> = new Set();
    private criticalResources: string[] = [];
    private deferredResources: string[] = [];
    
    constructor() {
        this.initializeOptimizations();
    }
    
    private initializeOptimizations() {
        if (typeof window === 'undefined') return;
        
        // Set up resource hints
        this.addResourceHints();
        
        // Optimize font loading
        this.optimizeFontLoading();
        
        // Set up critical resource preloading
        this.preloadCriticalResources();
        
        // Defer non-critical resources
        this.deferNonCriticalResources();
    }
    
    // Add DNS prefetch and preconnect hints
    private addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    }
    
    // Optimize font loading with font-display and preload
    private optimizeFontLoading() {
        const fontPreloads = [
            {
                href: '/fonts/inter-var.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: 'anonymous'
            }
        ];
        
        fontPreloads.forEach(font => {
            this.preloadResource(font);
        });
        
        // Add font-display CSS if not already present
        if (!document.querySelector('#font-display-css')) {
            const style = document.createElement('style');
            style.id = 'font-display-css';
            style.textContent = `
                @font-face {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 100 900;
                    font-display: swap;
                    src: url('/fonts/inter-var.woff2') format('woff2');
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Preload critical resources
    private preloadCriticalResources() {
        this.criticalResources = [
            '/css/critical.css',
            '/js/critical.js',
            '/images/logo.svg',
            '/images/hero-bg.webp'
        ];
        
        this.criticalResources.forEach(resource => {
            const extension = resource.split('.').pop()?.toLowerCase();
            let asType: AssetPreloadConfig['as'] = 'fetch';
            
            switch (extension) {
                case 'css':
                    asType = 'style';
                    break;
                case 'js':
                    asType = 'script';
                    break;
                case 'woff':
                case 'woff2':
                case 'ttf':
                    asType = 'font';
                    break;
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'webp':
                case 'avif':
                case 'svg':
                    asType = 'image';
                    break;
            }
            
            this.preloadResource({
                href: resource,
                as: asType,
                ...(asType === 'font' && { crossorigin: 'anonymous' as const })
            });
        });
    }
    
    // Defer non-critical resources
    private deferNonCriticalResources() {
        // Defer non-critical CSS
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
            const linkElement = link as HTMLLinkElement;
            linkElement.media = 'print';
            linkElement.onload = () => {
                linkElement.media = 'all';
            };
        });
        
        // Defer non-critical JavaScript
        const nonCriticalJS = document.querySelectorAll('script:not([data-critical])');
        nonCriticalJS.forEach(script => {
            const scriptElement = script as HTMLScriptElement;
            if (!scriptElement.defer && !scriptElement.async) {
                scriptElement.defer = true;
            }
        });
    }
    
    // Preload a specific resource
    preloadResource(config: AssetPreloadConfig) {
        if (this.preloadedAssets.has(config.href)) {
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = config.href;
        link.as = config.as;
        
        if (config.type) link.type = config.type;
        if (config.crossorigin) link.crossOrigin = config.crossorigin;
        if (config.media) link.media = config.media;
        
        document.head.appendChild(link);
        this.preloadedAssets.add(config.href);
    }
    
    // Prefetch resources for future navigation
    prefetchResource(href: string) {
        if (this.preloadedAssets.has(href)) {
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        
        document.head.appendChild(link);
        this.preloadedAssets.add(href);
    }
    
    // Optimize images with modern formats and lazy loading
    optimizeImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            const imgElement = img as HTMLImageElement;
            
            // Add loading="lazy" for non-critical images
            if (!imgElement.dataset.critical) {
                imgElement.loading = 'lazy';
            }
            
            // Add responsive image attributes
            if (!imgElement.sizes && imgElement.width) {
                imgElement.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
            }
            
            imgElement.dataset.optimized = 'true';
        });
    }
    
    // Implement service worker for advanced caching
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, notify user
                                this.notifyUpdate();
                            }
                        });
                    }
                });
                
                return registration;
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
    
    // Notify user of available updates
    private notifyUpdate() {
        if (confirm('New version available! Reload to update?')) {
            window.location.reload();
        }
    }
    
    // Optimize CSS delivery
    optimizeCSSDelivery() {
        // Inline critical CSS
        const criticalCSS = `
            /* Critical CSS for above-the-fold content */
            body { font-family: Inter, system-ui, sans-serif; margin: 0; }
            .header { background: #1e293b; color: white; padding: 1rem; }
            .loading { display: flex; justify-content: center; align-items: center; height: 50vh; }
            .btn-primary { background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
        
        // Load non-critical CSS asynchronously
        const loadCSS = (href: string) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => {
                link.media = 'all';
            };
            document.head.appendChild(link);
        };
        
        // Load non-critical stylesheets
        const nonCriticalCSS = [
            '/css/components.css',
            '/css/utilities.css'
        ];
        
        nonCriticalCSS.forEach(loadCSS);
    }
    
    // Implement resource bundling and code splitting
    optimizeJavaScript() {
        // Preload critical JavaScript modules
        const criticalModules = [
            '/js/app.js',
            '/js/router.js'
        ];
        
        criticalModules.forEach(module => {
            this.preloadResource({
                href: module,
                as: 'script'
            });
        });
        
        // Prefetch route-specific modules
        const routeModules = [
            '/js/quiz.js',
            '/js/dashboard.js',
            '/js/admin.js'
        ];
        
        // Prefetch based on likely user navigation
        setTimeout(() => {
            routeModules.forEach(module => {
                this.prefetchResource(module);
            });
        }, 2000);
    }
    
    // Monitor and report performance metrics
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor resource loading
            const resourceObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    const resource = entry as PerformanceResourceTiming;
                    
                    // Log slow resources
                    if (resource.duration > 1000) {
                        console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
                    }
                    
                    // Track resource types
                    const resourceType = this.getResourceType(resource.name);
                    this.trackResourceMetrics(resourceType, resource.duration, resource.transferSize);
                });
            });
            
            resourceObserver.observe({ entryTypes: ['resource'] });
        }
    }
    
    private getResourceType(url: string): string {
        const extension = url.split('.').pop()?.toLowerCase();
        
        switch (extension) {
            case 'css':
                return 'stylesheet';
            case 'js':
                return 'script';
            case 'woff':
            case 'woff2':
            case 'ttf':
                return 'font';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'webp':
            case 'avif':
            case 'svg':
                return 'image';
            default:
                return 'other';
        }
    }
    
    private trackResourceMetrics(type: string, duration: number, size: number) {
        // Send metrics to performance monitoring service
        if (typeof window !== 'undefined' && 'fetch' in window) {
            fetch('/api/performance/resource-metrics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    duration,
                    size,
                    timestamp: Date.now(),
                    url: window.location.href
                })
            }).catch(() => {
                // Silently fail - don't impact user experience
            });
        }
    }
    
    // Get optimization recommendations
    getOptimizationRecommendations(): string[] {
        const recommendations: string[] = [];
        
        // Check for unoptimized images
        const unoptimizedImages = document.querySelectorAll('img:not([loading]):not([data-critical])');
        if (unoptimizedImages.length > 0) {
            recommendations.push(`Add lazy loading to ${unoptimizedImages.length} images`);
        }
        
        // Check for missing resource hints
        const hasPreconnect = document.querySelector('link[rel="preconnect"]');
        if (!hasPreconnect) {
            recommendations.push('Add preconnect hints for external resources');
        }
        
        // Check for uncompressed resources
        const largeResources = performance.getEntriesByType('resource')
            .filter((resource: any) => resource.transferSize > 100000); // > 100KB
        
        if (largeResources.length > 0) {
            recommendations.push(`Consider compressing ${largeResources.length} large resources`);
        }
        
        return recommendations;
    }
}

// Singleton instance
export const assetOptimizer = new AssetOptimizer();

// Initialize optimizations when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            assetOptimizer.optimizeImages();
            assetOptimizer.optimizeCSSDelivery();
            assetOptimizer.optimizeJavaScript();
            assetOptimizer.monitorPerformance();
        });
    } else {
        assetOptimizer.optimizeImages();
        assetOptimizer.optimizeCSSDelivery();
        assetOptimizer.optimizeJavaScript();
        assetOptimizer.monitorPerformance();
    }
}

export default assetOptimizer;