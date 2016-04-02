import Ember from 'ember';

const { computed, observer } = Ember;

const Modal = {};

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

const observeOpen = function() {
  if (this.get('open')) {
    this.show();
  } else {
    this.hide();
  }
};

/**

 Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals). Creating a simple modal is easy:

 ```hbs
 {{#bs-modal title="Simple Dialog"}}
   Hello world!
 {{/bs-modal}}
 ```

 This will automatically create the appropriate markup, with a modal header containing the title, and a footer containing
 a default "Ok" button, that will close the modal automatically (unless you set `autoClose` to false).

 A modal created this way will be visible at once. You can use the `{{#if ...}}` helper to hide all modal elements form
 the DOM until needed. Or you can bind the `open` property to trigger showing and hiding the modal:

 ```hbs
 {{#bs-modal open=openModal title="Simple Dialog"}}
   Hello world!
 {{/bs-modal}}
 ```

 ### Custom Markup

 To customize your modal markup you can use the following sub components:

 [Components.ModalBody](Components.ModalBody.html)
 [Components.ModalHeader](Components.ModalHeader.html)
 [Components.ModalFooter](Components.ModalFooter.html)

 In the example above, these are generated for you automatically. Whenever you use one of these by yourself you should
 set the appropriate property (`body`, `footer`, `header`) to false to prevent their automatic generation. Note that
 in any case where you use a custom sub component, you must also use a custom [Components.ModalBody](Components.ModalBody.html)!

 A common use case is to customize the buttons in the footer. Most often you will have a cancel button that closes the
 model without action, and a submit button that triggers some action. The footer component supports this case by letting
 you customize the button titles, the rest (triggering close or submit actions) automatically set up:

 ```hbs
 {{#bs-modal body=false footer=false title="Attention" submitAction=(action "submit")}}
   {{#bs-modal-body}}Are you sure?{{/bs-modal-body}}
   {{bs-modal-footer closeTitle="Cancel" submitTitle="Ok"}}
 {{/bs-modal}}
 ```

 If you further want to customize your modal elements, you can supply custom templates for your footer and header, as in
 the following example:

 ```hbs
 {{#bs-modal body=false footer=false header=false submitAction=(action "submit")}}
   {{#bs-modal-header}}
     <h4 class="modal-title"><i class="glyphicon glyphicon-alert"></i> Alert</h4>
   {{/bs-modal-header}}
   {{#bs-modal-body}}Are you absolutely sure you want to do that???{{/bs-modal-body}}
   {{#bs-modal-footer as |footer|}}
     {{#bs-button action=(action "close" target=footer) type="danger"}}Oh no, forget it!{{/bs-button}}
     {{#bs-button buttonType="submit" type="success"}}Yeah!{{/bs-button}}
   {{/bs-modal-footer}}
 {{/bs-modal}}
 ```

 Note the use of the action helper of the close button that triggers the close action on the modal footer component
 instead of on the controller, which will bubble up to the modal component and close the modal.

 ### Modals with forms

 There is a special case when you have a form inside your modals body: you probably do not want to have a submit button
 within your form but instead in your modal footer. Hover pressing the submit button outside of your form would not
 trigger the form data to be submitted. In the example below this would not trigger the submit action of the form, an
 thus bypass the form validation feature of the form component.

 ```hbs
 {{#bs-modal title="Form Example" body=false footer=false}}
   {{#bs-modal-body}}
     {{#bs-form action=(action "submit") model=this}}
       {{bs-form-element controlType="text" label="first name" property="firstname"}}
       {{bs-form-element controlType="text" label="last name" property="lastname"}}
     {{/bs-form}}
   {{/bs-modal-body}}
   {{bs-modal-footer closeTitle=(t "contact.label.cancel") submitTitle=(t "contact.label.ok")}}
 {{/bs-modal}}
 ```

 The modal component supports this common case by triggering the submit event programmatically on the body's form if
 present whenever the footer's submit button is pressed, so the example above will work as expected.

 ### Auto-focus

 In order to allow key handling to function, the modal's root element is given focus once the modal is shown. If your
 modal contains an element such as a text input and you would like it to be given focus rather than the modal element,
 then give it the HTML5 autofocus attribute:

 ```hbs
 {{#bs-modal title="Form Example" body=false footer=false}}
   {{#bs-modal-body}}
     {{#bs-form action=(action "submit") model=this}}
       {{bs-form-element controlType="text" label="first name" property="firstname" autofocus=true}}
       {{bs-form-element controlType="text" label="last name" property="lastname"}}
     {{/bs-form}}
   {{/bs-modal-body}}
   {{bs-modal-footer closeTitle=(t "contact.label.cancel") submitTitle=(t "contact.label.ok")}}
 {{/bs-modal}}
 ```


 ### Modals inside wormhole

 Modals make use of the [ember-wormhole](https://github.com/yapplabs/ember-wormhole) addon, which will be installed
 automatically alongside ember-bootstrap. This is used to allow the modal to be placed in deeply nested
 components/templates where it belongs to logically, but to have the actual DOM elements within a special container
 element, which is a child of ember's root element. This will make sure that modals always overlay the whole app, and
 are not effected by parent elements with `overflow: hidden` for example.

 If you want the modal to render in place, rather than being wormholed, you can set renderInPlace=true.

 @class Modal
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({

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
   * The title of the modal, visible in the modal header. Is ignored if `header` is false.
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * Display a close button (x icon) in the corner of the modal header.
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

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
   * Generate a modal header component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalHeader](Components.ModalHeader.html) in the components block template
   *
   * @property header
   * @type boolean
   * @default true
   * @public
   */
  header: true,

  /**
   * Generate a modal body component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalBody](Components.ModalBody.html) in the components block template.
   *
   * Always set this to false if `header` and/or `footer` is false!
   *
   * @property body
   * @type boolean
   * @default true
   * @public
   */
  body: true,

  /**
   * Generate a modal footer component automatically. Set to false to disable. In this case you would want to include an
   * instance of [Components.ModalFooter](Components.ModalFooter.html) in the components block template
   *
   * @property footer
   * @type boolean
   * @default true
   * @public
   */
  footer: true,

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
   * The action to be sent when the modal footer's submit button (if present) is pressed.
   * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html){{/crossLink}}) this action will
   * not be triggered. Instead a submit event will be triggered on the form itself. See the class description for an
   * example.
   *
   * @property submitAction
   * @type string
   * @default null
   * @public
   */
  submitAction: null,

  /**
   * The action to be sent when the modal is closing.
   * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
   * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
   * time to finish. Use the `closedAction` if you need the modal to be hidden when the action triggers.
   *
   * You can set `autoClose` to false to prevent closing the modal automatically, and do that in your closeAction by
   * setting `open` to false.
   *
   * @property closeAction
   * @type string
   * @default null
   * @public
   */
  closeAction: null,

  /**
   * The action to be sent after the modal has been completely hidden (including the CSS transition).
   *
   * @property closedAction
   * @type string
   * @default null
   * @public
   */
  closedAction: null,

  /**
   * The action to be sent when the modal is opening.
   * This will be triggered immediately after the modal is shown (so it's safe to access the DOM for
   * size calculations and the like). This means that if fade=true, it will be shown in between the
   * backdrop animation and the fade animation.
   *
   * @property openAction
   * @type string
   * @default null
   * @public
   */
  openAction: null,

  /**
   * The action to be sent after the modal has been completely shown (including the CSS transition).
   *
   * @property openedAction
   * @type string
   * @default null
   * @public
   */
  openedAction: null,

  actions: {
    close() {
      if (this.get('autoClose')) {
        this.set('open', false);
      }
      this.sendAction('closeAction');
    },
    submit() {
      let form = this.get('modalElement').find('.modal-body form');
      if (form.length > 0) {
        // trigger submit event on body form
        form.trigger('submit');
      } else {
        // if we have no form, we send a submit action
        this.sendAction('submitAction');
      }
    }
  },

  _observeOpen: observer('open', observeOpen),

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
      this.sendAction('openAction');

      if (this.get('usesTransition')) {
        this.get('modalElement')
          .one('bsTransitionEnd', Ember.run.bind(this, function() {
            this.takeFocus();
            this.sendAction('openedAction');
          }))
          .emulateTransitionEnd(Modal.TRANSITION_DURATION);
      } else {
        this.takeFocus();
        this.sendAction('openedAction');
      }
    };
    Ember.run.scheduleOnce('afterRender', this, this.handleBackdrop, callback);
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
      this.sendAction('closedAction');
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

      let waitForFade = function() {
        let $backdrop = this.get('backdropElement');
        Ember.assert('Backdrop element should be in DOM', $backdrop && $backdrop.length > 0);

        if (doAnimate) {
          $backdrop
            .one('bsTransitionEnd', Ember.run.bind(this, callback))
            .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
        } else {
          callback.call(this);
        }
      };

      Ember.run.scheduleOnce('afterRender', this, waitForFade);

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
      callback.call(this);
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
    if (this.get('open')) {
      this.show();
    }
  },

  willDestroyElement() {
    Ember.$(window).off('resize.bs.modal');
    Ember.$('body').removeClass('modal-open');
  }

});
