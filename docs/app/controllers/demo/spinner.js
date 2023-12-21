import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { action } from '@ember/object';

export default class ButtonController extends Controller {
  @action
  download() {
    return new Promise((resolve) => {
      later(resolve, 3000);
    });
  }
}
