import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';

export default Ember.Component.extend(ModalCloser, I18nSupport, {
    classNames: ['modal-header'],

    closeButton: true,

    title: null

});
