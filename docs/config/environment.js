'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'ember-bootstrap-docs',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src': [
        "'self'",
        "'sha256-1xtiB6mV1iIKZ5iz9CxA5lEnfEg8d0XEH3FL9L8NBqo='",
        'use.typekit.net',
      ],
      'font-src': ["'self'", 'use.typekit.net', 'use.fontawesome.com'],
      'connect-src': ["'self'", 'performance.typekit.net'],
      'img-src': [
        "'self'",
        // Bootstrap 4 uses data URL for some SVG images in CSS
        'data:',
        'p.typekit.net',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'use.typekit.net',
        'use.fontawesome.com',
      ],
      'media-src': ["'self'"],
      'frame-src': [
        // iframe used in application template of dummy app
        'https://ghbtns.com/',
      ],
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/],
    },
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

    ENV.contentSecurityPolicy = {
      'default-src': ["'none'"],
      'script-src': ["'self'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'img-src': [
        "'self'",
        // Bootstrap 4 uses data URL for some SVG images in CSS
        'data:',
      ],
      'style-src': ["'self'"],
      'media-src': ["'self'"],
      'frame-src': [
        'https://ghbtns.com/',
        // testem requires frame-src 'self' to run
        // https://github.com/rwjblue/ember-cli-content-security-policy/blob/v1.0.0/index.js#L85-L88
        "'self'",
      ],
    };
  }

  return ENV;
};
