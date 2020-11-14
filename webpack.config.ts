import { resolve } from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const config: Configuration = {
  mode: 'development',
  watch: false,
  entry: {
    index: './src/index.tsx',
    go: './src/go.tsx'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
      chunks: ['index']
    }),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    publicPath: '/',
    contentBase: resolve(__dirname, './public'),
    https: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8580/',
        pathRewrite: {
          '^/graphql': '/v1/graphql'
        }
      }
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

export default config
