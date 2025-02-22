import { action } from '@ember/object';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { next, schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import transitionEnd from '../utils/transition-end';
import { getDestinationElement } from '../utils/dom';
import usesTransition from '../utils/decorators/uses-transition';
import isFastBoot from '../utils/is-fastboot';
import arg from '../utils/decorators/arg';
import { cached, tracked } from '@glimmer/tracking';
import { ref } from 'ember-ref-bucket';
import ModalHeader, { type HeaderSignature } from './bs-modal/header';
import ModalDialog, {
  type DialogSignature,
  type ModalFullscreen,
  type ModalSize,
} from './bs-modal/dialog';
import ModalBody, { type BodySignature } from './bs-modal/body';
import ModalFooter, { type FooterSignature } from './bs-modal/footer';
import type { ComponentLike } from '@glint/template';

function nextRunloop() {
  return new Promise((resolve) => next(resolve, undefined));
}

function afterRender() {
  return new Promise((resolve) => schedule('afterRender', resolve, undefined));
}

export type ModalPosition = 'top' | 'center' | null;

interface Signature {
  Args: {
    backdrop?: boolean;
    backdropClose?: boolean;
    backdropTransitionDuration?: number;
    fade?: boolean;
    fullscreen?: ModalFullscreen;
    keyboard?: boolean;
    onHide?: () => boolean;
    onHidden?: () => void;
    open?: boolean;
    onShow?: () => void;
    onShown?: () => void;
    onSubmit?: () => void;
    position?: ModalPosition;
    renderInPlace?: boolean;
    scrollable?: boolean;
    size?: ModalSize;
    transitionDuration?: number;

    dialogComponent?: ComponentLike<DialogSignature>;
    headerComponent?: ComponentLike<HeaderSignature>;
    bodyComponent?: ComponentLike<BodySignature>;
    footerComponent?: ComponentLike<FooterSignature>;
  };
  Blocks: {
    default: [
      {
        header: ComponentLike<HeaderSignature>;
        body: ComponentLike<BodySignature>;
        footer: ComponentLike<FooterSignature>;
        close: () => void;
        submit: () => void;
      },
    ];
  };
  Element: HTMLElement;
}

/**
  Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with custom markup.

  ### Usage

  ```hbs
  <BsModal @onSubmit={{this.submit}} as |modal|>
    <modal.header>
      <h4 class="modal-title"><i class="glyphicon glyphicon-alert"></i> Alert</h4>
    </modal.header>
    <modal.body>
      Are you absolutely sure you want to do that???
    </modal.body>
    <modal.footer as |footer|>
      <BsButton @onClick={{modal.close}} @type="danger">Oh no, forget it!</BsButton>
      <BsButton @onClick={{modal.submit}} @type="success">Yeah!</BsButton>
    </modal.footer>
  </BsModal>
  ```

  The component yields references to the following contextual components, that you can use to further customize the output:

  * [modal.body](Components.ModalBody.html)
  * [modal.header](Components.ModalHeader.html)
  * [modal.footer](Components.ModalFooter.html)

  Furthermore references to the following actions are yielded:

  * `close`: triggers the `onHide` action and closes the modal
  * `submit`: triggers the `onSubmit` action (or the submit event on a form if present in the body element)

  ### Further reading

  See the documentation of the [bs-modal-simple](Components.ModalSimple.html) component for further examples.

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Modal
  @namespace Components
  @extends Glimmer.Component
  @public
*/
export default class Modal extends Component<Signature> {
  @service('-document') declare document: Document;

  /**
   * @property _isOpen
   * @private
   */
  _isOpen = false;

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */

  get _fade() {
    const isFB = isFastBoot(this);
    return this.args.fade === undefined ? !isFB : this.args.fade;
  }

  /**
   * Visibility of the modal. Toggle to show/hide with CSS transitions.
   *
   * When the modal is closed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onHide` action
   *
   * @property open
   * @type boolean
   * @default true
   * @public
   */
  @arg
  open = true;

  /**
   * Used to apply Bootstrap's visibility classes.
   *
   * @property showModal
   * @type boolean
   * @default false
   * @private
   */
  @tracked
  showModal = this.open && (!this._fade || isFastBoot(this));

  /**
   * Render modal markup?
   *
   * @property inDom
   * @type boolean
   * @default false
   * @private
   */
  @tracked
  inDom = this.open;

  /**
   * @property paddingLeft
   * @type number|undefined
   * @private
   */
  @tracked
  paddingLeft?: number;

  /**
   * @property paddingRight
   * @type number|undefined
   * @private
   */
  @tracked
  paddingRight?: number;

  /**
   * Use a semi-transparent modal background to hide the rest of the page.
   *
   * @property backdrop
   * @type boolean
   * @default true
   * @public
   */
  @arg
  backdrop = true;

  /**
   * @property shouldShowBackdrop
   * @type boolean
   * @private
   */
  @tracked
  shouldShowBackdrop = this.open && this.backdrop;

  /**
   * Closes the modal when escape key is pressed.
   *
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */
  @arg
  keyboard = true;

  /**
   * [BS4 only!] Vertical position, either 'top' (default) or 'center'
   * 'center' will apply the `modal-dialog-centered` class
   *
   * @property position
   * @type {string}
   * @default 'top'
   * @public
   */
  @arg
  position = 'top';

  /**
   * [BS4 only!] Allows scrolling within the modal body
   * 'true' will apply the `modal-dialog-scrollable` class
   *
   * @property scrollable
   * @type boolean
   * @default false
   * @public
   */
  @arg
  scrollable = false;

  /**
   *  [BS5 only!] Allows adding fullscreen mode for modals. It will
   *  apply the `modal-fullscreen` class when using `true` and
   *  `modal-fullscreen-[x]-down` class when using BS breakpoints
   *   ([x] = `sm`, `md`, `lg`, `xl`, `xxl`).
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/5.1/components/modal/#fullscreen-modal)
   *
   * @property fullscreen
   * @type {(Boolean|String)}
   * @default false
   * @public
   */

  /**
   * @property dialogComponent
   * @type {String}
   * @private
   */

  /**
   * @property headerComponent
   * @type {String}
   * @private
   */

  /**
   * @property bodyComponent
   * @type {String}
   * @private
   */

  /**
   * @property footerComponent
   * @type {String}
   * @private
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
  @arg
  backdropClose = true;

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */
  @arg
  renderInPlace = false;

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  get _renderInPlace() {
    return this.renderInPlace || !this.destinationElement;
  }

  /**
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 300
   * @public
   */
  @arg
  transitionDuration = 300;

  /**
   * The duration of the backdrop fade transition
   *
   * @property backdropTransitionDuration
   * @type number
   * @default 150
   * @public
   */
  @arg
  backdropTransitionDuration = 150;

  /**
   * Use CSS transitions?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  @usesTransition('_fade')
  declare usesTransition: boolean;

  destinationElement = getDestinationElement(this);

  /**
   * The DOM element of the `.modal` element.
   *
   * @property modalElement
   * @type HTMLElement
   * @readonly
   * @private
   */
  @ref('modalElement') declare modalElement: HTMLElement;

  /**
   * The DOM element of the backdrop element.
   *
   * @property backdropElement
   * @type HTMLElement
   * @readonly
   * @private
   */
  @ref('backdropElement') declare backdropElement: HTMLElement;

  /**
   * @type boolean
   * @readonly
   * @private
   */
  isFastBoot = isFastBoot(this);

  /**
   * The action to be sent when the modal footer's submit button (if present) is pressed.
   * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html)) this action will
   * not be triggered. Instead, a submit event will be triggered on the form itself. See the class description for an
   * example.
   *
   * @property onSubmit
   * @type function
   * @public
   */

  /**
   * The action to be sent when the modal is closing.
   * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
   * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
   * time to finish. Use the `onHidden` if you need the modal to be hidden when the action triggers.
   *
   * You can return false to prevent closing the modal automatically, and do that in your action by
   * setting `open` to false.
   *
   * @property onHide
   * @type function
   * @public
   */

  /**
   * The action to be sent after the modal has been completely hidden (including the CSS transition).
   *
   * @property onHidden
   * @type function
   * @default null
   * @public
   */

  /**
   * The action to be sent when the modal is opening.
   * This will be triggered immediately after the modal is shown (so it's safe to access the DOM for
   * size calculations and the like). This means that if fade=true, it will be shown in between the
   * backdrop animation and the fade animation.
   *
   * @property onShow
   * @type function
   * @default null
   * @public
   */

  /**
   * The action to be sent after the modal has been completely shown (including the CSS transition).
   *
   * @property onShown
   * @type function
   * @public
   */

  /**
   * @private
   */
  bodyIsOverflowing = false;
  /**
   * @private
   */
  _originalBodyPad: string = '';

  @action
  close() {
    if (this.args.onHide?.() !== false) {
      this.hide();
    }
  }

  @action
  doSubmit() {
    const forms = this.modalElement.querySelectorAll('.modal-body form');
    if (forms.length > 0) {
      // trigger submit event on body forms
      const event = document.createEvent('Events');
      event.initEvent('submit', true, true);
      Array.prototype.slice
        .call(forms)
        .forEach((form) => form.dispatchEvent(event));
    } else {
      // if we have no form, we send a submit action
      this.args.onSubmit?.();
    }
  }

  /**
   * Show the modal
   *
   * @method show
   * @private
   */
  async show() {
    if (this._isOpen) {
      return;
    }
    this._isOpen = true;

    this.addBodyClass();

    this.inDom = true;

    await this.showBackdrop();

    if (this.isDestroyed) {
      return;
    }

    if (!isFastBoot(this)) {
      this.checkScrollbar();
      this.setScrollbar();
    }

    await afterRender();

    const { modalElement } = this;
    if (!modalElement) {
      return;
    }

    if (!isFastBoot(this)) {
      modalElement.scrollTop = 0;
      this.adjustDialog();
    }

    this.showModal = true;
    this.args.onShow?.();

    if (this.usesTransition) {
      await transitionEnd(modalElement, this.transitionDuration);
    }

    this.args.onShown?.();
  }

  /**
   * Hide the modal
   *
   * @method hide
   * @private
   */
  async hide() {
    if (!this._isOpen) {
      return;
    }
    this._isOpen = false;

    this.showModal = false;

    if (this.usesTransition) {
      await transitionEnd(this.modalElement, this.transitionDuration);
    }

    await this.hideModal();
  }

  /**
   * Clean up after modal is hidden and call onHidden
   *
   * @method hideModal
   * @private
   */
  async hideModal() {
    if (this.isDestroyed) {
      return;
    }

    await this.hideBackdrop();

    this.removeBodyClass();

    if (!isFastBoot(this)) {
      this.resetAdjustments();
      this.resetScrollbar();
    }

    this.inDom = false;
    this.args.onHidden?.();
  }

  /**
   * Show the backdrop
   *
   * @method showBackdrop
   * @async
   * @private
   */
  async showBackdrop() {
    if (!this.backdrop || !this.usesTransition) {
      return;
    }

    this.shouldShowBackdrop = true;

    await nextRunloop();

    const { backdropElement } = this;
    assert('Backdrop element should be in DOM', backdropElement);

    await transitionEnd(backdropElement, this.backdropTransitionDuration);
  }

  /**
   * Hide the backdrop
   *
   * @method hideBackdrop
   * @async
   * @private
   */
  async hideBackdrop() {
    if (!this.backdrop) {
      return;
    }

    if (this.usesTransition) {
      const { backdropElement } = this;
      assert('Backdrop element should be in DOM', backdropElement);

      await transitionEnd(backdropElement, this.backdropTransitionDuration);
    }

    if (this.isDestroyed) {
      return;
    }

    this.shouldShowBackdrop = false;
  }

  /**
   * @method adjustDialog
   * @private
   */
  @action
  adjustDialog() {
    const modalIsOverflowing =
      this.modalElement.scrollHeight > document.documentElement.clientHeight;
    this.paddingLeft =
      !this.bodyIsOverflowing && modalIsOverflowing
        ? this.scrollbarWidth
        : undefined;
    this.paddingRight =
      this.bodyIsOverflowing && !modalIsOverflowing
        ? this.scrollbarWidth
        : undefined;
  }

  /**
   * @method resetAdjustments
   * @private
   */
  resetAdjustments() {
    this.paddingLeft = undefined;
    this.paddingRight = undefined;
  }

  /**
   * @method checkScrollbar
   * @private
   */
  checkScrollbar() {
    const fullWindowWidth = window.innerWidth;
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
  }

  /**
   * @method setScrollbar
   * @private
   */
  setScrollbar() {
    const bodyPad = parseInt(document.body.style.paddingRight || '0', 10);
    this._originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) {
      document.body.style.paddingRight = `${bodyPad + this.scrollbarWidth}`;
    }
  }

  /**
   * @method resetScrollbar
   * @private
   */
  resetScrollbar() {
    document.body.style.paddingRight = this._originalBodyPad;
  }

  addBodyClass() {
    // special handling for FastBoot, where real `document` is not available
    if (isFastBoot(this)) {
      // a SimpleDOM instance with just a subset of the DOM API!
      const document = this.document;

      const existingClasses = document.body.getAttribute('class') || '';
      if (!existingClasses.includes('modal-open')) {
        document.body.setAttribute('class', `modal-open ${existingClasses}`);
      }
    } else {
      document.body.classList.add('modal-open');
    }
  }

  removeBodyClass() {
    if (isFastBoot(this)) {
      // no need for FastBoot support here
      return;
    }

    document.body.classList.remove('modal-open');
  }

  /**
   * @property scrollbarWidth
   * @type number
   * @readonly
   * @private
   */
  @cached
  get scrollbarWidth() {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    const modalEl = this.modalElement;
    if (!modalEl.parentNode || !scrollDiv.parentNode) {
      return 0;
    }
    modalEl.parentNode.insertBefore(scrollDiv, modalEl.nextSibling);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollDiv.parentNode.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  get dialogComponent() {
    return this.args.dialogComponent ?? ModalDialog;
  }

  get headerComponent() {
    return this.args.headerComponent ?? ModalHeader;
  }

  get footerComponent() {
    return this.args.footerComponent ?? ModalFooter;
  }

  get bodyComponent() {
    return this.args.bodyComponent ?? ModalBody;
  }

  willDestroy(...rest: Parameters<Component['willDestroy']>) {
    super.willDestroy(...rest);

    this.removeBodyClass();

    if (!isFastBoot(this)) {
      this.resetScrollbar();
    }
  }

  @action
  handleVisibilityChanges() {
    if (this.open) {
      this.show();
    } else {
      this.hide();
    }
  }
}
