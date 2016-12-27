import Ember from 'ember';

const { run: { next } } = Ember;

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({
  classNames: ['dropdown-toggle'],

  /**
   * @property ariaRole
   * @default button
   * @type string
   * @protected
   */
  ariaRole: 'button',

  /**
   * Reference to the parent dropdown component
   *
   * @property dropdown
   * @type {Components.Dropdown}
   * @private
   */
  dropdown: null,

  didReceiveAttrs() {
    this._super(...arguments);
    let dropdown = this.get('dropdown');
    if (dropdown) {
      next(this, function() {
        if (!this.get('isDestroyed')) {
          dropdown.set('toggle', this);
        }
      });
    }
  }
});
