import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';


export default Ember.Component.extend(ModalCloser, {
    classNames: ['modal-footer'],

    buttonTitle: 'Ok',

    actions: {
        submit: function() {
            // send to parent bs-modal component
            console.log('submit');
            this.triggerAction({
                action: 'submit'
            });
        }
    }


});
