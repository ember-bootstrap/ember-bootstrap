'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  // Disabling hbs plugin until https://github.com/ember-template-lint/eslint-plugin-hbs/issues/42 is resolved
  // plugins: ['ember', 'hbs'],
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-jquery': 'error',
    'ember/no-get': 'error',
    'ember/no-get-with-default': 'error',
    'ember/no-actions-hash': 'error',
    'ember/no-classic-classes': 'error',
    'ember/require-tagless-components': 'error',
    'ember/no-observers': 'warn',
    'ember/no-mixins': 'warn',
    // disabled, see above
    // 'hbs/check-hbs-template-literals': 'error',
    'no-setter-return': 'off', // computed setters may return a value!
    // turn Octane rules into warnings until all components have been refactored
    'ember/no-computed-properties-in-native-classes': 'warn',
    'ember/no-classic-components': 'warn',
    'ember/classic-decorator-no-classic-methods': 'warn',
    'ember/classic-decorator-hooks': 'warn',
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
        'lib/**/*.js',
        'node-tests/**/*.js',
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      files: ['node-tests/**/*.js'],
      env: {
        mocha: true,
      },
    },
  ],
};
