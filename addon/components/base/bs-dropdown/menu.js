import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-dropdown/menu';
import { next } from '@ember/runloop';
import { getDestinationElement } from '../../../utils/dom';

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Ember.Component
 @public
 */
@classic
@templateLayout(layout)
@tagName('')
export default class Menu extends Component {
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
  align = 'left';

  /**
   * @property direction
   * @default 'down'
   * @type string
   * @private
   */
  direction = 'down';

  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  inNav = false;

  /**
   * By default the menu is rendered in the same place the dropdown. If you experience clipping
   * issues, you can set this to false to render the menu in a wormhole at the top of the DOM.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  renderInPlace = true;

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  @computed('renderInPlace')
  get _renderInPlace() {
    return (
      this.get('renderInPlace') ||
      !this.destinationElement
    );
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
    return getDestinationElement(this)
  }

  @computed('align')
  get alignClass() {
    return this.get('align') !== 'left' ? `dropdown-menu-${this.get('align')}` : undefined;
  }

  @computed
  get isOpen() {
    return false;
  }

  set isOpen(value) {
    // delay removing the menu from DOM to allow (delegated Ember) event to fire for the menu's children
    // Fixes https://github.com/kaliber5/ember-bootstrap/issues/660
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) {
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
    let { direction, align } = this.getProperties('direction', 'align');

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

  @computed('inNav', 'flip')
  get popperModifiers() {
    return {
      // @todo add offset config
      applyStyle: {
        enabled: !this.get('inNav')
      },
      flip: {
        enabled: this.get('flip')
      }
    };
  }

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */
  itemComponent = 'bs-dropdown/menu/item';

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  linkToComponent = 'bs-dropdown/menu/link-to';

  /**
   * @property dividerComponent
   * @type {String}
   * @private
   */
  dividerComponent = 'bs-dropdown/menu/divider';
}
