/* eslint-env node */
'use strict';

const path = require('path');
const util = require('util');
const extend = util._extend;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');
const mv = stew.mv;
const log = stew.log;
const rm = stew.rm;

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

    // Import css from bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), { destDir: 'assets' });
    }

    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css.map'), { destDir: 'assets' });
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
  
  getBootstrapVersion() {
    return 'bs3'; // @todo replace with dynamic config
  },

  treeForAddon() {
    let tree = this._super.treeForAddon.apply(this, arguments);
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = bsVersion === 'bs3' ? 'bs4' : 'bs3';
    let componentsPath = 'modules/ember-bootstrap/components/';
    tree = mv(tree, `${componentsPath}${bsVersion}/`, componentsPath);
    tree = rm(tree, `${componentsPath}${otherBsVersion}/**/*`);
    return tree; // log(tree, {output: 'tree', label: 'moved'});
  },

  treeForAddonTemplates() {
    let tree = this._super.treeForAddonTemplates.apply(this, arguments);
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = bsVersion === 'bs3' ? 'bs4' : 'bs3';
    let templatePath = 'components/';
    tree = mv(tree, `${templatePath}common/`, templatePath);
    tree = mv(tree, `${templatePath}${bsVersion}/`, templatePath);
    tree = rm(tree, `${templatePath}${otherBsVersion}/**/*`);
    return tree; //log(tree, {output: 'tree', label: 'moved'});
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
