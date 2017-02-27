import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-form/element/label';

/**

 @class FormElementLabel
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,
  tagName: '',

  /**
   * @property label
   * @type string
   * @public
   */
  label: null,

  /**
   * @property invisibleLabel
   * @type boolean
   * @public
   */
  invisibleLabel: false,

  /**
   * @property formElementId
   * @type {String}
   * @public
   */
  formElementId: null,

  /**
   * @property labelClass
   * @type {String}
   * @public
   */
  labelClass: null
});