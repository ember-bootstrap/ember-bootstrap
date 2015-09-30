import Ember from 'ember';

export function addWaves(params, hash) {
  let wavesClass = hash.wavesClass || 'waves-light';
  return Ember.String.htmlSafe(`<div class="waves-container waves-effect ${wavesClass}"></div>`);
}

export default Ember.Helper.helper(addWaves);
