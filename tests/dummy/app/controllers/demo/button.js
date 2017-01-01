import Ember from 'ember';

const { RSVP, run: { later } } = Ember;

export default Ember.Controller.extend({

  actions: {
    submit() {
      window.alert('You pressed the button!');
    },

    download() {
      return new RSVP.Promise(function(resolve) {
        later(resolve, 3000);
      });
    }
  }
});
