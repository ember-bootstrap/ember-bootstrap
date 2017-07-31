import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/api-reference';

export default Component.extend({
  layout,
  classNames: ['panel', 'panel-default'],

  model: null,

  title: computed.readOnly('model.title'),
  apiUrl: computed.readOnly('model.apiUrl'),
  apiUnstableUrl: computed.readOnly('model.apiUnstableUrl'),
  bsUrl: computed.readOnly('model.bsUrl')
});
