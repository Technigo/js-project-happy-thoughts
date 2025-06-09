/**
 * Vite configuration for Happy Thoughts React application
 * Configures React plugin for development and build processes
 */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
