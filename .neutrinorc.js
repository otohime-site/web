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
    '@neutrinojs/jest'
  ],
  options: {
    mains: {
      index: 'index',
      go: 'go'
    }
  }
};
