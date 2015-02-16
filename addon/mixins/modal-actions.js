import Ember from 'ember';

export default Ember.Mixin.create({
    actions: {
        openModal: function(modalName, model) {
            if (model) {
                this.controllerFor(modalName).set('model', model);
            }
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeModal: function() {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});
