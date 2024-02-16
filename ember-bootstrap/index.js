'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');
const SilentError = require('silent-error'); // From ember-cli
const VersionChecker = require('ember-cli-version-checker');
const resolve = require('resolve');

const defaultOptions = {
  importBootstrapCSS: true,
  insertEmberWormholeElementToDom: true,
  bootstrapVersion: 5,
};

const supportedPreprocessors = ['sass'];

const componentDependencies = {
  'bs-button-group': ['bs-button'],
  'bs-accordion': ['bs-collapse'],
  'bs-dropdown': ['bs-button', 'bs-link-to'],
  'bs-form': ['bs-button'],
  'bs-modal-simple': ['bs-modal'],
  'bs-modal': ['bs-button'],
  'bs-nav': ['bs-link-to', 'bs-dropdown'],
  'bs-navbar': ['bs-nav', 'bs-button', 'bs-link-to', 'bs-collapse'],
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
    this.debugTree = BroccoliDebug.buildDebugCallback(
      `ember-bootstrap:${this.name}`,
    );
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

    let options = Object.assign(
      {},
      defaultOptions,
      app.options['ember-bootstrap'],
    );

    if (options.bootstrapVersion === 3) {
      throw new SilentError(
        'Support for Bootstrap 3 has been removed as of ember-bootstrap v5! Consider migrating to Bootstrap v4 or v5, or downgrade ember-bootstrap to v4!',
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
        this.warn(`\
Importing Bootstrap CSS through Ember Bootstrap is deprecated. Applications should import Bootstrap's CSS explicitly.
Please find information how to do so in the Ember guides: https://guides.emberjs.com/release/addons-and-dependencies/#toc_css.
Additionally set importBootstrapCSS configuration of Ember Bootstrap in your app's ember-cli-build.js to false. Please find more information about Ember Bootstrap's configuration here: https://www.ember-bootstrap.com/getting-started/setup

Until: 7.0.0
`);

        this.needsBootstrapStyles = true;
        this.import(path.join(vendorPath, 'bootstrap.css'));
        this.import(path.join(vendorPath, 'bootstrap.css.map'), {
          destDir: 'assets',
        });
      }
    }

    // import custom addon CSS
    this.import(path.join(vendorPath, `bs${options.bootstrapVersion}.css`));

    // setup config for @embroider/macros
    this.options['@embroider/macros'].setOwnConfig.isBS4 =
      this.getBootstrapVersion() === 4;
    this.options['@embroider/macros'].setOwnConfig.isBS5 =
      this.getBootstrapVersion() === 5;
    this.options['@embroider/macros'].setOwnConfig.isNotBS5 =
      this.getBootstrapVersion() !== 5;
    this.options['@embroider/macros'].setOwnConfig.version =
      require('./package.json').version;
  },

  options: {
    '@embroider/macros': {
      setOwnConfig: {},
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
  },

  validateDependencies() {
    let checker = new VersionChecker(this.project);
    let dep = checker.for('bootstrap');

    if (this.getBootstrapVersion() === 4 && !dep.gte(minimumBS4Version)) {
      this.warn(
        `For Bootstrap 4 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS4Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`,
      );
    }

    if (this.getBootstrapVersion() === 5 && !dep.gte(minimumBS5Version)) {
      this.warn(
        `For Bootstrap 5 support this version of ember-bootstrap requires at least Bootstrap ${minimumBS5Version}, but you have ${dep.version}. Please run \`ember generate ember-bootstrap\` to update your dependencies!`,
      );
    }
  },

  findPreprocessor() {
    return supportedPreprocessors.find(
      (name) => !!this.app.project.findAddonByName(`ember-cli-${name}`),
    );
  },

  getBootstrapStylesPath() {
    switch (this.preprocessor) {
      case 'sass':
        return this.resolvePackagePath('bootstrap/scss');
      default:
        return this.resolvePackagePath('bootstrap/dist/css');
    }
  },

  resolvePackagePath(pkgPath) {
    let parts = pkgPath.split('/');
    let pkg = parts[0];
    let result = path.dirname(
      resolve.sync(`${pkg}/package.json`, { basedir: this.app.project.root }),
    );

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

  treeForVendor(tree) {
    let trees = [tree];

    if (!this.hasPreprocessor() && this.needsBootstrapStyles) {
      trees.push(
        new Funnel(this.getBootstrapStylesPath(), {
          destDir: 'ember-bootstrap',
        }),
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
      this.warn(`\
Inserting the element used by Ember Bootstrap as wormhole target for modals and tooltips is deprecated.
Please add a <div id="ember-bootstrap-wormhole"></div> to either the \`app/index.html\` or \`app/templates/application.hbs\` and set Ember Bootstrap's \`insertEmberWormholeElementToDom\` configuration option to \`false\`.
Please find more details about Ember Bootstrap's configuration here: https://www.ember-bootstrap.com/getting-started/setup.

Until: 7.0.0`);
      return '<div id="ember-bootstrap-wormhole"></div>';
    }
  },

  warn(message) {
    this.ui.writeWarnLine(message);
  },

  filterComponents(tree) {
    if (this.bootstrapOptions.whitelist) {
      throw new SilentError(
        "Ember Bootstrap's `whitelist` option been renamed to `include`. Please update your ember-cli-build.js accordingly.",
      );
    }
    if (this.bootstrapOptions.blacklist) {
      throw new SilentError(
        "Ember Bootstrap's `blacklist` option has been renamed to `exclude`. Please update your ember-cli-build.js accordingly.",
      );
    }

    let includeList = this.generateIncludeList(this.bootstrapOptions.include);
    let excludeList = this.bootstrapOptions.exclude || [];

    // exit early if no opts defined
    if (includeList.length === 0 && excludeList.length === 0) {
      return tree;
    }

    return new Funnel(tree, {
      exclude: [
        (name) => this.excludeComponent(name, includeList, excludeList),
      ],
    });
  },

  excludeComponent(name, includeList, excludeList) {
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

    let isIncluded = includeList.indexOf(baseName) !== -1;
    let isExcluded = excludeList.indexOf(baseName) !== -1;

    if (includeList.length === 0 && excludeList.length === 0) {
      return false;
    }

    if (includeList.length && excludeList.length === 0) {
      return !isIncluded;
    }

    return isExcluded;
  },

  generateIncludeList(includeList) {
    let list = [];

    if (!includeList) {
      return list;
    }

    function _addToIncludeList(item) {
      if (list.indexOf(item) === -1) {
        list.push(item);

        if (componentDependencies[item]) {
          componentDependencies[item].forEach(_addToIncludeList);
        }
      }
    }

    includeList.forEach(_addToIncludeList);
    return list;
  },
};
