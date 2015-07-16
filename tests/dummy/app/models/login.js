import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Object.extend(EmberValidations, {
    email: null,
    password: null,
    rememberMe: false,
    validations: {
        email: {
            format: {
                with: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
            }
        },
        password: {
            length: { minimum: 3, maximum: 10}
        }
    }
});