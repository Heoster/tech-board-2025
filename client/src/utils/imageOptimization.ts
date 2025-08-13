// Image optimization utilities for the MCQ testing system

interface ImageOptimizationOptions {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    format?: 'webp' | 'jpeg' | 'png';
    enableLazyLoading?: boolean;
}

interface ResponsiveImageSizes {
    small: string;
    medium: string;
    large: string;
    original: string;
}

// Default optimization settings
const DEFAULT_OPTIONS: Required<ImageOptimizationOptions> = {
    quality: 85,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'webp',
    enableLazyLoading: true
};

// Supported image formats and their MIME types
const SUPPORTED_FORMATS = {
    webp: 'image/webp',
    jpeg: 'image/jpeg',
    png: 'image/png'
};

// Check if browser supports WebP format
export const supportsWebP = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

// Check if browser supports AVIF format
export const supportsAVIF = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const avif = new Image();
        avif.onload = avif.onerror = () => {
            resolve(avif.height === 2);
        };
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
};

// Compress image using Canvas API
export const compressImage = async (
    file: File,
    options: ImageOptimizationOptions = {}
): Promise<Blob> => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
        }
        
        img.onload = () => {
            // Calculate new dimensions while maintaining aspect ratio
            let { width, height } = img;
            const aspectRatio = width / height;
            
            if (width > opts.maxWidth) {
                width = opts.maxWidth;
                height = width / aspectRatio;
            }
            
            if (height > opts.maxHeight) {
                height = opts.maxHeight;
                width = height * aspectRatio;
            }
            
            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to compress image'));
                    }
                },
                SUPPORTED_FORMATS[opts.format],
                opts.quality / 100
            );
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

// Generate responsive image sizes
export const generateResponsiveImages = async (
    file: File,
    baseOptions: ImageOptimizationOptions = {}
): Promise<ResponsiveImageSizes> => {
    const sizes = {
        small: { maxWidth: 480, maxHeight: 320 },
        medium: { maxWidth: 768, maxHeight: 512 },
        large: { maxWidth: 1200, maxHeight: 800 },
        original: { maxWidth: 1920, maxHeight: 1080 }
    };
    
    const results: Partial<ResponsiveImageSizes> = {};
    
    for (const [sizeName, dimensions] of Object.entries(sizes)) {
        try {
            const compressed = await compressImage(file, {
                ...baseOptions,
                ...dimensions
            });
            
            results[sizeName as keyof ResponsiveImageSizes] = URL.createObjectURL(compressed);
        } catch (error) {
            console.warn(`Failed to generate ${sizeName} image:`, error);
            results[sizeName as keyof ResponsiveImageSizes] = URL.createObjectURL(file);
        }
    }
    
    return results as ResponsiveImageSizes;
};

// Lazy loading intersection observer
let lazyImageObserver: IntersectionObserver | null = null;

export const initializeLazyLoading = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        return;
    }
    
    if (lazyImageObserver) {
        return lazyImageObserver;
    }
    
    lazyImageObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.dataset.src;
                    const srcset = img.dataset.srcset;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (srcset) {
                        img.srcset = srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                    
                    lazyImageObserver?.unobserve(img);
                }
            });
        },
        {
            rootMargin: '50px 0px',
            threshold: 0.01
        }
    );
    
    return lazyImageObserver;
};

// React hook for lazy loading images
export const useLazyImage = (src: string, options: ImageOptimizationOptions = {}) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    
    React.useEffect(() => {
        if (!options.enableLazyLoading) {
            setIsLoaded(true);
            return;
        }
        
        const observer = initializeLazyLoading();
        const img = imgRef.current;
        
        if (observer && img) {
            observer.observe(img);
            
            const handleLoad = () => setIsLoaded(true);
            const handleError = () => setError('Failed to load image');
            
            img.addEventListener('load', handleLoad);
            img.addEventListener('error', handleError);
            
            return () => {
                observer.unobserve(img);
                img.removeEventListener('load', handleLoad);
                img.removeEventListener('error', handleError);
            };
        }
    }, [src, options.enableLazyLoading]);
    
    return { imgRef, isLoaded, error };
};

// Optimized Image component
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    optimization?: ImageOptimizationOptions;
    responsive?: boolean;
    placeholder?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    optimization = {},
    responsive = true,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
    ...props
}) => {
    const opts = { ...DEFAULT_OPTIONS, ...optimization };
    const { imgRef, isLoaded, error } = useLazyImage(src, opts);
    const [supportedFormat, setSupportedFormat] = React.useState<string>('jpeg');
    
    React.useEffect(() => {
        const checkFormats = async () => {
            if (await supportsAVIF()) {
                setSupportedFormat('avif');
            } else if (await supportsWebP()) {
                setSupportedFormat('webp');
            } else {
                setSupportedFormat('jpeg');
            }
        };
        
        checkFormats();
    }, []);
    
    const getOptimizedSrc = (originalSrc: string, format: string) => {
        // In a real implementation, this would call your image optimization service
        // For now, we'll return the original src
        return originalSrc;
    };
    
    const generateSrcSet = (originalSrc: string) => {
        if (!responsive) return undefined;
        
        const sizes = [480, 768, 1200, 1920];
        return sizes
            .map(size => `${getOptimizedSrc(originalSrc, supportedFormat)} ${size}w`)
            .join(', ');
    };
    
    if (error) {
        return (
            <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    minHeight: '200px',
                    fontSize: '14px'
                }}
                {...props}
            >
                Failed to load image
            </div>
        );
    }
    
    return (
        <img
            ref={imgRef}
            src={opts.enableLazyLoading ? placeholder : getOptimizedSrc(src, supportedFormat)}
            data-src={opts.enableLazyLoading ? getOptimizedSrc(src, supportedFormat) : undefined}
            srcSet={opts.enableLazyLoading ? undefined : generateSrcSet(src)}
            data-srcset={opts.enableLazyLoading ? generateSrcSet(src) : undefined}
            alt={alt}
            className={`${opts.enableLazyLoading ? 'lazy-loading' : ''} ${isLoaded ? 'lazy-loaded' : ''}`}
            loading={opts.enableLazyLoading ? 'lazy' : 'eager'}
            style={{
                transition: 'opacity 0.3s ease',
                opacity: isLoaded || !opts.enableLazyLoading ? 1 : 0.5,
                ...props.style
            }}
            {...props}
        />
    );
};

// Utility to preload critical images
export const preloadImage = (src: string, options: ImageOptimizationOptions = {}): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
        img.src = src;
    });
};

// Batch preload multiple images
export const preloadImages = async (
    sources: string[],
    options: ImageOptimizationOptions = {}
): Promise<void> => {
    const promises = sources.map(src => preloadImage(src, options));
    await Promise.all(promises);
};

// Image performance monitoring
export const trackImagePerformance = (src: string, startTime: number) => {
    const loadTime = performance.now() - startTime;
    
    // Send to performance monitoring
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'image_load_time', {
            event_category: 'performance',
            event_label: src,
            value: Math.round(loadTime)
        });
    }
    
    console.log(`Image loaded: ${src} (${loadTime.toFixed(2)}ms)`);
    return loadTime;
};

export default {
    compressImage,
    generateResponsiveImages,
    OptimizedImage,
    preloadImage,
    preloadImages,
    supportsWebP,
    supportsAVIF,
    trackImagePerformance
};