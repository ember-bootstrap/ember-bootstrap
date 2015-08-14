import Ember from 'ember';

export function readPath(params/*, hash*/) {
  return Ember.get(params[0], params[1]);
}

export default Ember.Helper.helper(readPath);
