import Ember from 'ember';

export default Ember.Mixin.create({
    backRoute: 'index',

    renderTemplate: function() {
        this.render({
            into: 'application',
            outlet: 'modal'
        });
    },

    actions: {
        closeModal: function() {
            this.transitionTo(this.get('backRoute'));
        }
    }
});
