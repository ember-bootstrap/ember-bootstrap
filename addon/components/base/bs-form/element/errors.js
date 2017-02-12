import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-form/element/errors';

/**

 @class FormElementErrors
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
   * @property messages
   * @type {Ember.Array}
   * @public
   */
  messages: null
});
