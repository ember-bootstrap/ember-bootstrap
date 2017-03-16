import Control from '../control';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend({
  attributeBindings: [
    'value:checked',
    'type',
    'name',
    'autofocus',
    'disabled',
    'readonly',
    'required',
    'tabindex',
    'form',
    'title'
  ],
  tagName: 'input',

  /**
   * @property type
   * @type {String}
   * @readonly
   * @private
   */
  type: 'checkbox',

  click(event) {
    this.get('onChange')(event.target.checked);
  }
});