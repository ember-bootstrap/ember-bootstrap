import classic from 'ember-classic-decorator';
import Modal from 'ember-bootstrap/components/base/bs-modal';

@classic
export default class BsModal extends Modal {
  showClass = 'in';
}
