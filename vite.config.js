import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react-router-dom',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
        '@mui/icons-material',
      ],
    },
  },
});
