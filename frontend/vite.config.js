import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
  optimizeDeps: {
    exclude: ['chunk-GYYMRS4U', 'chunk-TRC6RKZS'], // Add the dependencies you want to exclude here
  },
})
