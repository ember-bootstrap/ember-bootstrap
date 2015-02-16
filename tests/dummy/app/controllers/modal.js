import Ember from 'ember';

export default Ember.Controller.extend({
    modal1: false,
    modal2: false,

    actions: {
        closeDialog: function() {
            this.set('modal2', false);
        }
    }
})