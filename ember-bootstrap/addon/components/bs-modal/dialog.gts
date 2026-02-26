import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import bsEq from 'ember-bootstrap/helpers/bs-eq';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import focusTrap from 'ember-focus-trap/modifiers/focus-trap';
import { concat, hash } from '@ember/helper';
import { macroCondition } from '@embroider/macros';
import { macroGetOwnConfig } from '@embroider/macros/helpers';
import style from 'ember-style-modifier/modifiers/style';
import {modifier} from "ember-modifier";

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

  _element: HTMLElement | null = null;

  getMainNode = modifier((element: HTMLElement) => {
    this._element = element;
  });

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

  <template>
    <div
      role='dialog'
      tabindex='-1'
      aria-labelledby={{this.titleId}}
      class='modal
        {{if @fade "fade"}}
        {{if @showModal "show"}}
        {{if @inDom "d-block"}}'
      ...attributes
      {{on 'keydown' this.handleKeyDown}}
      {{on 'mousedown' this.handleMouseDown}}
      {{on 'mouseup' this.handleMouseUp}}
      {{on 'click' this.handleClick}}
      {{style
        paddingLeft=(concat @paddingLeft 'px')
        paddingRight=(concat @paddingRight 'px')
        display=(if @inDom 'block' '')
      }}
      {{this.getMainNode}}
      {{didInsert this.getOrSetTitleId}}
      {{didInsert this.setInitialFocus}}
    >
      <div
        class='modal-dialog
          {{this.sizeClass}}
          {{if @centered "modal-dialog-centered"}}
          {{if @scrollable "modal-dialog-scrollable"}}
          {{if
            (macroCondition (macroGetOwnConfig "isBS5"))
            (if
              @fullscreen
              (if
                (bsEq @fullscreen true)
                "modal-fullscreen"
                (concat "modal-fullscreen-" @fullscreen "-down")
              )
            )
          }}
          '
        role='document'
      >
        <div
          class='modal-content'
          tabindex='-1'
          {{focusTrap
            shouldSelfFocus=true
            focusTrapOptions=(hash
              clickOutsideDeactivates=@backdropClose
              fallbackFocus='.modal'
              escapeDeactivates=@keyboard
            )
          }}
        >
          {{yield}}
        </div>
      </div>
    </div>
  </template>
}
