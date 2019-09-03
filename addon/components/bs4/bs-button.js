import BaseButton from 'ember-bootstrap/components/base/bs-button';

export default class Button extends BaseButton {
  type = 'secondary';

  /**
   * Property to create outline buttons (BS4+ only)
   *
   * @property disabled
   * @type boolean
   * @default false
   * @public
   */
  outline = false;
}
