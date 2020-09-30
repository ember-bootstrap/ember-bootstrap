'use strict';
/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let trees = {};

  // Exclude FastBoot tests if FASTBOOT_DISABLED is set,
  // to enable Embroider tests until https://github.com/embroider-build/embroider/issues/160 is resolved.
  if (process.env.FASTBOOT_DISABLED) {
    const Funnel = require('broccoli-funnel');
    trees.tests = new Funnel('tests', {
      exclude: ['fastboot/**'],
    });
  }

  const options = {
    'ember-bootstrap': {},
    'ember-cli-babel': {
      includePolyfill: !!process.env.BABELPOLYFILL,
    },
    autoImport: {
      forbidEval: true,
    },
    trees,
    addons: {
      blacklist: process.env.FASTBOOT_DISABLED ? ['ember-cli-fastboot-testing'] : [],
    },
  };

  if (process.env.OPTIONAL_FEATURE_USE_DEFAULT_VALUE_IF_UNDEFINED) {
    options['ember-bootstrap'].useDefaultValueIfUndefined = true;
  }

  let app = new EmberAddon(defaults, options);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  if ('@embroider/webpack' in app.dependencies()) {
    const { Webpack } = require('@embroider/webpack'); // eslint-disable-line node/no-missing-require
    return require('@embroider/compat') // eslint-disable-line node/no-missing-require
      .compatBuild(app, Webpack, {
        staticAddonTestSupportTrees: true,
        staticAddonTrees: true,
        staticHelpers: true,
        staticComponents: true,
        packageRules: [
          {
            package: 'dummy',
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
  } else {
    return app.toTree();
  }
};
