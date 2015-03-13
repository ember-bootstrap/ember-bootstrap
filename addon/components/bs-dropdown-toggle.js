import Ember from 'ember';
import DropdownToggle from 'ember-bootstrap/mixins/dropdown-toggle';

/**



 @class DropdownToggle
 @namespace Components
 @extends Ember.Component
 @uses Mixins.DropdownToggle
 */
export default Ember.Component.extend(DropdownToggle, {
    /**
     * Defaults to a `<a>` tag. Change for other types of dropdown toggles.
     *
     * @property tagName
     * @type string
     * @default "a"s
     * @public
     */
    tagName: 'a',


    attributeBindings: ['href'],

    /**
     * Computed property to generate a `href="#"` attribute when `tagName` is "a".
     *
     * @property href
     * @type string
     * @readonly
     * @protected
     */
    href: Ember.computed('tagName', function(){
        if (this.get('tagName').toUpperCase() === 'A') {
            return '#';
        }
    }),


    click: function (e) {
        e.preventDefault();
        this.sendAction();
    }


});
