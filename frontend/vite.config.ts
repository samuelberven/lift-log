import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
export default defineConfig(({ mode }) => {
  // Load environment variables based on the build mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      host: '0.0.0.0', // Enables external access from network devices
      port: 5173, // Keeps the port stable
      strictPort: true, // Prevents fallback to another port
    },
    define: {
      'import.meta.env': env, // Ensures environment variables are properly injected at build time
    },
  };
});

// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     // This resolves common extensions without needing to specify them in import statements.
//     extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
//   },
//   server: {
//     host: '0.0.0.0',  // Enables external access from network devices (very useful in Docker settings)
//     port: 5173,       // Keeps the port stable
//     strictPort: true, // Prevents fallback to another port if 4173 is in use
//     // Uncomment and adjust the following if you need to proxy API calls to your Rails backend:
//     // proxy: {
//     //   '/api': {
//     //     target: 'http://localhost:3000', // or your Rails backend address
//     //     changeOrigin: true,
//     //     secure: false,
//     //   },
//     // },
//   },
// });
