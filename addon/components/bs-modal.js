import Ember from 'ember';
import layout from '../templates/components/bs-modal';
import TransitionSupport from 'ember-bootstrap/mixins/transition-support';
import listenTo from '../utils/listen-to-cp';

const {
  computed,
  observer
} = Ember;

/**

 Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with custom markup:

 ```hbs
 {{#bs-modal onSubmit=(action "submit") as |modal|}}
   {{#modal.header}}
     <h4 class="modal-title"><i class="glyphicon glyphicon-alert"></i> Alert</h4>
   {{/modal.header}}
   {{#modal.body}}Are you absolutely sure you want to do that???{{/modal.body}}
   {{#modal.footer as |footer|}}
     {{#bs-button onClick=(action modal.close) type="danger"}}Oh no, forget it!{{/bs-button}}
     {{#bs-button onClick=(action modal.submit) type="success"}}Yeah!{{/bs-button}}
   {{/modal.footer}}
 {{/bs-modal}}
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

 @class Modal
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend(TransitionSupport, {
  layout,

  /**
   * Visibility of the modal. Toggle to to show/hide with CSS transitions.
   *
   * When the modal is closed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onHide` action
   *
   * @property open
   * @type boolean
   * @default true
   * @public
   */
  open: true,

  /**
   * @property isOpen
   * @private
   */
  isOpen: listenTo('open'),

  /**
   * @property _isOpen
   * @private
   */
  _isOpen: false,

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
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 300
   * @public
   */
  transitionDuration: 300,

  /**
   * The duration of the backdrop fade transition
   *
   * @property backdropTransitionDuration
   * @type number
   * @default 150
   * @public
   */
  backdropTransitionDuration: 150,

  /**
   * The action to be sent when the modal footer's submit button (if present) is pressed.
   * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html){{/crossLink}}) this action will
   * not be triggered. Instead a submit event will be triggered on the form itself. See the class description for an
   * example.
   *
   * @property onSubmit
   * @type function
   * @public
   */
  onSubmit() {},

  /**
   * The action to be sent when the modal is closing.
   * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
   * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
   * time to finish. Use the `closedAction` if you need the modal to be hidden when the action triggers.
   *
   * You can return false to prevent closing the modal automatically, and do that in your action by
   * setting `open` to false.
   *
   * @property onHide
   * @type function
   * @public
   */
  onHide() {},

  /**
   * The action to be sent after the modal has been completely hidden (including the CSS transition).
   *
   * @property onHidden
   * @type function
   * @default null
   * @public
   */
  onHidden() {},

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
  onShow() {},

  /**
   * The action to be sent after the modal has been completely shown (including the CSS transition).
   *
   * @property onShown
   * @type function
   * @public
   */
  onShown() {},

  actions: {
    close() {
      if (this.get('onHide')() !== false) {
        this.set('isOpen', false);
      }
    },
    submit() {
      let form = this.get('modalElement').find('.modal-body form');
      if (form.length > 0) {
        // trigger submit event on body form
        form.trigger('submit');
      } else {
        // if we have no form, we send a submit action
        this.get('onSubmit')();
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
    if (this._isOpen) {
      return;
    }
    this._isOpen = true;

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
      this.get('onShow')();

      if (this.get('usesTransition')) {
        this.get('modalElement')
          .one('bsTransitionEnd', Ember.run.bind(this, function() {
            this.takeFocus();
            this.get('onShown')();
          }))
          .emulateTransitionEnd(this.get('transitionDuration'));
      } else {
        this.takeFocus();
        this.get('onShown')();
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
    if (!this._isOpen) {
      return;
    }
    this._isOpen = false;

    this.resize();
    this.set('in', false);

    if (this.get('usesTransition')) {
      this.get('modalElement')
        .one('bsTransitionEnd', Ember.run.bind(this, this.hideModal))
        .emulateTransitionEnd(this.get('transitionDuration'));
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
      this.get('onHidden')();
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

    if (this.get('isOpen') && this.get('backdrop')) {
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
            .emulateTransitionEnd(this.get('backdropTransitionDuration'));
        });
      } else {
        callback.call(this);
      }
    } else if (!this.get('isOpen') && this.get('backdrop')) {
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
          .emulateTransitionEnd(this.get('backdropTransitionDuration'));
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
    if (this.get('isOpen')) {
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
    if (this.get('isOpen')) {
      this.show();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    Ember.$(window).off('resize.bs.modal');
    Ember.$('body').removeClass('modal-open');
    this.resetScrollbar();
  },

  _observeOpen: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this.show();
    } else {
      this.hide();
    }
  }),

  init() {
    this._super(...arguments);
    let { isOpen, backdrop, fade } = this.getProperties('isOpen', 'backdrop', 'fade');
    this.set('in', isOpen && !fade);
    this.set('showBackdrop', isOpen && backdrop);
  }
});
