import Ember from 'ember';

export function currentYear() {
  return new Date().getFullYear();
}

export default Ember.Helper.helper(currentYear);
