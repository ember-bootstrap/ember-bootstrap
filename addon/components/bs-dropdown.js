import Ember from 'ember';


function subscribeToClickEvent() {

}

export default Ember.Component.extend({
    classNames: ['dropdown'],

    classNameBindings: ['open'],

    open: false,

    closeOnMenuClick: true,

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
            Ember.$(document).on('click.dropdown', Ember.run.bind(this, this.closeOnClickHandler));
        }
        else {
            Ember.$(document).off('click.dropdown');
        }
    }),

    willDestroyElement: function(){
        Ember.$(document).off('click.dropdown');
    },

    closeOnClickHandler: function(e) {
        var $target = Ember.$(e.target);
        debugger;
        if(!this.get('isDestroyed') &&
            $target.closest(this.$().find('.dropdown-toggle')).length === 0 &&
            ($target.closest(this.$().find('.dropdown-menu')).length === 0 || this.get('closeOnMenuClick'))) {
            this.set('open', false);
        }
    }
});
