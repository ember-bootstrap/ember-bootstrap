import { isArray } from '@ember/array';
import Button from 'ember-bootstrap/components/bs-button';
import { guidFor } from '@ember/object/internals';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Internal component for button-group buttons

 @class ButtonGroupButton
 @namespace Components
 @extends Components.Button
 @private
 */
export default class ButtonGroupButton extends Button {
  formId = guidFor(this);

  /**
   * @property groupValue
   * @private
   */

  /**
   * @property buttonGroupType
   * @type string
   * @private
   */

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  get active() {
    let { value, groupValue } = this.args;
    if (this.args.buttonGroupType === 'radio') {
      return value === groupValue;
    } else {
      if (isArray(groupValue)) {
        return groupValue.indexOf(value) !== -1;
      }
    }
    return false;
  }

  get isBS5ToggleButton() {
    if (macroCondition(getOwnConfig().isBS5)) {
      return (
        this.args.buttonGroupType === 'radio' ||
        this.args.buttonGroupType === 'checkbox'
      );
    } else {
      return false;
    }
  }
}
