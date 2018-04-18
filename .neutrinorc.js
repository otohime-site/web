module.exports = {
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Semiquaver'
        }
      }
    ],
    [
      '@neutrinojs/dev-server',
      {
        https: true
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
