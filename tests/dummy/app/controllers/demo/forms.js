import Ember from 'ember';

export default Ember.Controller.extend({
  formLayout: 'vertical',
  email: null,
  password: null,
  rememberMe: false,
  actions: {
    submit() {
      window.alert('Successfully submitted form data!');
    }
  }

});
