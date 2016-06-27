import Ember from 'ember';

const { isArray } = Ember;

export function bsContains(params/*, hash*/) {
  return isArray(params[0]) ? params[0].contains(params[1]) : false;
}

export default Ember.Helper.helper(bsContains);
