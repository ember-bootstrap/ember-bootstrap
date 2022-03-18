import Component from '@glimmer/component';
import formValidationClass from 'ember-bootstrap/utils/form-validation-class';

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
