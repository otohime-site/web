module.exports = {
  use: [
    ['@neutrinojs/airbnb',
      {
        eslint: {
          rules: {
            'jsx-a11y/anchor-is-valid': [ "error", {
              "specialLink": [ "to" ],
            }]
          }
        }
      }
    ],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Semiquaver'
        },
        publicPath: "/"
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
        }
      }
    ],
    '@neutrinojs/jest'
  ],
  options: {
    mains: {
      index: 'index',
      go: 'go'
    }
  }
};
