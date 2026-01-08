'use strict';

const path = require('path');
const BroccoliDebug = require('broccoli-debug');
const SilentError = require('silent-error'); // From ember-cli
const VersionChecker = require('ember-cli-version-checker');

const defaultOptions = {
  bootstrapVersion: 5,
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

    this.bootstrapOptions = options;

    this.validateDependencies();

    // import custom addon CSS required to use Popper.js v2 with Bootstrap v4
    if (options.bootstrapVersion === 4) {
      let vendorPath = path.join('vendor', 'ember-bootstrap');

      // import custom addon CSS
      this.import(path.join(vendorPath, `bs4-overwrites-for-popper-js-v2.css`));
    }

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

  getBootstrapVersion() {
    return parseInt(this.bootstrapOptions.bootstrapVersion);
  },

  warn(message) {
    this.ui.writeWarnLine(message);
  },
};
