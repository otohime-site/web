import CopyWebpackPlugin from "copy-webpack-plugin"
import HTMLWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { resolve } from "path"
import { Configuration } from "webpack"
import "webpack-dev-server"
import { BookmarkletPlugin } from "./bookmarklet-plugin"

const config: Configuration = {
  mode: "development",
  watch: false,
  entry: {
    index: "./src/index.tsx",
    go: "./src/go.tsx",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      favicon: "src/logo/favicon.svg",
      template: "src/index.html",
      chunks: ["index"],
    }),
    new BookmarkletPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        resolve("./src/logo/favicon.ico"),
        resolve("./src/logo/apple-touch-icon.png"),
        resolve("./src/logo/android-chrome-192x192.png"),
        resolve("./src/logo/android-chrome-512x512.png"),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|svg|png|webmanifest)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    hot: true,
    devMiddleware: {
      publicPath: "/",
    },
    static: {
      directory: resolve(__dirname, "./public"),
      publicPath: "/public",
    },
    https: true,
    historyApiFallback: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:8580/",
        pathRewrite: {
          "^/graphql": "/v1/graphql",
        },
        ws: true,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "https://maimaidx-eng.com",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}

export default config
