import Application from '../app';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

setApplication(Application.create({ autoboot: false }));

start();
