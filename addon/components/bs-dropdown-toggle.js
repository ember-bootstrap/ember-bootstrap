import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    classNames: ['dropdown-toggle'],
    attributeBindings: ['data-toggle','href'],
    ariaRole: 'button',
    'data-toggle': 'dropdown',
    href: '#',

    targetObject: Ember.computed.alias('parentView'),

    action: 'toggleDropdown',

    click: function (e) {
        e.preventDefault();
        this.sendAction();
    }


});
