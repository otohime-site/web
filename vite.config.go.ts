import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), (visualizer as any)()],
  build: {
    // Using library mode will result in large bundle
    // https://stackoverflow.com/questions/73713323/
    rollupOptions: {
      input: resolve(__dirname, "src/go.tsx"),
      output: {
        format: "iife",
        dir: resolve(__dirname, "dist"),
        entryFileNames: "go.js",
        assetFileNames: "go.css",
      },
    },
  },
})
