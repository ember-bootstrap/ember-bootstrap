import templateOnly from '@ember/component/template-only';

/**
 * Component to wrap the collapsible content of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarContent
 * @namespace Components
 * @extends Components.Collapse
 * @public
 */
export default templateOnly();

{{! @glint-nocheck }}
<BsCollapse
  @collapsed={{@collapsed}}
  @onHidden={{@onHidden}}
  @onShown={{@onShown}}
  class="navbar-collapse"
  ...attributes
>
  {{yield}}
</BsCollapse>
