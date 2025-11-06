import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";


// https://vitejs.dev/config/
export default defineConfig({

  //base: "/spruha-js/preview/",    // Use base path for while deploying the project the SSR.
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': {}
  },
  build: {
    chunkSizeWarningLimit: 500000,
    minify: true,
  },
  server: {
    host: true,
  }
})
