'use strict';

const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = process.env.BOOTSTRAPVERSION === '3' ? '^3.4.1' : '^4.3.1';

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => {
    return {
      useYarn: true,
      command: 'ember test --filter !FastBoot',
      scenarios: [
        {
          name: 'ember-lts-2.18',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': '~2.18.0',
              'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'ember-lts-3.4',
          npm: {
            devDependencies: {
              'ember-source': '~3.4.0',
              'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0],
              'bootstrap': bootstrapVersion
            }
          },
          env: {
            FAIL_ON_DEPRECATION: true
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1],
              'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2],
              'bootstrap': bootstrapVersion
            }
          },
          env: {
            FAIL_ON_DEPRECATION: true
          }
        },
        // The default `.travis.yml` runs this scenario via `npm test`,
        // not via `ember try`. It's still included here so that running
        // `ember try:each` manually or from a customized CI config will run it
        // along with all the other scenarios.
        {
          name: 'ember-default',
          npm: {
            devDependencies: {
            'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'ember-default-with-jquery',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'fastboot-tests',
          command: 'ember test --filter FastBoot',
          npm: {
            devDependencies: {
              'bootstrap': bootstrapVersion
            }
          }
        },
        {
          name: 'node-tests',
          command: 'yarn run nodetest'
        }
      ]
    };
  });
};
