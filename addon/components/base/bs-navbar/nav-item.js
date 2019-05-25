import BsNavItemComponent from 'ember-bootstrap/components/bs-nav/item';

/**
 *
 * @class NavbarNavItem
 * @namespace Components
 * @extends Components.NavItem
 * @public
 */
export default BsNavItemComponent.extend({
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
    if (this.get('collapseNavbar') && this.get('linkTo')) {
      this.onCollapse();
    }
  }
});
