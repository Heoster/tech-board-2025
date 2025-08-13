import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          
          // Router chunk
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          
          // Utilities chunk
          if (id.includes('node_modules/axios') || id.includes('node_modules/date-fns')) {
            return 'vendor-utils';
          }
          
          // Admin components chunk
          if (id.includes('/admin/') || id.includes('AdminPanel') || id.includes('AdminDashboard')) {
            return 'admin';
          }
          
          // Student components chunk
          if (id.includes('/student/') || id.includes('Dashboard') || id.includes('QuizInterface')) {
            return 'student';
          }
          
          // Auth components chunk
          if (id.includes('/auth/') || id.includes('Login') || id.includes('Registration')) {
            return 'auth';
          }
          
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name]-[hash].js`;
        },
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  base: '/'
})