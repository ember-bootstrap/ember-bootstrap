import { attributeBindings, tagName } from '@ember-decorators/component';
import Control from '../control';
import { baseAttributes } from './input';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('input')
@attributeBindings(...baseAttributes, 'value:checked', 'type')
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
