import Component from '@glimmer/component';
import { action } from '@ember/object';
import BsLinkTo from '../bs-link-to.gts';
import { on } from '@ember/modifier';

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

  <template>
    {{! @glint-nocheck }}
    <BsLinkTo
      @route={{@route}}
      @model={{@model}}
      @models={{@models}}
      @query={{@query}}
      @disabled={{@disabled}}
      {{on 'click' this.onClick}}
      class={{@attrClassInternal}}
      ...attributes
    >
      {{yield}}
    </BsLinkTo>
  </template>
}
