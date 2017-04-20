import Ember from 'ember';

/**
 * Mixin for control components to add standard HTML attributes
 *
 * @class ControlAttributes
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({
  attributeBindings: [
    'name',
    'autofocus',
    'disabled',
    'readonly',
    'required',
    'tabindex',
    'form',
    'title',
    'ariaDescribedBy:aria-describedby'
  ],
  tagName: 'input'
});
