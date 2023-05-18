module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-throw-literal': 'off',
    // an effort was made to keep max-len on, but fell apart when I didn't
    // have enough time to make a global strings file
    'max-len': 'off',
  },
};
