'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    // TODO: fix all this outdated patterns
    'no-action': 'warn',
    'no-curly-component-invocation': 'warn',
    'no-implicit-this': 'warn',
    'no-link-to-positional-params': 'warn',
  },
};
