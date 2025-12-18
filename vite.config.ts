import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import webfontDownload from "vite-plugin-webfont-dl"

export default defineConfig({
  plugins: [
    react(),
    icons({ compiler: "jsx", jsx: "react" }),
    webfontDownload([], { assetsSubfolder: "fonts", injectAsStyleTag: false }),
    basicSsl(),
    visualizer(),
  ],
  build: {
    assetsInlineLimit: 0,
    emptyOutDir: false, // as the library will empty it
  },
  server: {
    port: 8080,
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
      "/__/auth": {
        target: "https://otohime-web.firebaseapp.com/",
        changeOrigin: true,
      },
    },
    hmr: {
      host: "localhost",
      port: 8080,
    },
  },
})
