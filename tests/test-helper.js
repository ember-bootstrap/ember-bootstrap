import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

document.addEventListener('securitypolicyviolation', function({ target, blockedURI, violatedDirective }) {
  if (target.className.match(/ember-basic-dropdown/) || target.hasAttribute('data-test-ignore-csp')) {
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
