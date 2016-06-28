import Ember from 'ember';

export function not(params/*, hash*/) {
  return !params[0];
}

export default Ember.Helper.helper(not);
