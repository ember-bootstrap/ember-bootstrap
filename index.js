/* eslint-env node */
'use strict';

const path = require('path');
const util = require('util');
const extend = util._extend;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');
const mv = stew.mv;
const rm = stew.rm;
const chalk = require('chalk');
const SilentError = require('silent-error'); // From ember-cli

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: true,
  insertEmberWormholeElementToDom: true,
  bootstrapVersion: 3
};

const supportedPreprocessors = [
  'less',
  'sass'
];

module.exports = {
  name: 'ember-bootstrap',

  includedCommands() {
    return {
      'bootstrap:info': require('./lib/commands/info')
    };
  },

  included(app) {
    // workaround for https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    let options = extend(extend({}, defaultOptions), app.options['ember-bootstrap']);
    if (process.env.BOOTSTRAPVERSION) {
      // override bootstrapVersion config when environment variable is set
      options.bootstrapVersion = parseInt(process.env.BOOTSTRAPVERSION);
    }
    this.bootstrapOptions = options;

    this.validateDependencies();
    this.preprocessor = this.findPreprocessor();

    // static Bootstrap CSS is mapped to vendor tree, independent of BS version, so import from there
    let cssPath = path.join('vendor', 'ember-bootstrap');

    if (!this.hasPreprocessor()) {
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

    // import custom addon CSS
    app.import(path.join(cssPath, `bs${options.bootstrapVersion}.css`));
  },

  validateDependencies() {
    let bowerDependencies = this.app.project.bowerDependencies();

    if ('bootstrap' in bowerDependencies || 'bootstrap-sass' in bowerDependencies) {
      this.warn('The dependencies for ember-bootstrap may be outdated. Please run `ember generate ember-bootstrap` to install appropriate dependencies!');
    }
  },

  findPreprocessor() {
    return supportedPreprocessors.find((name) => !!this.app.project.findAddonByName(`ember-cli-${name}`) && this.validatePreprocessor(name));
  },

  validatePreprocessor(name) {
    let dependencies = this.app.project.dependencies();
    switch (name) {
      case 'sass':
        if (!('bootstrap-sass' in dependencies) && this.getBootstrapVersion() === 3) {
          this.warn('Npm package "bootstrap-sass" is missing, but is typically required for SASS support. Please run `ember generate ember-bootstrap` to install the missing dependencies!');
        }
        break;
      case 'less':
        if (this.getBootstrapVersion() === 4) {
          throw new SilentError('There is no Less support for Bootstrap 4! Falling back to importing static CSS. Consider switching to Sass for preprocessor support!');
        }
        if (!('bootstrap' in dependencies)) {
          this.warn('Npm package "bootstrap" is missing, but is typically required for Less support. Please run `ember generate ember-bootstrap` to install the missing dependencies!');
        }
        break;
    }
    return true;
  },

  getBootstrapStylesPath() {
    let nodeModulesPath = this.app.project.nodeModulesPath;
    switch (this.preprocessor) {
      case 'sass':
        if (this.getBootstrapVersion() === 4) {
          return path.join(nodeModulesPath, 'bootstrap', 'scss');
        } else {
          return path.join(nodeModulesPath, 'bootstrap-sass', 'assets', 'stylesheets');
        }
      case 'less':
        return path.join(nodeModulesPath, 'bootstrap', 'less');
      default:
        return path.join(nodeModulesPath, 'bootstrap', 'dist', 'css');
    }
  },

  getBootstrapFontPath() {
    switch (this.preprocessor) {
      case 'sass':
        return path.join(this.app.project.nodeModulesPath, 'bootstrap-sass', 'assets', 'fonts');
      case 'less':
      default:
        return path.join(this.app.project.nodeModulesPath, 'bootstrap', 'fonts');
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

  treeForAddon(tree) {
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let componentsPath = 'components/';

    tree = mv(tree, `${componentsPath}bs${bsVersion}/`, componentsPath);
    tree = rm(tree, `${componentsPath}bs${otherBsVersion}/**/*`);

    return this._super.treeForAddon.call(this, tree);
  },

  treeForAddonTemplates(tree) {
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let templatePath = 'components/';

    tree = mv(tree, `${templatePath}common/`, templatePath);
    tree = mv(tree, `${templatePath}bs${bsVersion}/`, templatePath);
    tree = rm(tree, `${templatePath}bs${otherBsVersion}/**/*`);

    return this._super.treeForAddonTemplates.call(this, tree);
  },

  contentFor(type, config) {
    if (type === 'body-footer' && config.environment !== 'test' && this.bootstrapOptions.insertEmberWormholeElementToDom !== false) {
      return '<div id="ember-bootstrap-wormhole"></div>';
    }
  },

  warn(message) {
    this.ui.writeLine(chalk.yellow(message));
  }
};
