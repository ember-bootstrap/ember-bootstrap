import Ember from 'ember';
import ComponentParentMixin from 'ember-bootstrap/mixins/component-parent';


/**
 * Mixin for components that act as a child component in a parent-child relationship of components
 *
 * @class ComponentChild
 * @namespace Mixins
 */
export default Ember.Mixin.create({


  _didInsertElement: Ember.on('didInsertElement', function() {
    var parent = this.nearestOfType(ComponentParentMixin);
    if (parent) {
      parent.registerChild(this);
    }
  }),

  _willDestroyElement: Ember.on('willDestroyElement', function() {
    var parent = this.nearestOfType(ComponentParentMixin);
    if (parent) {
      parent.removeChild(this);
    }
  })



});
