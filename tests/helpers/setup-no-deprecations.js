import QUnit from 'qunit';
import { registerDeprecationHandler } from '@ember/debug';

let isRegistered = false;
let deprecations;

// Ignore deprecations that are not caused by our own code, and which we cannot fix easily.
const ignoredDeprecations = [
  /Versions of modifier manager capabilities prior to 3\.22 have been deprecated/,
  /Usage of the Ember Global is deprecated./,
  /import .* directly from/,
];

export default function setupNoDeprecations({ beforeEach, afterEach }) {
  beforeEach(function () {
    deprecations = [];
    if (!isRegistered) {
      registerDeprecationHandler((message, options, next) => {
        if (!ignoredDeprecations.some((regex) => message.match(regex))) {
          deprecations.push(message);
        }
        next(message, options);
      });
      isRegistered = true;
    }
  });

  afterEach(function (assert) {
    // guard in if instead of using assert.equal(), to not make assert.expect() fail
    if (deprecations && deprecations.length > 0) {
      assert.ok(false, `Expected no deprecations, found: ${deprecations.map((msg) => `"${msg}"`).join(', ')}`);
    }
  });

  QUnit.assert.deprecations = function (count) {
    if (count === undefined) {
      this.ok(deprecations.length, 'Expected deprecations during test.');
    } else {
      this.equal(deprecations.length, count, `Expected ${count} deprecation(s) during test.`);
    }

    deprecations = [];
  };

  QUnit.assert.deprecationsInclude = function (expected) {
    let found = deprecations.find((deprecation) => deprecation.includes(expected));
    this.pushResult({
      result: !!found,
      actual: deprecations,
      message: `expected to find \`${expected}\` deprecation. Found ${deprecations.map((d) => `!${d}`).join(', ')}`,
    });

    if (found) {
      deprecations.splice(deprecations.indexOf(found), 1);
    }
  };
}
