/* jshint node: true */
'use strict';

var path = require('path'),
  util = require('util'),
  extend = util._extend,
  mergeTrees = require('broccoli-merge-trees'),
  Funnel = require('broccoli-funnel');

var defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true
};

module.exports = {
  name: 'ember-bootstrap',

  included: function included(app) {
    // workaround for https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    var options = extend(defaultOptions, app.options['ember-bootstrap']);
    var bootstrapPath = path.join(app.bowerDirectory, 'bootstrap/dist');

    // Import css from bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), {destDir: 'assets'});
    }

    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css.map'), {destDir: 'assets'});
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/transition.js');
    }
  },

  treeForStyles: function treeForStyles(tree) {
    var styleTrees = [];

    var scssTree = new Funnel(path.join(this.app.bowerDirectory, 'bootstrap/scss'), {
      destDir: 'ember-bootstrap'
    });
    styleTrees.push(scssTree);

    if (tree) {
      styleTrees.push(tree);
    }

    return mergeTrees(styleTrees, { overwrite: true });
  }
};
