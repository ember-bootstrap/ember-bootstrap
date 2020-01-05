import {
  attributeBindings,
  classNameBindings,
  classNames,
  layout as templateLayout
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import { bind } from '@ember/runloop';
import layout from 'ember-bootstrap/templates/components/bs-modal/dialog';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 Internal component for modal's markup and event handling. Should not be used directly.

 @class ModalDialog
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@classNames('modal')
@classNameBindings('fade')
@attributeBindings('tabindex', 'ariaLabelledby:aria-labelledby')
export default class ModalDialog extends Component {
  ariaRole = 'dialog';
  tabindex = '-1';

  @readOnly('titleId')
  ariaLabelledby;

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  fade = true;

  /**
   * Used to apply Bootstrap's visibility classes
   *
   * @property showModal
   * @type boolean
   * @default false
   * @private
   */
  @defaultValue
  showModal = false;

  /**
   * Render modal markup?
   *
   * @property inDom
   * @type boolean
   * @default false
   * @private
   */
  @defaultValue
  inDom = false;

  /**
   * @property paddingLeft
   * @type number|null
   * @default null
   * @private
   */
  @defaultValue
  paddingLeft = null;

  /**
   * @property paddingRight
   * @type number|null
   * @default null
   * @private
   */
  @defaultValue
  paddingRight = null;

  /**
   * Closes the modal when escape key is pressed.
   *
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  keyboard = true;

  /**
   * Property for size styling, set to null (default), 'lg' or 'sm'
   *
   * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  /**
   * If true clicking on the backdrop will close the modal.
   *
   * @property backdropClose
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  backdropClose = true;

  /**
   * Name of the size class
   *
   * @property sizeClass
   * @type string
   * @readOnly
   * @private
   */
  @(computed('size').readOnly())
  get sizeClass() {
    let size = this.get('size');
    return isBlank(size) ? null : `modal-${size}`;
  }

  /**
   * The id of the `.modal-title` element
   *
   * @property titleId
   * @type string
   * @default null
   * @private
   */
  titleId = null;

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId() {
    //Title element may be set by user so we have to try and find it to set the id
    const modalNode = this.get('element');
    let nodeId = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.modal-title');
      if (titleNode) {
        //Get title id of .modal-title
        nodeId = titleNode.id;
        if (!nodeId) {
          //no title id so we set one
          nodeId = `${this.get('id')}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    this.set('titleId', nodeId);
  }

  /**
   * If true clicking on the backdrop will be ignored and will not close modal.
   *
   * @property ignoreBackdropClick
   * @type boolean
   * @default false
   * @private
   */
  ignoreBackdropClick = false;

  /**
   * The target DOM element of mouse down event.
   *
   * @property mouseDownElement
   * @type object
   * @default null
   * @private
   */
  mouseDownElement = null;

  /**
   * Update the elements styles using CSSOM.
   *
   * This is necessary cause binding style attribute would require a
   * Content-Security-Policy `style-src 'unsafe-line'`.
   *
   * @method updateStyle
   * @return void
   * @private
   */
  updateStyles() {
    let { inDom, paddingLeft, paddingRight } = this.getProperties('inDom', 'paddingLeft', 'paddingRight');

    this.element.style.display = inDom ? 'block' : '';
    this.element.style.paddingLeft = paddingLeft || '';
    this.element.style.paddingRight = paddingRight || '';
  }

  @action
  initialFocus() {
    return this.element.querySelector('[autofocus]') || this.element;
  }

  /**
   * @event onClose
   * @public
   */
  onClose() {
  }

  keyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && this.get('keyboard')) {
      this.get('onClose')();
    }
  }

  _click(e) {
    if (this.ignoreBackdropClick) {
      this.set('ignoreBackdropClick', false);
      return;
    }
    if (e.target !== this.element || !this.get('backdropClose')) {
      return;
    }
    this.get('onClose')();
  }

  mouseDown(e) {
    this.set('mouseDownElement', e.target);
  }

  mouseUp(e) {
    if (this.mouseDownElement !== this.element && e.target === this.element) {
      this.set('ignoreBackdropClick', true);
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    // Ember events use event delegation, but we need to add an `onclick` handler directly on the modal element for
    // iOS to allow clicking the div. So a `click(){}` method here won't work, we need to attach an event listener
    // directly to the element
    this.element.onclick = bind(this, this._click);
    this.getOrSetTitleId();
    this.updateStyles();
  }

  didUpdateAttrs() {
    this.updateStyles();
  }

  willDestroyElement() {
    this.element.onclick = null;
  }
}
