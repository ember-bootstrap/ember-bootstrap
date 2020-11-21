'use strict';

const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = process.env.BOOTSTRAPVERSION === '3' ? '^3.4.1' : '^4.3.1';
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.16',
        npm: {
          devDependencies: {
            'ember-source': '~3.16.0',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
            bootstrap: bootstrapVersion,
          },
        },
        env: {
          // FAIL_ON_DEPRECATION: true,
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
            bootstrap: bootstrapVersion,
          },
        },
        env: {
          // FAIL_ON_DEPRECATION: true,
        },
      },
      // The default `.travis.yml` runs this scenario via `npm test`,
      // not via `ember try`. It's still included here so that running
      // `ember try:each` manually or from a customized CI config will run it
      // along with all the other scenarios.
      {
        name: 'ember-default',
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true,
          }),
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            // TODO: tests fail if optional feature application-template-wrapper is enabled
            // 'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      {
        name: 'node-tests',
        command: 'yarn run nodetest',
      },
      {
        name: 'ember-concurrency-2.x',
        npm: {
          dependencies: {
            'ember-concurrency': '^2.0.0-beta.1',
            bootstrap: bootstrapVersion,
          },
          resolutions: {
            'ember-concurrency': '^2.0.0-beta.1',
          },
        },
      },
      embroiderSafe({
        env: {
          FASTBOOT_DISABLED: true,
        },
      }),
      embroiderOptimized({
        env: {
          FASTBOOT_DISABLED: true,
        },
      }),
    ],
  };
};
