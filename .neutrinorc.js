const BookmarkletPlugin = require('./bookmarklet-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// https://github.com/neutrinojs/neutrino/issues/1269

module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Semiquaver'
        },
        publicPath: "/",
        babel: {
          presets: ['@babel/typescript']
        }
      }
    ],
    [
      '@neutrinojs/dev-server',
      {
        https: true,
        headers: {
          'Access-Control-Allow-Origin': 'https://maimai-net.com',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true'
        },
        proxy: {
          "/api": "http://localhost:8585/"
        },
        historyApiFallback: {
          rewrites: [{
            from: '^\/mai\/.*$',
            to: '/index.html'
          }]
        }
      }
    ],
    '@neutrinojs/jest',
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
