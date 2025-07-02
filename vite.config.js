import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ✅ Ensures proper relative paths for static hosting like Render
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // ✅ Render expects this by default
  },
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path"
// import tailwindcss from "@tailwindcss/vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//     server: {
//       historyApiFallback: true, // 👈 allows deep routes like /archieve/:id
//     },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
