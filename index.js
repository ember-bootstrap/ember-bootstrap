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
const chalk = require('chalk');

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true
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

    this.preprocessor = this.findPreprocessor();

    let options = extend(defaultOptions, app.options['ember-bootstrap']);
    this.bootstrapOptions = options;

    if (!this.hasPreprocessor()) {
      let cssPath = this.getBootstrapStylesPath();
      // Import css from bootstrap
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
        return path.join(this.app.project.nodeModulesPath, 'bootstrap-sass', 'assets', 'stylesheets');
      case 'less':
        return path.join(this.app.bowerDirectory, 'bootstrap', 'less');
      default:
        return path.join(this.app.bowerDirectory, 'bootstrap', 'dist', 'css');
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
    if (this.bootstrapOptions.importBootstrapFont) {
      return new Funnel(this.getBootstrapFontPath(), {
        destDir: 'fonts'
      });
    }
  }
};
