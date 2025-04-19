import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // 🔥 Enables external access
    port: 4173,        // 🔥 Keeps the port stable
    strictPort: true,  // 🔥 Prevents fallback to another port
  }
})

