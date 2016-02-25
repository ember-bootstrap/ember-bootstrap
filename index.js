/* jshint node: true */
'use strict';

var path = require('path'),
  util = require('util'),
  extend = util._extend;

var defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true
};

module.exports = {
  name: 'ember-bootstrap',

  included: function included(app) {

    // workaround for https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var options = extend(defaultOptions, app.options['ember-bootstrap']);
    var bootstrapPath = path.join(app.bowerDirectory, 'bootstrap/dist');

    // Import css from bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), {destDir: 'assets'});
    }

    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
    }

    // Import glyphicons
    if (options.importBootstrapFont) {
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), {destDir: '/fonts'});
    }

    app.import('vendor/transition.js');

  }
};
