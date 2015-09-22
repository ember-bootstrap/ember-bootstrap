import Ember from 'ember';

export default Ember.Controller.extend({
  modal1: false,
  modal2: false,
  modal3: true,
  hasModal3: false,

  actions: {
    closeModal1() {
      this.set('modal1', false);
    },
    closeModal2() {
      this.set('modal2', false);
    },
    closeModal3() {
      this.set('modal3', false);
    },
    addModal3() {
      this.set('hasModal3', true);
      this.set('modal3', true);
    },
    removeModal3() {
      this.set('hasModal3', false);
    },
    submit() {
      alert('Modal submitted!');
    }
  }
});