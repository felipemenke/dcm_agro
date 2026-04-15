import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: ['VITE_', 'API_'],
  server: {
    port: 5173
  }
})
