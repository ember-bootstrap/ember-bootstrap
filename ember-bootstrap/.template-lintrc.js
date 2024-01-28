'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-pointer-down-event-binding': false,
  },
};
