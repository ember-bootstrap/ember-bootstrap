import BsNavLinkToComponent from 'ember-bootstrap/components/bs-nav/link-to';

/**
 * Extended `{{link-to}}` component for use within Navbars.
 *
 * @class NavbarLinkTo
 * @namespace Components
 * @extends Components.NavLinkTo
 * @public
 */
export default BsNavLinkToComponent.extend({

  /**
   * @property collapseNavbar
   * @type {Boolean}
   * @default true
   * @public
   */
  collapseNavbar: true,

  /**
   * @event onCollapse
   * @private
   */
  onCollapse() {},

  click() {
    if (this.get('collapseNavbar')) {
      this.onCollapse();
    }
  }
});
