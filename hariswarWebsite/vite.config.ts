import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <- this makes `@/` point to src/
    },
  },
  build: {
    outDir: 'build', // <- change output folder from 'dist' to 'build'
  },
})
