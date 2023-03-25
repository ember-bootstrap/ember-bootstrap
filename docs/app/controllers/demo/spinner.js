import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';
import { action } from '@ember/object';

export default class ButtonController extends Controller {
  @action
  download() {
    return new RSVP.Promise(function (resolve) {
      later(resolve, 3000);
    });
  }
}
