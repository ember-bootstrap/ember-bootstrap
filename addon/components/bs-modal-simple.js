import Modal from './bs-modal';
import layout from '../templates/components/bs-modal-simple';

export default Modal.extend({
  layout,

  /**
   * The title of the modal, visible in the modal header. Is ignored if `header` is false.
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * Display a close button (x icon) in the corner of the modal header.
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

  /**
   * The title of the default close button.
   *
   * @property closeTitle
   * @type string
   * @default 'Ok'
   * @public
   */
  closeTitle: 'Ok',

  /**
   * The title of the submit button (primary button). Will be ignored (i.e. no button) if set to null.
   *
   * @property submitTitle
   * @type string
   * @default null
   * @public
   */
  submitTitle: null

});
