import FormElementLayoutVertical from '../vertical';
import { equal } from '@ember/object/computed';

/**

 @class FormElementLayoutVerticalCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
export default class FormElementLayoutVerticalCheckbox extends FormElementLayoutVertical {
  /**
   * Indicates whether the type of the control widget equals `switch`
   *
   * @property isSwitch
   * @type boolean
   * @private
   */
  @(equal('controlType', 'switch').readOnly())
  isSwitch;
}
