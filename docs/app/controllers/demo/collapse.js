import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CollapseController extends Controller {
  @tracked
  collapsed = true;

  get notCollapsed() {
    return !this.collapsed;
  }

  @action
  toggle() {
    this.collapsed = !this.collapsed;
  }
}
