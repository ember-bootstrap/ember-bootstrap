import Ember from 'ember';

const { isArray, A } = Ember;

export function bsContains(params/*, hash*/) {
  return isArray(params[0]) ? A(params[0]).includes(params[1]) : false;
}

export default Ember.Helper.helper(bsContains);
