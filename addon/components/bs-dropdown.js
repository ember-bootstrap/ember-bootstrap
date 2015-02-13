import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['dropdown'],

    classNameBindings: ['open'],

    open: false,

    closeOnMenuClick: true,

    clickEventName: undefined,

    actions: {
        toggleDropdown: function () {
            this.toggleProperty('open');
        },

        openDropdown: function () {
            this.set('open', true);
        },

        closeDropdown: function () {
            this.set('open', false);
        }
    },

    handleClickEvents: Ember.observer('open', function() {
        if (this.get('open')) {
            Ember.$(document).on(this.clickEventName, Ember.run.bind(this, this.closeOnClickHandler));
        }
        else {
            Ember.$(document).off(this.clickEventName);
        }
    }),

    willDestroyElement: function(){
        Ember.$(document).off(this.clickEventName);
    },

    init: function() {
        this._super();
        // click event name that is namespaced to our component instance, so multiple dropdowns do not interfere
        // with each other
        this.clickEventName = 'click.' + this.get('elementId');
    },

    closeOnClickHandler: function(e) {
        var $target = Ember.$(e.target);
        if(!this.get('isDestroyed') &&
            $target.closest(this.$().find('.dropdown-toggle')).length === 0 &&
            ($target.closest(this.$().find('.dropdown-menu')).length === 0 || this.get('closeOnMenuClick'))) {
            this.set('open', false);
        }
    }
});
