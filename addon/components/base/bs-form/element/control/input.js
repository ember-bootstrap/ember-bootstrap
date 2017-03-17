import Control from '../control';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend({
  attributeBindings: [
    'value',
    'type',
    'name',
    'placeholder',
    'autofocus',
    'disabled',
    'readonly',
    'required',
    'size',
    'tabindex',
    'minlength',
    'maxlength',
    'min',
    'max',
    'pattern',
    'accept',
    'autocomplete',
    'autosave',
    'inputmode',
    'multiple',
    'step',
    'form',
    'spellcheck',
    'title'
  ],
  tagName: 'input',
  classNames: ['form-control'],

  /**
   * @property type
   * @type {String}
   * @public
   */
  type: 'text',

  change(event) {
    this.get('onChange')(event.target.value);
  },

  input(event) {
    this.get('onChange')(event.target.value);
  }

});