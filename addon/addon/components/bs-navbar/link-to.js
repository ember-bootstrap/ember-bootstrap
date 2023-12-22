import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Extended `{{link-to}}` component for use within Navbars.
 *
 * @class NavbarLinkTo
 * @namespace Components
 * @extends Components.NavLinkTo
 * @public
 */
export default class NavbarLinkTo extends Component {
  /**
   * @property collapseNavbar
   * @type {Boolean}
   * @default true
   * @public
   */

  @action
  onClick() {
    if (this.args.collapseNavbar ?? true) {
      this.args.onCollapse();
    }
  }
}
