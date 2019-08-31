import classic from 'ember-classic-decorator';
import Button from 'ember-bootstrap/components/base/bs-button';

@classic
export default class BsButton extends Button {
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
