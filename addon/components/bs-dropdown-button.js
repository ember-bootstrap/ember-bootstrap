import Button from 'ember-bootstrap/components/bs-button';
import DropdownToggle from 'ember-bootstrap/mixins/dropdown-toggle';
import DropDown from 'ember-bootstrap/components/bs-dropdown';

/**
 Button component with that can act as a dropdown toggler.

 See {{#crossLink "Components.Dropdown"}}{{/crossLink}} for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @uses Mixins.DropdownToggle
 */
export default Button.extend(DropdownToggle, {
    didInsertElement: function() {
        var dropDown = this.nearestOfType(DropDown);
        if (dropDown) {
            dropDown.registerChild(this);
        }
    },
    willDestroyElement: function() {
        var dropDown = this.nearestOfType(DropDown);
        if (dropDown) {
            dropDown.removeChild(this);
        }
    }
});
