import QUnit from 'qunit';

/**
 * Utility to prevent QUnit from reporting test failures when a promise yields an unhandled exception.
 *
 * @param hooks
 * @returns { expectException } a function to instruct QUnit not to report an exception as a test failure.
 */
export function setupUnhandledRejectionListener(hooks) {
  let originalOnUncaughtException;
  let unhandledRejectionListener;
  let expectedException;

  function expectException(exception) {
    expectedException = exception;
    // Hide the exception from the console since we expect it to be unhandled
    unhandledRejectionListener = (event) => {
      if (event.reason === expectedException) {
        event.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', unhandledRejectionListener);
  }

  hooks.before(() => {
    originalOnUncaughtException = QUnit.onUncaughtException;
    QUnit.onUncaughtException = (exception) => {
      if (exception !== expectedException) {
        originalOnUncaughtException(exception);
      }
    };
  });

  hooks.after(() => {
    QUnit.onUncaughtException = originalOnUncaughtException;
    expectedException = undefined;
    window.removeEventListener(
      'unhandledrejection',
      unhandledRejectionListener,
    );
  });

  return expectException;
}
