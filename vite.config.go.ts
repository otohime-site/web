import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    icons({ compiler: "jsx", jsx: "react" }),
    visualizer({ filename: "stats-go.html" }),
  ],
  build: {
    // Using library mode will result in large bundle
    // https://stackoverflow.com/questions/73713323/
    rollupOptions: {
      input: resolve(__dirname, "src/bookmarklet/entry.tsx"),
      output: {
        format: "iife",
        dir: resolve(__dirname, "dist"),
        entryFileNames: "ryugujo.js",
      },
    },
  },
})
