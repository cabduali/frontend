import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // List external dependencies that should not be bundled
        '@reduxjs/toolkit',
      ],
      output: {
        // Ensure that dependencies are properly resolved
        globals: {
          '@reduxjs/toolkit': 'ReduxToolkit',
        },
      },
    },
  },
});
