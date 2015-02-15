import Ember from 'ember';

/**
 * @class Bootstrap.DropdownToggle
 */
export default Ember.Mixin.create({
    classNames: ['dropdown-toggle'],
    attributeBindings: ['data-toggle'],
    ariaRole: 'button',
    'data-toggle': 'dropdown',

    targetObject: Ember.computed.alias('parentView'),

    action: 'toggleDropdown'
});
