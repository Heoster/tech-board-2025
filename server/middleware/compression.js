const compression = require('compression');
const zlib = require('zlib');

// Enhanced compression middleware with optimized settings
const compressionMiddleware = compression({
    // Only compress responses that are larger than 1KB
    threshold: 1024,
    
    // Compression level (1-9, 6 is default balance of speed/compression)
    level: 6,
    
    // Memory level (1-9, higher = more memory, better compression)
    memLevel: 8,
    
    // Window bits for deflate (8-15, higher = better compression)
    windowBits: 15,
    
    // Filter function to determine what to compress
    filter: (req, res) => {
        // Don't compress if client doesn't support it
        if (req.headers['x-no-compression']) {
            return false;
        }
        
        // Don't compress images, videos, or already compressed files
        const contentType = res.getHeader('content-type');
        if (contentType) {
            const type = contentType.toLowerCase();
            if (type.includes('image/') || 
                type.includes('video/') || 
                type.includes('audio/') ||
                type.includes('application/zip') ||
                type.includes('application/gzip') ||
                type.includes('application/x-rar')) {
                return false;
            }
        }
        
        // Compress text-based content
        return compression.filter(req, res);
    },
    
    // Custom compression strategies for different content types
    strategy: (req, res) => {
        const contentType = res.getHeader('content-type');
        if (contentType && contentType.includes('application/json')) {
            return zlib.constants.Z_DEFAULT_STRATEGY;
        }
        return zlib.constants.Z_DEFAULT_STRATEGY;
    }
});

module.exports = compressionMiddleware;