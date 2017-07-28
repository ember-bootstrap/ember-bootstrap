import Mixin from '@ember/object/mixin';

/**
 * Mixin for control components to add standard HTML attributes
 *
 * @class ControlAttributes
 * @namespace Mixins
 * @private
 */
export default Mixin.create({
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
