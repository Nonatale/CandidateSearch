import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5174,  // Ensure the port is a number
    host: '0.0.0.0',  // Make sure Vite is listening on all interfaces
  },
});
