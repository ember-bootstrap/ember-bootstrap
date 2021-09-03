import { tagName } from '@ember-decorators/component';
import { computed, action } from '@ember/object';
import Component from '@ember/component';
import { next } from '@ember/runloop';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import { ref } from 'ember-ref-bucket';

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName('')
@deprecateSubclassing
export default class DropdownMenu extends Component {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('menuElement') menuElement = null;

  /**
   * @property ariaRole
   * @default menu
   * @type string
   * @protected
   */
  ariaRole = 'menu';

  /**
   * Alignment of the menu, either "left" or "right"
   *
   * @property align
   * @type string
   * @default left
   * @public
   */
  @defaultValue
  align = 'left';

  /**
   * @property direction
   * @default 'down'
   * @type string
   * @private
   */
  @defaultValue
  direction = 'down';

  /**
   * By default the menu is rendered in the same place as the dropdown. If you experience clipping
   * issues, you can set this to false to render the menu in a wormhole at the top of the DOM.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  renderInPlace = true;

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  @computed('destinationElement', 'renderInPlace')
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
  @computed
  get destinationElement() {
    return getDestinationElement(this);
  }

  @computed('align')
  get alignClass() {
    return this.align !== 'left' ? `dropdown-menu-${this.align}` : undefined;
  }

  @computed
  get isOpen() {
    return false;
  }

  set isOpen(value) {
    // delay removing the menu from DOM to allow (delegated Ember) event to fire for the menu's children
    // Fixes https://github.com/kaliber5/ember-bootstrap/issues/660
    next(() => {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.set('_isOpen', value);
    });
    return value;
  }

  _isOpen = false;
  flip = true;
  _popperApi = null;

  @computed('direction', 'align')
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

  @computed('flip', 'popperPlacement')
  get popperOptions() {
    return {
      placement: this.popperPlacement,
      onFirstUpdate: () => this.setFocus(),
      modifiers: [
        {
          name: 'flip',
          enabled: this.flip,
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
