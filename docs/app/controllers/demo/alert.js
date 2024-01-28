import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class AlertController extends Controller {
  @tracked
  visible = true;

  @tracked
  fade = true;

  @tracked
  dismissible = true;

  @tracked
  headerTag = 'h4';

  @tracked
  typeChoices = ['success', 'info', 'warning', 'danger'];

  @tracked
  type = this.typeChoices[0];
}
