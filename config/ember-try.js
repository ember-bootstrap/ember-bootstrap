/*jshint node:true*/
module.exports = function() {
  return {
    command: 'BOOTSTRAPVERSION=3 ember test',

    useVersionCompatibility: true,

    scenarios: [
      {
        name: 'bs4 release',

        command: 'BOOTSTRAPVERSION=4 ember test',

        bower: {
          dependencies: {
            'ember': 'release'
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
