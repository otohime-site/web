import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/go.tsx"),
      formats: ["iife"],
      name: "go",
      fileName: () => "go.js",
    },
  },
})
