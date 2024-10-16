'use strict';

const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = `^${process.env.BOOTSTRAPVERSION}.0.0`;
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
            // ember-resolver 11 is required for ember < 4.12
            // See: https://github.com/ember-cli/ember-resolver/releases/tag/v12.0.0
            'ember-resolver': '11.0.1',
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
        },
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
      {
        name: 'ember-render-helpers-v0.2',
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
            'ember-render-helpers': '^0.2.0',
          },
        },
      },
      embroiderSafe({
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
      embroiderOptimized({
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
    ],
  };
};
