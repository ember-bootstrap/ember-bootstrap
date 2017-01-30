/* eslint-env node */
'use strict';

const path = require('path');
const util = require('util');
const extend = util._extend;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');
const mv = stew.mv;
// const log = stew.log;
const rm = stew.rm;
const chalk = require('chalk');

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true,
  bootstrapVersion: 3
};

const supportedPreprocessors = [
  'less',
  'sass'
];

module.exports = {
  name: 'ember-bootstrap',

  included(app) {
    // workaround for https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    let options = extend(extend({}, defaultOptions), app.options['ember-bootstrap']);
    if (process.env['BOOTSTRAPVERSION']) {
      // override bootstrapVersion config when environment variable is set
      options.bootstrapVersion = parseInt(process.env['BOOTSTRAPVERSION']);
    }
    this.bootstrapOptions = options;

    this.preprocessor = this.findPreprocessor();

    if (!this.hasPreprocessor()) {

      // static Bootstrap CSS is mapped to vendor tree, independent of BS version, so import from there
      let cssPath = path.join('vendor', 'ember-bootstrap');

      // / Import css from bootstrap
      if (options.importBootstrapCSS) {
        app.import(path.join(cssPath, 'bootstrap.css'));
        app.import(path.join(cssPath, 'bootstrap.css.map'), { destDir: 'assets' });
      }

      if (options.importBootstrapTheme) {
        app.import(path.join(cssPath, 'bootstrap-theme.css'));
        app.import(path.join(cssPath, 'bootstrap-theme.css.map'), { destDir: 'assets' });
      }
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/transition.js');
    }
  },

  findPreprocessor() {
    return supportedPreprocessors.find((name) => !!this.app.project.findAddonByName(`ember-cli-${name}`) && this.validatePreprocessor(name));
  },

  validatePreprocessor(name) {
    let npmDependencies = this.app.project.dependencies();
    let bowerDependencies = this.app.project.bowerDependencies();
    switch (name) {
      case 'sass':
        if (!('bootstrap-sass' in npmDependencies)) {
          this.ui.writeLine(chalk.red('Npm package "bootstrap-sass" is missing, but required for SASS support. Please run `ember generate ember-bootstrap` to install the missing dependencies!'));
          return false;
        }
        break;
      case 'less':
        if (this.getBootstrapVersion() === 4) {
          this.ui.writeLine(chalk.red('There is no Less support for Bootstrap 4! Falling back to importing static CSS. Consider switching to Sass for preprocessor support!'));
          return false;
        }
        if (!('bootstrap' in bowerDependencies)) {
          this.ui.writeLine(chalk.red('Bower package "bootstrap" is missing, but required for Less support. Please run `ember generate ember-bootstrap` to install the missing dependencies!'));
          return false;
        }
        break;
    }
    return true;
  },

  getBootstrapStylesPath() {
    switch (this.preprocessor) {
      case 'sass':
        if (this.getBootstrapVersion() === 4) {
          return path.join(this.app.project.nodeModulesPath, 'bootstrap', 'scss');
        } else {
          return path.join(this.app.project.nodeModulesPath, 'bootstrap-sass', 'assets', 'stylesheets');
        }
      case 'less':
        return path.join(this.app.bowerDirectory, 'bootstrap', 'less');
      default:
        if (this.getBootstrapVersion() === 4) {
          return path.join(this.app.project.nodeModulesPath, 'bootstrap', 'dist', 'css');
        } else {
          return path.join(this.app.bowerDirectory, 'bootstrap', 'dist', 'css');
        }
    }
  },

  getBootstrapFontPath() {
    switch (this.preprocessor) {
      case 'sass':
        return path.join(this.app.project.nodeModulesPath, 'bootstrap-sass', 'assets', 'fonts');
      case 'less':
      default:
        return path.join(this.app.bowerDirectory, 'bootstrap', 'fonts');
    }
  },

  hasPreprocessor() {
    return !!this.preprocessor;
  },

  treeForStyles() {
    if (this.hasPreprocessor()) {
      return new Funnel(this.getBootstrapStylesPath(), {
        destDir: 'ember-bootstrap'
      });
    }
  },

  treeForPublic() {
    if (this.getBootstrapVersion() === 3 && this.bootstrapOptions.importBootstrapFont) {
      return new Funnel(this.getBootstrapFontPath(), {
        destDir: 'fonts'
      });
    }
  },

  treeForVendor(tree) {
    let trees = [tree];
    if (!this.hasPreprocessor()) {
      trees.push(new Funnel(this.getBootstrapStylesPath(), {
        destDir: 'ember-bootstrap'
      }));
    }
    return mergeTrees(trees);
  },

  getBootstrapVersion() {
    return parseInt(this.bootstrapOptions.bootstrapVersion);
  },

  getOtherBootstrapVersion() {
    return this.getBootstrapVersion() === 3 ? 4 : 3;
  },

  treeForAddon() {
    let tree = this._super.treeForAddon.apply(this, arguments);
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let componentsPath = 'modules/ember-bootstrap/components/';
    tree = mv(tree, `${componentsPath}bs${bsVersion}/`, componentsPath);
    tree = rm(tree, `${componentsPath}bs${otherBsVersion}/**/*`);
    return tree; // log(tree, {output: 'tree', label: 'moved'});
  },

  treeForAddonTemplates() {
    let tree = this._super.treeForAddonTemplates.apply(this, arguments);
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let templatePath = 'components/';
    tree = mv(tree, `${templatePath}common/`, templatePath);
    tree = mv(tree, `${templatePath}bs${bsVersion}/`, templatePath);
    tree = rm(tree, `${templatePath}bs${otherBsVersion}/**/*`);
    return tree; //log(tree, {output: 'tree', label: 'moved'});
  },

  treeForTemplates() {
    let tree = this._super.treeForTemplates.apply(this, arguments);
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let templatePath = 'components/';
    tree = mv(tree, `${templatePath}common/`, templatePath);
    tree = mv(tree, `${templatePath}bs${bsVersion}/`, templatePath);
    tree = rm(tree, `${templatePath}bs${otherBsVersion}/**/*`);
    return tree; //log(tree, {output: 'tree', label: 'moved'});
  }
};
