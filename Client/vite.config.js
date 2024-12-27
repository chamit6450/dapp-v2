import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct React import
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Correct polyfills import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(), // Ensure node polyfills are added first
    react(), // React plugin for Vite
  ],
});
