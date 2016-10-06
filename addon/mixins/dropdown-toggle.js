import Ember from 'ember';
import componentChild from 'ember-bootstrap/mixins/component-child';

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create(componentChild, {
  classNames: ['dropdown-toggle'],

  /**
   * @property ariaRole
   * @default button
   * @type string
   * @protected
   */
  ariaRole: 'button',

  targetObject: Ember.computed.alias('parentView'),

  /**
   * The default action is set to "toggleDropdown" on the parent {{#crossLink "Components.Dropdown"}}{{/crossLink}}
   *
   * @property action
   * @default toggleDropdown
   * @type string
   * @protected
   */
  action: 'toggleDropdown'
});
