module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    node: true
  },
  rules: {
    'ember-suave/no-direct-property-access': 'off',
    'ember-suave/prefer-destructuring': 'off'
  }
};
