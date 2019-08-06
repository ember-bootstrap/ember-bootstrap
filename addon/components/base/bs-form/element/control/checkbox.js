import Control from '../control';
import { baseAttributes } from './input';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend({
  tagName: 'input',
  attributeBindings: [
    ...baseAttributes,
    'value:checked',
    'type'
  ],

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