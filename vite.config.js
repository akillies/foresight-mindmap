import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable sourcemaps for production debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'three': ['three'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Adjust chunk size warning (Three.js is large by nature)
    chunkSizeWarningLimit: 600,
  },
})
