'use strict';

module.exports = function () {
  return {
    buildSandboxGlobals(defaultGlobals) {
      return Object.assign({}, defaultGlobals, {
        // Expose Node's native fetch to the FastBoot sandbox. It was
        // provided by ember-fetch before.
        fetch,
      });
    },
  };
};
