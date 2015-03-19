import Ember from 'ember';

/**
 Component for the dropdown menu.

 See {{#crossLink "Components.Dropdown"}}{{/crossLink}} for examples.

 @class DropdownMenu
 @namespace Components
 @extends Ember.Component
 */
export default Ember.Component.extend({

    /**
     * Defaults to a `<ul>` tag. Change for other types of dropdown menus.
     *
     * @property tagName
     * @type string
     * @default ul
     * @public
     */
    tagName: 'ul',
    classNames: ['dropdown-menu'],
    classNameBindings: ['alignClass'],

    /**
     * @property ariaRole
     * @default menu
     * @type string
     * @protected
     */
    ariaRole: 'menu',

    /**
     * Alignment of the menu, either "left" or "right"
     *
     * @property align
     * @type string
     * @default left
     * @public
     */
    align: 'left',

    alignClass: Ember.computed('align', function() {
        if (this.get('align') !== 'left') {
            return 'dropdown-menu-' + this.get('align');
        }
    })


});
