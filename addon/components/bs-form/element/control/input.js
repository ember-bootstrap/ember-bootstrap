import Ember from 'ember';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  attributeBindings: ['type'],
  tagName: 'input',
  classNames: ['form-control'],

  type: 'text'
});
