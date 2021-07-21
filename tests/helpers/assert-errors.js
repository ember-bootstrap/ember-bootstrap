/* global QUnit */

export function setupAssertionsForErrorsNotHandledByEmberOnError(hooks) {
  hooks.beforeEach(function (assert) {
    /*
     * The custom assertion `rejectsErrorNotHandledByEmberOnError` allows to test
     * functionality, which rejects intentionally. It serves a similar use case as
     * `assert.throws` and `setupOnerror` utility provided by `@ember/test-helpers`.
     * Sadly for some use cases none of them is working.
     *
     * `rejectsErrorNotHandledByEmberOnError` should only be used for cases in which
     * neither  `assert.throws` nor `setupOnerror` could be used. Otherwise these two
     * methods to test rejecting promises should be preferred.
     */
    assert.rejectsErrorNotHandledByEmberOnError = async function (callback, expectedError) {
      // https://github.com/qunitjs/qunit/issues/1419#issuecomment-561739486
      const ORIG_QUNIT_UNHANDLED_REJECTION = QUnit.onUnhandledRejection;
      QUnit.onUnhandledRejection = (reason) => {
        if (reason === expectedError) {
          assert.step('error is thrown');
          assert.equal(reason, expectedError);
        } else {
          // QUnit should report all other unhandled rejections and mark
          // the test as failed
          return ORIG_QUNIT_UNHANDLED_REJECTION.call(QUnit, reason);
        }
      };

      await callback();

      assert.verifySteps(['error is thrown']);
      QUnit.onUnhandledRejection = ORIG_QUNIT_UNHANDLED_REJECTION;
    };
  });
}
