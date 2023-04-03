import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), basicSsl(), visualizer()],
  build: {
    emptyOutDir: false, // as the library will empty it
  },
  server: {
    port: 8080,
    https: true,
    cors: {
      origin: "https://maimaidx-eng.com",
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "OPTIONS"],
    },
    proxy: {
      "/graphql":
        process.env.PROD_API != null
          ? {
              target: "https://api.otohi.me/",
              changeOrigin: true,
              ws: true,
            }
          : {
              target: "http://localhost:8580/",
              rewrite: (path) => `/v1${path}`,
              ws: true,
            },
    },
    hmr: {
      host: "localhost",
      port: 8080,
    },
  },
})
