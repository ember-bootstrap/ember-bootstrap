import Ember from 'ember';

/**
 * Mixin for components that act as dropdown toggles.
 *
 * @class DropdownToggle
 * @namespace Mixins
 */
export default Ember.Mixin.create({
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
