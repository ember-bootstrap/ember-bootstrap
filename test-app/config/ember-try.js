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
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
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
