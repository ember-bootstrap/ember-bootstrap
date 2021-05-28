'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');
const SilentError = require('silent-error'); // From ember-cli
const VersionChecker = require('ember-cli-version-checker');
const resolve = require('resolve');

const defaultOptions = {
  importBootstrapTheme: false,
  importBootstrapCSS: true,
  importBootstrapFont: false,
  insertEmberWormholeElementToDom: true,
  bootstrapVersion: 4,
};

const supportedPreprocessors = ['less', 'sass'];

const componentDependencies = {
  'bs-button-group': ['bs-button'],
  'bs-accordion': ['bs-collapse'],
  'bs-dropdown': ['bs-button', 'bs-link-to'],
  'bs-form': ['bs-button'],
  'bs-modal-simple': ['bs-modal'],
  'bs-modal': ['bs-button'],
  'bs-nav': ['bs-link-to', 'bs-dropdown'],
  'bs-navbar': ['bs-nav', 'bs-button', 'bs-link-to'],
  'bs-popover': ['bs-contextual-help'],
  'bs-tab': ['bs-nav'],
  'bs-tooltip': ['bs-contextual-help'],
};

const minimumBS4Version = '4.0.0-beta';
const minimumBS5Version = '5.0.0';

module.exports = {
  name: require('./package').name,

  init() {
    this._super.init.apply(this, arguments);
    this.debugTree = BroccoliDebug.buildDebugCallback(`ember-bootstrap:${this.name}`);
  },

  includedCommands() {
    return {
      'bootstrap:info': require('./lib/commands/info'),
    };
  },

  included() {
    this._super.included.apply(this, arguments);

    let app = this._findHost(this);
    this.app = app;

    let options = Object.assign({}, defaultOptions, app.options['ember-bootstrap']);

    if (options.bootstrapVersion === 3) {
      this.warn(
        'Support for Bootstrap 3 has been deprecated and will be removed in ember-bootstrap v5! Consider migrating to Bootstrap v4 or v5!'
      );
    }

    if (options.bootstrapVersion >= 4 && options.importBootstrapFont) {
      this.warn(
        'Inclusion of the Glyphicon font is only supported for Bootstrap 3. ' +
          "Set Ember Bootstrap's `importBootstrapFont` option to `false` to hide this warning."
      );
    }
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
        this.import(path.join(vendorPath, 'bootstrap.css'));
        this.import(path.join(vendorPath, 'bootstrap.css.map'), { destDir: 'assets' });
      }

      if (options.importBootstrapTheme) {
        this.import(path.join(vendorPath, 'bootstrap-theme.css'));
        this.import(path.join(vendorPath, 'bootstrap-theme.css.map'), { destDir: 'assets' });
      }
    }

    // import custom addon CSS
    this.import(path.join(vendorPath, `bs${options.bootstrapVersion}.css`));

    // setup config for @embroider/macros
    this.options['@embroider/macros'].setOwnConfig.isBS3 = this.getBootstrapVersion() === 3;
    this.options['@embroider/macros'].setOwnConfig.isBS4 = this.getBootstrapVersion() === 4;
    this.options['@embroider/macros'].setOwnConfig.isBS5 = this.getBootstrapVersion() === 5;
    this.options['@embroider/macros'].setOwnConfig.isNotBS3 = this.getBootstrapVersion() !== 3;
    this.options['@embroider/macros'].setOwnConfig.isNotBS5 = this.getBootstrapVersion() !== 5;
    this.options['@embroider/macros'].setOwnConfig.version = require('./package.json').version;
  },

  options: {
    '@embroider/macros': {
      setOwnConfig: {},
    },
  },

  validateDependencies() {
    if (this.getBootstrapVersion() >= 4) {
      let checker = new VersionChecker(this.project);
      let dep = checker.for('bootstrap');

      if (this.getBootstrapVersion() === 4 && !dep.gte(minimumBS4Version)) {
        this.warn(
          `For Bootstrap 4 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS4Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`
        );
      }

      if (this.getBootstrapVersion() === 5 && !dep.gte(minimumBS5Version)) {
        this.warn(
          `For Bootstrap 5 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS5Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`
        );
      }
    }
  },

  findPreprocessor() {
    return supportedPreprocessors.find(
      (name) => !!this.app.project.findAddonByName(`ember-cli-${name}`) && this.validatePreprocessor(name)
    );
  },

  validatePreprocessor(name) {
    let dependencies = this.app.project.dependencies();
    switch (name) {
      case 'sass':
        if (!('bootstrap-sass' in dependencies) && this.getBootstrapVersion() === 3) {
          this.warn(
            'Npm package "bootstrap-sass" is missing, but is typically required for SASS support. Please run `ember generate ember-bootstrap` to install the missing dependencies!'
          );
        }
        break;
      case 'less':
        if (this.getBootstrapVersion() >= 4) {
          throw new SilentError(
            'There is no Less support for Bootstrap 4 or higher! Falling back to importing static CSS. Consider switching to Sass for preprocessor support!'
          );
        }
        if (!('bootstrap' in dependencies)) {
          this.warn(
            'Npm package "bootstrap" is missing, but is typically required for Less support. Please run `ember generate ember-bootstrap` to install the missing dependencies!'
          );
        }
        break;
    }
    return true;
  },

  getBootstrapStylesPath() {
    switch (this.preprocessor) {
      case 'sass':
        if (this.getBootstrapVersion() >= 4) {
          return this.resolvePackagePath('bootstrap/scss');
        } else {
          return this.resolvePackagePath('bootstrap-sass/assets/stylesheets');
        }
      case 'less':
        return this.resolvePackagePath('bootstrap/less');
      default:
        return this.resolvePackagePath('bootstrap/dist/css');
    }
  },

  getBootstrapFontPath() {
    switch (this.preprocessor) {
      case 'sass':
        return this.resolvePackagePath('bootstrap-sass/assets/fonts');
      case 'less':
      default:
        return this.resolvePackagePath('bootstrap/fonts');
    }
  },

  resolvePackagePath(pkgPath) {
    let parts = pkgPath.split('/');
    let pkg = parts[0];
    let result = path.dirname(resolve.sync(`${pkg}/package.json`, { basedir: this.app.project.root }));

    // add sub folders to path
    if (parts.length > 1) {
      let args = parts.map((part, i) => (i === 0 ? result : part));
      result = path.join.apply(path, args);
    }
    return result;
  },

  hasPreprocessor() {
    return !!this.preprocessor;
  },

  treeForStyles() {
    if (this.hasPreprocessor()) {
      return new Funnel(this.getBootstrapStylesPath(), {
        destDir: 'ember-bootstrap',
      });
    }
  },

  treeForPublic() {
    if (this.getBootstrapVersion() === 3 && this.bootstrapOptions.importBootstrapFont) {
      return new Funnel(this.getBootstrapFontPath(), {
        destDir: 'fonts',
      });
    }
  },

  treeForVendor(tree) {
    let trees = [tree];

    if (!this.hasPreprocessor()) {
      trees.push(
        new Funnel(this.getBootstrapStylesPath(), {
          destDir: 'ember-bootstrap',
        })
      );
    }
    return mergeTrees(trees, { overwrite: true });
  },

  getBootstrapVersion() {
    return parseInt(this.bootstrapOptions.bootstrapVersion);
  },

  treeForApp(tree) {
    tree = this.filterComponents(tree);
    return this._super.treeForApp.call(this, tree);
  },

  treeForAddon(tree) {
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-tree:tree-shaken');

    return this._super.treeForAddon.call(this, tree);
  },

  /*
    This method is depreciated by ember-cli when building other apps
    but it is still called when building ember-bootstrap
    https://github.com/kaliber5/ember-bootstrap/pull/883
  */
  treeForAddonTemplates(tree) {
    tree = this.debugTree(tree, 'addon-templates-tree:input');
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-templates-tree:tree-shaken');

    return this._super.treeForAddonTemplates.call(this, tree);
  },

  contentFor(type, config) {
    if (
      type === 'body-footer' &&
      config.environment !== 'test' &&
      this.bootstrapOptions.insertEmberWormholeElementToDom !== false
    ) {
      return '<div id="ember-bootstrap-wormhole"></div>';
    }
  },

  warn(message) {
    this.ui.writeWarnLine(message);
  },

  filterComponents(tree) {
    let whitelist = this.generateWhitelist(this.bootstrapOptions.whitelist);
    let blacklist = this.bootstrapOptions.blacklist || [];

    // exit early if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      return tree;
    }

    return new Funnel(tree, {
      exclude: [(name) => this.excludeComponent(name, whitelist, blacklist)],
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
  },
};
