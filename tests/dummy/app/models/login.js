// BEGIN-SNIPPET login-model
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  password: [
    validator('presence', true),
    validator('length', {
      min: 4,
      max: 8
    }),
    validator('length', {
      isWarning: true,
      min: 6,
      message: 'Password is weak'
    })
  ],
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default Ember.Object.extend(Validations, {
  email: null,
  password: null,
  rememberMe: false
});
// END-SNIPPET