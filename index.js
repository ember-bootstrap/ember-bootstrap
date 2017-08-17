/* eslint-env node */
/* eslint-disable ember-suave/prefer-destructuring */
'use strict';

const path = require('path');
const util = require('util');
const extend = util._extend;
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');
const mv = stew.mv;
const rm = stew.rm;
const map = stew.map;
const rename = stew.rename;
const BroccoliDebug = require('broccoli-debug');
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

const componentDependencies = {
  'bs-button-group': ['bs-button'],
  'bs-accordion': ['bs-collapse'],
  'bs-dropdown': ['bs-button'],
  'bs-modal-simple': ['bs-modal'],
  'bs-navbar': ['bs-nav', 'bs-button'],
  'bs-popover': ['bs-contextual-help'],
  'bs-tab': ['bs-nav'],
  'bs-tooltip': ['bs-contextual-help']
};

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
// https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
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

  init() {
    this._super.init.apply(this, arguments);
    this.debugTree = BroccoliDebug.buildDebugCallback(`ember-bootstrap:${this.name}`);
  },

  includedCommands() {
    return {
      'bootstrap:info': require('./lib/commands/info')
    };
  },

  included() {
    this._super.included.apply(this, arguments);

    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

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
    let vendorPath = path.join('vendor', 'ember-bootstrap');

    if (!this.hasPreprocessor()) {
      // / Import css from bootstrap
      if (options.importBootstrapCSS) {
        app.import(path.join(vendorPath, 'bootstrap.css'));
        app.import(path.join(vendorPath, 'bootstrap.css.map'), { destDir: 'assets' });
      }

      if (options.importBootstrapTheme) {
        app.import(path.join(vendorPath, 'bootstrap-theme.css'));
        app.import(path.join(vendorPath, 'bootstrap-theme.css.map'), { destDir: 'assets' });
      }
    }

    // import custom addon CSS
    app.import(path.join(vendorPath, `bs${options.bootstrapVersion}.css`));

    // register library version
    app.import(path.join(vendorPath, 'register-version.js'));
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
    let versionTree = rename(
      map(tree, 'ember-bootstrap/register-version.template', (c) => c.replace('###VERSION###', require('./package.json').version)),
      'register-version.template',
      'register-version.js'
    );
    trees.push(versionTree);

    if (!this.hasPreprocessor()) {
      trees.push(new Funnel(this.getBootstrapStylesPath(), {
        destDir: 'ember-bootstrap'
      }));
    }
    return mergeTrees(trees, { overwrite: true });
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

    tree = this.debugTree(tree, 'addon-tree:input');
    tree = mv(tree, `${componentsPath}bs${bsVersion}/`, componentsPath);
    tree = rm(tree, `${componentsPath}bs${otherBsVersion}/**/*`);

    tree = this.debugTree(tree, 'addon-tree:bootstrap-version');
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-tree:tree-shaken');

    return this._super.treeForAddon.call(this, tree);
  },

  treeForAddonTemplates(tree) {
    let bsVersion = this.getBootstrapVersion();
    let otherBsVersion = this.getOtherBootstrapVersion();
    let templatePath = 'components/';

    tree = this.debugTree(tree, 'addon-templates-tree:input');
    tree = mv(tree, `${templatePath}common/`, templatePath);
    tree = mv(tree, `${templatePath}bs${bsVersion}/`, templatePath);
    tree = rm(tree, `${templatePath}bs${otherBsVersion}/**/*`);

    tree = this.debugTree(tree, 'addon-templates-tree:bootstrap-version');
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-templates-tree:tree-shaken');

    return this._super.treeForAddonTemplates.call(this, tree);
  },

  contentFor(type, config) {
    if (type === 'body-footer' && config.environment !== 'test' && this.bootstrapOptions.insertEmberWormholeElementToDom !== false) {
      return '<div id="ember-bootstrap-wormhole"></div>';
    }
  },

  warn(message) {
    this.ui.writeLine(chalk.yellow(message));
  },

  filterComponents(tree) {
    let whitelist = this.generateWhitelist(this.bootstrapOptions.whitelist);
    let blacklist = this.bootstrapOptions.blacklist || [];

    // exit early if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      return tree;
    }

    return new Funnel(tree, {
      exclude: [(name) => this.excludeComponent(name, whitelist, blacklist)]
    });
  },

  excludeComponent(name, whitelist, blacklist) {
    let regex = /^(templates\/)?components\/(base\/)?/;
    let isComponent = regex.test(name);
    if (!isComponent) {
      return false;
    }

    let baseName = name.replace(regex, '');
    let firstSeparator = baseName.indexOf('/');
    if (firstSeparator !== -1) {
      baseName = baseName.substring(0, firstSeparator);
    } else {
      baseName = baseName.substring(0, baseName.lastIndexOf('.'));
    }

    let isWhitelisted = whitelist.indexOf(baseName) !== -1;
    let isBlacklisted = blacklist.indexOf(baseName) !== -1;

    if (whitelist.length === 0 && blacklist.length === 0) {
      return false;
    }

    if (whitelist.length && blacklist.length === 0) {
      return !isWhitelisted;
    }

    return isBlacklisted;
  },

  generateWhitelist(whitelist) {
    let list = [];

    if (!whitelist) {
      return list;
    }

    function _addToWhitelist(item) {
      if (list.indexOf(item) === -1) {
        list.push(item);

        if (componentDependencies[item]) {
          componentDependencies[item].forEach(_addToWhitelist);
        }
      }
    }

    whitelist.forEach(_addToWhitelist);
    return list;
  }
};
