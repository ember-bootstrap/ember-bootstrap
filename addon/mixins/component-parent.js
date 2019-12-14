import { schedule } from '@ember/runloop';
import { A } from '@ember/array';
import Mixin from '@ember/object/mixin';

/**
 * Mixin for components that act as a parent component in a parent-child relationship of components
 *
 * @class ComponentParent
 * @namespace Mixins
 * @private
 */
export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  init() {
    this._super(...arguments);
    this.set('children', A());
  },

  /**
   * Register a component as a child of this parent
   *
   * @method registerChild
   * @param child
   * @public
   */
  registerChild(child) {
    schedule('actions', this, function() {
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
    schedule('actions', this, function() {
      this.get('children').removeObject(child);
    });
  }
});
