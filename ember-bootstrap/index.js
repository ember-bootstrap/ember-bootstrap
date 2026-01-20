'use strict';

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
