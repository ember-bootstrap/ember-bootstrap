'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const trees = {};

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
      exclude: process.env.FASTBOOT_DISABLED
        ? ['ember-cli-fastboot-testing']
        : [],
    },
  };

  const app = new EmberAddon(defaults, options);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
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
};
