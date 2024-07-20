'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-pointer-down-event-binding': false,
  },
  overrides: [
    {
      files: ['tests/**/*'],
      rules: {
        // @todo we need to fix these in the tests!
        'no-action': 'warn',
        'no-autofocus-attribute': 'warn',
        'no-capital-arguments': 'warn',
        'no-curly-component-invocation': 'warn',
        'no-invalid-role': 'warn',
        'require-input-label': 'warn',
        'require-presentational-children': 'warn',
      },
    },
    {
      files: ['tests/**/*.(gjs|gts)'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
