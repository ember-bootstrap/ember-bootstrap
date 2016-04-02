import Ember from 'ember';

const { computed } = Ember;

/**
  Internal component for modal's markup and event handling. Should not be used directly.

  @class ModalDialog
  @namespace Components
  @extends Ember.Component
  @private
 */
export default Ember.Component.extend({
  classNames: ['modal'],
  classNameBindings: ['fade', 'in'],
  attributeBindings: ['tabindex'],
  ariaRole: 'dialog',
  tabindex: '-1',

  /**
   * The title of the modal, visible in the modal header. Is ignored if `header` is false.
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * Display a close button (x icon) in the corner of the modal header.
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

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
   * Used to apply Bootstrap's "in" class
   *
   * @property in
   * @type boolean
   * @default false
   * @private
   */
  'in': false,

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
   * Generate a modal header component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalHeader](Components.ModalHeader.html) in the components block template
   *
   * @property header
   * @type boolean
   * @default true
   * @public
   */
  header: true,

  /**
   * Generate a modal body component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalBody](Components.ModalBody.html) in the components block template.
   *
   * Always set this to false if `header` and/or `footer` is false!
   *
   * @property body
   * @type boolean
   * @default true
   * @public
   */
  body: true,

  /**
   * Generate a modal footer component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalFooter](Components.ModalFooter.html) in the components block template
   *
   * @property footer
   * @type boolean
   * @default true
   * @public
   */
  footer: true,

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
   * Name of the size class
   *
   * @property sizeClass
   * @type string
   * @private
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    return Ember.isBlank(size) ? null : `modal-${size}`;
  }),

  keyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && this.get('keyboard')) {
      this.sendAction('close');
    }
  },

  click(e) {
    if (e.target !== e.currentTarget || !this.get('backdropClose')) {
      return;
    }
    this.sendAction('close');
  }

});