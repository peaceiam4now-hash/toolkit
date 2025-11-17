// app/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/toolkit/", // IMPORTANT: project page base = /REPO_NAME/
  plugins: [react()],
});
