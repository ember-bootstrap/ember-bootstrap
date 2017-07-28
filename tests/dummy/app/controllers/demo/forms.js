import Ember from 'ember';
import Login from '../../models/login';

const { computed, getOwner } = Ember;

export default Ember.Controller.extend({
  formLayout: 'vertical',
  email: null,
  password: null,
  rememberMe: false,

  login: computed(function() {
    return Login.create(
      getOwner(this).ownerInjection()
    );
  }),

  actions: {
    submit() {
      window.alert('Successfully submitted form data!');
    }
  }

});
