import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { settings } from 'ember-native-dom-helpers';
import { start } from 'ember-cli-qunit';

setResolver(resolver);

// make rootElement of `ember-native-dom-helpers` match `this.$()`, see https://github.com/cibernox/ember-native-dom-helpers/issues/63
settings.rootElement = '#ember-testing > .ember-view' || settings.rootElement;
start();