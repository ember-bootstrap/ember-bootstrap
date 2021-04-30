import { getOwnConfig } from '@embroider/macros';
import Ember from 'ember';

export const VERSION = getOwnConfig().version;

export function registerLibrary() {
  Ember.libraries.register('Ember Bootstrap', VERSION);
}
