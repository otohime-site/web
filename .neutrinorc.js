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
        https: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
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
