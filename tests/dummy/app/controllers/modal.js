import Ember from 'ember';

export default Ember.Controller.extend({
    modal1: false,
    modal2: false,

    actions: {
        open: function() {
            this.send('openModal', 'modal.from-action');
        },
      submit() {
        alert('Modal submitted!');
      }
    }
});