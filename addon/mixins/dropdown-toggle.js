import Mixin from '@ember/object/mixin';
import { schedule } from '@ember/runloop';

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 * @private
 */
export default Mixin.create({
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
      schedule('sync', this, function() {
        if (!this.get('isDestroyed')) {
          dropdown.set('toggle', this);
        }
      });
    }
  }
});
