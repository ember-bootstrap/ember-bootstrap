'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {
    'no-html-comments': false,
    // TODO: fix all this outdated patterns
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
};
