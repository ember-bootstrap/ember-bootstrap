/* eslint-env node */
module.exports = {
  // temporary workaround for https://github.com/yarnpkg/yarn/issues/3485
  command: 'BOOTSTRAPVERSION=3 ember test',
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
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
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
      name: 'ember-2.5',
      bower: {
        dependencies: {
          'ember': '~2.5.0'
        },
        resolutions: {
          'ember': '~2.5.0'
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
      name: 'ember-2.6',
      bower: {
        dependencies: {
          'ember': '~2.6.0'
        },
        resolutions: {
          'ember': '~2.6.0'
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
      name: 'ember-2.7',
      bower: {
        dependencies: {
          'ember': '~2.7.0'
        },
        resolutions: {
          'ember': '~2.7.0'
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
      name: 'ember-2.9',
      bower: {
        dependencies: {
          'ember': '~2.9.0'
        },
        resolutions: {
          'ember': '~2.9.0'
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
      name: 'ember-2.10',
      bower: {
        dependencies: {
          'ember': '~2.10.0'
        },
        resolutions: {
          'ember': '~2.10.0'
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
      name: 'ember-2.13',
      npm: {
        devDependencies: {
          'ember-source': '~2.13.0'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-lts-2.4-bs4',
      command: 'BOOTSTRAPVERSION=4 ember test',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
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
      name: 'ember-lts-2.8-bs4',
      command: 'BOOTSTRAPVERSION=4 ember test',
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
      name: 'ember-lts-2.12-bs4',
      command: 'BOOTSTRAPVERSION=4 ember test',
      npm: {
        devDependencies: {
          'ember-source': '~2.12.0',
          'ember-native-dom-event-dispatcher': null
        }
      }
    },
    {
      name: 'ember-release-bs4',
      command: 'BOOTSTRAPVERSION=4 ember test',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-beta-bs4',
      command: 'BOOTSTRAPVERSION=4 ember test',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
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
        devDependencies: {}
      }
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    }
  ]
};