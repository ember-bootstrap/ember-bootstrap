import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 Modal footer element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalFooter
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName('')
@deprecateSubclassing
export default class ModalFooter extends Component {
  /**
   * The title of the default close button. Will be ignored (i.e. no close button) if you provide your own block
   * template.
   *
   * @property closeTitle
   * @type string
   * @default 'Ok'
   * @public
   */
  @defaultValue
  closeTitle = 'Ok';

  /**
   * The title of the submit button (primary button). Will be ignored (i.e. no button) if set to null or if you provide
   * your own block template.
   *
   * @property submitTitle
   * @type string
   * @default null
   * @public
   */
  @notEmpty('submitTitle')
  hasSubmitButton;

  /**
   * Set to true to disable the submit button. If you bind this to some property that indicates if submitting is allowed
   * (form validation for example) this can be used to prevent the user from pressing the submit button.
   *
   * @property submitDisabled
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  submitDisabled = false;

  /**
   * The type of the submit button (primary button).
   *
   * @property submitButtonType
   * @type string
   * @default 'primary'
   * @public
   */
  @defaultValue
  submitButtonType = 'primary';

  /**
   * @property buttonComponent
   * @type {String}
   * @private
   */
  @defaultValue
  buttonComponent = 'bs-button';

  /**
   * The action to send to the parent modal component when the modal footer's form is submitted
   *
   * @event onSubmit
   * @public
   */

  /**
   * @event onClose
   * @public
   */

  @action
  handleSubmit(e) {
    e.preventDefault();
    // send to parent bs-modal component
    this.onSubmit();
  }
}
