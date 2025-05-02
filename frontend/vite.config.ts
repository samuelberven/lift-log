import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // This resolves common extensions without needing to specify them in import statements.
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    host: '0.0.0.0',  // Enables external access from network devices (very useful in Docker settings)
    port: 5173,       // Keeps the port stable
    strictPort: true, // Prevents fallback to another port if 4173 is in use
    // Uncomment and adjust the following if you need to proxy API calls to your Rails backend:
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // or your Rails backend address
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",  // 🔥 Enables external access
//     port: 4173,        // 🔥 Keeps the port stable
//     strictPort: true,  // 🔥 Prevents fallback to another port
//   }
// })

