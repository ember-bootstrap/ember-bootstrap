import QUnit from 'qunit';
import { registerDeprecationHandler } from '@ember/debug';
import config from 'dummy/config/environment';

let isRegistered = false;
let deprecations;

export default function setupNoDeprecations({ beforeEach, afterEach }) {

  if (config.failOnDeprecation) {
    beforeEach(function() {
      deprecations = [];
      if (!isRegistered) {
        registerDeprecationHandler((message, options, next) => {
          deprecations.push(message);
          next(message, options);
        });
        isRegistered = true;
      }
    });

    afterEach(function(assert) {
      // guard in if instead of using assert.equal(), to not make assert.expect() fail
      if (deprecations && deprecations.length > 0) {
        assert.ok(false, `Expected no deprecations, found: ${deprecations.map(msg => `"${msg}"`).join(', ')}`);
      }
    });
  }

  QUnit.assert.deprecations = function(count = 1) {
    this.equal(deprecations.length, count, 'Expected deprecations during test.');

    deprecations = [];
  };

  QUnit.assert.deprecationsInclude = function(expected) {
    let foundIndex = deprecations.indexOf(expected);
    this.pushResult({
      result: foundIndex > -1,
      actual: deprecations,
      message: `expected to find \`${expected}\` deprecation. Found ${deprecations.map(d => `!${d}`).join(', ')}`,
    });

    deprecations.splice(foundIndex, 1);
  };
}

