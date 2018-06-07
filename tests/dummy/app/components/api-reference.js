import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/api-reference';

export default Component.extend({
  layout,
  classNames: ['card'],

  model: null,

  title: readOnly('model.title'),
  apiUrl: readOnly('model.apiUrl'),
  apiUnstableUrl: readOnly('model.apiUnstableUrl'),
  bsUrl: readOnly('model.bsUrl')
});
