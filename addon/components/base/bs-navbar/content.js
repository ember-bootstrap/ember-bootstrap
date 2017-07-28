import layout from 'ember-bootstrap/templates/components/bs-navbar/content';
import BsCollapseComponent from 'ember-bootstrap/components/bs-collapse';

/**
 * Component to wrap the collapsible content of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarContent
 * @namespace Components
 * @extends Components.Collapse
 * @public
 */
export default BsCollapseComponent.extend({
  layout,

  classNames: ['navbar-collapse']
});
