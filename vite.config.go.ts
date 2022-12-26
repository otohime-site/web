import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), (visualizer as any)()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/go.tsx"),
      formats: ["iife"],
      name: "go",
      fileName: () => "go.js",
    },
  },
})
