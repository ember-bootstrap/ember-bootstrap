import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';
import setupSinon from 'ember-sinon-qunit';
import { setRunOptions } from 'ember-a11y-testing/test-support';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setupSinon();

setRunOptions({
  rules: {
    // color checks unfortunately fail for colors defined in dummy app, but are controlled at the end by
    // the user, so not a primary concern of the addon
    'color-contrast': { enabled: false },
  },
});

start();
