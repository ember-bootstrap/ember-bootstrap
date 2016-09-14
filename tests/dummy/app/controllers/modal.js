/*globals alert */
import Ember from 'ember';

export default Ember.Controller.extend({
  modal1: false,
  modal2: false,
  modal3: true,
  hasModal3: false,

  queryParams: ['modal1', 'modal2'],

  actions: {
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