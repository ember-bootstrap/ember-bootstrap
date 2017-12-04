import Application from '../app';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { Promise as EmberPromise } from 'rsvp';
import { settings } from 'ember-native-dom-helpers';

if (typeof Promise === 'undefined') {
  window.Promise = EmberPromise;
}

setApplication(Application.create({ autoboot: false }));

// make rootElement of `ember-native-dom-helpers` match `this.$()`, see https://github.com/cibernox/ember-native-dom-helpers/issues/63
settings.rootElement = '#ember-testing > .ember-view' || settings.rootElement;
start();
