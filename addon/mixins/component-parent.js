import Ember from 'ember';

/**
 * Mixin for components that act as a parent component in a parent-child relationship of components
 *
 * @class ComponentParent
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  _onInit: Ember.on('init', function() {
    this.set('children', Ember.A());
  }),

  /**
   * Register a component as a child of this parent
   *
   * @method registerChild
   * @param child
   * @public
   */
  registerChild(child) {
    Ember.run.schedule('sync', this, function() {
      this.get('children').addObject(child);
    });
  },

  /**
   * Remove the child component from this parent component
   *
   * @method removeChild
   * @param child
   * @public
   */
  removeChild(child) {
    this.get('children').removeObject(child);
  }
});
