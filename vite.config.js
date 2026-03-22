import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Route /api/makcorps/* → https://api.makcorps.com/*
      // This keeps the API key server-side and avoids browser CORS blocks.
      '/api/makcorps': {
        target: 'https://api.makcorps.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/makcorps/, ''),
      },
    },
  },
})
