/* global QUnit */

export function setupAssertionsForErrorsNotHandledByEmberOnError(hooks) {
  hooks.beforeEach(function (assert) {
    /*
     * The custom assertion `rejectsErrorNotHandledByEmberOnError` allows to test
     * functionality, which rejects intentionally. It serves a similar use case as
     * `assert.rejects` and `setupOnerror` utility provided by `@ember/test-helpers`.
     * Sadly for some use cases none of them is working.
     *
     * `rejectsErrorNotHandledByEmberOnError` should only be used for cases in which
     * neither  `assert.rejects` nor `setupOnerror` could be used. Otherwise these two
     * methods to test rejecting promises should be preferred.
     */
    assert.rejectsErrorNotHandledByEmberOnError = async function (
      callback,
      expectedError,
    ) {
      const unhandledRejectionListener = (event) => {
        if (event.reason === expectedError) {
          event.preventDefault();
        }
      };
      window.addEventListener('unhandledrejection', unhandledRejectionListener);

      // https://github.com/qunitjs/qunit/issues/1419#issuecomment-561739486
      const ORIG_QUNIT_UNHANDLED_REJECTION = QUnit.onUncaughtException;
      QUnit.onUncaughtException = (reason) => {
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
      window.removeEventListener(
        'unhandledrejection',
        unhandledRejectionListener,
      );
      QUnit.onUncaughtException = ORIG_QUNIT_UNHANDLED_REJECTION;
    };
  });
}
