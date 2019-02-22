'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src':  [
        "'self'",
      ],
      'font-src':    ["'self'"],
      'connect-src': ["'self'"],
      'img-src':     [
        "'self'",
        // Bootstrap 4 uses data URL for some SVG images in CSS
        "data:",
      ],
      'style-src':   ["'self'"],
      'media-src':   ["'self'"],
      'frame-src':   [
        // iframe used in application template of dummy app
        "https://ghbtns.com/",
      ],
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/]
    },

    unstableApiURL: 'http://simonihmig.github.io/ember-bootstrap/',
    bootstrapVersion: process.env.BOOTSTRAPVERSION || 4
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    // testem requires frame-src 'self' to run
    // https://github.com/rwjblue/ember-cli-content-security-policy/blob/v1.0.0/index.js#L85-L88
    ENV.contentSecurityPolicy['frame-src'].push('self');
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
  }

  return ENV;
};
