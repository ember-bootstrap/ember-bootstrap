import templateOnly from '@ember/component/template-only';

interface DropdownMenuItemSignature {
  Blocks: {
    default: [];
  };
}

/**
 Component for a dropdown menu item.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenuItem
 @namespace Components
 @extends Component
 @public
 */
export default templateOnly<DropdownMenuItemSignature>();
export { type DropdownMenuItemSignature };
