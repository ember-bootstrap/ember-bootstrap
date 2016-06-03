/* jshint node: true */
'use strict';

var path = require('path'),
  util = require('util'),
  extend = util._extend,
  mergeTrees = require('broccoli-merge-trees'),
  Funnel = require('broccoli-funnel');

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

    // Import glyphicons
    if (options.importBootstrapFont) {
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), {destDir: '/fonts'});
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), {destDir: '/fonts'});
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/transition.js');
    }
  },

  treeForStyles: function treeForStyles(tree) {
    var styleTrees = [];

    if (this.app.project.findAddonByName('ember-cli-less')) {
      var lessTree = new Funnel(path.join(this.app.bowerDirectory, 'bootstrap/less'), {
        destDir: 'ember-bootstrap'
      });
      styleTrees.push(lessTree);
    }
    
    if (tree) {
      styleTrees.push(tree);
    }
    
    return mergeTrees(styleTrees, { overwrite: true });
  }
};
