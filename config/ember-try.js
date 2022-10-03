'use strict';

const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = `^5.0.0`;
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.3',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
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
            'ember-source': '~3.28.0',
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
      embroiderSafe({
        env: {
          FASTBOOT_DISABLED: true,
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
      embroiderOptimized({
        env: {
          FASTBOOT_DISABLED: true,
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
    ],
  };
};
