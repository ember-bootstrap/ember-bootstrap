import QUnit from 'qunit';
import { registerDeprecationHandler } from '@ember/debug';
import config from 'dummy/config/environment';

let isRegistered = false;
let deprecations;

export default function setupNoDeprecations({ beforeEach, afterEach }) {

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
    if (config.failOnDeprecation && deprecations && deprecations.length > 0) {
      assert.ok(false, `Expected no deprecations, found: ${deprecations.map(msg => `"${msg}"`).join(', ')}`);
    }
  });

  QUnit.assert.deprecations = function(count) {
    if (count === undefined) {
      this.ok(deprecations.length, 'Expected deprecations during test.');
    } else {
      this.equal(deprecations.length, count, `Expected ${count} deprecation(s) during test.`);
    }

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

