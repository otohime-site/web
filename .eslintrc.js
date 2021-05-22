module.exports = {
  extends: [
    'standard-with-typescript', 'prettier'
  ],
  parserOptions: {
    project: 'tsconfig.json'
  },
  rules: {
    'react/prop-types': 'off'
  }
}
