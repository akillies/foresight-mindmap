import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for DOM testing
    environment: 'jsdom',
    // Setup file for test utilities
    setupFiles: ['./src/test/setup.js'],
    // Include test files
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    // Enable globals (describe, it, expect)
    globals: true,
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
      ],
    },
  },
})
