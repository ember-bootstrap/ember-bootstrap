'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {
    'no-html-comments': false,
    'no-implicit-this': { allow: ['current-year'] },
    'no-curly-component-invocation': { allow: ['current-year'] },
  },
};
