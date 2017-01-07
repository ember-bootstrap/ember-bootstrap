/*globals alert */
import Ember from 'ember';

export default Ember.Controller.extend({
  modal: true,
  hasModal: false,

  actions: {
    addModal() {
      this.set('hasModal', true);
      this.set('modal', true);
    },
    removeModal() {
      this.set('hasModal', false);
    }
  }
});