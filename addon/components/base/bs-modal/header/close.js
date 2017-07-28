import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNames: ['close'],
  attributeBindings: ['type', 'aria-label'],
  'aria-label': 'Close',
  type: 'button',

  /**
   * @event onClick
   * @public
   */
  onClick() {},

  click() {
    this.get('onClick')();
  }
});
