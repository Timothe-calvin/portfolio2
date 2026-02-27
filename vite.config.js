import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for portfolio project
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh for better development experience
      fastRefresh: true
    })
  ],
  // Build optimizations
  build: {
    // Generate source maps for debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Modern browser target for smaller bundles
    target: 'esnext',
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-emailjs': ['@emailjs/browser']
        }
      }
    }
  },
  // Development server options
  server: {
    port: 5173,
    open: true
  },
  // Preview server options
  preview: {
    port: 4173,
    open: true
  }
})

