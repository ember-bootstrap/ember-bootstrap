import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

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
  onChange() {
  }
}
