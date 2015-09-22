import Ember from 'ember';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';

var Modal = {};

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

var observeOpen = function () {
  if (this.get('open')) {
    this.show();
  }
  else {
    this.hide();
  }
};

export default Ember.Component.extend(I18nSupport, {

  //  classNames: ['modal'],
  //classNameBindings: ['fade','in'],
  //
  //
  //  attributeBindings: [
  //      'aria-describedby',
  //      'aria-hidden',
  //      //'aria-labelledby',
  //      'tabindex'
  //  ],

  /**
   * @property open
   * @type boolean
   * @default true
   * @public
   */
  open: true,

  /**
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

  /**
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * @property in
   * @type boolean
   * @default false
   * @private
   */
  in: false,

  /**
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
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */
  keyboard: true,


  header: true,
  body: true,
  footer: true,

  classTypePrefix: 'modal',

  tabindex: '-1',

  'aria-hidden': Ember.computed.alias('in'),
  'aria-describedby': null,

  modalId: Ember.computed('elementId', function() {
    return this.get('elementId') + '-modal';
  }),

  modalElement: Ember.computed('modalId', function() {
    return Ember.$('#' + this.get('modalId'));
  }).volatile(),

  backdropId: Ember.computed('elementId', function() {
    return this.get('elementId') + '-backdrop';
  }),

  backdropElement: Ember.computed('backdropId', function() {
    return Ember.$('#' + this.get('backdropId'));
  }).volatile(),

  usesTransition: Ember.computed('fade', function () {
    return Ember.$.support.transition && this.get('fade');
  }),

  size: null,
  sizeClass: Ember.computed('size', function () {
    var size = this.get('size');
    return Ember.isBlank(size) ? null : 'modal-' + size;
  }),

  actions: {
    close: function () {
      this.set('open', false);
    },
    submit: function () {
      var form = this.$().find('.modal-body form');
      if (form.length > 0) {
        // trigger submit event on body form
        this.$().find('.modal-body form').trigger('submit');
      }
      else {
        // if we have no form, we send a submit action
        this.sendAction('submit');
      }
    }

  },

  _observeOpen: Ember.observer('open', observeOpen),

  show: function () {
    //this.trigger('show');

    // @todo srollbar handling?
    //this.checkScrollbar()
    //this.setScrollbar()

    console.log('show');

    Ember.$('body').addClass('modal-open');

    // @todo escape key
    //this.escape()

    this.resize();

    // @todo mobile backdrop support
    var callback = function () {
      var transition = this.get('usesTransition');

      this.get('modalElement')
        .show()
        .scrollTop(0);

      this.handleUpdate();

      //if (transition) {
      //    that.$element[0].offsetWidth // force reflow
      //}

      this.set('in', true);

      // @todo focus
      //that.enforceFocus()

      //this.trigger('shown');

      // @todo focus
      //transition ?
      //    that.$element.find('.modal-dialog') // wait for modal to slide in
      //        .one('bsTransitionEnd', function () {
      //            that.$element.trigger('focus').trigger(e)
      //        })
      //        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      //    that.$element.trigger('focus').trigger(e)
    };
    Ember.run.scheduleOnce('afterRender', this, this.handleBackdrop, callback);
  },

  hide: function () {

    console.log('hide');

    //this.trigger('hide');

    //this.escape()
    this.resize();

    //$(document).off('focusin.bs.modal')

    this.set('in', false);

    this.get('usesTransition') ?
      this.get('modalElement')
        .one('bsTransitionEnd', Ember.run.bind(this, this.hideModal))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal();
  },

  hideModal: function () {
    var that = this;

    this.get('modalElement').hide();
    this.handleBackdrop(function () {
      Ember.$('body').removeClass('modal-open');
      //that.resetAdjustments()
      //that.resetScrollbar()
      //that.trigger('hidden');
      console.log('hidden');

    });
  },


  handleBackdrop: function (callback) {
    var that = this,
      doAnimate = this.get('usesTransition');

    if (this.get('open') && this.get('backdrop')) {
      this.set('showBackdrop', true);

      //this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
      //    .prependTo(this.$element)
      //    .on('click.dismiss.bs.modal', $.proxy(function (e) {
      //        if (e.target !== e.currentTarget) return
      //        this.options.backdrop == 'static'
      //            ? this.$element[0].focus.call(this.$element[0])
      //            : this.hide.call(this)
      //    }, this))

      // @todo ???
      //if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      //this.$backdrop.addClass('in')

      if (!callback) return;

      var waitForFade = function () {
        var $backdrop = this.get('backdropElement');
        Ember.assert('Backdrop element should be in DOM', $backdrop && $backdrop.length > 0);
        doAnimate ?
          $backdrop
            .one('bsTransitionEnd', Ember.run.bind(this, callback))
            .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
          callback.call(this);
      };

      Ember.run.scheduleOnce('afterRender', this, waitForFade);

    } else if (!this.get('open') && this.get('backdrop')) {
      var $backdrop = this.get('backdropElement');
      Ember.assert('Backdrop element should be in DOM', $backdrop && $backdrop.length > 0);
      //this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        this.set('showBackdrop', false);
        if (callback) {
          callback.call(this);
        }
      };
      doAnimate ?
        $backdrop
          .one('bsTransitionEnd', Ember.run.bind(this, callbackRemove))
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback.call(this);
    }
  },

  resize: function () {
    if (this.get('open')) {
      Ember.$(window).on('resize.bs.modal', Ember.run.bind(this, this.handleUpdate));
    } else {
      $(window).off('resize.bs.modal');
    }
  },

  handleUpdate: function () {
    if (this.get('backdrop')) {
      this.adjustBackdrop();
    }
    this.adjustDialog();
  },

  adjustBackdrop: function () {

  },

  adjustDialog: function () {
    // @todo
    //var modalIsOverflowing = this.get('element')[0].scrollHeight > document.documentElement.clientHeight;
    //
    //this.get('element').css({
    //    paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
    //    paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    //});
  },

  didInsertElement: function () {

    if (this.get('open')) {
      this.show();
    }
  }


});
