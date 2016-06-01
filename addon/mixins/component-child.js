import Ember from 'ember';
import ComponentParentMixin from 'ember-bootstrap/mixins/component-parent';

/**
 * Mixin for components that act as a child component in a parent-child relationship of components
 *
 * @class ComponentChild
 * @namespace Mixins
 * @public
 */
export default Ember.Mixin.create({

  _didInsertElement: Ember.on('didInsertElement', function() {
    let parent = this.nearestOfType(ComponentParentMixin);
    if (parent) {
      parent.registerChild(this);
      this.set('_parent', parent);
    }
  }),

  // stores the parent in didInsertElement hook as a work-a-round for
  // https://github.com/emberjs/ember.js/issues/12080
  _parent: null,

  _willDestroyElement: Ember.on('willDestroyElement', function() {
    let parent = this.nearestOfType(ComponentParentMixin) || this.get('_parent');
    if (parent) {
      parent.removeChild(this);
    }
  })
});
