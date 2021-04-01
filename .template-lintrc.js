'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-implicit-this': true,
  },
  ignore: ['fastboot-tests/fixtures/**/*'],
  overrides: [
    {
      files: ['docs/**/*'],
      rules: {
        'no-implicit-this': false,
      },
    },
  ],
};
