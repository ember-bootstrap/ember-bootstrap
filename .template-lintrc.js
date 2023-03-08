'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-pointer-down-event-binding': false,
  },
  ignore: ['fastboot-tests/fixtures/**/*'],
  overrides: [
    {
      files: ['docs/**/*'],
      rules: {
        // @todo we need to fix these in the docs app!
        'no-action': 'warn',
        'no-autofocus-attribute': 'warn',
        'no-curly-component-invocation': 'warn',
        'no-implicit-this': 'warn',
        'no-invalid-link-text': 'warn',
        'no-link-to-positional-params': 'warn',
        'no-valueless-arguments': 'warn',
        'require-context-role': 'warn',
        'require-presentational-children': 'warn',
      },
    },
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
  ],
};
