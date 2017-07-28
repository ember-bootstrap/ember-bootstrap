import Ember from 'ember';
import Button from 'ember-bootstrap/components/bs-button';

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
   * @private
   */
  groupValue: null,

  /**
   * @property buttonGroupType
   * @type string
   * @private
   */
  buttonGroupType: false,

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  active: computed('buttonGroupType', 'groupValue.[]', 'value', function() {
    let { value, groupValue } = this.getProperties('value', 'groupValue');
    if (this.get('buttonGroupType') === 'radio') {
      return value === groupValue;
    } else {
      if (isArray(groupValue)) {
        return groupValue.indexOf(value) !== -1;
      }
    }
    return false;
  }).readOnly()

});
