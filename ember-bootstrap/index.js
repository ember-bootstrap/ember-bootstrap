'use strict';

const BroccoliDebug = require('broccoli-debug');

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

    // The `bootstrapVersion` option was replaced by the `isBS4` option of
    // `@embroider/macros` config. Fail loudly instead of silently ignoring it,
    // as it would render Bootstrap 5 markup in Bootstrap 4 apps otherwise.
    if (app.options['ember-bootstrap']?.bootstrapVersion !== undefined) {
      throw new Error(
        `[ember-bootstrap] The \`bootstrapVersion\` option is not supported anymore. ` +
          `Remove the \`ember-bootstrap\` options from your ember-cli-build.js. ` +
          `To use Bootstrap 4, set \`isBS4\` in the \`@embroider/macros\` config instead:\n\n` +
          `  '@embroider/macros': {\n` +
          `    setConfig: {\n` +
          `      'ember-bootstrap': {\n` +
          `        isBS4: true,\n` +
          `      },\n` +
          `    },\n` +
          `  },\n`,
      );
    }
  },

  options: {
    '@embroider/macros': {
      // Defaults to Bootstrap 5. Apps opt into Bootstrap 4 by setting `isBS4`
      // through `setConfig` of `@embroider/macros`, which takes precedence.
      setOwnConfig: {
        isBS4: false,
      },
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    babel: {
      plugins: [
        // Required by ember-concurrency v5 to compile `task(async () => {})`
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
  },
};
