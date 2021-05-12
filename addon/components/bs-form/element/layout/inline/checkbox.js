import FormElementLayoutInline from '../inline';
import { equal } from '@ember/object/computed';

/**

 @class FormElementLayoutInlineCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
export default class FormElementLayoutInlineCheckbox extends FormElementLayoutInline {
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
