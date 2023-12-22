'use strict';

// eslint-disable-next-line n/no-unpublished-require
const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = `^${process.env.BOOTSTRAPVERSION}.0.0`;
// eslint-disable-next-line n/no-unpublished-require
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    command: process.env.BROWSER
      ? `ember test --launch ${process.env.BROWSER}`
      : null,
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
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

          // TODO: Enable again when FastBoot is ready for Ember 5
          // https://github.com/ember-fastboot/ember-cli-fastboot/pull/905
          FASTBOOT_DISABLED: true,
        },
      },
      {
        name: 'node-tests',
        command: 'pnpm run nodetest',
      },
      {
        name: 'tracked-toolbox-v1',
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
            'tracked-toolbox': '^1.2.3',
          },
        },
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
