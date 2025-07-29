import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable error overlay to reduce jitter
      port: 24678, // Use a specific port for HMR
    },
    watch: {
      usePolling: false, // Disable polling to reduce CPU usage
      interval: 100, // Increase interval to reduce frequency
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@react-three/fiber', '@react-three/drei']
  },
  css: {
    devSourcemap: false, // Disable CSS source maps in dev to reduce jitter
  }
}) 