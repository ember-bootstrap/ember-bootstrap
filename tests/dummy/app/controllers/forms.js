import Ember from 'ember';

export default Ember.Controller.extend({
  formLayout: 'vertical',
  email: null,
  password: null,
  rememberMe: false,
  genderChoices: Ember.A([
    {
      id: 'f',
      label: 'Female'
    },
    {
      id: 'm',
      label: 'Male'
    }
  ]),
  actions: {
    submit() {
      window.alert('Successfully submitted form data!');
    }
  }

});
