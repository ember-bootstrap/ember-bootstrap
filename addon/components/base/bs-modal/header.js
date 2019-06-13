import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header';

/**

 Modal header element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalHeader
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
  layout,
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

  /**
   * @property titleComponent
   * @type {String}
   * @private
   */
  titleComponent: 'bs-modal/header/title',

  /**
   * @property closeComponent
   * @type {String}
   * @private
   */
  closeComponent: 'bs-modal/header/close',

  /**
   * @event onClose
   * @public
   */

});
