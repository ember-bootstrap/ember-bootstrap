'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const trees = {};

  const options = {
    'ember-bootstrap': {},
    'ember-cli-babel': {
      includePolyfill: !!process.env.BABELPOLYFILL,
      enableTypeScriptTransform: true,
    },
    autoImport: {
      forbidEval: true,
      watchDependencies: ['ember-bootstrap'],
    },
    trees,
  };

  const app = new EmberApp(defaults, options);

  /*
    This build file specifies the options for the test-app of this
    addon, located in `/test-app`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: 'axe-core',
      },
    ],
    packageRules: [
      {
        package: 'test-app',
        components: {
          '{{test-component}}': {
            safeToIgnore: true,
          },
        },
      },
    ],
    packagerOptions: {
      webpackConfig: {
        devtool: false,
      },
    },
  });
};
