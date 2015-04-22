import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';


export default Ember.Component.extend(ModalCloser, I18nSupport, {
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
