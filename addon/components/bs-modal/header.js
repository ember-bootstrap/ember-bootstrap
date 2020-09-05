import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 Modal header element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalHeader
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName('')
@deprecateSubclassing
export default class ModalHeader extends Component {
  /**
   * Show a close button (x icon)
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  closeButton = true;

  /**
   * The title to display in the modal header
   *
   * @property title
   * @type string
   * @default null
   * @public
   */

  /**
   * @property titleComponent
   * @type {String}
   * @private
   */
  @defaultValue
  titleComponent = 'bs-modal/header/title';

  /**
   * @property closeComponent
   * @type {String}
   * @private
   */
  @defaultValue
  closeComponent = 'bs-modal/header/close';

  /**
   * @event onClose
   * @public
   */
}
