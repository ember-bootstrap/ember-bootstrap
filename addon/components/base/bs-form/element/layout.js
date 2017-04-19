import Ember from 'ember';

/**

 @class FormElementLayout
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  tagName: '',

  /**
   * @property formElementId
   * @type {String}
   * @public
   */
  formElementId: null,

  /**
   * @property hasLabel
   * @type boolean
   * @public
   */
  hasLabel: true,

  /**
   * @property errorsComponent
   * @type {Ember.Component}
   * @public
   */
  errorsComponent: null,

  /**
   * @property feedbackIconComponent
   * @type {Ember.Component}
   * @public
   */
  feedbackIconComponent: null,

  /**
   * @property labelComponent
   * @type {Ember.Component}
   * @public
   */
  labelComponent: null,

  /**
   * @property helpTextComponent
   * @type {Ember.Component}
   * @public
   */
  helpTextComponent: null
});
