import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'ember-bootstrap/templates/components/bs-dropdown/menu';
import { next } from '@ember/runloop';

/**
 Component for the dropdown menu.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenu
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
  layout,

  /**
   * Defaults to a `<ul>` tag in BS3 and a `<div>` tag in BS4. Change for other types of dropdown menus.
   *
   * @property tagName
   * @type string
   * @default ul
   * @public
   */
  tagName: '',

  /**
   * @property ariaRole
   * @default menu
   * @type string
   * @protected
   */
  ariaRole: 'menu',

  /**
   * Alignment of the menu, either "left" or "right"
   *
   * @property align
   * @type string
   * @default left
   * @public
   */
  align: 'left',

  /**
   * @property direction
   * @default 'down'
   * @type string
   * @private
   */
  direction: 'down',

  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  inNav: false,

  /**
   * By default the menu is rendered in the same place the dropdown. If you experience clipping
   * issues, you can set this to false to render the menu in a wormhole at the top of the DOM.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  renderInPlace: true,

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  _renderInPlace: computed('renderInPlace', function() {
    return (
      this.get('renderInPlace') ||
      typeof document === 'undefined' ||
      !document.getElementById('ember-bootstrap-wormhole')
    );
  }),

  alignClass: computed('align', function() {
    if (this.get('align') !== 'left') {
      return `dropdown-menu-${this.get('align')}`;
    }
  }),

  isOpen: computed({
    get() {
      return false;
    },
    set(key, value) {
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
  }),

  _isOpen: false,

  flip: true,

  _popperApi: null,

  popperPlacement: computed('direction', 'align', function() {
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
  }),

  popperModifiers: computed('inNav', 'flip', function() {
    return {
      // @todo add offset config
      applyStyle: {
        enabled: !this.get('inNav')
      },
      flip: {
        enabled: this.get('flip')
      }
    };
  }),

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */
  itemComponent: 'bs-dropdown/menu/item',

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  linkToComponent: 'bs-dropdown/menu/link-to',

  /**
   * @property dividerComponent
   * @type {String}
   * @private
   */
  dividerComponent: 'bs-dropdown/menu/divider'
});
