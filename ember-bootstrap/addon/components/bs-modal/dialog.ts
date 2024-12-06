import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { ref } from 'ember-ref-bucket';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export type ModalSize = 'sm' | 'lg' | 'xl' | null;
export type ModalFullscreen =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | null
  | false
  | true;

export interface DialogSignature {
  Args: {
    backdropClose?: boolean;
    centered?: boolean;
    fade?: boolean;
    fullscreen?: ModalFullscreen;
    inDom?: boolean;
    keyboard?: boolean;
    onClose?: () => void;
    paddingLeft?: number;
    paddingRight?: number;
    scrollable?: boolean;
    showModal?: boolean;
    size?: ModalSize;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

/**
 * Internal component for modal's markup and event handling. Should not be used directly.
 *
 * @class ModalDialog
 * @namespace Components
 * @extends Glimmer.Component
 * @private
 */
export default class ModalDialog extends Component<DialogSignature> {
  /**
   * @property id
   * @type null | HTMLElement
   */
  @ref('mainNode') _element = null;

  /**
   * Name of the size class
   *
   * @property sizeClass
   * @type string
   * @readOnly
   * @private
   */
  get sizeClass() {
    const size = this.args.size;
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
  @tracked
  titleId: string | null = null;

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  @action
  getOrSetTitleId(modalNode: Element) {
    // Title element may be set by user, so we have to try and find it to set the id
    let nodeId: string | null = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.modal-title');
      if (titleNode) {
        //Get title id of .modal-title
        nodeId = titleNode.id;
        if (!nodeId) {
          //no title id so we set one
          nodeId = `${guidFor(this)}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    this.titleId = nodeId;
  }

  @action
  setInitialFocus(element: HTMLElement) {
    const autofocus = element && element.querySelector('[autofocus]');
    if (autofocus instanceof HTMLElement) {
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
  mouseDownElement: EventTarget | null = null;

  /**
   * @event onClose
   * @public
   */

  @action
  handleKeyDown(e: KeyboardEvent) {
    const code = e.keyCode || e.which;
    if (code === 27 && this.args.keyboard) {
      this.args.onClose?.();
    }
  }

  @action
  handleClick(e: MouseEvent) {
    if (this.ignoreBackdropClick) {
      this.ignoreBackdropClick = false;
      return;
    }
    if (e.target !== this._element || !this.args.backdropClose) {
      return;
    }
    this.args.onClose?.();
  }

  @action
  handleMouseDown(e: MouseEvent) {
    this.mouseDownElement = e.target;
  }

  @action
  handleMouseUp(e: MouseEvent) {
    if (this.mouseDownElement !== this._element && e.target === this._element) {
      this.ignoreBackdropClick = true;
    }
  }
}
