import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 @class FormElementLayout
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
export default class FormElementLayout extends Component {
  /**
   * @property formElementId
   * @type {String}
   * @public
   */
  @defaultValue
  formElementId = null;

  /**
   * @property hasLabel
   * @type boolean
   * @public
   */
  @defaultValue
  hasLabel = true;

  /**
   * @property errorsComponent
   * @type {Ember.Component}
   * @public
   */
  @defaultValue
  errorsComponent = null;

  /**
   * @property feedbackIconComponent
   * @type {Ember.Component}
   * @public
   */
  @defaultValue
  feedbackIconComponent = null;

  /**
   * @property labelComponent
   * @type {Ember.Component}
   * @public
   */
  @defaultValue
  labelComponent = null;

  /**
   * @property helpTextComponent
   * @type {Ember.Component}
   * @public
   */
  @defaultValue
  helpTextComponent = null;
}
