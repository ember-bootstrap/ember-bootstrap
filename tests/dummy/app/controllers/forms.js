import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin,{
    formLayout: 'vertical',
    email: null,
    password: null,
    rememberMe: false,
    validations: {
        email: {
            presence: true,
            format: {
                with: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            }
        },
        password: {
            presence: true,
            length: { minimum: 6, maximum: 10}
        }
    },

    actions: {
        submit: function() {
            window.alert('Successfully submitted form data!');
        }
    }


});
