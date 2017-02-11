import Ember from 'ember';

/**

 @class FormElementControl
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({

  value: null,

  /**
   * This action is called whenever the `value` changes
   *
   * @event onChange
   * @param {*} value
   * @public
   */
  onChange() {}
});
