import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';


export default Ember.Component.extend(ModalCloser, {
    tagName: 'form',
    classNames: ['modal-footer'],

    closeTitle: 'Ok',
    submitTitle: null,
    hasSubmitButton: Ember.computed.notEmpty('submitTitle'),
    submitDisabled: false,

    submit: function(e) {
        e.preventDefault();
        // send to parent bs-modal component
        this.triggerAction({
            action: 'submit'
        });
    }


});
