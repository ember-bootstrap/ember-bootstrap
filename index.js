/* eslint-env node */
'use strict';

const path = require('path');
const util = require('util');
const extend = util._extend;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');
// const mv = stew.mv;
// const rm = stew.rm;

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true
};

module.exports = {
  name: 'ember-bootstrap',

  included(app) {
    // workaround for https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    let options = extend(defaultOptions, app.options['ember-bootstrap']);
    let bootstrapPath = path.join(app.bowerDirectory, 'bootstrap/dist');

    let hasLess = !!this.app.project.findAddonByName('ember-cli-less');
    let hasPreprocessor = hasLess;

    if (!hasPreprocessor) {
      // Import css from bootstrap
      if (options.importBootstrapCSS) {
        app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
        app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), { destDir: 'assets' });
      }

      if (options.importBootstrapTheme) {
        app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
        app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css.map'), { destDir: 'assets' });
      }
    }

    // Import glyphicons
    if (options.importBootstrapFont) {
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), { destDir: '/fonts' });
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/transition.js');
    }
  },

  treeForStyles(tree) {
    let styleTrees = [];

    if (this.app.project.findAddonByName('ember-cli-less')) {
      let lessTree = new Funnel(path.join(this.app.bowerDirectory, 'bootstrap/less'), {
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
