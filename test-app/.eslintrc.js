'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  // Disabling hbs plugin until https://github.com/ember-template-lint/eslint-plugin-hbs/issues/42 is resolved
  // plugins: ['ember', 'hbs'],
  plugins: ['ember', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    // @todo enable this while fixing linting errors in tests...
    // 'plugin:qunit/recommended',
  ],
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
    // TODO turn Octane rules into warnings until all components have been refactored
    'ember/no-computed-properties-in-native-classes': 'warn',
    'ember/no-classic-components': 'warn',
    'ember/classic-decorator-no-classic-methods': 'warn',
    'ember/classic-decorator-hooks': 'warn',
    'ember/no-runloop': 'off',
  },
  overrides: [
    // ts files
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'no-undef': 'off',
      },
    },
    // gjs files
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gjs',
      ],
    },
    // gts files
    {
      files: ['**/*.gts'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gts',
      ],
      rules: {
        'no-undef': 'off',
      },
    },
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
