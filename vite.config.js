import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // important for SPA routing (React Router)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // optional: use @ for src imports
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // increase limit to avoid warnings for large images
    rollupOptions: {
      output: {
        manualChunks(id) {
          // optional: split large vendor chunks
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
