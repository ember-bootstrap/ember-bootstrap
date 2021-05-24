'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-down-event-binding': false,
  },
  ignore: ['fastboot-tests/fixtures/**/*'],
  overrides: [
    {
      files: ['docs/**/*'],
      rules: {
        // @todo we need to fix these in the docs app!
        'no-implicit-this': false,
        'no-action': false,
        'no-link-to-positional-params': false,
        'no-curly-component-invocation': false,
      },
    },
  ],
};
