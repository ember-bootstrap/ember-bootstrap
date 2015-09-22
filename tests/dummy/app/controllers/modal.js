import Ember from 'ember';

export default Ember.Controller.extend({
    modal1: false,
    modal2: false,
    modal3: false,

    actions: {
      submit() {
        alert('Modal submitted!');
      },
      openModal() {
        this.set('modal3', true);
      },
      closeModal() {
        this.set('modal3', false);
      }
    }
});