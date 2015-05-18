import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import Ember from 'ember';

setResolver(resolver);

// Ignore Ember.I18n in test as it causes run loop exception in unit tests
delete Ember.I18n;
