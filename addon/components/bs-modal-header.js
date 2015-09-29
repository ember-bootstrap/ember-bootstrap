import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';

export default Ember.Component.extend(ModalCloser, I18nSupport, {
  classNames: ['modal-header'],

  /**
   * Show a close button (x icon)
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

  /**
   * The title to display in the modal header
   *
   * @property title
   * @type string
   * @default null
   * @public
   */
  title: null

});
