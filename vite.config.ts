import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    // Ensure CSS variables are preserved in production
    devSourcemap: true,
  },
  build: {
    // Ensure all CSS is bundled consistently
    cssCodeSplit: false,
    // Use esbuild for more reliable CSS minification
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        // Preserve CSS variable names in production
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})

