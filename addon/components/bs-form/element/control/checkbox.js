import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['type'],
  tagName: 'input',

  type: 'checkbox'
});
