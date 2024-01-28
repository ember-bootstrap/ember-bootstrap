import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked
  modal = true;
  @tracked
  hasModal = false;

  @action
  addModal() {
    this.hasModal = true;
    this.modal = true;
  }

  @action
  removeModal() {
    this.hasModal = false;
  }
}
