import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { addObserver } from '@ember/object/observers';
import { assert } from '@ember/debug';
import Component from '@ember/component';
import { bind, next, schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import listenTo from 'ember-bootstrap/utils/cp/listen-to';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import { guidFor } from '@ember/object/internals';
import usesTransition from 'ember-bootstrap/utils/cp/uses-transition';
import isFastBoot from 'ember-bootstrap/utils/is-fastboot';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

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
  @extends Ember.Component
  @public
*/
@tagName('')
@deprecateSubclassing
export default class Modal extends Component {
  @service('-document')
  document;

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
  @defaultValue
  open = true;

  /**
   * @property isOpen
   * @private
   */
  @listenTo('open')
  isOpen;

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
  @defaultValue
  fade = undefined;

  get _fade() {
    let isFB = isFastBoot(this);
    return this.fade === undefined ? !isFB : this.fade;
  }

  /**
   * Used to apply Bootstrap's visibility classes.
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
   * @private
   */
  paddingLeft;

  /**
   * @property paddingRight
   * @type number|null
   * @private
   */
  paddingRight;

  /**
   * Use a semi-transparent modal background to hide the rest of the page.
   *
   * @property backdrop
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  backdrop = true;

  /**
   * @property showBackdrop
   * @type boolean
   * @default false
   * @private
   */
  @defaultValue
  showBackdrop = false;

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
   * [BS4 only!] Vertical position, either 'top' (default) or 'center'
   * 'center' will apply the `modal-dialog-centered` class
   *
   * @property position
   * @type {string}
   * @default 'top'
   * @public
   */
  @defaultValue
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
  @defaultValue
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
   * The id of the `.modal` element.
   *
   * @property modalId
   * @type string
   * @readonly
   * @private
   */
  @computed
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
  @computed
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
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  renderInPlace = false;

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  @computed('renderInPlace', 'destinationElement')
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
  @defaultValue
  transitionDuration = 300;

  /**
   * The duration of the backdrop fade transition
   *
   * @property backdropTransitionDuration
   * @type number
   * @default 150
   * @public
   */
  @defaultValue
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
  onSubmit() {}

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
  onHide() {}

  /**
   * The action to be sent after the modal has been completely hidden (including the CSS transition).
   *
   * @property onHidden
   * @type function
   * @default null
   * @public
   */
  onHidden() {}

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
  onShow() {}

  /**
   * The action to be sent after the modal has been completely shown (including the CSS transition).
   *
   * @property onShown
   * @type function
   * @public
   */
  onShown() {}

  @action
  close() {
    if (this.onHide() !== false) {
      this.set('isOpen', false);
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
      this.onSubmit();
    }
  }

  /**
   * Show the modal
   *
   * @method show
   * @private
   */
  show() {
    if (this._isOpen) {
      return;
    }
    this._isOpen = true;

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
        this.handleUpdate();
        this.set('showModal', true);
        this.onShow();

        if (this.usesTransition) {
          transitionEnd(this.modalElement, this.transitionDuration).then(() => {
            this.onShown();
          });
        } else {
          this.onShown();
        }
      });
    };
    if (this.inDom !== true) {
      this.set('inDom', true);
    }
    this.handleBackdrop(callback);
  }

  /**
   * Hide the modal
   *
   * @method hide
   * @private
   */
  hide() {
    if (!this._isOpen) {
      return;
    }
    this._isOpen = false;

    this.resize();
    this.set('showModal', false);

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
      this.set('inDom', false);
      this.onHidden();
    });
  }

  /**
   * SHow/hide the backdrop
   *
   * @method handleBackdrop
   * @param callback
   * @private
   */
  handleBackdrop(callback) {
    let doAnimate = this.usesTransition;

    if (this.isOpen && this.backdrop) {
      this.set('showBackdrop', true);

      if (!callback) {
        return;
      }

      schedule('afterRender', this, function () {
        let backdrop = this.backdropElement;
        assert('Backdrop element should be in DOM', backdrop);
        if (doAnimate) {
          transitionEnd(backdrop, this.backdropTransitionDuration).then(callback);
        } else {
          callback();
        }
      });
    } else if (!this.isOpen && this.backdrop) {
      let backdrop = this.backdropElement;
      assert('Backdrop element should be in DOM', backdrop);

      let callbackRemove = () => {
        if (this.isDestroyed) {
          return;
        }
        this.set('showBackdrop', false);
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
      this._handleUpdate = bind(this, this.handleUpdate);
      window.addEventListener('resize', this._handleUpdate, false);
    } else {
      window.removeEventListener('resize', this._handleUpdate, false);
    }
  }

  /**
   * @method handleUpdate
   * @private
   */
  handleUpdate() {
    this.adjustDialog();
  }

  /**
   * @method adjustDialog
   * @private
   */
  adjustDialog() {
    let modalIsOverflowing = this.modalElement.scrollHeight > document.documentElement.clientHeight;
    this.setProperties({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : undefined,
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : undefined,
    });
  }

  /**
   * @method resetAdjustments
   * @private
   */
  resetAdjustments() {
    this.setProperties({
      paddingLeft: undefined,
      paddingRight: undefined,
    });
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

  didInsertElement() {
    super.didInsertElement(...arguments);
    if (this.isOpen) {
      this.show();
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    window.removeEventListener('resize', this._handleUpdate, false);
    this.removeBodyClass();
    this.resetScrollbar();
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // add `.modal-open` to <body> even in FastBoot, to allow scrolling
    if (this.isOpen) {
      // a SimpleDOM instance with just a subset of the DOM API!
      let document = this.document;

      let existingClasses = document.body.getAttribute('class') || '';
      if (!existingClasses.includes('modal-open')) {
        document.body.setAttribute('class', `modal-open ${existingClasses}`);
      }
    }
  }

  _observeOpen() {
    if (this.isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  init() {
    super.init(...arguments);
    let { isOpen, backdrop, _fade: fade } = this;
    let isFB = isFastBoot(this);
    this.setProperties({
      showModal: isOpen && (!fade || isFB),
      showBackdrop: isOpen && backdrop,
      inDom: isOpen,
      destinationElement: getDestinationElement(this),
    });

    addObserver(this, 'isOpen', null, this._observeOpen, true);
  }
}
