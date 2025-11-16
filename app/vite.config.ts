import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: this must match the repo name
  base: '/toolkit/', // if the repo is peaceiam4now/toolkit
})
