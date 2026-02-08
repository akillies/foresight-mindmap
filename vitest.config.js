import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared'),
      '@classic': resolve(__dirname, 'src/classic'),
      '@planetary': resolve(__dirname, 'src/planetary'),
    },
  },
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
