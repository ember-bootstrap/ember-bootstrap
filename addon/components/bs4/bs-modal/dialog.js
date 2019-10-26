import { classNameBindings } from '@ember-decorators/component';
import BaseModalDialog from 'ember-bootstrap/components/base/bs-modal/dialog';

@classNameBindings('showModal:show', 'inDom:d-block')
export default class ModalDialog extends BaseModalDialog {
  centered = false;
  scrollable = false;
}
