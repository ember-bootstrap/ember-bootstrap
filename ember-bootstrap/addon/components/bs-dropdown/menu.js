import { action } from '@ember/object';
import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import { ref } from 'ember-ref-bucket';
import { tracked } from '@glimmer/tracking';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Component
 @public
 */
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

  @tracked
  isOpen = this.args.isOpen;

  @action
  updateIsOpen(value) {
    // delay removing the menu from DOM to allow (delegated Ember) event to fire for the menu's children
    // Fixes https://github.com/kaliber5/ember-bootstrap/issues/660
    next(() => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.isOpen = value;
    });
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
}
