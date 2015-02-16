import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';


export default Ember.Component.extend(ModalCloser, {
    classNames: ['modal-footer'],

    buttonTitle: 'Ok'


});
