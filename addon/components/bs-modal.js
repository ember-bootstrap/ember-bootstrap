import Ember from 'ember';
import HeaderComponent from 'ember-bootstrap/components/bs-modal-header';
import BodyComponent from 'ember-bootstrap/components/bs-modal-body';
import FooterComponent from 'ember-bootstrap/components/bs-modal-footer';

export default Ember.Component.extend({

    classNames: ['modal'],
    classNameBindings: ['fade'],


    attributeBindings: [
        'aria-describedby',
        'aria-hidden',
        //'aria-labelledby',
        'tabindex'
    ],

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
     * @property backdrop
     * @type boolean
     * @default true
     * @public
     */
    backdrop: true,

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

    'aria-hidden': 'true',
    'aria-describedby': null,

    //'aria-labelledby': Ember.computed('elementId', function() {
    //    return this.get('elementId') + '-label';
    //}),


    size: null,
    sizeClass: (function() {
        var size = this.get('size');
        return Ember.isBlank(size) ? null : 'modal-' + size;
    }).property('size'),

    actions: {
        close: function() {
            this.$().modal('hide');
        },
        submit: function() {
            var form = this.$().find('.modal-body form');
            if (form.length > 0) {
                console.log('form');
                // trigger submit event on body form
                this.$().find('.modal-body form').trigger('submit');
            }
            else {
                console.log('no form');
                // if we have no form, we send a submit action
                this.sendAction('submit');
            }
        }

    },

    observeOpen: Ember.observer('open', function() {
        if (this.get('open')) {
            this.$().modal('show');
        }
        else {
            this.$().modal('hide');
        }

    }),

    didInsertElement: function() {
        this._super();
        var modal = this.$().modal({
            keyboard: this.get('keyboard'),
            show: this.get('open'),
            backdrop: this.get('backdrop')
        });

        modal.on('hidden.bs.modal', Ember.run.bind(this, function(){
            if (!this.get('isDestroyed')) {
                this.set('open', false);
            }
            this.sendAction();
        }));
    }

});
