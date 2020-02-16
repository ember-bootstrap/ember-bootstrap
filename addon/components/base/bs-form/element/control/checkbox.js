import { attributeBindings, tagName } from '@ember-decorators/component';
import Control from '../control';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('input')
@attributeBindings(
  'disabled',
  'readonly',
  'ariaDescribedBy:aria-describedby',
  'value:checked',
  'type'
)
export default class FormElementControlCheckbox extends Control {
  /**
   * @property type
   * @type {String}
   * @readonly
   * @private
   */
  type = 'checkbox';

  click(event) {
    this.get('onChange')(event.target.checked);
  }
}
