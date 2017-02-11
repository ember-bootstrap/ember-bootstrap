import Ember from 'ember';
import layout from '../../../templates/components/bs-form/element/errors';

export default Ember.Component.extend({
  layout,
  tagName: '',

  show: false,

  messages: null
});
