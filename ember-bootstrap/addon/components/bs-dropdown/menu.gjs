import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import { ref } from 'ember-ref-bucket';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Component
 @public
 */
import popperTooltip from 'ember-popper-modifier/modifiers/popper-tooltip';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
import createRef from 'ember-ref-bucket/modifiers/create-ref';
import { hash } from '@ember/helper';
import bsDefault from 'ember-bootstrap/helpers/bs-default';
import BsDropdownMenuItem from 'ember-bootstrap/components/bs-dropdown/menu/item';
import BsLinkTo from 'ember-bootstrap/components/bs-link-to';
import BsDropdownMenuDivider from 'ember-bootstrap/components/bs-dropdown/menu/divider';
export default class DropdownMenu extends Component {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('menuElement') menuElement = null;

  /**
   * Alignment of the menu, either "left" or "right"
   *
   * @property align
   * @type string
   * @default left
   * @public
   */
  get align() {
    return this.args.align ?? 'left';
  }

  /**
   * @property direction
   * @default 'down'
   * @type string
   * @private
   */
  get direction() {
    return this.args.direction ?? 'down';
  }

  /**
   * By default, the menu is rendered in the same place as the dropdown. If you experience clipping
   * issues, you can set this to false to render the menu in a wormhole at the top of the DOM.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  get renderInPlace() {
    return this.args.renderInPlace ?? true;
  }

  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  get inNav() {
    return this.args.inNav ?? false;
  }

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  get _renderInPlace() {
    return this.renderInPlace || !this.destinationElement;
  }

  /**
   * The wormhole destinationElement
   *
   * @property destinationElement
   * @type object
   * @readonly
   * @private
   */
  get destinationElement() {
    return getDestinationElement(this);
  }

  get alignClass() {
    if (this.align === 'right') {
      const alignClass = macroCondition(getOwnConfig().isBS4) ? 'right' : 'end';
      return `dropdown-menu-${alignClass}`;
    }

    return undefined;
  }

  flip = true;

  get popperPlacement() {
    let placement = 'bottom-start';
    let { direction, align } = this;

    if (direction === 'up') {
      placement = 'top-start';
      if (align === 'right') {
        placement = 'top-end';
      }
    } else if (direction === 'left') {
      placement = 'left-start';
    } else if (direction === 'right') {
      placement = 'right-start';
    } else if (align === 'right') {
      placement = 'bottom-end';
    }
    return placement;
  }

  @action
  setFocus() {
    // when the dropdown menu is rendered in place, focus can stay on the toggle element
    if (this._renderInPlace) {
      return;
    }

    if (this.menuElement) {
      this.menuElement.focus();
    }
  }

  get popperOptions() {
    return {
      placement: this.popperPlacement,
      onFirstUpdate: () => this.setFocus(),
      modifiers: [
        {
          name: 'flip',
          enabled: this.flip,
        },
        {
          name: 'applyStyles',
          enabled: !this.inNav,
        },
      ],
    };
  }

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */

  /**
   * @property dividerComponent
   * @type {String}
   * @private
   */
  <template>
    {{! @glint-nocheck }}
    {{#if @isOpen}}
      {{#if this._renderInPlace}}
        <div
          data-bs-popper
          class='dropdown-menu {{this.alignClass}} show'
          tabindex='-1'
          ...attributes
          {{popperTooltip @toggleElement this.popperOptions}}
          {{didInsert @registerChildElement 'menu'}}
          {{willDestroy @unregisterChildElement 'menu'}}
          {{createRef 'menuElement'}}
        >
          {{yield
            (hash
              item=(bsDefault @itemComponent (component BsDropdownMenuItem))
              link-to=(bsDefault
                @linkToComponent
                (component BsLinkTo attrClassInternal='dropdown-item')
              )
              linkTo=(bsDefault
                @linkToComponent
                (component BsLinkTo attrClassInternal='dropdown-item')
              )
              divider=(bsDefault
                @dividerComponent (component BsDropdownMenuDivider)
              )
            )
          }}
        </div>
      {{else}}
        {{#in-element this.destinationElement insertBefore=null}}
          <div
            data-bs-popper
            class='dropdown-menu {{this.alignClass}} show'
            tabindex='-1'
            ...attributes
            {{popperTooltip @toggleElement this.popperOptions}}
            {{didInsert @registerChildElement 'menu'}}
            {{willDestroy @unregisterChildElement 'menu'}}
            {{createRef 'menuElement'}}
          >
            {{yield
              (hash
                item=(bsDefault @itemComponent (component BsDropdownMenuItem))
                link-to=(bsDefault
                  @linkToComponent
                  (component BsLinkTo attrClassInternal='dropdown-item')
                )
                linkTo=(bsDefault
                  @linkToComponent
                  (component BsLinkTo attrClassInternal='dropdown-item')
                )
                divider=(bsDefault
                  @dividerComponent (component BsDropdownMenuDivider)
                )
              )
            }}
          </div>
        {{/in-element}}
      {{/if}}
    {{/if}}
  </template>
}
