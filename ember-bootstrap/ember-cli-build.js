'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const options = {
    'ember-bootstrap': {},
  };

  const app = new EmberApp(defaults, options);

  return maybeEmbroider(app);
};
