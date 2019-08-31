import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import ModalDialog from 'ember-bootstrap/components/base/bs-modal/dialog';

@classic
@classNameBindings('showModal:show', 'inDom:d-block')
export default class Dialog extends ModalDialog {
  centered = false;
}
