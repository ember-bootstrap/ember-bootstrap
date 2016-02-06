import Ember from 'ember';

export default Ember.Controller.extend({
  visible: false,

  actions: {
    close() {
      this.set('visible', false);
    }
  }
});
