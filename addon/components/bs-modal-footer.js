import Ember from 'ember';
import ModalCloser from 'ember-bootstrap/mixins/modal-closer';

const { computed } = Ember;

/**

 Modal footer element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalFooter
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend(ModalCloser, {
  tagName: 'form',
  classNames: ['modal-footer'],

  /**
   * The title of the default close button. Will be ignored (i.e. no close button) if you provide your own block
   * template.
   *
   * @property closeTitle
   * @type string
   * @default 'Ok'
   * @public
   */
  closeTitle: 'Ok',

  /**
   * The title of the submit button (primary button). Will be ignored (i.e. no button) if set to null or if you provide
   * your own block template.
   *
   * @property submitTitle
   * @type string
   * @default null
   * @public
   */
  submitTitle: null,

  hasSubmitButton: computed.notEmpty('submitTitle'),

  /**
   * Set to true to disable the submit button. If you bind this to some property that indicates if submitting is allowed
   * (form validation for example) this can be used to prevent the user from pressing the submit button.
   *
   * @property submitDisabled
   * @type boolean
   * @default false
   * @public
   */
  submitDisabled: false,

  /**
   * The action to send to the parent modal component when the modal footer's form is submitted
   *
   * @property submitAction
   * @type string
   * @default 'submit'
   * @private
   */
  submitAction: 'submit',

  submit(e) {
    e.preventDefault();
    // send to parent bs-modal component
    this.sendAction('submitAction');
  }

});
