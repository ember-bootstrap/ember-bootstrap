import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import { ref } from 'ember-ref-bucket';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import type { Placement as PopperPlacement } from '@popperjs/core';
import BsDropdownMenuDividerComponent, {
  type DropdownMenuDividerSignature,
} from './menu/divider';
import BsDropdownMenuItemComponent, {
  type DropdownMenuItemSignature,
} from './menu/item';
import BsLinkToComponent, { type BsLinkToSignature } from '../bs-link-to';
import type { ComponentLike } from '@glint/template';
import type EmbroiderConfig from '../../utils/embroider-config';

interface DropdownMenuSignature {
  Element: HTMLDivElement;
  Args: {
    align?: 'left' | 'right';
    dividerComponent?: ComponentLike<DropdownMenuDividerSignature>;
    isOpen?: boolean;
    itemComponent?: ComponentLike<DropdownMenuItemSignature>;
    linkToComponent?: ComponentLike<BsLinkToSignature>;
    registerChildElement: (element: HTMLDivElement, [type]: ['menu']) => void;
    renderInPlace?: boolean;
    toggleElement: HTMLAnchorElement;
    unregisterChildElement: (element: HTMLDivElement, [type]: ['menu']) => void;

    /**
     * @internal
     */
    direction?: 'up' | 'down' | 'left' | 'right';

    /**
     * @internal
     */
    inNav?: boolean;
  };
  Blocks: {
    default: [
      {
        divider: ComponentLike<DropdownMenuDividerSignature>;
        item: ComponentLike<DropdownMenuItemSignature>;
        linkTo: ComponentLike<BsLinkToSignature>;
        'link-to': ComponentLike<BsLinkToSignature>;
      },
    ];
  };
}

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Component
 @public
 */
export default class DropdownMenu extends Component<DropdownMenuSignature> {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('menuElement') menuElement: HTMLDivElement | null = null;

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
      const alignClass = macroCondition(getOwnConfig<EmbroiderConfig>().isBS4)
        ? 'right'
        : 'end';
      return `dropdown-menu-${alignClass}`;
    }

    return undefined;
  }

  flip = true;

  get popperPlacement(): PopperPlacement {
    let placement: PopperPlacement = 'bottom-start';
    const { direction, align } = this;

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
  get itemComponent(): ComponentLike<DropdownMenuItemSignature> {
    return this.args.itemComponent ?? BsDropdownMenuItemComponent;
  }

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  get linkToComponent(): ComponentLike<BsLinkToSignature> {
    return this.args.linkToComponent ?? BsLinkToComponent;
  }

  /**
   * @property dividerComponent
   * @type {String}
   * @private
   */
  get dividerComponent(): ComponentLike<DropdownMenuDividerSignature> {
    return this.args.dividerComponent ?? BsDropdownMenuDividerComponent;
  }
}

export { type DropdownMenuSignature };
