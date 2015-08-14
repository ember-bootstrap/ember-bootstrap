import Ember from 'ember';

export function isNot(params/*, hash*/) {
  return !params[0];
}

export default Ember.Helper.helper(isNot);
