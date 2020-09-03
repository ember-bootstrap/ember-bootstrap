import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import { next } from '@ember/runloop';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import { ref } from 'ember-ref-bucket';

/**
 Internal component for modal's markup and event handling. Should not be used directly.

 @class ModalDialog
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
@deprecateSubclassing
export default class ModalDialog extends Component {
  /**
   * @property id
   * @type null | HTMLElement
   */
  @ref('mainNode') _element = null;

  @readOnly('titleId')
  ariaLabelledby;

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
    let size = this.size;
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
  @action
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
          nodeId = `${this.id}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    this.set('titleId', nodeId);
  }

  @action
  setInitialFocus(element) {
    let autofocus = element && element.querySelector('[autofocus]');
    if (autofocus) {
      next(() => autofocus.focus());
    }
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
   * @event onClose
   * @public
   */
  onClose() {}

  @action
  handleKeyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && this.keyboard) {
      this.onClose();
    }
  }

  @action
  handleClick(e) {
    if (this.ignoreBackdropClick) {
      this.set('ignoreBackdropClick', false);
      return;
    }
    if (e.target !== this._element || !this.backdropClose) {
      return;
    }
    this.onClose();
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
