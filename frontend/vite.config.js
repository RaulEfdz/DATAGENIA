import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../static',  // Cambia aquí la carpeta de salida relativa a donde está vite.config.js
    emptyOutDir: true     // Opcional: limpia la carpeta de salida antes de generar el build
  }
})
