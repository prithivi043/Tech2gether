import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    proxy: {
      '/api': {
        target: 'https://tech2gether-server.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
