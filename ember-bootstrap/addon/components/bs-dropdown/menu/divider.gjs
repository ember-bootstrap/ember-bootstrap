import templateOnly from '@ember/component/template-only';

/**
 Component for a dropdown menu divider.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenuDivider
 @namespace Components
 @extends Component
 @public
 */
export default templateOnly();

{{! @glint-nocheck }}
<div class="dropdown-divider" ...attributes>
  {{yield}}
</div>