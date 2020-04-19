import BsNavLinkToComponent from 'ember-bootstrap/components/bs-nav/link-to';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 * Extended `{{link-to}}` component for use within Navbars.
 *
 * @class NavbarLinkTo
 * @namespace Components
 * @extends Components.NavLinkTo
 * @public
 */
export default class NavbarLinkTo extends BsNavLinkToComponent {
  /**
   * @property collapseNavbar
   * @type {Boolean}
   * @default true
   * @public
   */
  @defaultValue
  collapseNavbar = true;

  /**
   * @event onCollapse
   * @private
   */
  onCollapse() {}

  click() {
    if (this.collapseNavbar) {
      this.onCollapse();
    }
  }
}
