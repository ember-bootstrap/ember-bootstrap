import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/dialog';

/**
 Internal component for modal's markup and event handling. Should not be used directly.

 @class ModalDialog
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName("")
@templateLayout(layout)
export default class ModalDialog extends Component {
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

  /**
   * Used to apply Bootstrap's visibility classes
   *
   * @property showModal
   * @type boolean
   * @default false
   * @private
   */

  /**
   * Render modal markup?
   *
   * @property inDom
   * @type boolean
   * @default false
   * @private
   */

  /**
   * @property paddingLeft
   * @type number|null
   * @default null
   * @private
   */

  /**
   * @property paddingRight
   * @type number|null
   * @default null
   * @private
   */

  /**
   * Closes the modal when escape key is pressed.
   *
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */

  /**
   * Property for size styling, set to null (default), 'lg' or 'sm'
   *
   * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
   *
   * @property size
   * @type String
   * @public
   */

  /**
   * If true clicking on the backdrop will close the modal.
   *
   * @property backdropClose
   * @type boolean
   * @default true
   * @public
   */

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

  get _element() {
    return this.__element;
  }
  set _element(element) {
    this.__element = element;
    this.getOrSetTitleId(element);
    let autofocus = element && element.querySelector('[autofocus]');
    if (autofocus) {
      this.set('initialFocus', autofocus);
    }
  }

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId(modalNode) {
    //Title element may be set by user so we have to try and find it to set the id
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

  initialFocus;

  /**
   * @event onClose
   * @public
   */
  onClose() {
  }

  @action
  handleKeyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && this.get('keyboard')) {
      this.get('onClose')();
    }
  }

  @action
  handleClick(e) {
    if (this.ignoreBackdropClick) {
      this.set('ignoreBackdropClick', false);
      return;
    }
    if (e.target !== this._element || !this.get('backdropClose')) {
      return;
    }
    this.get('onClose')();
  }

  @action
  handleMouseDown(e) {
    this.set('mouseDownElement', e.target);
  }

  @action
  handleMouseUp(e) {
    if (this.mouseDownElement !== this._element && e.target === this._element) {
      this.set('ignoreBackdropClick', true);
    }
  }
}
