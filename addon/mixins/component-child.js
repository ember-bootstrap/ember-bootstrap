import Ember from 'ember';
import ComponentParentMixin from 'ember-bootstrap/mixins/component-parent';

const { computed } = Ember;

/**
 * Mixin for components that act as a child component in a parent-child relationship of components
 *
 * @class ComponentChild
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({

  /**
   * The parent component
   *
   * @property parent
   * @private
   */
  parent: computed(function() {
    return this.nearestOfType(ComponentParentMixin);
  }),

  /**
   * flag to check if component has already been rendered, for the `_willRender` event handler
   * @property _didInsert
   * @type boolean
   * @private
   */
  _didInsert: false,

  /**
   * Register ourself as a child at the parent component
   * We use the `willRender` event here to also support the fastboot environment, where there is no `didInsertElement`
   *
   * @method willRender
   * @private
   */
  willRender() {
    this._super(...arguments);
    if (!this._didInsert) {
      this._didInsert = true;
      let parent = this.get('parent');
      if (parent) {
        parent.registerChild(this);
      }
    }
  },

  /**
   * stores the parent in didInsertElement hook as a work-a-round for
   * https://github.com/emberjs/ember.js/issues/12080
   *
   * @property _parent
   * @private
   */
  _parent: null,

  /**
   * Unregister form the parent component
   *
   * @method willDestroyElement
   * @private
   */
  willDestroyElement() {
    this._super(...arguments);
    let parent = this.get('parent');
    if (parent) {
      parent.removeChild(this);
    }
  }
});
