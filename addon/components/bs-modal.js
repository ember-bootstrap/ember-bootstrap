import Ember from 'ember';
import layout from '../templates/components/bs-modal';

const { computed, observer } = Ember;

const Modal = {};

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

/**

 Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with custom markup:

 ```hbs
 {{#bs-modal onSubmit=(action "submit") as |modal|}}
   {{#modal.header}}
     <h4 class="modal-title"><i class="glyphicon glyphicon-alert"></i> Alert</h4>
   {{/modal.header}}
   {{#modal.body}}Are you absolutely sure you want to do that???{{/modal.body}}
   {{#modal.footer as |footer|}}
     {{#bs-button action=(action modal.close) type="danger"}}Oh no, forget it!{{/bs-button}}
     {{#bs-button action=(action modal.submit) type="success"}}Yeah!{{/bs-button}}
   {{/modal.footer}}
 {{/bs-modal}}
 ```

 The component yields references to the following contextual components, that you can use to further customize the output:

 * [modal.body](Components.ModalBody.html)
 * [modal.header](Components.ModalHeader.html)
 * [modal.footer](Components.ModalFooter.html)

 Furthermore references to the following actions are yielded:

 * `close`: triggers the `onHide` action and closes the modal (if `autoClose` is true)
 * `submit`: triggers the `onSubmit` action (or the submit event on a form if present in the body element)

 ### Further reading

 See the documentation of the [bs-modal-simple](Components.ModalSimple.html) component for further examples.

 @class Modal
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({
  layout,

  /**
   * Visibility of the modal. Toggle to to show/hide with CSS transitions.
   *
   * @property open
   * @type boolean
   * @default true
   * @public
   */
  open: true,

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
   * @property notFade
   * @type boolean
   * @private
   */
  notFade: computed.not('fade'),

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
   * Use a semi-transparent modal background to hide the rest of the page.
   *
   * @property backdrop
   * @type boolean
   * @default true
   * @public
   */
  backdrop: true,

  /**
   * @property showBackdrop
   * @type boolean
   * @default false
   * @private
   */
  showBackdrop: false,

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
   * If true clicking a close button will hide the modal automatically.
   * If you want to handle hiding the modal by yourself, you can set this to false and use the closeAction to
   * implement your custom logic.
   *
   * @property autoClose
   * @type boolean
   * @default true
   * @public
   */
  autoClose: true,

  /**
   * The id of the `.modal` element.
   *
   * @property modalId
   * @type string
   * @readonly
   * @private
   */
  modalId: computed('elementId', function() {
    return `${this.get('elementId')}-modal`;
  }),

  /**
   * The jQuery object of the `.modal` element.
   *
   * @property modalElement
   * @type object
   * @readonly
   * @private
   */
  modalElement: computed('modalId', function() {
    return Ember.$(`#${this.get('modalId')}`);
  }).volatile(),

  /**
   * The id of the backdrop element.
   *
   * @property backdropId
   * @type string
   * @readonly
   * @private
   */
  backdropId: computed('elementId', function() {
    return `${this.get('elementId')}-backdrop`;
  }),

  /**
   * The jQuery object of the backdrop element.
   *
   * @property backdropElement
   * @type object
   * @readonly
   * @private
   */
  backdropElement: computed('backdropId', function() {
    return Ember.$(`#${this.get('backdropId')}`);
  }).volatile(),

  /**
   * Use CSS transitions when showing/hiding the modal?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  usesTransition: computed('fade', function() {
    return Ember.$.support.transition && this.get('fade');
  }),

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
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */
  renderInPlace: false,

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  _renderInPlace: computed('renderInPlace', function() {
    return this.get('renderInPlace') || typeof Ember.$ !== 'function' || Ember.$('#ember-bootstrap-modal-container').length === 0;
  }),

  /**
   * The action to be sent when the modal footer's submit button (if present) is pressed.
   * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html){{/crossLink}}) this action will
   * not be triggered. Instead a submit event will be triggered on the form itself. See the class description for an
   * example.
   *
   * @property onSubmit
   * @type string
   * @default null
   * @public
   */
  onSubmit: null,

  /**
   * The action to be sent when the modal is closing.
   * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
   * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
   * time to finish. Use the `closedAction` if you need the modal to be hidden when the action triggers.
   *
   * You can set `autoClose` to false to prevent closing the modal automatically, and do that in your closeAction by
   * setting `open` to false.
   *
   * @property onHide
   * @type string
   * @default null
   * @public
   */
  onHide: null,

  /**
   * The action to be sent after the modal has been completely hidden (including the CSS transition).
   *
   * @property onHidden
   * @type string
   * @default null
   * @public
   */
  onHidden: null,

  /**
   * The action to be sent when the modal is opening.
   * This will be triggered immediately after the modal is shown (so it's safe to access the DOM for
   * size calculations and the like). This means that if fade=true, it will be shown in between the
   * backdrop animation and the fade animation.
   *
   * @property onShow
   * @type string
   * @default null
   * @public
   */
  onShow: null,

  /**
   * The action to be sent after the modal has been completely shown (including the CSS transition).
   *
   * @property onShown
   * @type string
   * @default null
   * @public
   */
  onShown: null,

  actions: {
    close() {
      if (this.get('autoClose')) {
        this.set('open', false);
      }
      this.sendAction('onHide');
    },
    submit() {
      let form = this.get('modalElement').find('.modal-body form');
      if (form.length > 0) {
        // trigger submit event on body form
        form.trigger('submit');
      } else {
        // if we have no form, we send a submit action
        this.sendAction('onSubmit');
      }
    }
  },

  /**
   * Give the modal (or its autofocus element) focus
   *
   * @method takeFocus
   * @private
   */
  takeFocus() {
    let focusElement = this.get('modalElement').find('[autofocus]').first();
    if (focusElement.length === 0) {
      focusElement = this.get('modalElement');
    }
    if (focusElement.length > 0) {
      focusElement.focus();
    }
  },

  /**
   * Show the modal
   *
   * @method show
   * @private
   */
  show() {

    this.checkScrollbar();
    this.setScrollbar();

    Ember.$('body').addClass('modal-open');

    this.resize();

    let callback = function() {
      if (this.get('isDestroyed')) {
        return;
      }

      this.get('modalElement')
        .show()
        .scrollTop(0);

      this.handleUpdate();
      this.set('in', true);
      this.sendAction('onShow');

      if (this.get('usesTransition')) {
        this.get('modalElement')
          .one('bsTransitionEnd', Ember.run.bind(this, function() {
            this.takeFocus();
            this.sendAction('onShown');
          }))
          .emulateTransitionEnd(Modal.TRANSITION_DURATION);
      } else {
        this.takeFocus();
        this.sendAction('onShown');
      }
    };
    this.handleBackdrop(callback);
  },

  /**
   * Hide the modal
   *
   * @method hide
   * @private
   */
  hide() {
    this.resize();
    this.set('in', false);

    if (this.get('usesTransition')) {
      this.get('modalElement')
        .one('bsTransitionEnd', Ember.run.bind(this, this.hideModal))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION);
    } else {
      this.hideModal();
    }
  },

  /**
   * Clean up after modal is hidden and call closedAction
   *
   * @method hideModal
   * @private
   */
  hideModal() {
    if (this.get('isDestroyed')) {
      return;
    }

    this.get('modalElement').hide();
    this.handleBackdrop(() => {
      Ember.$('body').removeClass('modal-open');
      this.resetAdjustments();
      this.resetScrollbar();
      this.sendAction('onHidden');
    });
  },

  /**
   * SHow/hide the backdrop
   *
   * @method handleBackdrop
   * @param callback
   * @private
   */
  handleBackdrop(callback) {
    let doAnimate = this.get('usesTransition');

    if (this.get('open') && this.get('backdrop')) {
      this.set('showBackdrop', true);

      if (!callback) {
        return;
      }

      if (doAnimate) {
        Ember.run.schedule('afterRender', this, function() {
          let $backdrop = this.get('backdropElement');
          Ember.assert('Backdrop element should be in DOM', $backdrop && $backdrop.length > 0);
          $backdrop
            .one('bsTransitionEnd', Ember.run.bind(this, callback))
            .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
        });
      } else {
        callback.call(this);
      }
    } else if (!this.get('open') && this.get('backdrop')) {
      let $backdrop = this.get('backdropElement');
      Ember.assert('Backdrop element should be in DOM', $backdrop && $backdrop.length > 0);

      let callbackRemove = function() {
        this.set('showBackdrop', false);
        if (callback) {
          callback.call(this);
        }
      };
      if (doAnimate) {
        $backdrop
          .one('bsTransitionEnd', Ember.run.bind(this, callbackRemove))
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove.call(this);
      }
    } else if (callback) {
      Ember.run.next(this, callback);
    }
  },

  /**
   * Attach/Detach resize event listeners
   *
   * @method resize
   * @private
   */
  resize() {
    if (this.get('open')) {
      Ember.$(window).on('resize.bs.modal', Ember.run.bind(this, this.handleUpdate));
    } else {
      Ember.$(window).off('resize.bs.modal');
    }
  },

  /**
   * @method handleUpdate
   * @private
   */
  handleUpdate() {
    this.adjustDialog();
  },

  /**
   * @method adjustDialog
   * @private
   */
  adjustDialog() {
    let modalIsOverflowing = this.get('modalElement')[0].scrollHeight > document.documentElement.clientHeight;
    this.get('modalElement').css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.get('scrollbarWidth') : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.get('scrollbarWidth') : ''
    });
  },

  /**
   * @method resetAdjustments
   * @private
   */
  resetAdjustments() {
    this.get('modalElement').css({
      paddingLeft: '',
      paddingRight: ''
    });
  },

  /**
   * @method checkScrollbar
   * @private
   */
  checkScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      let documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
  },

  /**
   * @method setScrollbar
   * @private
   */
  setScrollbar() {
    let bodyPad = parseInt((Ember.$('body').css('padding-right') || 0), 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) {
      Ember.$('body').css('padding-right', bodyPad + this.get('scrollbarWidth'));
    }
  },

  /**
   * @method resetScrollbar
   * @private
   */
  resetScrollbar() {
    Ember.$('body').css('padding-right', this.originalBodyPad);
  },

  /**
   * @property scrollbarWidth
   * @type number
   * @readonly
   * @private
   */
  scrollbarWidth: computed(function() {
    let scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.get('modalElement').after(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    Ember.$(scrollDiv).remove();
    return scrollbarWidth;
  }),

  didInsertElement() {
    this._super(...arguments);
    if (this.get('open')) {
      this.show();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    Ember.$(window).off('resize.bs.modal');
    Ember.$('body').removeClass('modal-open');
    this.resetScrollbar();
  },

  _observeOpen: observer('open', function() {
    if (this.get('open')) {
      this.show();
    } else {
      this.hide();
    }
  }),

  init() {
    this._super(...arguments);
    let { open, backdrop, fade } = this.getProperties('open', 'backdrop', 'fade');
    this.set('in', open && !fade);
    this.set('showBackdrop', open && backdrop);
  }
});
