import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
      },
    },
  },
});
