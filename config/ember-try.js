'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => {
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-2.3',
          bower: {
            dependencies: {
              'ember': '~2.3.0'
            },
            resolutions: {
              'ember': '~2.3.0'
            }
          },
          npm: {
            devDependencies: {
              'ember-source': null,
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-lts-2.8',
          bower: {
            dependencies: {
              'ember': 'components/ember#lts-2-8'
            },
            resolutions: {
              'ember': 'lts-2-8'
            }
          },
          npm: {
            devDependencies: {
              'ember-source': null,
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-lts-2.12',
          npm: {
            devDependencies: {
              'ember-source': '~2.12.0',
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-lts-2.16',
          npm: {
            devDependencies: {
              'ember-source': '~2.16.0'
            }
          }
        },
        {
          name: 'ember-lts-2.18',
          npm: {
            devDependencies: {
              'ember-source': '~2.18.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0],
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1],
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2],
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {
              'ember-native-dom-event-dispatcher': null
            }
          }
        },
        {
          name: 'fastboot-addon-tests',
          command: 'DEBUG=ember-cli-addon-tests ember fastboot:test',
          npm: {
            devDependencies: {}
          }
        },
        {
          name: 'node-tests',
          command: 'yarn run nodetest',
          npm: {
            devDependencies: {
              'ember-cli': 'ember-cli/ember-cli#master' // we need canary for MU tests
            }
          }
        }
      ]
    };
  });
};
