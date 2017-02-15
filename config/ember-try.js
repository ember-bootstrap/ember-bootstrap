/*jshint node:true*/
module.exports = function() {
  return {
    command: 'BOOTSTRAPVERSION=3 ember test',

    useVersionCompatibility: true,

    scenarios: [
      {
        name: 'bs4-beta',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': 'beta'
          }
        }
      },
      {
        name: 'bs4-release',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': 'release'
          }
        }
      },
      {
        name: 'bs4-2.8-lts',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': '2.8.3'
          }
        }
      },
      {
        name: 'bs4-2.4-lts',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': '2.4.6'
          }
        }
      },
      {
        name: 'bs4 oldest',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': '2.3.1'
          }
        }
      }
    ]
  };
};
