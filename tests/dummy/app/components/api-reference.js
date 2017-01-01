import Ember from 'ember';
import layout from '../templates/components/api-reference';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['panel', 'panel-info'],

  model: null,

  title: computed.readOnly('model.title'),
  apiUrl: computed.readOnly('model.apiUrl'),
  bsUrl: computed.readOnly('model.bsUrl')
});
