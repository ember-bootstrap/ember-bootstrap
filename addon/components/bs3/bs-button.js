import classic from 'ember-classic-decorator';
import Button from 'ember-bootstrap/components/base/bs-button';

@classic
export default class BsButton extends Button {
  type = 'default';
}
