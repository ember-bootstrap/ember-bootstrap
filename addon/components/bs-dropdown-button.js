import Button from 'ember-bootstrap/components/bs-button';
import DropdownToggle from 'ember-bootstrap/mixins/dropdown-toggle';

/**
 Button component with that can act as a dropdown toggler.

 See {{#crossLink "Components.Dropdown"}}{{/crossLink}} for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @uses Mixins.DropdownToggle
 */
export default Button.extend(DropdownToggle);
