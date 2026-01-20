'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

const bootstrapVersion = parseInt(process.env.BOOTSTRAPVERSION) || 5;

module.exports = function (defaults) {
  const trees = {};

  const options = {
    'ember-bootstrap': {
      bootstrapVersion,
    },
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

  // import Bootstrap CSS
  app.import('node_modules/bootstrap/dist/css/bootstrap.css');
  if (bootstrapVersion === 4) {
    app.import('node_modules/ember-bootstrap/overwrites-for-bs4.css');
  }

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
