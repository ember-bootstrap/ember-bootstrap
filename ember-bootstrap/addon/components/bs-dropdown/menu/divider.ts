import templateOnly from '@ember/component/template-only';

interface DropdownMenuDividerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

/**
 Component for a dropdown menu divider.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenuDivider
 @namespace Components
 @extends Component
 @public
 */
export default templateOnly<DropdownMenuDividerSignature>();
export { type DropdownMenuDividerSignature };
