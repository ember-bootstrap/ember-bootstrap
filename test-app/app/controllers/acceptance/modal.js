import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  modal = true;
  hasModal = false;

  @action
  addModal() {
    this.set('hasModal', true);
    this.set('modal', true);
  }

  @action
  removeModal() {
    this.set('hasModal', false);
  }
}
