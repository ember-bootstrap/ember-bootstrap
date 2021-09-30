import { action } from '@ember/object';
import Controller from '@ember/controller';
import { next } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class ModalController extends Controller {
  @tracked
  modal1 = false;
  @tracked
  modal2 = true;
  @tracked
  modal3 = false;
  @tracked
  hasModal3 = false;
  @tracked
  title = 'Simple Modal';
  @tracked
  sizes = ['', 'sm', 'lg'];
  @tracked
  size = '';
  @tracked
  closeButton = true;
  @tracked
  closeTitle = 'Ok';
  @tracked
  submitTitle = null;
  @tracked
  backdrop = true;
  @tracked
  backdropClose = true;
  @tracked
  fade = true;

  _ignoreClose = false;

  @action
  addModal3() {
    this.hasModal3 = true;
    this.modal3 = true;
  }
  @action
  removeModal3() {
    this.hasModal3 = false;
  }
  @action
  submit() {
    alert('Modal submitted!');
  }
  @action
  close() {
    if (!this._ignoreClose) {
      this.modal2 = false;
      alert('Modal closed!');
    }
  }
  @action
  open() {
    this.modal2 = true;
  }
}
