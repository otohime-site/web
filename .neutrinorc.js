const react = require('@neutrinojs/react')
const devServer = require('@neutrinojs/dev-server')
const jest = require('@neutrinojs/jest')
const BookmarkletPlugin = require('./bookmarklet-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// https://github.com/neutrinojs/neutrino/issues/1269

module.exports = {
  use: [
    react({
      html: {
        title: 'Semiquaver'
      },
      publicPath: "/",
      babel: {
        presets: ['@babel/typescript']
      }
    }),
    devServer({
      https: true,
      proxy: {
        "/api": "http://localhost:8585/"
      },
      historyApiFallback: {
        rewrites: [{
          from: '^\/mai\/.*$',
          to: '/index.html'
        }]
      }
    }),
    jest(),
    (neutrino) => {
      neutrino.config.plugin('bookmarklet').use(BookmarkletPlugin);
      neutrino.config.plugin('fork-ts-checker').use(ForkTsCheckerWebpackPlugin, [
        {
          checkSyntacticErrors: true,
          tslint: true
        }
      ]);
      neutrino.config.resolve.extensions.add('.tsx');
      neutrino.config.resolve.extensions.add('.ts');
      neutrino.config.module.rule('compile').test(/\.(wasm|mjs|jsx|js|tsx|ts)$/);
    },
  ],
  options: {
    mains: {
      index: 'index',
      go: 'go'
    }
  }
};
