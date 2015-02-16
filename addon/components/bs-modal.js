import Ember from 'ember';
import HeaderComponent from 'ember-bootstrap/components/bs-modal-header';
import BodyComponent from 'ember-bootstrap/components/bs-modal-body';
import FooterComponent from 'ember-bootstrap/components/bs-modal-footer';



var Modal = {};

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

/*

 @todo escape handling
 @todo scrollbar adjust?
 @todo mobile backdrop
 @todo resize?


 */
export default Ember.Component.extend({

    classNames: ['modal'],
    classNameBindings: ['fade','in'],

    attributeBindings: ['aria-hidden'],

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

    header: true,
    body: true,
    footer: true,


    'aria-hidden': Ember.computed.alias('in'),

    usesTransition: Ember.computed('fade', function() {
        return Ember.$.support.transition && this.get('fade');
    }),

    backdropElement: null,

    _updateBackdropElement: Ember.observer('showBackdrop', function(){
        Ember.run.scheduleOnce('afterRender', this, function(){
            this.set('backdropElement', this.$().find('.modal-backdrop'));
        });
    }),

    actions: {
        close: function() {
            this.set('open', false);
        }
    },


    observeOpen: Ember.observer('open', function() {
        if (this.get('open')) {
            this.show();
        }
        else {
            this.hide();
        }
    }),

    show: function() {
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

            this.$()
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

    hide: function() {

        console.log('hide');

        //this.trigger('hide');

        //this.escape()
        this.resize();

        //$(document).off('focusin.bs.modal')

        this.set('in', false);

        this.get('usesTransition') ?
            this.$()
                .one('bsTransitionEnd', Ember.run.bind(this, this.hideModal))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal();
    },

    hideModal: function () {
        var that = this;

        this.$().hide();
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

            var waitForFade = function() {
                var $backdrop = this.get('backdropElement');
                Ember.assert('Backdrop element should be in DOM', $backdrop.length > 0);
                doAnimate ?
                    $backdrop
                        .one('bsTransitionEnd', Ember.run.bind(this, callback))
                        .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                    callback.call(this);
            };

            Ember.run.scheduleOnce('afterRender', this, waitForFade);

        } else if (!this.get('open') && this.get('backdrop')) {
            var $backdrop = this.get('backdropElement');
            Ember.assert('Backdrop element should be in DOM', $backdrop.length > 0);
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
        this.get('backdropElement')
            .css('height', 0)
            .css('height', this.$().get(0).scrollHeight);
    },

    adjustDialog: function () {
        // @todo
        //var modalIsOverflowing = this.get('element')[0].scrollHeight > document.documentElement.clientHeight;
        //
        //this.get('element').css({
        //    paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
        //    paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        //});
    }
});
