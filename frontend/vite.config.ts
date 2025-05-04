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
    build: {
      outDir: 'dist', // Ensures the compiled files go into 'dist' (expected by AWS Amplify)
    },
  };
});
