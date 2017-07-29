import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from 'ember-bootstrap/templates/components/bs-modal/dialog';

/**
  Internal component for modal's markup and event handling. Should not be used directly.

  @class ModalDialog
  @namespace Components
  @extends Ember.Component
  @private
 */
export default Component.extend({
  layout,
  classNames: ['modal'],
  classNameBindings: ['fade'],
  attributeBindings: ['tabindex', 'style'],
  ariaRole: 'dialog',
  tabindex: '-1',

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * Used to apply Bootstrap's visibility classes
   *
   * @property showModal
   * @type boolean
   * @default false
   * @private
   */
  showModal: false,

  /**
   * Render modal markup?
   *
   * @property inDom
   * @type boolean
   * @default false
   * @private
   */
  inDom: false,

  /**
   * @property paddingLeft
   * @type number|null
   * @default null
   * @private
   */
  paddingLeft: null,

  /**
   * @property paddingRight
   * @type number|null
   * @default null
   * @private
   */
  paddingRight: null,

  /**
   * Closes the modal when escape key is pressed.
   *
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */
  keyboard: true,

  /**
   * Property for size styling, set to null (default), 'lg' or 'sm'
   *
   * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
   *
   * @property size
   * @type String
   * @public
   */
  size: null,

  /**
   * If true clicking on the backdrop will close the modal.
   *
   * @property backdropClose
   * @type boolean
   * @default true
   * @public
   */
  backdropClose: true,

  /**
   * @property style
   * @type string
   * @readOnly
   * @private
   */
  style: computed('inDom', 'paddingLeft', 'paddingRight', function() {
    let styles = [];
    let { inDom, paddingLeft, paddingRight } = this.getProperties('inDom', 'paddingLeft', 'paddingRight');

    if (inDom) {
      styles.push('display: block');
    }
    if (paddingLeft) {
      styles.push(`padding-left: ${paddingLeft}px`);
    }
    if (paddingRight) {
      styles.push(`padding-right: ${paddingRight}px`);
    }

    return htmlSafe(styles.join(';'));
  }),

  /**
   * Name of the size class
   *
   * @property sizeClass
   * @type string
   * @readOnly
   * @private
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    return isBlank(size) ? null : `modal-${size}`;
  }).readOnly(),

  /**
   * @event onClose
   * @public
   */
  onClose() {},

  keyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && this.get('keyboard')) {
      this.get('onClose')();
    }
  },

  click(e) {
    if (!e.target.classList.contains('modal') || !this.get('backdropClose')) {
      return;
    }
    this.get('onClose')();
  }

});
