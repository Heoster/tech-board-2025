// Image optimization utilities for TECH BOARD 2025 MCQ System
// Implements lazy loading, responsive images, and modern format support

import React from 'react';

interface ImageOptimizationOptions {
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    sizes?: string;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    fallback?: string;
}

interface ResponsiveImageConfig {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
}

// Check browser support for modern image formats
export const getBrowserImageSupport = (): Promise<{
    webp: boolean;
    avif: boolean;
}> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;

        const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        // Check AVIF support
        const avifImage = new Image();
        avifImage.onload = () => resolve({ webp: webpSupport, avif: true });
        avifImage.onerror = () => resolve({ webp: webpSupport, avif: false });
        avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
};

// Generate responsive image sources with modern formats
export const generateResponsiveImageSources = (
    baseSrc: string,
    options: ImageOptimizationOptions = {}
): string[] => {
    const { quality = 80, sizes = '100vw' } = options;
    const sources: string[] = [];

    // Generate different sizes (assuming a CDN or image service)
    const widths = [320, 640, 768, 1024, 1280, 1920];

    widths.forEach(width => {
        // Modern formats first (if supported)
        sources.push(`${baseSrc}?w=${width}&q=${quality}&f=avif ${width}w`);
        sources.push(`${baseSrc}?w=${width}&q=${quality}&f=webp ${width}w`);
        sources.push(`${baseSrc}?w=${width}&q=${quality} ${width}w`);
    });

    return sources;
};

// Lazy loading intersection observer
class LazyImageLoader {
    private observer: IntersectionObserver | null = null;
    private imageQueue: Set<HTMLImageElement> = new Set();

    constructor() {
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target as HTMLImageElement;
                            this.loadImage(img);
                            this.observer?.unobserve(img);
                            this.imageQueue.delete(img);
                        }
                    });
                },
                {
                    rootMargin: '50px 0px', // Start loading 50px before image enters viewport
                    threshold: 0.01
                }
            );
        }
    }

    observe(img: HTMLImageElement) {
        if (this.observer) {
            this.observer.observe(img);
            this.imageQueue.add(img);
        } else {
            // Fallback for browsers without IntersectionObserver
            this.loadImage(img);
        }
    }

    private loadImage(img: HTMLImageElement) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            img.src = src;
        }

        if (srcset) {
            img.srcset = srcset;
        }

        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');

        // Trigger custom load event
        img.dispatchEvent(new CustomEvent('lazyload'));
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
            this.imageQueue.clear();
        }
    }
}

// Singleton lazy loader instance
export const lazyImageLoader = new LazyImageLoader();

// Create optimized image element
export const createOptimizedImage = (config: ResponsiveImageConfig): HTMLImageElement => {
    const img = document.createElement('img');

    img.alt = config.alt;
    img.className = config.className || '';

    if (config.width) img.width = config.width;
    if (config.height) img.height = config.height;

    // Set up lazy loading
    img.dataset.src = config.src;
    if (config.sizes) {
        img.dataset.srcset = generateResponsiveImageSources(config.src).join(', ');
        img.sizes = config.sizes;
    }

    img.classList.add('lazy-loading');

    // Add loading placeholder
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

    // Event handlers
    if (config.onLoad) {
        img.addEventListener('lazyload', config.onLoad);
    }

    if (config.onError) {
        img.addEventListener('error', config.onError);
    }

    // Start lazy loading
    lazyImageLoader.observe(img);

    return img;
};

// React hook for optimized images
export const useOptimizedImage = (src: string, options: ImageOptimizationOptions = {}) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [browserSupport, setBrowserSupport] = React.useState<{ webp: boolean; avif: boolean } | null>(null);

    React.useEffect(() => {
        getBrowserImageSupport().then(setBrowserSupport);
    }, []);

    const getOptimizedSrc = React.useCallback(() => {
        if (!browserSupport) return src;

        const { quality = 80, format } = options;
        let optimizedSrc = src;

        // Auto-select best format based on browser support
        if (!format) {
            if (browserSupport.avif) {
                optimizedSrc += `?f=avif&q=${quality}`;
            } else if (browserSupport.webp) {
                optimizedSrc += `?f=webp&q=${quality}`;
            } else {
                optimizedSrc += `?q=${quality}`;
            }
        } else {
            optimizedSrc += `?f=${format}&q=${quality}`;
        }

        return optimizedSrc;
    }, [src, options, browserSupport]);

    const handleLoad = React.useCallback(() => {
        setIsLoaded(true);
        setHasError(false);
    }, []);

    const handleError = React.useCallback(() => {
        setHasError(true);
        setIsLoaded(false);
    }, []);

    return {
        src: getOptimizedSrc(),
        isLoaded,
        hasError,
        onLoad: handleLoad,
        onError: handleError
    };
};

// Image compression utility for client-side optimization
export const compressImage = (
    file: File,
    options: {
        maxWidth?: number;
        maxHeight?: number;
        quality?: number;
        format?: string;
    } = {}
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const {
            maxWidth = 1920,
            maxHeight = 1080,
            quality = 0.8,
            format = 'image/jpeg'
        } = options;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to compress image'));
                    }
                },
                format,
                quality
            );
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

// Preload critical images
export const preloadImages = (urls: string[]): Promise<void[]> => {
    return Promise.all(
        urls.map(url =>
            new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => reject(new Error(`Failed to preload ${url}`));
                img.src = url;
            })
        )
    );
};

// CSS for lazy loading animations
export const lazyLoadingCSS = `
.lazy-loading {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

.lazy-loaded {
    opacity: 1;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}

.image-placeholder {
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
}
`;

// Add CSS to document head
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = lazyLoadingCSS;
    document.head.appendChild(style);
}

export default {
    getBrowserImageSupport,
    generateResponsiveImageSources,
    createOptimizedImage,
    useOptimizedImage,
    compressImage,
    preloadImages,
    lazyImageLoader
};