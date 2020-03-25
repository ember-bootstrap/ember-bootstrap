'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'attribute-indentation': false,
    'no-positive-tabindex': false // this is triggered by `tabindex={{@tabindex}}` in radio form controls, but will be removed anyway in v4, so ignoring for now
  },
  ignore: [
    'fastboot-tests/fixtures/**/*'
  ]
};
