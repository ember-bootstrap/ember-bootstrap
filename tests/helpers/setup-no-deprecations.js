import QUnit from 'qunit';
import { registerDeprecationHandler } from '@ember/debug';

let isRegistered = false;
let deprecations = new Set();
let expectedDeprecations = new Set();

// Ignore deprecations that are not caused by our own code, and which we cannot fix easily.
const ignoredDeprecations = [
  // @todo remove when we can land https://github.com/emberjs/ember-render-modifiers/pull/33 here
  /Versions of modifier manager capabilities prior to 3\.22 have been deprecated/,
  /Usage of the Ember Global is deprecated./,
  /import .* directly from/,
  /Use of `assign` has been deprecated/,
];

export default function setupNoDeprecations({ beforeEach, afterEach }) {
  beforeEach(function () {
    deprecations.clear();
    expectedDeprecations.clear();
    if (!isRegistered) {
      registerDeprecationHandler((message, options, next) => {
        if (!ignoredDeprecations.some((regex) => message.match(regex))) {
          deprecations.add(message);
        }
        next(message, options);
      });
      isRegistered = true;
    }
  });

  afterEach(function (assert) {
    // guard in if instead of using assert.equal(), to not make assert.expect() fail
    if (deprecations.size > expectedDeprecations.size) {
      assert.ok(
        false,
        `Expected ${expectedDeprecations.size} deprecations, found: ${[...deprecations]
          .map((msg) => `"${msg}"`)
          .join(', ')}`
      );
    }
  });

  QUnit.assert.deprecations = function (count) {
    if (count === undefined) {
      this.ok(deprecations.size, 'Expected deprecations during test.');
    } else {
      this.equal(deprecations.size, count, `Expected ${count} deprecation(s) during test.`);
    }

    deprecations.forEach((d) => expectedDeprecations.add(d));
  };

  QUnit.assert.deprecationsInclude = function (expected) {
    let found = [...deprecations].find((deprecation) => deprecation.includes(expected));
    this.pushResult({
      result: !!found,
      actual: deprecations,
      message: `expected to find \`${expected}\` deprecation. Found ${[...deprecations]
        .map((d) => `"${d}"`)
        .join(', ')}`,
    });

    if (found) {
      expectedDeprecations.add(found);
    }
  };
}
