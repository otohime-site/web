import { resolve } from "path"
import { Configuration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { BookmarkletPlugin } from "./bookmarklet-plugin"

// Workaround for @types/webpack-dev-server versions...
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43232
const config: Configuration & { devServer?: DevServerConfiguration } = {
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
      template: "src/index.html",
      chunks: ["index"],
    }),
    new BookmarkletPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg?$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    publicPath: "/",
    contentBase: resolve(__dirname, "./public"),
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
