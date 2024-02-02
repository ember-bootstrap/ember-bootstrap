import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DemoRoute extends Route {
  @service component;

  model() {
    return this.component.findAll();
  }
}
