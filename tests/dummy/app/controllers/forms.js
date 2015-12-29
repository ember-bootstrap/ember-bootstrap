import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations,{
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
        },
        comments: {
            length: { minimum: 5, maximum: 20}
        }
    },

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
        submit () {
            window.alert('Successfully submitted form data!');
        }
    }


});
