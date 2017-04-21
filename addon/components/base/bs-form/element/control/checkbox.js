import Control from '../control';
import ControlAttributes from 'ember-bootstrap/mixins/control-attributes';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend(ControlAttributes, {
  attributeBindings: [
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