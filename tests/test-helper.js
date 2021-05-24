import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';
import setupSinon from 'ember-sinon-qunit';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setupSinon();

start();
