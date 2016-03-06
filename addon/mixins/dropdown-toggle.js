import Ember from 'ember';
import componentChild from 'ember-bootstrap/mixins/component-child';

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 * @public
 */
export default Ember.Mixin.create(componentChild, {
  classNames: ['dropdown-toggle'],
  attributeBindings: ['data-toggle'],
  /**
   * @property ariaRole
   * @default button
   * @type string
   * @protected
   */
  ariaRole: 'button',

  'data-toggle': 'dropdown',

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
