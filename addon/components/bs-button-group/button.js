import { isArray } from '@ember/array';
import Button from 'ember-bootstrap/components/bs-button';

/**
 Internal component for button-group buttons

 @class ButtonGroupButton
 @namespace Components
 @extends Components.Button
 @private
 */
export default class ButtonGroupButton extends Button {
  '__ember-bootstrap_subclass' = true;

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
}
