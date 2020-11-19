module.exports = {
  extends: [
    'standard-with-typescript', 'standard-react'
  ],
  parserOptions: {
    project: 'tsconfig.json'
  },
  rules: {
    'react/prop-types': 'off'
  }
}
