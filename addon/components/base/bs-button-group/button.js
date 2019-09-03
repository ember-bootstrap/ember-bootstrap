import { computed } from '@ember/object';
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
  /**
   * @property groupValue
   * @private
   */
  groupValue = null;

  /**
   * @property buttonGroupType
   * @type string
   * @private
   */
  buttonGroupType = false;

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  @(computed('buttonGroupType', 'groupValue.[]', 'value').readOnly())
  get active() {
    let { value, groupValue } = this.getProperties('value', 'groupValue');
    if (this.get('buttonGroupType') === 'radio') {
      return value === groupValue;
    } else {
      if (isArray(groupValue)) {
        return groupValue.indexOf(value) !== -1;
      }
    }
    return false;
  }
}
