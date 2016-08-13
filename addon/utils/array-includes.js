import Ember from 'ember';

/**
 * Handle Ember.Array.contains deprecation: http://emberjs.com/deprecations/v2.x/#toc_enumerable-contains
 *
 * @param array
 * @param value
 * @public
 */
let includes;
if (typeof Ember.Array.includes === 'function') {
  includes = function arrayIncludes(array, value) {
    return array.includes(value);
  };
} else {
  includes = function arrayContains(array, value) {
    return array.contains(value);
  };
}

export default includes;