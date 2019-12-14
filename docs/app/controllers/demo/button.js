import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';

export default Controller.extend({

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
