import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

document.addEventListener('securitypolicyviolation', function({ blockedURI, target, violatedDirective }) {
  // ignore CSP violation by qunit
  // This couldn't be whitelisted using SHA hash cause it's style-src-attribute violation.
  // Could be removed after upstream fix is merged and released upstream:
  // https://github.com/qunitjs/qunit/pull/1369
  if (
    violatedDirective.startsWith('style-src') &&
    target.parentNode.id === 'qunit-modulefilter-actions'
  ) {
    return;
  }

  throw new Error(
    'Content-Security-Policy violation detected: ' +
    `Violated directive: ${violatedDirective}. ` +
    `Blocked URI: ${blockedURI}`
  );
});

setApplication(Application.create(config.APP));
start();
