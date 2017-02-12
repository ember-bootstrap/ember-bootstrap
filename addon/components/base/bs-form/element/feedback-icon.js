import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-form/element/feedback-icon';

/**

 @class FormElementFeedbackIcon
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,
  tagName: '',

  /**
   * @property show
   * @type {Boolean}
   * @public
   */
  show: false,

  /**
   * @property iconName
   * @type {String}
   * @public
   */
  iconName: null
});
