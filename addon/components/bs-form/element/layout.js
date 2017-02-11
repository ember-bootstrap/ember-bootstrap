import Ember from 'ember';

const { computed } = Ember;

/**

 @class FormElementLayout
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({

  label: null,
  invisibleLabel: false,
  formElementId: null,

  /**
   * @property hasLabel
   * @type boolean
   * @readonly
   * @private
   */
  hasLabel: computed.notEmpty('label'),

  errorsComponent: null,

  feedbackIconComponent: null
});
