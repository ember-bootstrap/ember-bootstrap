import Ember from 'ember';

export function waves(params, hash) {
  let wavesClass = hash.wavesClass || 'waves-light';
  return Ember.String.htmlSafe(`<div class="waves-effect ${wavesClass}"></div>`);
}

export default Ember.Helper.helper(waves);
