import BaseButton from 'ember-bootstrap/components/base/bs-button';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class Button extends BaseButton {
  @defaultValue
  type = 'secondary';

  /**
   * Property to create outline buttons (BS4+ only)
   *
   * @property disabled
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  outline = false;
}
