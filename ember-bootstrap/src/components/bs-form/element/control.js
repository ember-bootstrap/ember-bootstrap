import Component from '@glimmer/component';
import formValidationClass from '../../../utils/form-validation-class.js';

/**

 @class FormElementControl
 @namespace Components
 @extends Ember.Component
 @private
 */
export default class FormElementControl extends Component {
  /**
   * @property value
   * @public
   */

  get formValidationClass() {
    return formValidationClass(this.args.validationType);
  }

  /**
   * This action is called whenever the `value` changes
   *
   * @event onChange
   * @param {*} value
   * @public
   */
}
