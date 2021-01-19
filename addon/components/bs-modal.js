import { action, computed } from '@ember/object';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { next, schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import { guidFor } from '@ember/object/internals';
import usesTransition from 'ember-bootstrap/utils/decorators/uses-transition';
import isFastBoot from 'ember-bootstrap/utils/is-fastboot';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import arg from '../utils/decorators/arg';
import { tracked } from '@glimmer/tracking';

/**
  Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with custom markup.

  ### Usage

  ```hbs
  <BsModal @onSubmit={{action "submit"}} as |Modal|>
    <Modal.header>
      <h4 class="modal-title"><i class="glyphicon glyphicon-alert"></i> Alert</h4>
    </Modal.header>
    <Modal.body>
      Are you absolutely sure you want to do that???
    </Modal.body>
    <Modal.footer as |footer|>
      <BsButton @onClick={{action Modal.close}} @type="danger">Oh no, forget it!</BsButton>
      <BsButton @onClick={{action Modal.submit}} @type="success">Yeah!</BsButton>
    </Modal.footer>
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
@deprecateSubclassing
export default class Modal extends Component {
  @service('-document')
  document;

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */

  get _fade() {
    let isFB = isFastBoot(this);
    return this.args.fade === undefined ? !isFB : this.args.fade;
  }

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
   * @property paddingLeft
   * @type number|undefined
   * @private
   */
  @tracked
  paddingLeft;

  /**
   * @property paddingRight
   * @type number|undefined
   * @private
   */
  @tracked
  paddingRight;

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
   * @property showBackdrop
   * @type boolean
   * @private
   */
  @tracked
  showBackdrop = false;

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
   * Current state of the modal.
   *
   * Possible values:
   * - 'opening'
   * - 'open'
   * - 'closing'
   * - 'closed'
   *
   * @property state
   * @private
   */
  @tracked state = 'closed';

  get isOpen() {
    return this.state === 'open';
  }

  get isOpening() {
    return this.state === 'opening';
  }

  get isClosing() {
    return this.state === 'closing';
  }

  get isClosed() {
    return this.state === 'closed';
  }

  get isVisible() {
    return !this.isClosed;
  }

  /**
   * The id of the `.modal` element.
   *
   * @property modalId
   * @type string
   * @readonly
   * @private
   */
  get modalId() {
    return `${guidFor(this)}-modal`;
  }

  /**
   * The id of the backdrop element.
   *
   * @property backdropId
   * @type string
   * @readonly
   * @private
   */
  get backdropId() {
    return `${guidFor(this)}-backdrop`;
  }

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
  usesTransition;

  destinationElement = getDestinationElement(this);

  /**
   * The DOM element of the `.modal` element.
   *
   * @property modalElement
   * @type object
   * @readonly
   * @private
   */
  get modalElement() {
    return document.getElementById(this.modalId);
  }

  /**
   * The DOM element of the backdrop element.
   *
   * @property backdropElement
   * @type object
   * @readonly
   * @private
   */
  get backdropElement() {
    return document.getElementById(this.backdropId);
  }

  /**
   * The action to be sent when the modal footer's submit button (if present) is pressed.
   * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html)) this action will
   * not be triggered. Instead a submit event will be triggered on the form itself. See the class description for an
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

  @action
  close() {
    if (this.args.onHide?.() !== false) {
      this.hide();
    }
  }

  @action
  doSubmit() {
    // replace modalId by :scope selector if supported by all target browsers
    let modalId = this.modalId;
    let forms = this.modalElement.querySelectorAll(`#${modalId} .modal-body form`);
    if (forms.length > 0) {
      // trigger submit event on body forms
      let event = document.createEvent('Events');
      event.initEvent('submit', true, true);
      Array.prototype.slice.call(forms).forEach((form) => form.dispatchEvent(event));
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
  show() {
    if (this.isOpening || this.isOpen) {
      return;
    }

    this.state = 'opening';

    this.addBodyClass();
    this.resize();

    let callback = () => {
      if (this.isDestroyed) {
        return;
      }

      this.checkScrollbar();
      this.setScrollbar();

      schedule('afterRender', () => {
        let modalEl = this.modalElement;
        if (!modalEl) {
          return;
        }

        modalEl.scrollTop = 0;
        this.adjustDialog();
        this.state = 'open';
        this.args.onShow?.();

        if (this.usesTransition) {
          transitionEnd(this.modalElement, this.transitionDuration).then(() => {
            this.args.onShown?.();
          });
        } else {
          this.args.onShown?.();
        }
      });
    };
    this.handleBackdrop(callback);
  }

  /**
   * Hide the modal
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.isClosing || this.isClosed) {
      return;
    }

    this.state = 'closing';

    this.resize();

    if (this.usesTransition) {
      transitionEnd(this.modalElement, this.transitionDuration).then(() => this.hideModal());
    } else {
      this.hideModal();
    }
  }

  /**
   * Clean up after modal is hidden and call onHidden
   *
   * @method hideModal
   * @private
   */
  hideModal() {
    if (this.isDestroyed) {
      return;
    }

    this.handleBackdrop(() => {
      this.removeBodyClass();
      this.resetAdjustments();
      this.resetScrollbar();
      this.state = 'closed';
      this.args.onHidden?.();
    });
  }

  /**
   * Show/hide the backdrop
   *
   * @method handleBackdrop
   * @param callback
   * @private
   */
  handleBackdrop(callback) {
    let doAnimate = this.usesTransition;

    if (!this.isClosed && this.backdrop) {
      this.showBackdrop = true;

      if (!callback) {
        return;
      }

      next(() => {
        let backdrop = this.backdropElement;
        assert('Backdrop element should be in DOM', backdrop);
        if (doAnimate) {
          transitionEnd(backdrop, this.backdropTransitionDuration).then(callback);
        } else {
          callback();
        }
      });
    } else if (!this.open && this.backdrop) {
      let backdrop = this.backdropElement;
      assert('Backdrop element should be in DOM', backdrop);

      let callbackRemove = () => {
        if (this.isDestroyed) {
          return;
        }
        this.showBackdrop = false;
        if (callback) {
          callback.call(this);
        }
      };
      if (doAnimate) {
        transitionEnd(backdrop, this.backdropTransitionDuration).then(callbackRemove);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      next(this, callback);
    }
  }

  /**
   * Attach/Detach resize event listeners
   *
   * @method resize
   * @private
   */
  resize() {
    if (this.isOpen) {
      window.addEventListener('resize', this.adjustDialog, false);
    } else {
      window.removeEventListener('resize', this.adjustDialog, false);
    }
  }

  /**
   * @method adjustDialog
   * @private
   */
  @action
  adjustDialog() {
    let modalIsOverflowing = this.modalElement.scrollHeight > document.documentElement.clientHeight;
    this.paddingLeft = !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : undefined;
    this.paddingRight = this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : undefined;
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
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      let documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
  }

  /**
   * @method setScrollbar
   * @private
   */
  setScrollbar() {
    let bodyPad = parseInt(document.body.style.paddingRight || 0, 10);
    this._originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) {
      document.body.style.paddingRight = bodyPad + this.scrollbarWidth;
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
      let document = this.document;

      let existingClasses = document.body.getAttribute('class') || '';
      if (!existingClasses.includes('modal-open')) {
        document.body.setAttribute('class', `modal-open ${existingClasses}`);
      }
    } else {
      document.body.classList.add('modal-open');
    }
  }

  removeBodyClass() {
    // no need for FastBoot support here
    document.body.classList.remove('modal-open');
  }

  /**
   * @property scrollbarWidth
   * @type number
   * @readonly
   * @private
   */
  @computed('modalElement')
  get scrollbarWidth() {
    let scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    let modalEl = this.modalElement;
    modalEl.parentNode.insertBefore(scrollDiv, modalEl.nextSibling);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollDiv.parentNode.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (typeof FastBoot === 'undefined') {
      window.removeEventListener('resize', this.adjustDialog, false);
      this.removeBodyClass();
      this.resetScrollbar();
    }
  }

  @action
  handleVisibilityChanges() {
    if (isFastBoot(this)) {
      this.addBodyClass();
      return;
    }

    next(() => {
      if (this.args.open !== false) {
        this.show();
      } else {
        this.hide();
      }
    });
  }
}
