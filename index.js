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

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
//https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

module.exports = {
  name: 'ember-bootstrap',

  included: function included(appOrAddon) {
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

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
