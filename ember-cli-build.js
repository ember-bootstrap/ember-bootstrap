'use strict';
/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const path = require('path');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    snippetSearchPaths: [path.join('tests','dummy','app')],
    'ember-bootstrap': {
      'importBootstrapCSS': false
    },
    vendorFiles: { 'jquery.js': null }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
