module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'template-curly-spacing': 'off',
    indent: 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    // Define que axios é uma variável global, assim não vai dar mais erro
    axios: true,
  }
};
