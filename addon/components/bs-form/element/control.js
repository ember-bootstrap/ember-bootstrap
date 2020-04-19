import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

/**

 @class FormElementControl
 @namespace Components
 @extends Ember.Component
 @private
 */
// eslint-disable-next-line ember/require-tagless-components
export default class FormElementControl extends Component {
  /**
   * @property value
   * @public
   */

  @formValidationClass('validationType')
  formValidationClass;

  /**
   * @property ariaDescribedBy
   * @type {string}
   * @public
   */
  @defaultValue
  ariaDescribedBy = null;

  /**
   * This action is called whenever the `value` changes
   *
   * @event onChange
   * @param {*} value
   * @public
   */
  onChange() {}
}
