import Ember from 'ember';
import Button from '../bs-button';

const { computed, isArray } = Ember;

/**
 Internal component for button-group buttons

 @class ButtonGroupButton
 @namespace Components
 @extends Components.Button
 @private
 */
export default Button.extend({

  /**
   * @property groupValue
   * @public
   */
  groupValue: null,

  /**
   * @property type
   * @type string
   * @public
   */
  type: false,

  /**
   * @property active
   * @type boolean
   * @readonly
   * @public
   */
  active: computed('type', 'groupValue.[]', 'value', function() {
    let { value, groupValue } = this.getProperties('value', 'groupValue');
    if (this.get('type') === 'radio') {
      return value === groupValue;
    } else {
      if (isArray(groupValue)) {
        return groupValue.includes(value);
      }
    }
    return false;
  }).readOnly()

});