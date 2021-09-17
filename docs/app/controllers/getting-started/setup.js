import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SetupController extends Controller {
  @tracked
  blueprintDetailsCollapsed = true;

  @action
  toggleBlueprintDetails() {
    this.blueprintDetailsCollapsed = !this.blueprintDetailsCollapsed;
  }
}
