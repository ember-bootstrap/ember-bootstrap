import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class NavsController extends Controller {
  @tracked
  type = 'pills';
  @tracked
  stacked = false;
  @tracked
  justified = false;
  @tracked
  fill = false;

  typeChoices = ['pills', 'tabs'];

  @action
  updateType(type) {
    this.type = type;
    if (type === 'tabs') {
      this.stacked = false;
    }
  }

  @action
  updateStacked(stacked) {
    this.stacked = stacked;
    if (stacked) {
      this.justified = false;
    }
  }
}
