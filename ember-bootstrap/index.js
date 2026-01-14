'use strict';

const path = require('path');
const BroccoliDebug = require('broccoli-debug');

const defaultOptions = {
  bootstrapVersion: 5,
};

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

    let options = Object.assign(
      {},
      defaultOptions,
      app.options['ember-bootstrap'],
    );

    const bootstrapVersion = parseInt(options.bootstrapVersion);

    // import custom addon CSS required to use Popper.js v2 with Bootstrap v4
    if (bootstrapVersion === 4) {
      let vendorPath = path.join('vendor', 'ember-bootstrap');

      // import custom addon CSS
      this.import(path.join(vendorPath, `bs4-overwrites-for-popper-js-v2.css`));
    }

    // setup config for @embroider/macros
    this.options['@embroider/macros'].setOwnConfig.isBS4 =
      bootstrapVersion === 4;
    this.options['@embroider/macros'].setOwnConfig.isBS5 =
      bootstrapVersion === 5;
    this.options['@embroider/macros'].setOwnConfig.isNotBS5 =
      bootstrapVersion !== 5;
    this.options['@embroider/macros'].setOwnConfig.version =
      require('./package.json').version;
  },

  options: {
    '@embroider/macros': {
      setOwnConfig: {},
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
  },
};
