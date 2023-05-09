import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [
    react({
      plugins: [
        [
          "@graphql-codegen/client-preset-swc-plugin",
          { artifactDirectory: "./src/gql", gqlTagName: "graphql" },
        ],
      ],
    }),
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
